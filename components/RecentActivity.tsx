import { Clock, GitFork, Star } from "lucide-react";
import { GithubRepo, getLangColor } from "@/lib/github";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (hours < 24)  return `${hours}h ago`;
  if (days < 7)    return `${days}d ago`;
  if (days < 30)   return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function RecentActivity({ repos }: { repos: GithubRepo[] }) {
  if (!repos.length) return null;

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
      <h2 className="text-xs font-semibold uppercase tracking-widest mb-3 px-1 flex items-center gap-2" style={{ color: "#4a6080" }}>
        <Clock className="w-3.5 h-3.5" /> Recently Active
      </h2>
      <div className="glass rounded-2xl divide-y" style={{ borderColor: "rgba(25,37,58,0.6)" }}>
        {repos.map(repo => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3.5 transition-colors group"
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            {repo.language && (
              <span
                className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5"
                style={{ backgroundColor: getLangColor(repo.language) }}
              />
            )}
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium truncate block transition-colors group-hover:text-teal-300"
                style={{ color: "#8fa8c4" }}>
                {repo.name}
              </span>
              {repo.description && (
                <span className="text-xs truncate block" style={{ color: "#2a3a50" }}>{repo.description}</span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs flex-shrink-0" style={{ color: "#2a3a50" }}>
              <span className="flex items-center gap-1"><Star className="w-3 h-3" />{repo.stargazers_count}</span>
              <span className="text-gray-700">{timeAgo(repo.updated_at)}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
