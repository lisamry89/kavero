"use client";

import { useState } from "react";
import { Hammer, Stethoscope, type LucideIcon } from "lucide-react";
import { HealthEvent, HealthEventType } from "@/lib/types";

const TYPE_ICON: Record<HealthEventType, LucideIcon> = {
  vet: Stethoscope,
  farrier: Hammer,
};

function buildDateStrip() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      iso: date.toISOString().slice(0, 10),
      day: date.toLocaleDateString("fr-FR", { day: "numeric" }),
      month: date.toLocaleDateString("fr-FR", { month: "short" }).replace(".", ""),
    });
  }
  return days;
}

export function CalendarTab({ events }: { events: HealthEvent[] }) {
  const [dateStrip] = useState(buildDateStrip);
  const [selected, setSelected] = useState(dateStrip[0].iso);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between border-b border-neutral-900 pb-4">
        {dateStrip.map((d) => {
          const isActive = d.iso === selected;
          return (
            <button
              key={d.iso}
              onClick={() => setSelected(d.iso)}
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className={`text-sm ${isActive ? "font-medium text-white" : "text-neutral-500"}`}
              >
                {d.day}
              </span>
              <span
                className={`text-[10px] uppercase tracking-wide ${isActive ? "text-neutral-400" : "text-neutral-700"}`}
              >
                {d.month}
              </span>
              <span className={`h-0.5 w-4 rounded-full ${isActive ? "bg-white" : "bg-transparent"}`} />
            </button>
          );
        })}
      </div>

      {events.length === 0 ? (
        <p className="py-10 text-center text-xs uppercase tracking-widest2 text-neutral-600">
          Aucun rendez-vous à venir
        </p>
      ) : (
        <div className="flex flex-col">
          {events.map((event, i) => {
            const Icon = TYPE_ICON[event.type];
            const isLast = i === events.length - 1;
            return (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                  {!isLast && <span className="w-px flex-1 bg-neutral-900" />}
                </div>
                <div className={`flex-1 ${isLast ? "" : "pb-8"}`}>
                  <p className="text-[11px] uppercase tracking-widest2 text-neutral-500">
                    {event.date} · {event.time}
                  </p>
                  <div className="mt-1 flex items-start justify-between gap-3">
                    <h3 className="font-serif text-lg leading-snug text-white">
                      {event.title}
                    </h3>
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-neutral-600" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
