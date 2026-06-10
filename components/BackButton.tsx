"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="flex items-center gap-2 text-sm transition-colors group"
      style={{ color: "#4a6080" }}
      onMouseEnter={e => (e.currentTarget.style.color = "#c8d6e8")}
      onMouseLeave={e => (e.currentTarget.style.color = "#4a6080")}
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
      DevFolio
    </button>
  );
}
