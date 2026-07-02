"use client";

import { ChevronLeft } from "lucide-react";

export function ScreenHeader({
  title,
  onBack,
}: {
  title?: string;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-neutral-900 px-4 py-4">
      <button
        onClick={onBack}
        aria-label="Retour"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full active:scale-90"
      >
        <ChevronLeft className="h-5 w-5 text-white" strokeWidth={1.5} />
      </button>
      {title && <h2 className="font-serif text-lg text-white">{title}</h2>}
    </div>
  );
}
