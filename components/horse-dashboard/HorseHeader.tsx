import { Horse } from "@/lib/types";

export function HorseHeader({ horse }: { horse: Horse }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <h1 className="font-serif text-4xl font-medium tracking-tight text-white">
        {horse.name}
      </h1>
      <p className="text-sm text-neutral-400">
        {horse.breed}, {horse.age} ans
      </p>
    </div>
  );
}
