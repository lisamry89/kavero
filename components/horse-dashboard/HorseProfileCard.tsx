import Image from "next/image";
import { Horse, HorseStatus } from "@/lib/types";
import { StatusGauge } from "./StatusGauge";

const STATUS_PROGRESS: Record<HorseStatus, number> = {
  great: 92,
  good: 68,
  attention: 35,
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white/80 backdrop-blur-sm">
      {children}
    </span>
  );
}

export function HorseProfileCard({ horse }: { horse: Horse }) {
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-neutral-800 bg-black">
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

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            {horse.name}
          </h1>
          <p className="text-xs uppercase tracking-widest2 text-white/40">
            {horse.breed} · {horse.age} ans
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Pill>{horse.statusLabel}</Pill>
          <Pill>{horse.owner}</Pill>
          <Pill>6 sorties · 7j</Pill>
          <Pill>14 soins · 7j</Pill>
        </div>
      </div>
    </div>
  );
}
