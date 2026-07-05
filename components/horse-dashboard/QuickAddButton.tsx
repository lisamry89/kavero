"use client";

import { useState } from "react";
import { Activity, Plus, Tag } from "lucide-react";

export function QuickAddButton({
  onSelectWorkout,
  onSelectListing,
}: {
  onSelectWorkout: () => void;
  onSelectListing: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Ajouter"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 active:scale-90"
      >
        <Plus className="h-4 w-4 text-white" strokeWidth={1.5} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-50 mt-2 w-60 rounded-2xl border border-neutral-800 bg-neutral-900 p-2 shadow-xl">
            <button
              onClick={() => {
                setOpen(false);
                onSelectWorkout();
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left active:bg-neutral-800"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800">
                <Activity className="h-4 w-4 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-sm text-white">Activité GPS</span>
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onSelectListing();
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left active:bg-neutral-800"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800">
                <Tag className="h-4 w-4 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-sm text-white">Ajouter une annonce</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
