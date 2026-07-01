import { FeedItem } from "@/lib/types";
import { FeedCard } from "./FeedCard";

export function DailyFeed({ items }: { items: FeedItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-bold tracking-tight text-white">
          Aujourd&apos;hui
        </h2>
        <span className="text-xs font-medium text-white/40">
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
