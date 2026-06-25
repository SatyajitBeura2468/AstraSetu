"use client";

import { Bookmark, CalendarDays, Flag, RadioTower, Search, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { TrajectoryVisual } from "@/components/charts/trajectory-visual";
import { PageHeader } from "@/components/core/page-header";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { DataStatusIndicator } from "@/components/ui/data-status-indicator";
import { HologramPanel } from "@/components/ui/hologram-panel";
import { missions } from "@/data/astrasetu";
import { cn } from "@/lib/utils";
import { useAstraStore } from "@/store/astra-store";
import type { MissionCategory } from "@/types/domain";

const categories: Array<MissionCategory | "All"> = [
  "All",
  "India",
  "Moon",
  "Mars",
  "Solar",
  "Deep Space",
  "Human Spaceflight",
  "Observatory",
];

const missionCategories = categories.filter((item): item is MissionCategory => item !== "All");

export function MissionControl({ initialMission }: { initialMission?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MissionCategory | "All">("All");
  const [selectedSlug, setSelectedSlug] = useState(initialMission ?? missions[0].slug);
  const saved = useAstraStore((state) => state.savedMissions);
  const toggleSavedMission = useAstraStore((state) => state.toggleSavedMission);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return missions.filter((mission) => {
      const categoryMatch = category === "All" || mission.category.includes(category);
      const queryMatch =
        !normalized ||
        `${mission.name} ${mission.agency} ${mission.destination} ${mission.objective}`
          .toLowerCase()
          .includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  const selected = missions.find((mission) => mission.slug === selectedSlug) ?? filtered[0] ?? missions[0];

  function selectMission(slug: string) {
    setSelectedSlug(slug);
    router.replace(`/missions?mission=${slug}`, { scroll: false });
  }

  return (
    <div className="route-shell">
      <PageHeader
        title="Mission Control"
        description="A narrative mission surface for Indian and global spaceflight, with source labels, trajectory visuals, category filters, and persistent saved missions."
        status="Verified static data"
      />

      <div className="grid gap-5 xl:grid-cols-[.42fr_1fr]">
        <aside className="grid gap-5">
          <HologramPanel>
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
              <input
                className="min-h-12 w-full rounded-2xl border border-white/10 bg-white/[0.055] pl-11 pr-4 text-sm text-white placeholder:text-slate-500"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search missions, agencies, destinations..."
              />
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  className={cn(
                    "min-h-10 rounded-full border px-3 text-xs font-semibold transition",
                    category === item
                      ? "border-aurora/50 bg-aurora text-slate-950"
                      : "border-white/10 bg-white/[0.045] text-slate-300 hover:bg-white/10",
                  )}
                  type="button"
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </HologramPanel>

          <HologramPanel>
            <h2 className="font-display text-2xl font-semibold text-white">Mission timeline</h2>
            <div className="mt-5 space-y-3">
              {filtered.map((mission) => (
                <button
                  key={mission.slug}
                  className={cn(
                    "relative flex w-full gap-4 rounded-2xl border p-4 text-left transition",
                    selected.slug === mission.slug
                      ? "border-solar/45 bg-solar/10"
                      : "border-white/10 bg-white/[0.035] hover:border-orbit/30 hover:bg-orbit/10",
                  )}
                  type="button"
                  onClick={() => selectMission(mission.slug)}
                >
                  <span className="mt-1 h-3 w-3 rounded-full bg-aurora shadow-[0_0_18px_rgba(103,232,208,.55)]" aria-hidden />
                  <span>
                    <span className="block font-semibold text-starlight">{mission.name}</span>
                    <span className="mt-1 block text-xs text-slate-400">{mission.launch} / {mission.agency}</span>
                  </span>
                </button>
              ))}
            </div>
          </HologramPanel>
        </aside>

        <section className="grid gap-5">
          <HologramPanel>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <DataStatusIndicator status={selected.status} />
                <h2 className="mt-5 font-display text-4xl font-semibold text-white">{selected.name}</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-400">
                  {selected.agency} / {selected.destination}
                </p>
              </div>
              <CosmicButton onClick={() => toggleSavedMission(selected.slug)} variant="ghost">
                <Bookmark className="h-4 w-4" aria-hidden />
                {saved.includes(selected.slug) ? "Saved mission" : "Save mission"}
              </CosmicButton>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {[
                { icon: CalendarDays, label: "Launch / schedule", value: selected.launch },
                { icon: RadioTower, label: "Stage", value: selected.stage },
                { icon: Flag, label: "Categories", value: selected.category.join(", ") },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                    <Icon className="h-5 w-5 text-aurora" aria-hidden />
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-starlight">{item.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">Mission detail</h3>
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-slate-400">Objective</p>
                <p className="mt-2 text-base leading-7 text-slate-200">{selected.objective}</p>
                <p className="mt-5 text-sm uppercase tracking-[0.18em] text-slate-400">Significance</p>
                <p className="mt-2 text-base leading-7 text-slate-200">{selected.significance}</p>
                <div className="mt-5 rounded-2xl border border-aurora/20 bg-aurora/10 p-4 text-sm leading-6 text-starlight">
                  <ShieldCheck className="mb-2 h-5 w-5 text-aurora" aria-hidden />
                  AstraSetu v1 does not claim live mission status. Future verified feeds can replace this static provider.
                </div>
              </div>
              <TrajectoryVisual mission={selected} />
            </div>
          </HologramPanel>

          <HologramPanel>
            <h2 className="font-display text-2xl font-semibold text-white">Category signal</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {missionCategories.map((item) => {
                const count = missions.filter((mission) => mission.category.includes(item)).length;
                return (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{item}</p>
                    <p className="mt-2 font-display text-3xl font-semibold text-white">{count}</p>
                  </div>
                );
              })}
            </div>
          </HologramPanel>
        </section>
      </div>
    </div>
  );
}
