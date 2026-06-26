"use client";

import {
  ArrowRight,
  CalendarDays,
  CircleDotDashed,
  Clock3,
  Compass,
  Database,
  FlaskConical,
  MapPin,
  Moon,
  Orbit,
  Radar,
  Satellite,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { SkyDome } from "@/components/charts/simulation-visuals";
import { TrajectoryVisual } from "@/components/charts/trajectory-visual";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { DataStatusIndicator } from "@/components/ui/data-status-indicator";
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

const simulationThumbs: Record<string, "gravity" | "orbit" | "transit" | "lens" | "stellar"> = {
  "Gravity Forge": "gravity",
  "Orbit Builder": "orbit",
  "Exoplanet Transit Lab": "transit",
  "Gravitational Lens Lab": "lens",
  "Stellar Evolution Explorer": "stellar",
};

type StatIcon = typeof Target;

function TopTelemetry({
  now,
  mounted,
  observer,
}: {
  now: Date;
  mounted: boolean;
  observer: string;
}) {
  const status = [
    {
      icon: CalendarDays,
      label: "Today",
      value: mounted ? now.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Syncing",
    },
    {
      icon: Clock3,
      label: "Local time",
      value: mounted ? now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) : "Syncing",
    },
    { icon: MapPin, label: "Observer", value: observer },
    { icon: Sparkles, label: "System", value: "Nominal" },
    { icon: Database, label: "Data", value: "Demo + local calculation" },
  ];

  return (
    <section className="observatory-frame mb-4 grid gap-3 rounded-[1.45rem] p-3 md:grid-cols-5" aria-label="Command telemetry">
      {status.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="telemetry-panel rounded-2xl p-3">
            <div className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-400">
              <Icon className="h-4 w-4 text-aurora" aria-hidden />
              {item.label}
            </div>
            <p className="mt-2 truncate text-sm font-semibold text-starlight">{item.value}</p>
          </div>
        );
      })}
    </section>
  );
}

function BriefingVisual({ object }: { object: string }) {
  return (
    <div className="relative min-h-[23rem] overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#030714]">
      <div className="absolute inset-0 star-noise opacity-80" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a1730] via-[#10172e] to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-16 h-24 bg-[radial-gradient(ellipse_at_center,rgba(255,209,102,.44),rgba(255,122,107,.12)_30%,transparent_64%)]" aria-hidden />
      <div className="absolute bottom-16 left-0 right-0 h-px bg-solar/45" aria-hidden />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 420" aria-hidden>
        <path d="M96 305 C 218 215, 358 168, 570 116" fill="none" stroke="rgba(143,211,255,.32)" strokeDasharray="7 8" />
        <path d="M444 128 L582 116 L506 210 Z" fill="none" stroke="rgba(255,209,102,.45)" />
        <path d="M506 168 A42 42 0 0 1 506 210" fill="none" stroke="#FFD166" strokeWidth="3" />
        <circle cx="582" cy="116" r="5" fill="#EAF4FF" />
        <circle cx="444" cy="128" r="4" fill="#67E8D0" />
        <circle cx="360" cy="270" r="6" fill="#FFD166" />
        <text x="594" y="112" fill="#EAF4FF" fontSize="13">{object}</text>
        <text x="344" y="292" fill="#FFD166" fontSize="13">Sun</text>
      </svg>
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#071022]/82 p-3 backdrop-blur">
        <span className="text-xs font-semibold text-slate-300">View: Bhawanipatna, Odisha</span>
        <span className="status-chip">Angle model</span>
      </div>
    </div>
  );
}

