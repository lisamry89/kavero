import { RoutePoint } from "./types";

export function haversineDistanceKm(a: RoutePoint, b: RoutePoint) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export interface ProjectedPoint {
  x: number;
  y: number;
}

export function projectRoute(
  points: RoutePoint[],
  width: number,
  height: number,
  padding = 20
): ProjectedPoint[] {
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latRange = maxLat - minLat || 0.0005;
  const lngRange = maxLng - minLng || 0.0005;

  return points.map((p) => ({
    x: padding + ((p.lng - minLng) / lngRange) * (width - padding * 2),
    y: height - padding - ((p.lat - minLat) / latRange) * (height - padding * 2),
  }));
}

export function pathFromProjected(points: ProjectedPoint[]) {
  return points
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
    .join(" ");
}
