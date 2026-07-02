"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { Gait, RoutePoint } from "@/lib/types";
import { classifyRouteSegments } from "@/lib/geo";

const GAIT_COLOR: Record<Gait, string> = {
  arret: "#6b7280",
  pas: "#4ade80",
  trot: "#fb923c",
  galop: "#f87171",
};

function dotIcon(color: string, pulse: boolean) {
  const size = 14;
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:${color};border:2px solid #fff;box-shadow:0 0 0 2px rgba(0,0,0,0.5)${
      pulse ? ", 0 0 0 8px rgba(74,222,128,0.25)" : ""
    };"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FollowRoute({ route }: { route: RoutePoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (route.length === 0) return;
    if (route.length === 1) {
      map.setView([route[0].lat, route[0].lng], 16);
      return;
    }
    const bounds = L.latLngBounds(route.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [32, 32] });
  }, [route, map]);
  return null;
}

export function RouteMapView({ route, live = false }: { route: RoutePoint[]; live?: boolean }) {
  if (route.length === 0) return null;

  const segments = route.length >= 2 ? classifyRouteSegments(route) : [];
  const first = route[0];
  const last = route[route.length - 1];

  return (
    <MapContainer
      center={[first.lat, first.lng]}
      zoom={16}
      className="h-full w-full"
      zoomControl={false}
      attributionControl={false}
      dragging={!live}
      scrollWheelZoom={!live}
      doubleClickZoom={!live}
      touchZoom={!live}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      <FollowRoute route={route} />
      {segments.map((seg, i) => (
        <Polyline
          key={i}
          positions={[
            [seg.from.lat, seg.from.lng],
            [seg.to.lat, seg.to.lng],
          ]}
          pathOptions={{ color: GAIT_COLOR[seg.gait], weight: 4, lineCap: "round" }}
        />
      ))}
      <Marker position={[first.lat, first.lng]} icon={dotIcon("#ffffff", false)} />
      {route.length > 1 && (
        <Marker
          position={[last.lat, last.lng]}
          icon={dotIcon(live ? "#4ade80" : "#000000", live)}
        />
      )}
    </MapContainer>
  );
}
