"use client";

interface Link { label: string; href: string; }

export default function LinksPanel({ links }: { links: Link[] }) {
  return (
    <div className="glass rounded-2xl p-4 animate-fade-in-up space-y-2"
      style={{ animationDelay: "0.35s", animationFillMode: "both" }}>
      <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4a6080" }}>
        Links
      </h2>
      {links.map(l => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all group"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", color: "#7a8fa8" }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(45,212,191,0.05)";
            e.currentTarget.style.color = "#c8d6e8";
            e.currentTarget.style.borderColor = "rgba(45,212,191,0.2)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            e.currentTarget.style.color = "#7a8fa8";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
          }}>
          {l.label}
          <span style={{ color: "#2a3a50" }}>→</span>
        </a>
      ))}
    </div>
  );
}
