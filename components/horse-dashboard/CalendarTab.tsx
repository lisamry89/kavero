import { Hammer, Stethoscope, type LucideIcon } from "lucide-react";
import { HealthEvent, HealthEventType } from "@/lib/types";

const TYPE_ICON: Record<HealthEventType, LucideIcon> = {
  vet: Stethoscope,
  farrier: Hammer,
};

const TYPE_LABEL: Record<HealthEventType, string> = {
  vet: "Vétérinaire",
  farrier: "Maréchal-ferrant",
};

export function CalendarTab({ events }: { events: HealthEvent[] }) {
  if (events.length === 0) {
    return (
      <p className="py-10 text-center text-xs uppercase tracking-widest2 text-neutral-600">
        Aucun rendez-vous à venir
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {events.map((event) => {
        const Icon = TYPE_ICON[event.type];
        return (
          <div
            key={event.id}
            className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-800">
              <Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-[10px] uppercase tracking-widest2 text-neutral-500">
                {TYPE_LABEL[event.type]}
              </span>
              <span className="text-sm font-medium tracking-tight text-white">
                {event.title}
              </span>
            </div>
            <div className="flex shrink-0 flex-col items-end">
              <span className="text-xs font-medium text-white">{event.date}</span>
              <span className="text-[11px] tracking-wide text-neutral-500">
                {event.time}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
