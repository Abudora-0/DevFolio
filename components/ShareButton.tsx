"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({ username }: { username: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/u/${username}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150"
      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-muted)", color: "#4a6080" }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(45,212,191,0.35)";
        e.currentTarget.style.color = "white";
        e.currentTarget.style.background = "rgba(45,212,191,0.05)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border-muted)";
        e.currentTarget.style.color = "#4a6080";
        e.currentTarget.style.background = "var(--bg-elevated)";
      }}
    >
      {copied ? (
        <><Check className="w-3.5 h-3.5 text-green-400" /> Copied!</>
      ) : (
        <><Share2 className="w-3.5 h-3.5" /> Share</>
      )}
    </button>
  );
}
