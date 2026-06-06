"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Star, GitFork, Users, Sparkles, Code2 } from "lucide-react";

const EXAMPLES = ["torvalds", "gaearon", "sindresorhus", "tj", "yyx990803", "addyosmani"];

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading]   = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = username.trim().replace(/^@/, "");
    if (!name) return;
    setLoading(true);
    router.push(`/u/${name}`);
  }

  function tryExample(name: string) {
    setUsername(name);
    setLoading(true);
    router.push(`/u/${name}`);
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] flex flex-col">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-[#21262d]/60 px-6 h-14 flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">DevFolio</span>
        </div>
        <div className="ml-auto">
          <a href="https://github.com" target="_blank"
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            Powered by GitHub API
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs text-violet-300 mb-6">
            <Sparkles className="w-3 h-3" />
            Free · No sign-up · Instant
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
            Your GitHub,{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              beautifully presented
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Enter any GitHub username and get a stunning portfolio page with stats, repos, and languages — shareable in one link.
          </p>

          {/* Search */}
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium select-none">
                  github.com/
                </span>
                <input
                  ref={inputRef}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="username"
                  autoFocus
                  className="w-full bg-[#161b22] border border-[#30363d] rounded-2xl pl-[100px] pr-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all text-base"
                />
              </div>
              <button
                type="submit"
                disabled={!username.trim() || loading}
                className="flex items-center gap-2 px-5 py-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 text-white font-semibold rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-violet-500/20"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                Generate
              </button>
            </div>
          </form>

          {/* Example profiles */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs text-gray-600 uppercase tracking-widest">Try these profiles</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {EXAMPLES.map(name => (
                <button key={name} onClick={() => tryExample(name)}
                  className="px-3 py-1.5 text-sm bg-[#161b22] border border-[#21262d] text-gray-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/5 rounded-xl transition-all duration-150">
                  @{name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          {[
            { icon: <Star className="w-4 h-4" />, title: "Stars & Forks", desc: "Total GitHub activity at a glance" },
            { icon: <GitFork className="w-4 h-4" />, title: "Top Repos", desc: "Most starred repositories showcased" },
            { icon: <Users className="w-4 h-4" />, title: "Shareable URL", desc: "One link to share your portfolio" },
          ].map(f => (
            <div key={f.title} className="glass rounded-2xl p-5 text-left">
              <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-3">
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 text-center py-6 text-xs text-gray-700">
        Data from the public GitHub API · No login required
      </footer>
    </div>
  );
}
