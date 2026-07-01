import { FeedItem } from "@/lib/types";
import { FeedCard } from "./FeedCard";

export function DailyFeed({ items }: { items: FeedItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-medium uppercase tracking-widest2 text-white/70">
          Aujourd&apos;hui
        </h2>
        <span className="text-xs uppercase tracking-widest2 text-neutral-500">
          {items.length} activités
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
