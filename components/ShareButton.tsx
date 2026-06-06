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
      className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] hover:border-violet-500/40 hover:bg-violet-500/5 text-gray-400 hover:text-white rounded-xl text-sm font-medium transition-all duration-150"
    >
      {copied ? (
        <><Check className="w-3.5 h-3.5 text-green-400" /> Copied!</>
      ) : (
        <><Share2 className="w-3.5 h-3.5" /> Share</>
      )}
    </button>
  );
}
