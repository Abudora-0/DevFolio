export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
  size: number;
}

export interface ProcessedProfile {
  user: GithubUser;
  topRepos: GithubRepo[];
  recentRepos: GithubRepo[];
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  languages: { name: string; count: number; percent: number; color: string }[];
  accountAge: number;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript:  "#f7df1e",
  TypeScript:  "#3178c6",
  Python:      "#3572a5",
  Java:        "#b07219",
  "C++":       "#f34b7d",
  C:           "#555555",
  "C#":        "#178600",
  Go:          "#00add8",
  Rust:        "#dea584",
  Ruby:        "#701516",
  PHP:         "#4f5d95",
  Swift:       "#f05138",
  Kotlin:      "#a97bff",
  Dart:        "#00b4ab",
  HTML:        "#e34c26",
  CSS:         "#563d7c",
  Shell:       "#89e051",
  Vue:         "#41b883",
  Svelte:      "#ff3e00",
  Scala:       "#c22d40",
  R:           "#198ce7",
  MATLAB:      "#e16737",
  Lua:         "#000080",
  Haskell:     "#5e5086",
  Elixir:      "#6e4a7e",
};

export function getLangColor(lang: string): string {
  return LANG_COLORS[lang] ?? "#8b949e";
}

export async function fetchProfile(username: string): Promise<ProcessedProfile> {
  const headers: HeadersInit = { "Accept": "application/vnd.github.v3+json" };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  // Fetch user + repos sorted by stars in parallel
  const [userRes, reposByStarsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 300 },
    }),
    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`, {
      headers,
      next: { revalidate: 300 },
    }),
  ]);

  if (!userRes.ok) {
    if (userRes.status === 404) throw new Error("User not found");
    if (userRes.status === 403) throw new Error("GitHub API rate limit hit. Try again in a minute.");
    throw new Error("Failed to fetch GitHub profile");
  }

  const user: GithubUser = await userRes.json();
  const allRepos: GithubRepo[] = reposByStarsRes.ok
    ? (await reposByStarsRes.json()).map((r: GithubRepo) => ({
        ...r,
        topics: r.topics ?? [],           // fix: topics can be undefined
        description: r.description || null,
      }))
    : [];

  // Fix: empty blog string should be treated as null
  if (user.blog === "") user.blog = null;

  const ownRepos = allRepos.filter(r => !r.fork);

  // Top repos = sorted by stars
  const topRepos = [...allRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  // Recently active = own repos pushed in last 60 days, sorted by most recent
  const cutoff = Date.now() - 60 * 24 * 60 * 60 * 1000;
  const recentRepos = ownRepos
    .filter(r => new Date(r.updated_at).getTime() > cutoff)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 4);

  const totalStars = ownRepos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = ownRepos.reduce((s, r) => s + r.forks_count, 0);

  // Language breakdown
  const langMap: Record<string, number> = {};
  ownRepos.forEach(r => {
    if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1;
  });
  const totalLangRepos = Object.values(langMap).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(langMap).sort((a, b) => b[1] - a[1]).slice(0, 8);

  // Fix: ensure percentages don't exceed 100 due to rounding
  let remaining = 100;
  const languages = sorted.map(([name, count], i) => {
    const pct = i < sorted.length - 1
      ? Math.round((count / totalLangRepos) * 100)
      : remaining;
    remaining -= pct;
    return { name, count, percent: Math.max(pct, 1), color: getLangColor(name) };
  });

  const accountAge = Math.floor(
    (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365)
  );

  return {
    user,
    topRepos,
    recentRepos,
    totalStars,
    totalForks,
    totalRepos: ownRepos.length,
    languages,
    accountAge,
  };
}
