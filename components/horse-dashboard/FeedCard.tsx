import Image from "next/image";
import { FeedCardType, FeedItem } from "@/lib/types";

const TYPE_CONFIG: Record<
  FeedCardType,
  { emoji: string; color: string; bg: string }
> = {
  feeding: { emoji: "🌾", color: "#FFB454", bg: "#3A2E1F" },
  turnout: { emoji: "🐎", color: "#7CFFB2", bg: "#1F3A2B" },
  grooming: { emoji: "✨", color: "#8B8CF9", bg: "#26264A" },
  vet: { emoji: "🩺", color: "#FF7A7A", bg: "#3A1F1F" },
  media: { emoji: "📸", color: "#7CFFB2", bg: "#1F3A2B" },
  bedding: { emoji: "🧹", color: "#8B8CF9", bg: "#26264A" },
};

export function FeedCard({ item }: { item: FeedItem }) {
  const { emoji, color, bg } = TYPE_CONFIG[item.type];

  return (
    <div className="relative flex gap-4 rounded-3xl border border-kavero-border bg-kavero-surface p-4 shadow-premium">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl"
        style={{ backgroundColor: bg }}
      >
        {emoji}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold tracking-tight text-white">
            {item.title}
          </h3>
          <span className="shrink-0 text-xs font-medium text-white/40">
            {item.time}
          </span>
        </div>
        <p className="text-sm leading-snug text-white/55">{item.subtitle}</p>

        {item.mediaUrl && (
          <div className="relative mt-2 h-40 w-full overflow-hidden rounded-2xl">
            <Image
              src={item.mediaUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
            {item.durationLabel && (
              <span className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                {item.durationLabel}
              </span>
            )}
          </div>
        )}

        <span
          className="mt-1 w-fit rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ color, backgroundColor: bg }}
        >
          {item.author}
        </span>
      </div>
    </div>
  );
}
