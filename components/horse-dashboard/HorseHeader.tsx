"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
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
      className="flex w-full flex-col items-center gap-2 text-center active:opacity-70"
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-full border border-neutral-800">
        <Image src={horse.photoUrl} alt={horse.name} fill className="object-cover" />
      </div>
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
  );
}
