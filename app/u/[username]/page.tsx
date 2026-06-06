import { notFound } from "next/navigation";
import { fetchProfile } from "@/lib/github";
import ProfileHero from "@/components/ProfileHero";
import StatsBar from "@/components/StatsBar";
import RepoGrid from "@/components/RepoGrid";
import LanguageChart from "@/components/LanguageChart";
import RecentActivity from "@/components/RecentActivity";
import BackButton from "@/components/BackButton";
import ShareButton from "@/components/ShareButton";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  try {
    const profile = await fetchProfile(username);
    const name = profile.user.name || profile.user.login;
    return {
      title: `${name} (@${profile.user.login}) — DevFolio`,
      description: profile.user.bio || `GitHub portfolio for ${username}`,
    };
  } catch {
    return { title: `${username} — DevFolio` };
  }
}

export default async function UserPage({ params }: Props) {
  const { username } = await params;

  let profile;
  try {
    profile = await fetchProfile(username);
  } catch (err: any) {
    if (err.message === "User not found") notFound();
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-white font-bold text-lg mb-2">Couldn't load profile</h2>
          <p className="text-gray-400 text-sm mb-6">{err.message}</p>
          <a href="/" className="px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-xl text-sm text-gray-300 hover:text-white transition-colors">
            ← Go back
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10]">
      <div className="fixed top-0 left-0 right-0 h-[500px] pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] bg-violet-600/[0.06] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5 pb-16">
        {/* Nav */}
        <div className="flex items-center justify-between">
          <BackButton />
          <ShareButton username={profile.user.login} />
        </div>

        {/* Hero */}
        <ProfileHero profile={profile} />

        {/* Stats */}
        <StatsBar profile={profile} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left: repos */}
          <div className="lg:col-span-2 space-y-5">
            <RepoGrid repos={profile.topRepos} />
            {profile.recentRepos.length > 0 && (
              <RecentActivity repos={profile.recentRepos} />
            )}
          </div>

          {/* Right: language + info */}
          <div className="space-y-5">
            <LanguageChart languages={profile.languages} />

            {/* Quick links */}
            <div className="glass rounded-2xl p-4 animate-fade-in-up space-y-2"
              style={{ animationDelay: "0.35s", animationFillMode: "both" }}>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Links</h2>
              {[
                { label: "GitHub Profile",   href: profile.user.html_url },
                { label: "Repositories",     href: `${profile.user.html_url}?tab=repositories` },
                { label: "Stars",            href: `${profile.user.html_url}?tab=stars` },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 text-sm text-gray-400 hover:text-white transition-colors group">
                  {l.label}
                  <span className="text-gray-700 group-hover:text-violet-400 transition-colors">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
