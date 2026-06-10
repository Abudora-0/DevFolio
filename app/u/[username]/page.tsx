import { notFound } from "next/navigation";
import { fetchProfile } from "@/lib/github";
import ProfileHero from "@/components/ProfileHero";
import StatsBar from "@/components/StatsBar";
import RepoGrid from "@/components/RepoGrid";
import LanguageChart from "@/components/LanguageChart";
import RecentActivity from "@/components/RecentActivity";
import BackButton from "@/components/BackButton";
import ShareButton from "@/components/ShareButton";
import LinksPanel from "@/components/LinksPanel";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  try {
    const profile = await fetchProfile(username);
    const name = profile.user.name || profile.user.login;
    return {
      title: `${name} (@${profile.user.login}) — DevFolio`,
      description: profile.user.bio || `GitHub portfolio for ${username}`,
    };
  } catch {
    return { title: `${username} — DevFolio` };
  }
}

export default async function UserPage({ params }: Props) {
  const { username } = await params;

  let profile;
  try {
    profile = await fetchProfile(username);
  } catch (err: any) {
    if (err.message === "User not found") notFound();
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--bg-base)" }}>
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl"
            style={{ background: "rgba(251,113,133,0.1)", border: "1px solid rgba(251,113,133,0.2)" }}>
            ⚠️
          </div>
          <h2 className="text-white font-bold text-lg mb-2">Couldn't load profile</h2>
          <p className="text-sm mb-6" style={{ color: "#7a8fa8" }}>{err.message}</p>
          <a href="/"
            className="px-4 py-2 rounded-xl text-sm transition-colors"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "#c8d6e8" }}>
            ← Go back
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Ambient glow */}
      <div className="fixed top-0 left-0 right-0 h-[500px] pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[25%] w-[700px] h-[700px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(45,212,191,0.055), transparent)" }} />
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.04), transparent)" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5 pb-16">
        {/* Nav */}
        <div className="flex items-center justify-between">
          <BackButton />
          <ShareButton username={profile.user.login} />
        </div>

        {/* Hero */}
        <ProfileHero profile={profile} />

        {/* Stats */}
        <StatsBar profile={profile} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left: repos */}
          <div className="lg:col-span-2 space-y-5">
            <RepoGrid repos={profile.topRepos} />
            {profile.recentRepos.length > 0 && (
              <RecentActivity repos={profile.recentRepos} />
            )}
          </div>

          {/* Right: language + links */}
          <div className="space-y-5">
            <LanguageChart languages={profile.languages} />

            <LinksPanel links={[
              { label: "GitHub Profile",   href: profile.user.html_url },
              { label: "Repositories",     href: `${profile.user.html_url}?tab=repositories` },
              { label: "Stars",            href: `${profile.user.html_url}?tab=stars` },
            ]} />
          </div>
        </div>
      </div>
    </div>
  );
}
