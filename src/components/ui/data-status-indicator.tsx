import type { DataStatus } from "@/types/domain";

const toneMap: Record<DataStatus, string> = {
  "Verified static data": "border-aurora/35 bg-aurora/10 text-aurora",
  "Educational simulation": "border-solar/35 bg-solar/10 text-solar",
  "Demo data": "border-nebula/35 bg-nebula/10 text-nebula",
  "Seeded event data": "border-mars/35 bg-mars/10 text-mars",
  "Local calculation": "border-orbit/35 bg-orbit/10 text-orbit",
  "Future live integration": "border-white/20 bg-white/8 text-slate-300",
};

export function DataStatusIndicator({
  status,
  compact = false,
}: {
  status: DataStatus;
  compact?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] ${toneMap[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {compact ? status.replace(" data", "") : status}
    </span>
  );
}
