import Image from "next/image";
import { Clock } from "lucide-react";
import { FeedItem } from "@/lib/types";

function MediaCard({ item }: { item: FeedItem }) {
  return (
    <div className="relative h-[65vh] w-full overflow-hidden rounded-[2rem] border border-white/10">
      <Image
        src={item.mediaUrl!}
        alt={item.title}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-x-0 bottom-5 flex justify-center px-5">
        <div className="flex items-center gap-3 rounded-full border border-white/15 bg-black/30 py-2.5 pl-4 pr-3 backdrop-blur-lg">
          <p className="text-sm font-light text-white">
            {item.title} par {item.author} • {item.time}
          </p>
          <Clock className="h-3.5 w-3.5 shrink-0 text-white/70" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

function FlashRow({ item }: { item: FeedItem }) {
  return (
    <div className="flex items-center gap-3 border-t border-neutral-900 py-3">
      <span className="h-1 w-1 shrink-0 rounded-full bg-neutral-500" />
      <p className="flex-1 text-[13px] font-light text-neutral-400">
        {item.title} <span className="text-neutral-600">· {item.time}</span>
      </p>
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
    <div className="flex flex-col gap-4">
      {items.map((item) =>
        item.mediaUrl ? (
          <MediaCard key={item.id} item={item} />
        ) : (
          <FlashRow key={item.id} item={item} />
        )
      )}
    </div>
  );
}
