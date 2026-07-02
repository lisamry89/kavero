"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MapPin, Plus } from "lucide-react";
import { Gait, Horse, WorkoutSession } from "@/lib/types";
import { readFileAsDataUrl } from "@/lib/file";
import { ScreenHeader } from "./ScreenHeader";

const RouteMapView = dynamic(
  () => import("./RouteMapView").then((m) => m.RouteMapView),
  { ssr: false }
);

const GAIT_COLOR: Record<Gait, string> = {
  arret: "#6b7280",
  pas: "#4ade80",
  trot: "#fb923c",
  galop: "#f87171",
};

const GAIT_LABEL: Record<Gait, string> = {
  arret: "Arrêt",
  pas: "Pas",
  trot: "Trot",
  galop: "Galop",
};

const GAIT_ORDER: Gait[] = ["arret", "pas", "trot", "galop"];

function averageSpeedKmh(distance: string, duration: string) {
  const km = parseFloat(distance);
  const minutes = parseFloat(duration);
  if (!minutes) return 0;
  return km / (minutes / 60);
}

export function WorkoutTrackerScreen({
  horse,
  session,
  onBack,
  onAddMemory,
}: {
  horse: Horse;
  session: WorkoutSession;
  onBack: () => void;
  onAddMemory: (url: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalGaitMinutes =
    session.gaits.arret + session.gaits.pas + session.gaits.trot + session.gaits.galop;
  const hasRoute = session.route && session.route.length >= 2;

  async function handleAddMemory(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onAddMemory(await readFileAsDataUrl(file));
    }
    e.target.value = "";
  }

  return (
    <div className="no-scrollbar h-full overflow-y-auto">
      <ScreenHeader onBack={onBack} />

      <div className="flex flex-col items-center gap-1 px-4 pb-6 pt-4 text-center">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border border-neutral-800">
          <Image src={horse.photoUrl} alt={horse.name} fill className="object-cover" />
        </div>
        <p className="mt-2 text-sm text-neutral-400">
          {horse.name} · {horse.breed} · {horse.age} ans
        </p>
        <span className="mt-1 text-[10px] uppercase tracking-widest2 text-neutral-600">
          {session.date} · {session.time}
        </span>
        <h1 className="font-serif text-xl text-white">{session.title}</h1>
      </div>

      <div className="flex flex-col gap-8 px-4 pb-10">
        <div className="flex flex-col gap-3">
          {hasRoute ? (
            <div className="relative h-56 w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
              <RouteMapView route={session.route!} />
              <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-sm font-light text-white drop-shadow">
                {session.duration} | {session.distance}
              </div>
            </div>
          ) : (
            <div className="flex h-56 w-full flex-col items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950">
              <MapPin className="h-6 w-6 text-neutral-700" strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-widest2 text-neutral-600">
                Aucun déplacement enregistré
              </p>
              <p className="text-sm font-light text-white">
                {session.duration} | {session.distance}
              </p>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {GAIT_ORDER.map((key) => (
              <span key={key} className="flex items-center gap-1.5 text-xs text-neutral-400">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: GAIT_COLOR[key] }}
                />
                {GAIT_LABEL[key]}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-neutral-800">
            <div className="border-r border-neutral-800 px-3 py-3 text-center">
              <p className="text-xs uppercase tracking-widest2 text-neutral-500">Durée</p>
              <p className="mt-1 text-sm text-white">{session.duration}</p>
            </div>
            <div className="border-r border-neutral-800 px-3 py-3 text-center">
              <p className="text-xs uppercase tracking-widest2 text-neutral-500">Distance</p>
              <p className="mt-1 text-sm text-white">{session.distance}</p>
            </div>
            <div className="px-3 py-3 text-center">
              <p className="text-xs uppercase tracking-widest2 text-neutral-500">Vitesse moy.</p>
              <p className="mt-1 text-sm text-white">
                {averageSpeedKmh(session.distance, session.duration).toFixed(1)} km/h
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-base text-white">Répartition des allures</h2>
          <div className="flex flex-col gap-3">
            {GAIT_ORDER.filter((key) => session.gaits[key] > 0).map((key) => (
              <div key={key} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">{GAIT_LABEL[key]}</span>
                  <span className="text-neutral-500">{session.gaits[key]} min</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-900">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(session.gaits[key] / totalGaitMinutes) * 100}%`,
                      backgroundColor: GAIT_COLOR[key],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-base text-white">Souvenirs de balade</h2>
          <div className="no-scrollbar flex gap-3 overflow-x-auto">
            {session.memories.map((url, i) => (
              <div
                key={i}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-neutral-800"
              >
                <Image src={url} alt="Souvenir de balade" fill className="object-cover" />
              </div>
            ))}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-neutral-800 text-neutral-500 active:scale-95"
            >
              <Plus className="h-4 w-4" strokeWidth={1.5} />
              <span className="text-[10px]">Ajouter</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAddMemory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
