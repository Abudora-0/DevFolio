"use client";

import { useState } from "react";
import { Star, GitFork, ExternalLink, Search, X, ArrowUpDown } from "lucide-react";
import { GithubRepo, getLangColor } from "@/lib/github";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 1)   return "today";
  if (days < 7)   return `${days}d ago`;
  if (days < 30)  return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

type SortKey = "stars" | "forks" | "updated";

const SORT_LABELS: Record<SortKey, string> = {
  stars:   "Stars",
  forks:   "Forks",
  updated: "Updated",
};

export default function RepoGrid({ repos }: { repos: GithubRepo[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort]     = useState<SortKey>("stars");
  const [showSort, setShowSort] = useState(false);

  if (!repos.length) return null;

  const filtered = repos
    .filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description ?? "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "stars")   return b.stargazers_count - a.stargazers_count;
      if (sort === "forks")   return b.forks_count - a.forks_count;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1 gap-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide flex-shrink-0">
          Top Repositories
          <span className="ml-2 text-gray-700 normal-case font-normal">({repos.length})</span>
        </h2>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search repos..."
              className="bg-[#161b22] border border-[#21262d] rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors w-36 sm:w-44"
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#161b22] border border-[#21262d] rounded-xl text-xs text-gray-400 hover:text-white transition-colors"
            >
              <ArrowUpDown className="w-3 h-3" />
              {SORT_LABELS[sort]}
            </button>
            {showSort && (
              <div className="absolute top-full mt-1 right-0 bg-[#161b22] border border-[#30363d] rounded-xl p-1 z-20 shadow-xl min-w-[110px]">
                {(Object.keys(SORT_LABELS) as SortKey[]).map(key => (
                  <button key={key} onClick={() => { setSort(key); setShowSort(false); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${sort === key ? "bg-violet-500/20 text-violet-300" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                    {SORT_LABELS[key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Repo cards */}
      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center text-sm text-gray-600">
          No repositories match "{search}"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map(repo => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-2xl p-4 hover:border-violet-500/30 hover:bg-violet-500/[0.04] transition-all duration-200 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-white text-sm group-hover:text-violet-300 transition-colors leading-tight">
                  {repo.name}
                </h3>
                <ExternalLink className="w-3.5 h-3.5 text-gray-700 group-hover:text-violet-400 transition-colors flex-shrink-0 mt-0.5" />
              </div>

              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1 min-h-[2.5rem]">
                {repo.description || <span className="italic">No description</span>}
              </p>

              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {repo.topics.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/15">
                      {t}
                    </span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 bg-white/5 text-gray-600 rounded-full">
                      +{repo.topics.length - 3}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-3 text-xs text-gray-600 border-t border-white/5 pt-2.5 mt-auto">
                {repo.language && (
                  <span className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLangColor(repo.language) }} />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1 flex-shrink-0">
                  <Star className="w-3 h-3" /> {repo.stargazers_count.toLocaleString()}
                </span>
                <span className="flex items-center gap-1 flex-shrink-0">
                  <GitFork className="w-3 h-3" /> {repo.forks_count}
                </span>
                <span className="ml-auto flex-shrink-0">{timeAgo(repo.updated_at)}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
