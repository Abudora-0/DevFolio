import Image from "next/image";
import { MapPin, Building2, LinkIcon, Calendar, ExternalLink, Users, UserCheck } from "lucide-react";
import { ProcessedProfile, getLangColor } from "@/lib/github";

export default function ProfileHero({ profile }: { profile: ProcessedProfile }) {
  const { user, accountAge, languages } = profile;

  const website = user.blog && user.blog.trim()
    ? user.blog.startsWith("http") ? user.blog : `https://${user.blog}`
    : null;

  // Use top language color for accent glow
  const accentColor = languages[0]?.color ?? "#8b5cf6";

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
              className="inline-flex items-center gap-1 text-gray-500 hover:text-violet-400 transition-colors text-sm mb-3"
            >
              @{user.login} <ExternalLink className="w-3 h-3" />
            </a>

            {user.bio && (
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 max-w-xl">
                {user.bio}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500 mb-4">
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
                  className="flex items-center gap-1.5 hover:text-violet-400 transition-colors truncate max-w-[200px]">
                  <LinkIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  {user.blog?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              )}
              {user.twitter_username && (
                <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
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
                className="flex items-center gap-1.5 text-xs px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                <Users className="w-3 h-3" />
                <strong className="text-white">{user.followers.toLocaleString()}</strong> followers
              </a>
              <a href={`${user.html_url}?tab=following`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
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
