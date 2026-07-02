import { Gait, GaitBreakdown, RoutePoint } from "./types";

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

export function classifyGait(speedKmh: number): Gait {
  if (speedKmh < 2) return "arret";
  if (speedKmh < 8) return "pas";
  if (speedKmh < 15) return "trot";
  return "galop";
}

export interface RouteSegment {
  from: RoutePoint;
  to: RoutePoint;
  gait: Gait;
}

export function classifyRouteSegments(route: RoutePoint[]): RouteSegment[] {
  const segments: RouteSegment[] = [];
  for (let i = 1; i < route.length; i++) {
    const a = route[i - 1];
    const b = route[i];
    const distanceKm = haversineDistanceKm(a, b);
    const durationH = Math.max((b.t - a.t) / 3_600_000, 1 / 3600);
    const speedKmh = distanceKm / durationH;
    segments.push({ from: a, to: b, gait: classifyGait(speedKmh) });
  }
  return segments;
}

export function gaitBreakdownFromSegments(
  segments: RouteSegment[],
  totalMinutes: number
): GaitBreakdown {
  const minutesByGait: GaitBreakdown = { arret: 0, pas: 0, trot: 0, galop: 0 };
  for (const seg of segments) {
    const minutes = (seg.to.t - seg.from.t) / 60000;
    minutesByGait[seg.gait] += minutes;
  }
  const trackedTotal =
    minutesByGait.arret + minutesByGait.pas + minutesByGait.trot + minutesByGait.galop;
  minutesByGait.arret += Math.max(0, totalMinutes - trackedTotal);

  return {
    arret: Math.round(minutesByGait.arret),
    pas: Math.round(minutesByGait.pas),
    trot: Math.round(minutesByGait.trot),
    galop: Math.round(minutesByGait.galop),
  };
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
