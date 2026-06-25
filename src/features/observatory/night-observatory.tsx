"use client";

import { CalendarClock, Eye, MapPin, MoonStar, Radar, Telescope } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { SkyDome } from "@/components/charts/simulation-visuals";
import { PageHeader } from "@/components/core/page-header";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { DataStatusIndicator } from "@/components/ui/data-status-indicator";
import { HologramPanel } from "@/components/ui/hologram-panel";
import { skyEvents } from "@/data/astrasetu";
import { skyPlanner } from "@/lib/sky";
import { useAstraStore } from "@/store/astra-store";

function toInputDate(date: Date) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

const stableInitialDateInput = "2026-06-25T20:00";

export function NightObservatory() {
  const settings = useAstraStore((state) => state.settings);
  const setSettings = useAstraStore((state) => state.setSettings);
  const pushToast = useAstraStore((state) => state.pushToast);
  const [dateValue, setDateValue] = useState(stableInitialDateInput);
  const [observerMode, setObserverMode] = useState(false);
  const date = useMemo(() => new Date(dateValue), [dateValue]);
  const plan = useMemo(
    () =>
      skyPlanner(date, {
        label: settings.observerLabel,
        latitude: settings.latitude,
        longitude: settings.longitude,
      }),
    [date, settings.latitude, settings.longitude, settings.observerLabel],
  );

  useEffect(() => {
    setDateValue(toInputDate(new Date()));
  }, []);

  return (
    <div className="route-shell">
      <PageHeader
        title="Night Observatory"
        description="A calm planning surface for moon phase, visible-object suggestions, seeded event prompts, and local observer settings."
        status="Local calculation"
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_.42fr]">
        <section className="grid gap-5">
          <HologramPanel>
            <div className="grid gap-4 lg:grid-cols-3">
              <label className="block rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <span className="control-label">
                  <span>Date and time</span>
                  <CalendarClock className="h-4 w-4 text-aurora" aria-hidden />
                </span>
                <input
                  className="mt-3 min-h-11 w-full rounded-xl border border-white/10 bg-black/24 px-3 text-sm text-white"
                  type="datetime-local"
                  value={dateValue}
                  onChange={(event) => setDateValue(event.target.value)}
                />
              </label>
              <label className="block rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <span className="control-label">
                  <span>Observer location</span>
                  <MapPin className="h-4 w-4 text-aurora" aria-hidden />
                </span>
                <input
                  className="mt-3 min-h-11 w-full rounded-xl border border-white/10 bg-black/24 px-3 text-sm text-white"
                  value={settings.observerLabel}
                  onChange={(event) => setSettings({ observerLabel: event.target.value })}
                />
              </label>
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <span className="control-label">
                  <span>Observer mode</span>
                  <Eye className="h-4 w-4 text-aurora" aria-hidden />
                </span>
                <button
                  className={`mt-3 min-h-11 w-full rounded-xl border px-4 text-sm font-semibold transition ${
                    observerMode
                      ? "border-aurora/50 bg-aurora text-slate-950"
                      : "border-white/10 bg-white/[0.045] text-slate-300"
                  }`}
                  type="button"
                  onClick={() => setObserverMode((value) => !value)}
                >
                  {observerMode ? "Observer mode active" : "Activate observer mode"}
                </button>
              </div>
            </div>
          </HologramPanel>

          <SkyDome moonLabel={plan.moon.label} illumination={plan.moon.illumination} objects={plan.visibleObjects} />

          <div className="grid gap-5 lg:grid-cols-2">
            <HologramPanel>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <DataStatusIndicator status="Local calculation" compact />
                  <h2 className="mt-4 font-display text-2xl font-semibold text-white">Sky planner</h2>
                </div>
                <MoonStar className="h-7 w-7 text-solar" aria-hidden />
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  ["Moon phase", plan.moon.label],
                  ["Illumination", `${Math.round(plan.moon.illumination * 100)}%`],
                  ["Suggested target", plan.suggestedTarget.name],
                  ["Location", plan.location.label],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                    <span className="text-sm text-slate-400">{label}</span>
                    <span className="text-right text-sm font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>
              <CosmicButton
                className="mt-5"
                onClick={() =>
                  pushToast({
                    tone: "success",
                    title: "Observation plan noted",
                    description: "Open Notebook to save a full research entry for this sky plan.",
                  })
                }
                variant="primary"
              >
                <Telescope className="h-4 w-4" aria-hidden />
                Log viewing plan
              </CosmicButton>
            </HologramPanel>

            <HologramPanel>
              <div className="flex items-center gap-3">
                <Radar className="h-5 w-5 text-aurora" aria-hidden />
                <h2 className="font-display text-2xl font-semibold text-white">Event radar</h2>
              </div>
              <div className="mt-5 space-y-3">
                {skyEvents.map((event) => (
                  <div key={event.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-semibold text-starlight">{event.title}</p>
                      <DataStatusIndicator status={event.status} compact />
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-400">{event.window}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{event.description}</p>
                  </div>
                ))}
              </div>
            </HologramPanel>
          </div>
        </section>

        <aside className="grid gap-5">
          <HologramPanel>
            <h2 className="font-display text-2xl font-semibold text-white">Transparency</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Moon phase uses local deterministic calculation. Visible-object suggestions are educational seasonal prompts. Event radar is labelled where seeded or future-live.
            </p>
            <div className="mt-5 grid gap-3">
              <DataStatusIndicator status="Local calculation" />
              <DataStatusIndicator status="Seeded event data" />
              <DataStatusIndicator status="Future live integration" />
            </div>
          </HologramPanel>

          <HologramPanel>
            <h2 className="font-display text-2xl font-semibold text-white">Observer notes</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Keep screen brightness low, avoid direct bright light, and let your eyes adapt. Future versions can add verified weather and sky-quality data.
            </p>
            <CosmicButton className="mt-5" href="/notebook?action=new" variant="ghost">
              Open research notebook
            </CosmicButton>
          </HologramPanel>
        </aside>
      </div>
    </div>
  );
}
