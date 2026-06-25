"use client";

import { ArrowRight, Clock3, Compass, Moon, Radar, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { PageHeader } from "@/components/core/page-header";
import { SkyDome } from "@/components/charts/simulation-visuals";
import { TrajectoryVisual } from "@/components/charts/trajectory-visual";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { DataStatusIndicator } from "@/components/ui/data-status-indicator";
import { HologramPanel } from "@/components/ui/hologram-panel";
import {
  commandHelp,
  getDailyBriefing,
  getDailyObject,
  getFeaturedMission,
  simulationKinds,
} from "@/data/astrasetu";
import { skyPlanner } from "@/lib/sky";
import { useAstraStore } from "@/store/astra-store";

const stableInitialDate = new Date("2026-06-25T00:00:00.000Z");

export function CommandDeck() {
  const [now, setNow] = useState(stableInitialDate);
  const [mounted, setMounted] = useState(false);
  const explorerName = useAstraStore((state) => state.explorerName);
  const streak = useAstraStore((state) => state.streak);
  const discoveries = useAstraStore((state) => state.discoveredObjects.length);
  const savedSimulations = useAstraStore((state) => state.savedSimulations.length);
  const completedSteps = useAstraStore((state) => state.completedQuestSteps.length);
  const settings = useAstraStore((state) => state.settings);
  const briefing = useMemo(() => getDailyBriefing(now), [now]);
  const object = useMemo(() => getDailyObject(now), [now]);
  const mission = useMemo(() => getFeaturedMission(now), [now]);
  const sky = useMemo(
    () => skyPlanner(now, {
      label: settings.observerLabel,
      latitude: settings.latitude,
      longitude: settings.longitude,
    }),
    [now, settings.latitude, settings.longitude, settings.observerLabel],
  );

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="route-shell">
      <PageHeader
        title="Command Deck"
        description="A calm mission-control surface for today's exploration, local demo progress, quick launches, and transparent science context."
        status="Demo data"
      >
        <CosmicButton href="/settings" variant="ghost">
          Tune observatory
        </CosmicButton>
      </PageHeader>

      <section className="glass-panel mb-5 grid gap-3 rounded-[1.35rem] p-4 md:grid-cols-5">
        {[
          {
            icon: Clock3,
            label: "Local time",
            value: mounted ? now.toLocaleString() : "Synchronizing local clock",
          },
          { icon: Compass, label: "Observer", value: settings.observerLabel },
          { icon: Sparkles, label: "System", value: "Nominal" },
          { icon: Radar, label: "Data mode", value: "Demo + local calculation" },
          { icon: Target, label: "Message", value: "Follow curiosity, verify sources." },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="thin-panel rounded-2xl p-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-400">
                <Icon className="h-4 w-4 text-aurora" aria-hidden />
                {item.label}
              </div>
              <p className="mt-2 text-sm font-semibold text-starlight">{item.value}</p>
            </div>
          );
        })}
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.18fr_.82fr]">
        <div className="grid gap-5">
          <HologramPanel className="signal-line overflow-hidden">
            <div className="relative z-10 grid gap-5 lg:grid-cols-[1fr_.78fr]">
              <div>
                <DataStatusIndicator status={briefing.status} />
                <h2 className="mt-5 font-display text-3xl font-semibold text-white">
                  {briefing.title}
                </h2>
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-slate-400">
                  Focus object: {briefing.object}
                </p>
                <p className="mt-4 text-base leading-7 text-slate-200">{briefing.idea}</p>
                <div className="mt-5 rounded-2xl border border-solar/20 bg-solar/10 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-solar">Why it matters</p>
                  <p className="mt-2 text-sm leading-6 text-starlight">{briefing.whyItMatters}</p>
                </div>
                <CosmicButton className="mt-5" href={briefing.route} variant="primary">
                  {briefing.actionLabel} <ArrowRight className="h-4 w-4" aria-hidden />
                </CosmicButton>
              </div>
              <div className="relative min-h-72 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#050714]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_42%,rgba(103,232,208,.24),transparent_22%),radial-gradient(circle_at_75%_18%,rgba(91,167,255,.18),transparent_22%)]" />
                <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-aurora/35" />
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orbit/18" />
                <div className="absolute left-[42%] top-[38%] h-14 w-14 rounded-full bg-aurora shadow-[0_0_42px_rgba(103,232,208,.45)]" />
                <p className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm text-slate-200">
                  Micro-scene: orbital geometry, observation timing, and mission context are connected here rather than separated into static pages.
                </p>
              </div>
            </div>
          </HologramPanel>

          <div className="grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
            <HologramPanel>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DataStatusIndicator status={mission.status} compact />
                  <h2 className="mt-4 font-display text-2xl font-semibold text-white">
                    Featured mission
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">{mission.agency} / {mission.destination}</p>
                </div>
                <Link className="text-sm font-semibold text-aurora hover:text-white" href={`/missions?mission=${mission.slug}`}>
                  Mission Control
                </Link>
              </div>
              <p className="mt-4 text-lg font-semibold text-starlight">{mission.name}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{mission.significance}</p>
              <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-sm text-slate-200">
                Stage: {mission.stage}
              </p>
              <div className="mt-4">
                <TrajectoryVisual mission={mission} />
              </div>
            </HologramPanel>

            <HologramPanel>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <DataStatusIndicator status="Local calculation" compact />
                  <h2 className="mt-4 font-display text-2xl font-semibold text-white">Tonight&apos;s Sky</h2>
                </div>
                <Moon className="h-7 w-7 text-solar" aria-hidden />
              </div>
              <div className="mt-4">
                <SkyDome moonLabel={sky.moon.label} illumination={sky.moon.illumination} objects={sky.visibleObjects} />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Suggested target: <span className="font-semibold text-white">{sky.suggestedTarget.name}</span> from {sky.location.label}.
              </p>
              <CosmicButton className="mt-4" href="/observatory" variant="secondary">
                Open Night Observatory
              </CosmicButton>
            </HologramPanel>
          </div>
        </div>

        <aside className="grid gap-5">
          <HologramPanel>
            <h2 className="font-display text-2xl font-semibold text-white">Quick launch simulation dock</h2>
            <div className="mt-4 grid gap-3">
              {simulationKinds.map((simulation) => (
                <Link
                  key={simulation}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition hover:border-aurora/35 hover:bg-aurora/10"
                  href={`/lab?sim=${encodeURIComponent(simulation.toLowerCase())}`}
                >
                  <span className="font-semibold text-starlight">{simulation}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-aurora" aria-hidden />
                </Link>
              ))}
            </div>
          </HologramPanel>

          <HologramPanel>
            <h2 className="font-display text-2xl font-semibold text-white">Explorer progress</h2>
            <p className="mt-2 text-sm text-slate-300">Local-only profile for {explorerName}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["Streak", streak],
                ["Discovered", discoveries],
                ["Saved sims", savedSimulations],
                ["Quest steps", completedSteps],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </HologramPanel>

          <HologramPanel>
            <DataStatusIndicator status={object.status} compact />
            <h2 className="mt-4 font-display text-2xl font-semibold text-white">Daily discovery object</h2>
            <p className="mt-3 text-lg font-semibold text-starlight">{object.name}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{object.summary}</p>
            <CosmicButton className="mt-4" href={`/atlas?object=${object.slug}`} variant="ghost">
              Inspect in Atlas
            </CosmicButton>
          </HologramPanel>

          <HologramPanel>
            <h2 className="font-display text-2xl font-semibold text-white">Operating hints</h2>
            <div className="mt-4 space-y-3">
              {commandHelp.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-aurora" aria-hidden />
                    <p className="text-sm leading-6 text-slate-300">
                      <span className="font-semibold text-white">{item.label}:</span> {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </HologramPanel>
        </aside>
      </div>
    </div>
  );
}
