"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { AppointmentStatus, CareAppointment, HealthEventType, StableHorse } from "@/lib/types";
import { APPOINTMENT_TYPE_ICON as TYPE_ICON, APPOINTMENT_TYPE_LABEL as TYPE_LABEL } from "@/lib/appointment-shared";

const STATUS_LABEL: Record<AppointmentStatus, string> = {
  pending: "En attente de validation",
  confirmed: "Confirmé par le propriétaire",
  declined: "Refusé par le propriétaire",
};

const STATUS_DOT: Record<AppointmentStatus, string> = {
  pending: "bg-amber-400",
  confirmed: "bg-emerald-400",
  declined: "bg-red-500",
};

const AUTHORIZATION_REQUIRED_TYPES = new Set<HealthEventType>([
  "vet",
  "farrier",
  "dentist",
  "osteopath",
]);

export function ManagerAgendaScreen({
  stableHorses,
  appointments,
  staffName,
  onAdd,
}: {
  stableHorses: StableHorse[];
  appointments: CareAppointment[];
  staffName: string;
  onAdd: (appointment: CareAppointment) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [horseId, setHorseId] = useState(stableHorses[0]?.id ?? "");
  const [type, setType] = useState<HealthEventType>("vet");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function handleSubmit() {
    const horse = stableHorses.find((h) => h.id === horseId);
    if (!horse || !title.trim() || !date || !time) return;
    const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
    onAdd({
      id: `a-${Date.now()}`,
      horseId: horse.id,
      horseName: horse.name,
      type,
      title: title.trim(),
      date: formattedDate,
      time,
      status: "pending",
      requestedBy: staffName,
      careAuthorizationRequired: AUTHORIZATION_REQUIRED_TYPES.has(type),
    });
    setTitle("");
    setDate("");
    setTime("");
    setShowForm(false);
  }

  const sortedAppointments = [
    ...appointments.filter((a) => a.status === "pending"),
    ...appointments.filter((a) => a.status !== "pending"),
  ];

  return (
    <div className="no-scrollbar h-full overflow-y-auto px-4 py-4">
      <div className="flex items-center justify-between pb-4">
        <h2 className="font-serif text-lg text-white">Agenda de l&apos;écurie</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          aria-label="Créer un rendez-vous"
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
          <select
            value={horseId}
            onChange={(e) => setHorseId(e.target.value)}
            className="rounded-lg border border-neutral-800 bg-black px-3 py-2.5 text-sm text-white focus:outline-none"
          >
            {stableHorses.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as HealthEventType)}
            className="rounded-lg border border-neutral-800 bg-black px-3 py-2.5 text-sm text-white focus:outline-none"
          >
            {(Object.keys(TYPE_LABEL) as HealthEventType[]).map((t) => (
              <option key={t} value={t}>
                {TYPE_LABEL[t]}
              </option>
            ))}
          </select>
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
          {AUTHORIZATION_REQUIRED_TYPES.has(type) && (
            <p className="text-[11px] leading-relaxed text-neutral-500">
              Une autorisation de soins sera demandée au propriétaire avant confirmation.
            </p>
          )}
          <button
            onClick={handleSubmit}
            className="rounded-full bg-white py-2.5 text-sm font-medium text-black active:scale-[0.98]"
          >
            Envoyer la demande
          </button>
        </div>
      )}

      {sortedAppointments.length === 0 ? (
        <p className="py-10 text-center text-xs uppercase tracking-widest2 text-neutral-600">
          Aucun rendez-vous programmé
        </p>
      ) : (
        <div className="flex flex-col gap-3 pt-2">
          {sortedAppointments.map((a) => {
            const Icon = TYPE_ICON[a.type];
            return (
              <div
                key={a.id}
                className="flex flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-widest2 text-neutral-500">
                    {a.horseName}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[a.status]}`} />
                    <span className="text-[10px] uppercase tracking-widest2 text-neutral-500">
                      {STATUS_LABEL[a.status]}
                    </span>
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-base leading-snug text-white">{a.title}</h3>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {a.date} · {a.time}
                    </p>
                  </div>
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-neutral-600" strokeWidth={1.5} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
