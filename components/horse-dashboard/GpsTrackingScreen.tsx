"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Pause, Play, Square } from "lucide-react";
import { RoutePoint, WorkoutSession } from "@/lib/types";
import { gaitBreakdownFromSegments, classifyRouteSegments, haversineDistanceKm } from "@/lib/geo";
import { ScreenHeader } from "./ScreenHeader";

type Status = "idle" | "running" | "paused";
type GpsStatus = "acquiring" | "active" | "unavailable";

const MIN_DELTA_KM = 0.002;

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
  const [status, setStatus] = useState<Status>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [gpsStatus, setGpsStatus] = useState<GpsStatus>("acquiring");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const routeRef = useRef<RoutePoint[]>([]);
  const lastPointRef = useRef<RoutePoint | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (watchIdRef.current !== null && typeof navigator !== "undefined") {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  function startTracking() {
    intervalRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);

    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setGpsStatus("unavailable");
      return;
    }
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setGpsStatus("active");
        const point: RoutePoint = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          t: Date.now(),
        };
        setCoords({ lat: point.lat, lng: point.lng });

        const last = lastPointRef.current;
        if (!last) {
          lastPointRef.current = point;
          routeRef.current = [point];
          return;
        }
        const delta = haversineDistanceKm(last, point);
        if (delta > MIN_DELTA_KM) {
          setDistanceKm((d) => d + delta);
          lastPointRef.current = point;
          routeRef.current = [...routeRef.current, point];
        }
      },
      () => setGpsStatus("unavailable"),
      { enableHighAccuracy: true }
    );
  }

  function pauseTracking() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }

  function handlePlay() {
    setStatus("running");
    startTracking();
  }

  function handlePause() {
    setStatus("paused");
    pauseTracking();
  }

  function handleResume() {
    setStatus("running");
    startTracking();
  }

  function handleFinish() {
    pauseTracking();

    const totalMinutes = Math.max(1, Math.round(elapsed / 60));
    const route = routeRef.current;
    const gaits =
      route.length >= 2
        ? gaitBreakdownFromSegments(classifyRouteSegments(route), totalMinutes)
        : { arret: totalMinutes, pas: 0, trot: 0, galop: 0 };
    const now = new Date();

    onStop({
      title: "Sortie GPS",
      date: "Aujourd'hui",
      time: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      author,
      duration: `${totalMinutes} min`,
      distance: `${distanceKm.toFixed(2)} km`,
      gaits,
      memories: [],
      route,
    });
  }

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader onBack={onCancel} title="Activité GPS" />

      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${STATUS_DOT[gpsStatus]}`} />
          <span className="text-xs uppercase tracking-widest2 text-neutral-500">
            {status === "idle" ? "Prêt à démarrer" : STATUS_LABEL[gpsStatus]}
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

      <div className="flex items-center justify-center gap-6 pb-10">
        {status === "idle" && (
          <button
            onClick={handlePlay}
            aria-label="Démarrer l'activité"
            className="flex h-20 w-20 items-center justify-center rounded-full bg-white active:scale-95"
          >
            <Play className="h-7 w-7 text-black" fill="black" strokeWidth={1.5} />
          </button>
        )}
        {status === "running" && (
          <>
            <button
              onClick={handlePause}
              aria-label="Mettre en pause"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-700 active:scale-95"
            >
              <Pause className="h-5 w-5 text-white" fill="white" strokeWidth={1.5} />
            </button>
            <button
              onClick={handleFinish}
              aria-label="Terminer l'activité"
              className="flex h-20 w-20 items-center justify-center rounded-full bg-white active:scale-95"
            >
              <Square className="h-6 w-6 text-black" fill="black" strokeWidth={1.5} />
            </button>
          </>
        )}
        {status === "paused" && (
          <>
            <button
              onClick={handleResume}
              aria-label="Reprendre l'activité"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-700 active:scale-95"
            >
              <Play className="h-5 w-5 text-white" fill="white" strokeWidth={1.5} />
            </button>
            <button
              onClick={handleFinish}
              aria-label="Terminer l'activité"
              className="flex h-20 w-20 items-center justify-center rounded-full bg-white active:scale-95"
            >
              <Square className="h-6 w-6 text-black" fill="black" strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
