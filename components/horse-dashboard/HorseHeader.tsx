"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Horse } from "@/lib/types";

export function HorseHeader({
  horse,
  hasUnseenStory,
  onOpenProfile,
  onOpenStory,
}: {
  horse: Horse;
  hasUnseenStory: boolean;
  onOpenProfile: () => void;
  onOpenStory: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <button
        onClick={hasUnseenStory ? onOpenStory : onOpenProfile}
        aria-label={hasUnseenStory ? "Voir la story" : "Voir la fiche d'identité"}
        className={`rounded-full p-[2px] active:opacity-70 ${
          hasUnseenStory
            ? "bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600"
            : "bg-neutral-800"
        }`}
      >
        <div className="rounded-full bg-black p-[2px]">
          <div className="relative h-14 w-14 overflow-hidden rounded-full">
            <Image src={horse.photoUrl} alt={horse.name} fill className="object-cover" />
          </div>
        </div>
      </button>

      <button onClick={onOpenProfile} className="flex flex-col items-center active:opacity-70">
        <div className="flex items-center gap-1">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-white">
            {horse.name}
          </h1>
          <ChevronRight className="h-4 w-4 text-neutral-600" strokeWidth={1.5} />
        </div>
        <p className="text-sm text-neutral-400">
          {horse.breed}, {horse.age} ans
        </p>
      </button>
    </div>
  );
}
