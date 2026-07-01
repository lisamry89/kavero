export function StatusGauge({
  progress,
  size = 52,
}: {
  progress: number;
  size?: number;
}) {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const center = size / 2;

  return (
    <div className="relative flex items-center justify-center" style={{ height: size, width: size }}>
      <svg className="h-full w-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-[10px] font-medium tracking-tight text-white/80">
        {progress}%
      </span>
    </div>
  );
}
