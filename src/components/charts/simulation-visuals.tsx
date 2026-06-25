import { formatNumber } from "@/lib/utils";

export function TransitChart({ points }: { points: Array<{ phase: number; brightness: number }> }) {
  const path = points
    .map((point, index) => {
      const x = point.phase * 100;
      const y = 100 - (point.brightness - 98) * 44;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${Math.max(6, Math.min(94, y)).toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg className="h-48 w-full" viewBox="0 0 100 100" role="img" aria-label="Exoplanet transit light curve">
      <defs>
        <linearGradient id="transitLine" x1="0" x2="1">
          <stop offset="0" stopColor="#67E8D0" />
          <stop offset="1" stopColor="#5BA7FF" />
        </linearGradient>
      </defs>
      {[20, 40, 60, 80].map((grid) => (
        <line key={grid} x1="0" x2="100" y1={grid} y2={grid} stroke="rgba(255,255,255,.08)" />
      ))}
      <path d={path} fill="none" stroke="url(#transitLine)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function OrbitPreview({
  score,
  label,
}: {
  score: number;
  label: string;
}) {
  const color = label.includes("escape")
    ? "#FF7A6B"
    : label.includes("circular")
      ? "#67E8D0"
      : label.includes("impact")
        ? "#FFD166"
        : "#5BA7FF";

  return (
    <div className="relative grid min-h-64 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-[#050714]/80">
      <div className="absolute h-44 w-44 rounded-full border border-solar/20 bg-solar/10" />
      <div
        className="absolute h-60 w-96 rounded-[50%] border"
        style={{
          borderColor: `${color}AA`,
          transform: `rotate(${score * 42 - 18}deg) scale(${0.8 + score * 0.5})`,
          boxShadow: `0 0 36px ${color}33`,
        }}
      />
      <div className="absolute h-10 w-10 rounded-full" style={{ background: color, right: `${18 + score * 38}%`, top: "32%" }} />
      <div className="relative text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Orbit outcome</p>
        <p className="mt-2 font-display text-2xl font-semibold capitalize text-starlight">{label}</p>
        <p className="mt-2 text-sm text-slate-300">Energy index {formatNumber(score * 100, 0)}%</p>
      </div>
    </div>
  );
}

export function SkyDome({
  moonLabel,
  illumination,
  objects,
}: {
  moonLabel: string;
  illumination: number;
  objects: string[];
}) {
  return (
    <div className="relative min-h-72 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#020510]">
      <div className="absolute inset-x-8 bottom-[-8rem] h-80 rounded-t-full border border-orbit/25 bg-gradient-to-t from-orbit/10 to-transparent" />
      <div className="absolute left-8 top-10 h-16 w-16 rounded-full border border-solar/30 bg-solar/10 shadow-[0_0_38px_rgba(255,209,102,.22)]">
        <div
          className="h-full rounded-full bg-starlight"
          style={{ clipPath: `inset(0 ${Math.round((1 - illumination) * 100)}% 0 0)` }}
        />
      </div>
      {objects.map((object, index) => (
        <div
          key={object}
          className="absolute text-xs font-semibold text-slate-200"
          style={{
            left: `${24 + index * 18}%`,
            top: `${34 + ((index * 19) % 28)}%`,
          }}
        >
          <span className="mb-1 block h-2 w-2 rounded-full bg-aurora shadow-[0_0_18px_rgba(103,232,208,.7)]" />
          {object}
        </div>
      ))}
      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-white/[0.055] p-4">
        <p className="text-sm font-semibold text-starlight">{moonLabel}</p>
        <p className="mt-1 text-xs text-slate-300">{Math.round(illumination * 100)}% illuminated local calculation</p>
      </div>
    </div>
  );
}
