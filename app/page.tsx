"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Star, GitFork, Users, Zap, Code2 } from "lucide-react";

const EXAMPLES = ["torvalds", "gaearon", "sindresorhus", "tj", "yyx990803", "addyosmani"];

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2dd4bf"/>
          <stop offset="100%" stopColor="#fbbf24"/>
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#lg)"/>
      <path d="M34 35 L20 50 L34 65" stroke="white" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M66 35 L80 50 L66 65" stroke="white" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="58" y1="32" x2="42" y2="68" stroke="white" strokeWidth="6" strokeLinecap="round"/>
    </svg>
  );
}

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
    <div suppressHydrationWarning className="min-h-screen flex flex-col" style={{ background: "var(--bg-base)" }}>
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[15%] w-[700px] h-[700px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(45,212,191,0.07), transparent)" }} />
        <div className="absolute bottom-[-15%] right-[5%] w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.06), transparent)" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 h-14 flex items-center"
        style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="font-bold text-white text-base tracking-tight">DevFolio</span>
        </div>
        <div className="ml-auto">
          <a href="https://github.com" target="_blank"
            className="text-xs transition-colors"
            style={{ color: "var(--border-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#c8d6e8")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--border-muted)")}>
            Powered by GitHub API
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-6"
            style={{ background: "rgba(45,212,191,0.08)", border: "1px solid rgba(45,212,191,0.2)", color: "#5eead4" }}>
            <Zap className="w-3 h-3" />
            Free · No sign-up · Instant
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
            Your GitHub,{" "}
            <span style={{
              background: "linear-gradient(to right, #2dd4bf, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              beautifully presented
            </span>
          </h1>
          <p className="text-lg mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: "#7a8fa8" }}>
            Enter any GitHub username and get a stunning portfolio page with stats, repos, and languages — shareable in one link.
          </p>

          {/* Search form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium select-none"
                  style={{ color: "#3a4f68" }}>
                  github.com/
                </span>
                <input
                  ref={inputRef}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="username"
                  autoFocus
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-muted)",
                    color: "white",
                    outline: "none",
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = "#2dd4bf";
                    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(45,212,191,0.3)";
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = "var(--border-muted)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  className="w-full rounded-2xl pl-[100px] pr-4 py-4 text-base placeholder:text-[#2a3a50] transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={!username.trim() || loading}
                className="flex items-center gap-2 px-5 py-4 font-semibold rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed whitespace-nowrap"
                style={{
                  background: username.trim() && !loading
                    ? "linear-gradient(135deg, #2dd4bf, #fbbf24)"
                    : "var(--bg-elevated)",
                  color: username.trim() && !loading ? "#05080c" : "#3a4f68",
                  border: "1px solid var(--border-muted)",
                  boxShadow: username.trim() && !loading ? "0 4px 20px rgba(45,212,191,0.25)" : "none",
                }}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                Generate
              </button>
            </div>
          </form>

          {/* Example profiles */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs uppercase tracking-widest" style={{ color: "#2a3a50" }}>
              Try these profiles
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {EXAMPLES.map(name => (
                <button key={name} onClick={() => tryExample(name)}
                  className="px-3 py-1.5 text-sm rounded-xl transition-all duration-150"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "#7a8fa8" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(45,212,191,0.35)";
                    e.currentTarget.style.color = "#2dd4bf";
                    e.currentTarget.style.background = "rgba(45,212,191,0.05)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "#7a8fa8";
                    e.currentTarget.style.background = "var(--bg-elevated)";
                  }}>
                  @{name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full animate-fade-in-up"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          {[
            {
              icon: <Star className="w-4 h-4" />,
              iconColor: "#fbbf24",
              iconBg: "rgba(251,191,36,0.1)",
              iconBorder: "rgba(251,191,36,0.2)",
              title: "Stars & Forks",
              desc: "Total GitHub activity at a glance",
            },
            {
              icon: <GitFork className="w-4 h-4" />,
              iconColor: "#2dd4bf",
              iconBg: "rgba(45,212,191,0.1)",
              iconBorder: "rgba(45,212,191,0.2)",
              title: "Top Repos",
              desc: "Most starred repositories showcased",
            },
            {
              icon: <Users className="w-4 h-4" />,
              iconColor: "#fb7185",
              iconBg: "rgba(251,113,133,0.1)",
              iconBorder: "rgba(251,113,133,0.2)",
              title: "Shareable URL",
              desc: "One link to share your portfolio",
            },
          ].map(f => (
            <div key={f.title} className="glass rounded-2xl p-5 text-left">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                style={{ background: f.iconBg, border: `1px solid ${f.iconBorder}`, color: f.iconColor }}>
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-xs" style={{ color: "#5a7090" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 text-center py-6 text-xs" style={{ color: "#1f2e45" }}>
        Data from the public GitHub API · No login required
      </footer>
    </div>
  );
}
