"use client";

import { useState } from "react";
import { Hammer, Plus, Stethoscope, X, type LucideIcon } from "lucide-react";
import { HealthEvent, HealthEventType } from "@/lib/types";

const TYPE_ICON: Record<HealthEventType, LucideIcon> = {
  vet: Stethoscope,
  farrier: Hammer,
};

const TYPE_LABEL: Record<HealthEventType, string> = {
  vet: "Vétérinaire",
  farrier: "Maréchal-ferrant",
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

export function CalendarScreen({
  events,
  onAdd,
}: {
  events: HealthEvent[];
  onAdd: (event: HealthEvent) => void;
}) {
  const [dateStrip] = useState(buildDateStrip);
  const [selected, setSelected] = useState(dateStrip[0].iso);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<HealthEventType>("vet");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function handleSubmit() {
    if (!title.trim() || !date || !time) return;
    const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
    onAdd({
      id: `h-${Date.now()}`,
      type,
      title: title.trim(),
      date: formattedDate,
      time,
    });
    setTitle("");
    setDate("");
    setTime("");
    setShowForm(false);
  }

  return (
    <div className="flex h-[calc(100vh-4.5rem)] flex-col overflow-y-auto px-4 py-4">
      <div className="flex items-center justify-between pb-4">
        <h2 className="font-serif text-lg text-white">Santé &amp; Calendrier</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          aria-label="Ajouter un rendez-vous"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 active:scale-90"
        >
          {showForm ? (
            <X className="h-4 w-4 text-white" strokeWidth={1.5} />
          ) : (
            <Plus className="h-4 w-4 text-white" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {showForm && (
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="flex gap-2">
            {(Object.keys(TYPE_LABEL) as HealthEventType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 rounded-lg border px-3 py-2 text-xs uppercase tracking-wide ${
                  type === t
                    ? "border-white text-white"
                    : "border-neutral-800 text-neutral-500"
                }`}
              >
                {TYPE_LABEL[t]}
              </button>
            ))}
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Motif du rendez-vous"
            className="rounded-lg border border-neutral-800 bg-black px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="flex-1 rounded-lg border border-neutral-800 bg-black px-3 py-2.5 text-sm text-white focus:outline-none [color-scheme:dark]"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="flex-1 rounded-lg border border-neutral-800 bg-black px-3 py-2.5 text-sm text-white focus:outline-none [color-scheme:dark]"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="rounded-full bg-white py-2.5 text-sm font-medium text-black active:scale-[0.98]"
          >
            Ajouter le rendez-vous
          </button>
        </div>
      )}

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
        <div className="flex flex-col pt-6">
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
