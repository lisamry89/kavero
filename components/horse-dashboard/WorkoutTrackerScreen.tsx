"use client";

import { useRef } from "react";
import Image from "next/image";
import { MapPin, Plus } from "lucide-react";
import { Horse, RoutePoint, WorkoutSession } from "@/lib/types";
import { pathFromProjected, projectRoute } from "@/lib/geo";
import { ScreenHeader } from "./ScreenHeader";

const GAIT_COLOR = {
  pas: "#4ade80",
  trot: "#fb923c",
  galop: "#f87171",
} as const;

const GAIT_LABEL = {
  pas: "Pas",
  trot: "Trot",
  galop: "Galop",
} as const;

const FALLBACK_SEGMENTS = [
  { color: GAIT_COLOR.pas, d: "M40 170 C 70 150, 90 120, 80 95 S 130 60, 150 90" },
  { color: GAIT_COLOR.trot, d: "M150 90 S 190 130, 220 100 S 250 40, 280 60" },
  { color: GAIT_COLOR.galop, d: "M280 60 S 300 100, 330 90 S 350 130, 360 165" },
];

function buildRouteSegments(route: RoutePoint[] | undefined) {
  if (!route || route.length < 2) return null;

  const projected = projectRoute(route, 400, 220);
  const n = projected.length;
  const i1 = Math.max(1, Math.floor(n / 3));
  const i2 = Math.max(i1 + 1, Math.floor((2 * n) / 3));

  return [
    { color: GAIT_COLOR.pas, d: pathFromProjected(projected.slice(0, i1 + 1)) },
    { color: GAIT_COLOR.trot, d: pathFromProjected(projected.slice(i1, i2 + 1)) },
    { color: GAIT_COLOR.galop, d: pathFromProjected(projected.slice(i2)) },
  ];
}

function GaitRouteMap({
  distance,
  duration,
  route,
}: {
  distance: string;
  duration: string;
  route?: RoutePoint[];
}) {
  const segments = buildRouteSegments(route) ?? FALLBACK_SEGMENTS;

  return (
    <div className="relative h-48 w-full overflow-hidden rounded-xl bg-neutral-950">
      <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="none">
        {segments.map((seg, i) => (
          <path
            key={i}
            d={seg.d}
            fill="none"
            stroke={seg.color}
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <MapPin
        className="absolute h-5 w-5 -translate-x-1/2 -translate-y-full text-white drop-shadow"
        style={{ left: "10%", top: "77%" }}
        fill="white"
        strokeWidth={1.5}
      />
      <MapPin
        className="absolute h-5 w-5 -translate-x-1/2 -translate-y-full text-white drop-shadow"
        style={{ left: "90%", top: "75%" }}
        strokeWidth={1.5}
      />
      <div className="absolute inset-x-0 bottom-3 text-center text-sm font-light text-white">
        {duration} | {distance}
      </div>
    </div>
  );
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
  const totalGaitMinutes = session.gaits.pas + session.gaits.trot + session.gaits.galop;

  function handleAddMemory(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onAddMemory(URL.createObjectURL(file));
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
          <GaitRouteMap
            distance={session.distance}
            duration={session.duration}
            route={session.route}
          />
          <div className="flex items-center justify-center gap-4">
            {(Object.keys(GAIT_LABEL) as (keyof typeof GAIT_LABEL)[]).map((key) => (
              <span key={key} className="flex items-center gap-1.5 text-xs text-neutral-400">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: GAIT_COLOR[key] }}
                />
                {GAIT_LABEL[key]}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-neutral-800">
            <div className="border-r border-neutral-800 px-4 py-3 text-center">
              <p className="text-xs uppercase tracking-widest2 text-neutral-500">Durée</p>
              <p className="mt-1 text-sm text-white">{session.duration}</p>
            </div>
            <div className="px-4 py-3 text-center">
              <p className="text-xs uppercase tracking-widest2 text-neutral-500">Distance</p>
              <p className="mt-1 text-sm text-white">{session.distance}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-base text-white">Répartition des allures</h2>
          <div className="flex flex-col gap-3">
            {(Object.keys(GAIT_LABEL) as (keyof typeof GAIT_LABEL)[]).map((key) => (
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
