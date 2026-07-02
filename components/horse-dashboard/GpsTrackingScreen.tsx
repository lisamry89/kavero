"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Square } from "lucide-react";
import { WorkoutSession } from "@/lib/types";
import { ScreenHeader } from "./ScreenHeader";

type GpsStatus = "acquiring" | "active" | "unavailable";

function formatElapsed(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const STATUS_LABEL: Record<GpsStatus, string> = {
  acquiring: "Recherche du signal GPS...",
  active: "Position GPS active",
  unavailable: "GPS indisponible — suivi simulé",
};

const STATUS_DOT: Record<GpsStatus, string> = {
  acquiring: "bg-amber-400",
  active: "bg-emerald-400",
  unavailable: "bg-neutral-600",
};

export function GpsTrackingScreen({
  author,
  onCancel,
  onStop,
}: {
  author: string;
  onCancel: () => void;
  onStop: (draft: Omit<WorkoutSession, "id">) => void;
}) {
  const [elapsed, setElapsed] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [gpsStatus, setGpsStatus] = useState<GpsStatus>("acquiring");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((s) => s + 1);
      setDistanceKm((d) => d + 0.0025 + Math.random() * 0.002);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setGpsStatus("unavailable");
      return;
    }
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setGpsStatus("active");
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => setGpsStatus("unavailable"),
      { enableHighAccuracy: true }
    );
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  function handleStop() {
    const totalMinutes = Math.max(1, Math.round(elapsed / 60));
    const pas = Math.round(totalMinutes * 0.4);
    const trot = Math.round(totalMinutes * 0.35);
    const galop = Math.max(0, totalMinutes - pas - trot);
    const now = new Date();

    onStop({
      title: "Sortie GPS",
      date: "Aujourd'hui",
      time: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      author,
      duration: `${totalMinutes} min`,
      distance: `${distanceKm.toFixed(1)} km`,
      gaits: { pas, trot, galop },
      memories: [],
    });
  }

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader onBack={onCancel} title="Activité GPS" />

      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${STATUS_DOT[gpsStatus]}`} />
          <span className="text-xs uppercase tracking-widest2 text-neutral-500">
            {STATUS_LABEL[gpsStatus]}
          </span>
        </div>

        <div className="font-serif text-6xl tabular-nums text-white">
          {formatElapsed(elapsed)}
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <MapPin className="h-4 w-4" strokeWidth={1.5} />
          {coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : "—"}
        </div>

        <div className="text-center">
          <p className="text-2xl font-light text-white">{distanceKm.toFixed(2)} km</p>
          <p className="text-xs uppercase tracking-widest2 text-neutral-600">Distance</p>
        </div>
      </div>

      <div className="flex justify-center pb-10">
        <button
          onClick={handleStop}
          aria-label="Arrêter l'activité"
          className="flex h-20 w-20 items-center justify-center rounded-full bg-white active:scale-95"
        >
          <Square className="h-6 w-6 text-black" fill="black" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
