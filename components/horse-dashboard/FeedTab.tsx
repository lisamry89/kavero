import Image from "next/image";
import { Video, Zap, type LucideIcon } from "lucide-react";
import { FeedItem, FeedKind } from "@/lib/types";

const KIND_ICON: Record<FeedKind, LucideIcon | null> = {
  photo: null,
  video: Video,
  flash: Zap,
};

function FeedHighlightCard({ item }: { item: FeedItem }) {
  const Icon = KIND_ICON[item.kind];

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
      {item.mediaUrl && (
        <div className="relative h-56 w-full">
          <Image src={item.mediaUrl} alt={item.title} fill className="object-cover" />
        </div>
      )}
      <div className="flex items-center gap-3 p-4">
        {Icon && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800">
            <Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-sm font-medium tracking-tight text-white">
            {item.title}
          </span>
          <span className="text-[11px] tracking-wide text-neutral-500">
            {item.time} · {item.author}
          </span>
        </div>
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
      {items.map((item) => (
        <FeedHighlightCard key={item.id} item={item} />
      ))}
    </div>
  );
}
