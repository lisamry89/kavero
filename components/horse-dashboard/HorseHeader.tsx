"use client";

import { Horse } from "@/lib/types";

export function HorseHeader({
  horse,
  onOpenProfile,
}: {
  horse: Horse;
  onOpenProfile: () => void;
}) {
  return (
    <button
      onClick={onOpenProfile}
      className="flex w-full flex-col items-center gap-1 text-center active:opacity-70"
    >
      <h1 className="font-serif text-4xl font-medium tracking-tight text-white">
        {horse.name}
      </h1>
      <p className="text-sm text-neutral-400">
        {horse.breed}, {horse.age} ans
      </p>
    </button>
  );
}
