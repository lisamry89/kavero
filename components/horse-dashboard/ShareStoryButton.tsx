"use client";

import { useState } from "react";
import { Horse } from "@/lib/types";

export function ShareStoryButton({ horse }: { horse: Horse }) {
  const [isGenerating, setIsGenerating] = useState(false);

  function handleShare() {
    setIsGenerating(true);
    // MVP: simulates story-visual generation before wiring a real export (canvas/html-to-image).
    setTimeout(() => setIsGenerating(false), 1200);
  }

  return (
    <button
      onClick={handleShare}
      disabled={isGenerating}
      className="group flex w-full items-center justify-center gap-2 rounded-full bg-kavero-accent px-6 py-4 text-sm font-bold tracking-tight text-black shadow-glow transition active:scale-[0.98] disabled:opacity-70"
    >
      {isGenerating ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
          Génération du visuel...
        </>
      ) : (
        <>
          <ShareIcon />
          Partager en story — {horse.name}
        </>
      )}
    </button>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 transition group-active:scale-90"
    >
      <path
        d="M12 3v13m0-13 4 4m-4-4-4 4M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
