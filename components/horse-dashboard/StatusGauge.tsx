import { HorseStatus } from "@/lib/types";

const STATUS_CONFIG: Record<
  HorseStatus,
  { color: string; trackColor: string; progress: number; emoji: string }
> = {
  great: { color: "#7CFFB2", trackColor: "#1F3A2B", progress: 92, emoji: "☀️" },
  good: { color: "#FFB454", trackColor: "#3A2E1F", progress: 68, emoji: "🌤️" },
  attention: { color: "#FF7A7A", trackColor: "#3A1F1F", progress: 35, emoji: "⚠️" },
};

export function StatusGauge({
  status,
  label,
}: {
  status: HorseStatus;
  label: string;
}) {
  const { color, trackColor, progress, emoji } = STATUS_CONFIG[status];
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-32 w-32">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 1s ease-out",
              filter: `drop-shadow(0 0 6px ${color}80)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl">{emoji}</span>
          <span className="text-xs font-medium text-white/50">{progress}%</span>
        </div>
      </div>
      <span
        className="rounded-full px-4 py-1.5 text-sm font-semibold tracking-tight"
        style={{ color, backgroundColor: `${color}1A` }}
      >
        {label}
      </span>
    </div>
  );
}