function SimulationThumbnail({ kind }: { kind: "gravity" | "orbit" | "transit" | "lens" | "stellar" }) {
  if (kind === "transit") {
    return (
      <svg className="h-full w-full" viewBox="0 0 220 110" aria-hidden>
        <path d="M8 48 L54 48 C72 48 76 78 100 78 L142 78 C166 78 170 48 212 48" fill="none" stroke="#FFD166" strokeWidth="3" />
        {[20, 50, 80, 110, 140, 170, 200].map((x) => <circle key={x} cx={x} cy={x > 75 && x < 155 ? 78 : 48} r="3" fill="#FFD166" />)}
      </svg>
    );
  }

  if (kind === "lens") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orbit/35 bg-orbit/10" />
        <div className="absolute left-1/2 top-1/2 h-16 w-44 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-aurora/45" />
        <div className="absolute left-1/2 top-1/2 h-44 w-16 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-solar/35" />
      </div>
    );
  }

  if (kind === "stellar") {
    return (
      <div className="relative grid h-full place-items-center">
        <div className="h-20 w-20 rounded-full bg-solar shadow-[0_0_54px_rgba(255,209,102,.42)]" />
        <div className="absolute h-32 w-32 rounded-full border border-solar/18" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 star-noise opacity-80" />
      <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-solar/90 shadow-[0_0_40px_rgba(255,209,102,.32)]" />
      <div className="absolute left-1/2 top-1/2 h-24 w-44 -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-[50%] border border-solar/55" />
      <div className="absolute left-[68%] top-[42%] h-5 w-5 rounded-full bg-aurora shadow-[0_0_26px_rgba(103,232,208,.42)]" />
    </div>
  );
}

