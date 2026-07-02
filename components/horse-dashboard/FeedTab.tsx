import Image from "next/image";
import { ChevronRight, Clock } from "lucide-react";
import { FeedItem, WorkoutStats } from "@/lib/types";

function RouteMap() {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-xl bg-neutral-950">
      <svg viewBox="0 0 400 200" className="h-full w-full" preserveAspectRatio="none">
        <path
          d="M40 160 C 70 100, 60 60, 110 55 S 160 90, 150 40 S 210 10, 240 45
             S 220 110, 270 120 S 340 100, 360 150"
          fill="none"
          stroke="#525252"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M40 160 C 70 100, 60 60, 110 55 S 160 90, 150 40 S 210 10, 240 45
             S 220 110, 270 120 S 340 100, 360 150"
          fill="none"
          stroke="#e5e5e5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="40" cy="160" r="5" fill="#e5e5e5" />
        <circle cx="360" cy="150" r="5" fill="none" stroke="#e5e5e5" strokeWidth="2" />
      </svg>
    </div>
  );
}

function WorkoutStatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-1">
      <span className="text-sm font-light text-white">{value}</span>
      <span className="text-[9px] uppercase tracking-widest2 text-neutral-600">{label}</span>
    </div>
  );
}

function WorkoutCard({
  item,
  onOpen,
}: {
  item: FeedItem & { stats: WorkoutStats };
  onOpen?: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      disabled={!onOpen}
      className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-left"
    >
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-medium tracking-tight text-white">{item.title}</h3>
        <span className="text-[11px] tracking-wide text-neutral-500">
          {item.author} • {item.time}
        </span>
      </div>

      <RouteMap />

      <div className="grid grid-cols-3 divide-x divide-neutral-800 border-t border-neutral-800 pt-3">
        <WorkoutStatCell label="Durée" value={item.stats.duration} />
        <WorkoutStatCell label="Distance" value={item.stats.distance} />
        <WorkoutStatCell label="Allure" value={item.stats.topSpeed} />
      </div>
    </button>
  );
}

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

export function FeedTab({
  items,
  onOpenWorkout,
  onOpenHistory,
}: {
  items: FeedItem[];
  onOpenWorkout: (workoutId: string) => void;
  onOpenHistory: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={onOpenHistory}
        className="flex items-center justify-between rounded-xl border border-neutral-900 px-4 py-3"
      >
        <span className="text-xs uppercase tracking-widest2 text-neutral-400">
          Historique des activités
        </span>
        <ChevronRight className="h-4 w-4 text-neutral-600" strokeWidth={1.5} />
      </button>

      {items.length === 0 ? (
        <p className="py-10 text-center text-xs uppercase tracking-widest2 text-neutral-600">
          Aucun moment partagé aujourd&apos;hui
        </p>
      ) : (
        items.map((item) => {
          if (item.kind === "workout" && item.stats) {
            return (
              <WorkoutCard
                key={item.id}
                item={item as FeedItem & { stats: WorkoutStats }}
                onOpen={item.workoutId ? () => onOpenWorkout(item.workoutId!) : undefined}
              />
            );
          }
          if (item.mediaUrl) {
            return <MediaCard key={item.id} item={item} />;
          }
          return <FlashRow key={item.id} item={item} />;
        })
      )}
    </div>
  );
}
