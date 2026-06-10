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
        <h2 className="text-xs font-semibold uppercase tracking-widest flex-shrink-0" style={{ color: "#4a6080" }}>
          Top Repositories
          <span className="ml-2 normal-case font-normal" style={{ color: "#2a3a50" }}>({repos.length})</span>
        </h2>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#2a3a50" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search repos..."
              className="rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder:text-[#2a3a50] focus:outline-none transition-colors w-36 sm:w-44"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-muted)" }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(45,212,191,0.4)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border-muted)")}
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-white transition-colors"
                style={{ color: "#2a3a50" }}>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-colors hover:text-white"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-muted)", color: "#4a6080" }}
            >
              <ArrowUpDown className="w-3 h-3" />
              {SORT_LABELS[sort]}
            </button>
            {showSort && (
              <div className="absolute top-full mt-1 right-0 rounded-xl p-1 z-20 shadow-xl min-w-[110px]"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-muted)" }}>
                {(Object.keys(SORT_LABELS) as SortKey[]).map(key => (
                  <button key={key} onClick={() => { setSort(key); setShowSort(false); }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors"
                    style={sort === key
                      ? { background: "rgba(45,212,191,0.12)", color: "#2dd4bf" }
                      : { color: "#4a6080" }}
                    onMouseEnter={e => { if (sort !== key) { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; } }}
                    onMouseLeave={e => { if (sort !== key) { e.currentTarget.style.color = "#4a6080"; e.currentTarget.style.background = "transparent"; } }}>
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
        <div className="glass rounded-2xl p-8 text-center text-sm" style={{ color: "#2a3a50" }}>
          No repositories match &ldquo;{search}&rdquo;
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map(repo => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-2xl p-4 transition-all duration-200 flex flex-col gap-3"
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(45,212,191,0.25)";
                e.currentTarget.style.background = "rgba(45,212,191,0.03)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "rgba(9,13,20,0.8)";
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-white text-sm leading-tight transition-colors group-hover:text-teal-300">
                  {repo.name}
                </h3>
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 transition-colors group-hover:text-teal-400"
                  style={{ color: "#2a3a50" }} />
              </div>

              <p className="text-xs leading-relaxed line-clamp-2 flex-1 min-h-[2.5rem]" style={{ color: "#4a6080" }}>
                {repo.description || <span className="italic">No description</span>}
              </p>

              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {repo.topics.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(45,212,191,0.08)", color: "#2dd4bf", border: "1px solid rgba(45,212,191,0.15)" }}>
                      {t}
                    </span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "#2a3a50" }}>
                      +{repo.topics.length - 3}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-3 text-xs pt-2.5 mt-auto" style={{ color: "#2a3a50", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
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
