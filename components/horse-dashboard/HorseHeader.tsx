import { Horse } from "@/lib/types";

export function HorseHeader({ horse }: { horse: Horse }) {
  return (
    <div>
      <h1 className="text-2xl font-medium tracking-tight text-white">
        {horse.name}
      </h1>
      <p className="mt-1 text-[11px] uppercase tracking-widest2 text-neutral-500">
        {horse.breed} · {horse.age} ans
      </p>
    </div>
  );
}
