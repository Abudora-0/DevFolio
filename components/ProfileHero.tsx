import Image from "next/image";
import { MapPin, Building2, LinkIcon, Calendar, ExternalLink, Users, UserCheck } from "lucide-react";
import { ProcessedProfile, getLangColor } from "@/lib/github";

export default function ProfileHero({ profile }: { profile: ProcessedProfile }) {
  const { user, accountAge, languages } = profile;

  const website = user.blog && user.blog.trim()
    ? user.blog.startsWith("http") ? user.blog : `https://${user.blog}`
    : null;

  // Use top language color for accent glow
  const accentColor = languages[0]?.color ?? "#2dd4bf";

  return (
    <div className="relative glass rounded-3xl overflow-hidden animate-fade-in-up">
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{
        background: `linear-gradient(to right, ${accentColor}cc, ${languages[1]?.color ?? "#3b82f6"}cc)`
      }} />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar with dynamic glow */}
          <div className="relative flex-shrink-0">
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-40 scale-125"
              style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
            />
            <Image
              src={user.avatar_url}
              alt={user.login}
              width={96}
              height={96}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-2 ring-white/10"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {user.name || user.login}
              </h1>
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm mb-3 transition-colors" style={{ color: "#4a6080" }}
              onMouseEnter={(e: any) => (e.currentTarget.style.color = "#2dd4bf")}
              onMouseLeave={(e: any) => (e.currentTarget.style.color = "#4a6080")}
            >
              @{user.login} <ExternalLink className="w-3 h-3" />
            </a>

            {user.bio && (
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 max-w-xl">
                {user.bio}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm mb-4" style={{ color: "#4a6080" }}>
              {user.company && (
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                  {user.company.replace(/^@/, "")}
                </span>
              )}
              {user.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  {user.location}
                </span>
              )}
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-colors truncate max-w-[200px]"
                  style={{ color: "#4a6080" }}
                  onMouseEnter={(e: any) => (e.currentTarget.style.color = "#2dd4bf")}
                  onMouseLeave={(e: any) => (e.currentTarget.style.color = "#4a6080")}>
                  <LinkIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  {user.blog?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              )}
              {user.twitter_username && (
                <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-colors"
                  style={{ color: "#4a6080" }}
                  onMouseEnter={(e: any) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e: any) => (e.currentTarget.style.color = "#4a6080")}>
                  <span className="text-xs font-bold">𝕏</span>
                  @{user.twitter_username}
                </a>
              )}
              {accountAge > 0 && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  {accountAge === 1 ? "1 year" : `${accountAge} years`} on GitHub
                </span>
              )}
            </div>

            {/* Follower pills */}
            <div className="flex gap-2 flex-wrap">
              <a href={`${user.html_url}?tab=followers`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "#4a6080" }}
                onMouseEnter={(e: any) => { e.currentTarget.style.background="rgba(45,212,191,0.06)"; e.currentTarget.style.color="#c8d6e8"; e.currentTarget.style.borderColor="rgba(45,212,191,0.2)"; }}
                onMouseLeave={(e: any) => { e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.color="#4a6080"; e.currentTarget.style.borderColor="var(--border)"; }}>
                <Users className="w-3 h-3" />
                <strong className="text-white">{user.followers.toLocaleString()}</strong> followers
              </a>
              <a href={`${user.html_url}?tab=following`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "#4a6080" }}
                onMouseEnter={(e: any) => { e.currentTarget.style.background="rgba(45,212,191,0.06)"; e.currentTarget.style.color="#c8d6e8"; e.currentTarget.style.borderColor="rgba(45,212,191,0.2)"; }}
                onMouseLeave={(e: any) => { e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.color="#4a6080"; e.currentTarget.style.borderColor="var(--border)"; }}>
                <UserCheck className="w-3 h-3" />
                <strong className="text-white">{user.following.toLocaleString()}</strong> following
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
