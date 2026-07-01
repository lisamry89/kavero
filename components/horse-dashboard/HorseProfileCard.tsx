import Image from "next/image";
import { Horse } from "@/lib/types";
import { StatusGauge } from "./StatusGauge";

export function HorseProfileCard({ horse }: { horse: Horse }) {
  return (
    <div className="relative overflow-hidden rounded-4xl border border-kavero-border bg-kavero-surface shadow-premium">
      <div className="relative h-64 w-full">
        <Image
          src={horse.photoUrl}
          alt={horse.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-kavero-surface via-kavero-surface/10 to-transparent" />
        <div className="absolute left-6 top-6 rounded-full bg-black/40 px-3 py-1 backdrop-blur-md">
          <span className="text-xs font-medium tracking-wide text-white/80">
            {horse.stable}
          </span>
        </div>
      </div>

      <div className="relative -mt-10 flex flex-col items-center gap-6 px-6 pb-8">
        <StatusGauge status={horse.status} label={horse.statusLabel} />

        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {horse.name}
          </h1>
          <p className="text-sm text-white/50">
            {horse.breed} · {horse.age} ans
          </p>
        </div>

        <div className="flex w-full items-center justify-center gap-8 border-t border-kavero-border pt-5">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider text-white/40">
              Propriétaire
            </span>
            <span className="mt-1 text-sm font-semibold text-white">
              {horse.owner}
            </span>
          </div>
          <div className="h-8 w-px bg-kavero-border" />
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider text-white/40">
              Sorties (7j)
            </span>
            <span className="mt-1 text-sm font-semibold text-white">6</span>
          </div>
          <div className="h-8 w-px bg-kavero-border" />
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider text-white/40">
              Soins (7j)
            </span>
            <span className="mt-1 text-sm font-semibold text-white">14</span>
          </div>
        </div>
      </div>
    </div>
  );
}