function SimulationDock() {
  return (
    <section className="observatory-frame rounded-[1.45rem] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orbit">Quick launch simulation dock</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-white">Experiment lanes</h2>
        </div>
        <FlaskConical className="h-6 w-6 text-solar" aria-hidden />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {simulationKinds.map((simulation) => (
          <Link
            key={simulation}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-aurora/35 hover:bg-aurora/10"
            href={`/lab?sim=${encodeURIComponent(simulation.toLowerCase())}`}
          >
            <div className="relative h-28 overflow-hidden bg-[#040815]">
              <SimulationThumbnail kind={simulationThumbs[simulation]} />
            </div>
            <div className="p-3">
              <p className="font-semibold text-starlight">{simulation}</p>
              <p className="mt-1 text-xs text-slate-400">Open model <ArrowRight className="inline h-3 w-3 transition group-hover:translate-x-1" aria-hidden /></p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

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
  const explorerStats: Array<{ label: string; value: string | number; icon: StatIcon }> = [
    { label: "Streak", value: `${streak} day${streak === 1 ? "" : "s"}`, icon: Target },
    { label: "Objects discovered", value: discoveries, icon: Orbit },
    { label: "Simulations saved", value: savedSimulations, icon: FlaskConical },
    { label: "Quest steps", value: completedSteps, icon: Radar },
  ];

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="route-shell">
      <header className="mb-3 grid gap-3 xl:grid-cols-[1fr_auto] xl:items-end">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="status-chip">Command Deck</span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:inline">Local-first mission control</span>
          </div>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-normal text-white md:text-5xl">
            Command Deck
          </h1>
          <p className="mt-2 max-w-4xl text-base leading-7 text-slate-300">
            A dense return surface for daily space-science context, mission pathways, local observatory planning, explorer progress, and launch-ready simulations.
          </p>
        </div>
        <div className="observatory-frame hidden min-h-16 items-center gap-4 rounded-[1.35rem] p-3 sm:flex">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-solar/25 bg-solar/10 text-solar">
            <Orbit className="h-6 w-6" aria-hidden />
          </div>
          <p className="max-w-xs text-sm italic leading-6 text-slate-300">
            The universe is under no obligation to make sense to us, so AstraSetu labels every data surface.
          </p>
        </div>
      </header>

      <TopTelemetry now={now} mounted={mounted} observer={settings.observerLabel} />

      <div className="grid gap-4 xl:grid-cols-[1.15fr_.82fr_.62fr]">
        <section className="observatory-frame overflow-hidden rounded-[1.45rem] p-4">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1fr]">
            <div className="flex flex-col justify-between">
              <div>
                <DataStatusIndicator status={briefing.status} />
                <h2 className="mt-4 font-display text-3xl font-semibold text-white">
                  {briefing.title}
                </h2>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-orbit">Astronomy idea</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{briefing.idea}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-solar">Why it matters</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{briefing.whyItMatters}</p>
              </div>
              <CosmicButton className="mt-5 w-fit" href={briefing.route} variant="secondary">
                {briefing.actionLabel} <ArrowRight className="h-4 w-4" aria-hidden />
              </CosmicButton>
            </div>
            <BriefingVisual object={briefing.object} />
          </div>
        </section>

        <section className="observatory-frame rounded-[1.45rem] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <DataStatusIndicator status={mission.status} compact />
              <h2 className="mt-3 font-display text-2xl font-semibold text-white">Featured mission</h2>
              <p className="mt-1 text-sm text-slate-400">{mission.agency} / {mission.destination}</p>
            </div>
            <Satellite className="h-6 w-6 text-solar" aria-hidden />
          </div>
          <p className="mt-4 text-xl font-semibold text-starlight">{mission.name}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{mission.significance}</p>
          <div className="mt-4">
            <TrajectoryVisual mission={mission} />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {mission.trajectory.slice(0, 4).map((point, index) => (
              <div key={point.label} className="telemetry-panel rounded-xl p-2">
                <p className="text-[0.64rem] font-bold uppercase tracking-[0.12em] text-slate-500">Stage {index + 1}</p>
                <p className="mt-1 text-xs text-slate-200">{point.label}</p>
              </div>
            ))}
          </div>
          <CosmicButton className="mt-4 w-full" href={`/missions?mission=${mission.slug}`} variant="secondary">
            View Mission Console <ArrowRight className="h-4 w-4" aria-hidden />
          </CosmicButton>
        </section>

        <aside className="grid gap-4">
          <section className="observatory-frame rounded-[1.45rem] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <DataStatusIndicator status="Local calculation" compact />
                <h2 className="mt-3 font-display text-2xl font-semibold text-white">Tonight&apos;s Sky</h2>
              </div>
              <Moon className="h-6 w-6 text-solar" aria-hidden />
            </div>
            <div className="mt-4">
              <SkyDome moonLabel={sky.moon.label} illumination={sky.moon.illumination} objects={sky.visibleObjects.slice(0, 3)} />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Suggested target: <span className="font-semibold text-white">{sky.suggestedTarget.name}</span>
            </p>
            <CosmicButton className="mt-3 w-full" href="/observatory" variant="secondary">
              Open Observatory
            </CosmicButton>
          </section>

          <section className="observatory-frame rounded-[1.45rem] p-4">
            <DataStatusIndicator status={object.status} compact />
            <h2 className="mt-3 font-display text-2xl font-semibold text-white">Daily discovery</h2>
            <div className="mt-4 flex gap-4">
              <div
                className="grid h-24 w-24 shrink-0 place-items-center rounded-[1.35rem] border border-white/10 bg-[#040815] shadow-[0_0_40px_rgba(91,167,255,.12)]"
                style={{ color: object.color }}
              >
                <div className="h-14 w-14 rounded-full border border-current bg-current/20" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{object.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{object.summary}</p>
              </div>
            </div>
            <CosmicButton className="mt-4 w-full" href={`/atlas?object=${object.slug}`} variant="ghost">
              Explore Object <ArrowRight className="h-4 w-4" aria-hidden />
            </CosmicButton>
          </section>
        </aside>
      </div>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.08fr_.92fr]">
        <div className="observatory-frame rounded-[1.45rem] p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full border border-orbit/35 bg-orbit/10">
                <CircleDotDashed className="h-8 w-8 text-orbit" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Explorer progress</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-white">{explorerName}</h2>
              </div>
            </div>
            <CosmicButton href="/quests" variant="ghost">
              View Quests <ArrowRight className="h-4 w-4" aria-hidden />
            </CosmicButton>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            {explorerStats.map(({ label, value, icon: StatIcon }) => {
              return (
                <div key={String(label)} className="telemetry-panel rounded-2xl p-4">
                  <StatIcon className="h-5 w-5 text-solar" aria-hidden />
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-white">{value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <section className="observatory-frame rounded-[1.45rem] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orbit">Fast pathways</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white">Jump deeper</h2>
            </div>
            <Compass className="h-6 w-6 text-aurora" aria-hidden />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {commandHelp.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="telemetry-panel rounded-2xl p-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Icon className="h-4 w-4 text-aurora" aria-hidden />
                    {item.label}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.value}</p>
                </div>
              );
            })}
          </div>
        </section>
      </section>

      <div className="mt-4">
        <SimulationDock />
      </div>
    </div>
  );
}
