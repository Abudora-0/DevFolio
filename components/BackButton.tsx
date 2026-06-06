"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
      DevFolio
    </button>
  );
}
