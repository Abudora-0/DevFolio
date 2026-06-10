interface LangEntry {
  name: string;
  count: number;
  percent: number;
  color: string;
}

export default function LanguageChart({ languages }: { languages: LangEntry[] }) {
  if (!languages.length) return null;

  return (
    <div className="glass rounded-2xl p-5 animate-fade-in-up"
      style={{ animationDelay: "0.25s", animationFillMode: "both" }}>
      <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#4a6080" }}>
        Languages
      </h2>

      {/* Segmented bar */}
      <div className="flex rounded-full overflow-hidden h-2 mb-5 gap-[2px]">
        {languages.map(lang => (
          <div
            key={lang.name}
            style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
            title={`${lang.name}: ${lang.percent}%`}
            className="transition-all"
          />
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {languages.map(lang => (
          <div key={lang.name} className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: lang.color }} />
            <span className="text-sm flex-1 min-w-0 truncate" style={{ color: "#8fa8c4" }}>{lang.name}</span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
                />
              </div>
              <span className="text-xs tabular-nums w-8 text-right" style={{ color: "#2a3a50" }}>
                {lang.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
