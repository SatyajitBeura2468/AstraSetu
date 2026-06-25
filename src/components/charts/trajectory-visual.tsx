import type { Mission } from "@/types/domain";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function TrajectoryVisual({ mission }: { mission: Mission }) {
  return (
    <div className="relative min-h-48 overflow-hidden rounded-2xl border border-white/10 bg-[#050714]/80 p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(91,167,255,0.18),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(255,209,102,0.12),transparent_18%)]" />
      <svg className="relative h-44 w-full" viewBox="0 0 520 180" role="img" aria-label={`${mission.name} trajectory`}>
        <path
          d="M34 132 C 120 40, 236 38, 336 96 S 456 146, 492 42"
          fill="none"
          stroke="rgba(91,167,255,0.34)"
          strokeWidth="2"
          strokeDasharray="7 8"
        />
        {mission.trajectory.map((point, index) => {
          const x = 34 + point.progress * 458;
          const y = clamp(132 - Math.sin(point.progress * Math.PI * 1.35) * 82, 24, 152);
          const labelY = y > 140 ? y - 16 : y + 22;
          return (
            <g key={point.label}>
              <circle
                cx={x}
                cy={y}
                r={index === mission.trajectory.length - 1 ? 8 : 5}
                fill={index === mission.trajectory.length - 1 ? "#FFD166" : "#67E8D0"}
              />
              <text x={x} y={labelY} fill="#A8B6D8" fontSize="12" textAnchor="middle">
                {point.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
