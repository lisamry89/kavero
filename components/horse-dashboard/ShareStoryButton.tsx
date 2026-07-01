"use client";

import { useState } from "react";
import { Share2, Loader2 } from "lucide-react";
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
      className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-700 bg-black px-6 py-4 text-xs font-medium uppercase tracking-widest2 text-white transition active:scale-[0.98] disabled:opacity-60"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
          Génération
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" strokeWidth={1.5} />
          Partager en story
        </>
      )}
    </button>
  );
}
