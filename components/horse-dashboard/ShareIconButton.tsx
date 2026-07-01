"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

export function ShareIconButton({ label }: { label: string }) {
  const [justShared, setJustShared] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    // MVP: simulates story-visual export before wiring a real capture (canvas/html-to-image).
    setJustShared(true);
    setTimeout(() => setJustShared(false), 1200);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={`Partager ${label} en story`}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition active:scale-90"
    >
      {justShared ? (
        <Check className="h-3.5 w-3.5 text-white" strokeWidth={1.5} />
      ) : (
        <Send className="h-3.5 w-3.5 text-white" strokeWidth={1.5} />
      )}
    </button>
  );
}
