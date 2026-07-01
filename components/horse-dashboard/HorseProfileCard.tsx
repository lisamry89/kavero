import Image from "next/image";
import { Horse, HorseStatus } from "@/lib/types";
import { StatusGauge } from "./StatusGauge";

const STATUS_PROGRESS: Record<HorseStatus, number> = {
  great: 92,
  good: 68,
  attention: 35,
};

export function HorseProfileCard({ horse }: { horse: Horse }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-black">
      <div className="relative h-48 w-full">
        <Image
          src={horse.photoUrl}
          alt={horse.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/40" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="text-[10px] font-medium uppercase tracking-widest2 text-white/60">
            {horse.stable}
          </span>
          <StatusGauge progress={STATUS_PROGRESS[horse.status]} size={40} />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
          <span className="text-[10px] font-medium uppercase tracking-widest2 text-white/50">
            {horse.statusLabel}
          </span>
          <h1 className="text-2xl font-medium tracking-tight text-white">
            {horse.name}
          </h1>
          <p className="text-xs uppercase tracking-widest2 text-white/40">
            {horse.breed} · {horse.age} ans
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-neutral-800 border-t border-neutral-800">
        <div className="flex flex-col items-center gap-1 py-3">
          <span className="text-[10px] uppercase tracking-widest2 text-white/40">
            Propriétaire
          </span>
          <span className="text-sm font-medium text-white">{horse.owner}</span>
        </div>
        <div className="flex flex-col items-center gap-1 py-3">
          <span className="text-[10px] uppercase tracking-widest2 text-white/40">
            Sorties · 7j
          </span>
          <span className="text-sm font-medium text-white">6</span>
        </div>
        <div className="flex flex-col items-center gap-1 py-3">
          <span className="text-[10px] uppercase tracking-widest2 text-white/40">
            Soins · 7j
          </span>
          <span className="text-sm font-medium text-white">14</span>
        </div>
      </div>
    </div>
  );
}
