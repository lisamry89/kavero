import Image from "next/image";
import { Zap } from "lucide-react";
import { FeedItem } from "@/lib/types";
import { ShareIconButton } from "./ShareIconButton";

const TEXT_SHADOW = { textShadow: "0 1px 6px rgba(0,0,0,0.7)" };

function MediaCard({ item }: { item: FeedItem }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-neutral-800">
      <Image
        src={item.mediaUrl!}
        alt={item.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      <div className="absolute right-3 top-3">
        <ShareIconButton label={item.title} />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-4">
        <span
          className="text-base font-semibold tracking-tight text-white"
          style={TEXT_SHADOW}
        >
          {item.title}
        </span>
        <span
          className="text-xs tracking-wide text-white/80"
          style={TEXT_SHADOW}
        >
          {item.time} · {item.author}
        </span>
      </div>
    </div>
  );
}

function FlashCard({ item }: { item: FeedItem }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800">
        <Zap className="h-4 w-4 text-white" strokeWidth={1.5} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-medium tracking-tight text-white">
          {item.title}
        </span>
        <span className="text-[11px] tracking-wide text-neutral-500">
          {item.time} · {item.author}
        </span>
      </div>
    </div>
  );
}

export function FeedTab({ items }: { items: FeedItem[] }) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-xs uppercase tracking-widest2 text-neutral-600">
        Aucun moment partagé aujourd&apos;hui
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) =>
        item.mediaUrl ? (
          <MediaCard key={item.id} item={item} />
        ) : (
          <FlashCard key={item.id} item={item} />
        )
      )}
    </div>
  );
}
