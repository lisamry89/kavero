import Image from "next/image";
import { Brush, Camera, Sparkles, Stethoscope, Trees, Wheat, type LucideIcon } from "lucide-react";
import { FeedCardType, FeedItem } from "@/lib/types";

const TYPE_ICON: Record<FeedCardType, LucideIcon> = {
  feeding: Wheat,
  turnout: Trees,
  grooming: Sparkles,
  vet: Stethoscope,
  media: Camera,
  bedding: Brush,
};

export function FeedCard({ item }: { item: FeedItem }) {
  const Icon = TYPE_ICON[item.type];

  return (
    <div className="flex gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-800">
        <Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium tracking-tight text-white">
            {item.title}
          </h3>
          <span className="shrink-0 text-[11px] tracking-wide text-neutral-500">
            {item.time}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-neutral-400">
          {item.subtitle}
        </p>

        {item.mediaUrl && (
          <div className="relative mt-2 h-40 w-full overflow-hidden rounded-lg">
            <Image
              src={item.mediaUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
            {item.durationLabel && (
              <span className="absolute bottom-2 right-2 rounded border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-widest2 text-white/80">
                {item.durationLabel}
              </span>
            )}
          </div>
        )}

        <span className="mt-1.5 text-[11px] tracking-wide text-neutral-500">
          {item.author}
        </span>
      </div>
    </div>
  );
}
