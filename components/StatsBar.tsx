import { Star, GitFork, BookOpen, Code2 } from "lucide-react";
import { ProcessedProfile } from "@/lib/github";

function fmt(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000)    return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

interface StatProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: number;
}

function Stat({ icon, iconBg, label, value }: StatProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-3 py-5 flex-1">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
      <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">{fmt(value)}</span>
      <span className="text-xs text-gray-500 font-medium text-center">{label}</span>
    </div>
  );
}

export default function StatsBar({ profile }: { profile: ProcessedProfile }) {
  const { totalRepos, totalStars, totalForks, languages } = profile;
  return (
    <div className="glass rounded-2xl animate-fade-in-up overflow-hidden"
      style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
      <div className="flex flex-wrap divide-x divide-[#21262d]">
        <Stat
          icon={<BookOpen className="w-4 h-4 text-blue-400" />}
          iconBg="bg-blue-500/10"
          label="Repositories"
          value={totalRepos}
        />
        <Stat
          icon={<Star className="w-4 h-4 text-yellow-400" />}
          iconBg="bg-yellow-500/10"
          label="Total Stars"
          value={totalStars}
        />
        <Stat
          icon={<GitFork className="w-4 h-4 text-green-400" />}
          iconBg="bg-green-500/10"
          label="Total Forks"
          value={totalForks}
        />
        <Stat
          icon={<Code2 className="w-4 h-4 text-violet-400" />}
          iconBg="bg-violet-500/10"
          label="Languages"
          value={languages.length}
        />
      </div>
    </div>
  );
}
