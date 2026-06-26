"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  ArrowRight,
  Atom,
  Command,
  FastForward,
  FlaskConical,
  Globe2,
  Orbit,
  Radar,
  Satellite,
  Sparkles,
  Telescope,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { CosmicButton } from "@/components/ui/cosmic-button";
import { celestialObjects, educationalFacts, launchMessages, missions, routes } from "@/data/astrasetu";
import { useAstraStore } from "@/store/astra-store";

const capabilityLinks = [
  { href: "/atlas", label: "Atlas", detail: "Object field", icon: Orbit },
  { href: "/missions", label: "Missions", detail: "Trajectory archive", icon: Satellite },
  { href: "/observatory", label: "Observatory", detail: "Local sky", icon: Telescope },
  { href: "/lab", label: "Simulation Lab", detail: "Physics models", icon: FlaskConical },
];

function BootSequence({ bootIndex }: { bootIndex: number }) {
  return (
    <div className="observatory-frame micro-grid rounded-[1.45rem] p-3 font-mono text-[0.64rem] text-slate-300 sm:p-5 sm:text-[0.72rem]">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 sm:mb-4">
        <div className="flex items-center gap-2 text-aurora">
          <Command className="h-4 w-4" aria-hidden />
          <span className="font-semibold uppercase tracking-[0.18em]">AstraSetu system init</span>
        </div>
        <span className="status-chip hidden sm:inline-flex">Nominal</span>
      </div>
      <div className="grid gap-1.5 sm:gap-2">
        {launchMessages.map((message, index) => (
          <div
            key={message}
            className={index < bootIndex ? "flex items-center justify-between gap-4 text-slate-100" : "flex items-center justify-between gap-4 text-slate-600"}
          >
            <span className="min-w-0 truncate">{message}</span>
            <span className={index < bootIndex ? "shrink-0 text-aurora" : "shrink-0 text-slate-600"}>[ {index < bootIndex ? "OK" : "--"} ]</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MissionOrbitScene({
  fact,
  pointerX,
  pointerY,
}: {
  fact: string;
  pointerX: ReturnType<typeof useMotionValue<number>>;
  pointerY: ReturnType<typeof useMotionValue<number>>;
}) {
  const driftX = useTransform(pointerX, [-0.5, 0.5], [-18, 18]);
  const driftY = useTransform(pointerY, [-0.5, 0.5], [14, -14]);
  const mission = missions[0];
  const object = celestialObjects[0];

  return (
    <motion.div
      className="observatory-frame relative min-h-[28rem] overflow-hidden rounded-[2rem] p-4 sm:min-h-[39rem] sm:p-5 lg:min-h-[43rem]"
      style={{ x: driftX, y: driftY }}
    >
      <div className="absolute inset-0 star-noise opacity-70" aria-hidden />
      <div className="absolute inset-0 micro-grid opacity-45" aria-hidden />
      <div className="absolute -right-36 bottom-[-16rem] h-[40rem] w-[40rem] earth-limb sm:-right-24 sm:h-[48rem] sm:w-[48rem]" aria-hidden />
      <div className="stellar-ring left-[5%] top-[17%] h-[20rem] w-[88%]" aria-hidden />
      <div className="stellar-ring left-[11%] top-[23%] h-[15rem] w-[73%]" aria-hidden />
      <div className="stellar-ring left-[18%] top-[29%] h-[10rem] w-[58%]" aria-hidden />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 560" aria-hidden>
        <defs>
          <linearGradient id="launchOrbit" x1="0" x2="1">
            <stop offset="0" stopColor="#67E8D0" stopOpacity="0.05" />
            <stop offset="0.48" stopColor="#5BA7FF" stopOpacity="0.68" />
            <stop offset="1" stopColor="#FFD166" stopOpacity="0.26" />
          </linearGradient>
          <filter id="orbitGlow">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M86 350 C 176 164, 356 126, 542 210 S 686 388, 566 442 C 406 528, 185 484, 86 350"
          fill="none"
          stroke="url(#launchOrbit)"
          strokeWidth="2"
          filter="url(#orbitGlow)"
        />
        <path
          d="M156 418 C 278 292, 380 266, 512 308 S 672 372, 712 286"
          fill="none"
          stroke="rgba(103,232,208,.38)"
          strokeDasharray="6 9"
          strokeWidth="1.5"
        />
        {[
          [130, 328, "#67E8D0"],
          [310, 187, "#FFD166"],
          [494, 234, "#8FD3FF"],
          [620, 394, "#FF7A6B"],
        ].map(([cx, cy, color], index) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={index === 1 ? 6 : 4} fill={String(color)} />
            <circle cx={cx} cy={cy} r={index === 1 ? 18 : 11} fill="none" stroke={String(color)} strokeOpacity="0.28" />
          </g>
        ))}
        <g className="orbit-pulse">
          <path d="M528 214 l42 -18 l-18 42 z" fill="#EAF4FF" opacity="0.88" />
          <path d="M548 218 l44 22" stroke="#67E8D0" strokeOpacity="0.52" />
        </g>
      </svg>

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="telemetry-panel rounded-2xl p-4">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-aurora">Scan in progress</p>
          <p className="mt-2 text-sm text-slate-200">{object.name} / {object.type}</p>
        </div>
        <Link
          className="rounded-full border border-white/12 bg-white/7 px-4 py-2 text-sm font-semibold text-starlight transition hover:border-aurora/45 hover:bg-aurora/10"
          href="/atlas?object=jupiter"
        >
          Inspect object
        </Link>
      </div>

      <div className="absolute left-5 top-[43%] z-10 max-w-[16rem] rounded-2xl border border-solar/25 bg-[#070b18]/72 p-4 shadow-astro backdrop-blur">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-solar">Seeded briefing</p>
        <p className="mt-2 text-sm leading-6 text-starlight">{fact}</p>
      </div>

      <div className="absolute bottom-5 left-5 right-5 z-10 grid gap-3 sm:grid-cols-[1fr_.9fr]">
        <div className="telemetry-panel rounded-2xl p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-400">Mission pulse</p>
              <p className="mt-2 text-lg font-semibold text-white">{mission.name}</p>
            </div>
            <span className="rounded-full border border-aurora/35 bg-aurora/10 px-3 py-1 text-xs font-bold text-aurora">Live demo</span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {mission.trajectory.slice(0, 4).map((point, index) => (
              <div key={point.label} className="relative">
                <div className={index < 3 ? "h-1 rounded-full bg-orbit" : "h-1 rounded-full bg-white/12"} />
                <p className="mt-2 text-[0.66rem] leading-4 text-slate-300">{point.label}</p>
              </div>
            ))}
          </div>
        </div>
        <Link
          className="group telemetry-panel flex min-h-32 flex-col justify-between rounded-2xl p-4 transition hover:border-aurora/40 hover:bg-aurora/10"
          href="/command"
          aria-label="Open Command Deck bridge"
        >
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-400">Bridge online</span>
          <span className="flex items-center justify-between gap-3 text-xl font-semibold text-white">
            Enter Command Deck
            <ArrowRight className="h-5 w-5 text-aurora transition group-hover:translate-x-1" aria-hidden />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

function PreviewSection() {
  const previews = [
    {
      href: "/command",
      title: "Command Deck",
      text: "Daily briefing, mission pulse, progress, and quick launches in one return surface.",
      icon: Radar,
      className: "md:col-span-2",
      visual: "command",
    },
    {
      href: "/atlas",
      title: "Cosmic Atlas",
      text: "Searchable object field with source labels and discovery actions.",
      icon: Globe2,
      visual: "atlas",
    },
    {
      href: "/lab",
      title: "Simulation Lab",
      text: "Orbit, gravity, transit, lensing, and stellar lifecycle controls.",
      icon: Atom,
      visual: "lab",
    },
    {
      href: "/observatory",
      title: "Night Observatory",
      text: "Local sky planning, moon phase, visible objects, and event radar.",
      icon: Telescope,
      className: "md:col-span-2",
      visual: "observatory",
    },
  ];

  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 md:px-10">
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-aurora">Scroll to discover</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-white md:text-4xl">One observatory, four ways in</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          The launch page now previews actual product surfaces instead of ending at a static splash.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {previews.map((preview) => {
          const Icon = preview.icon;
          return (
            <Link
              key={preview.href}
              className={`observatory-frame group min-h-64 overflow-hidden rounded-[1.6rem] p-5 transition hover:-translate-y-1 hover:border-aurora/35 ${preview.className ?? ""}`}
              href={preview.href}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{preview.title}</p>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">{preview.text}</p>
                </div>
                <Icon className="h-6 w-6 shrink-0 text-solar" aria-hidden />
              </div>
              <div className="relative mt-6 h-36 overflow-hidden rounded-2xl border border-white/10 bg-[#040815]">
                <div className="absolute inset-0 star-noise opacity-70" />
                {preview.visual === "command" ? (
                  <div className="absolute inset-4 grid grid-cols-[1.15fr_.85fr] gap-3">
                    <div className="rounded-xl border border-orbit/25 bg-orbit/10 p-3">
                      <div className="h-3 w-28 rounded bg-aurora/70" />
                      <div className="mt-4 h-2 w-44 rounded bg-white/18" />
                      <div className="mt-2 h-2 w-36 rounded bg-white/12" />
                    </div>
                    <div className="rounded-xl border border-solar/25 bg-solar/10 p-3">
                      <div className="mx-auto h-20 w-20 rounded-full border border-solar/30 bg-solar/10" />
                    </div>
                  </div>
                ) : preview.visual === "atlas" ? (
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="h-24 w-24 rounded-full border border-solar/30 bg-solar/20 shadow-[0_0_42px_rgba(255,209,102,.22)]" />
                    <div className="absolute h-28 w-72 rounded-[50%] border border-orbit/35" />
                    <div className="absolute h-16 w-52 rotate-[-20deg] rounded-[50%] border border-aurora/25" />
                  </div>
                ) : preview.visual === "lab" ? (
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 150" aria-hidden>
                    <path d="M20 110 C 88 10, 162 18, 220 82 S 305 132, 340 42" fill="none" stroke="#FFD166" strokeWidth="2" />
                    {[30, 112, 196, 288].map((x, index) => (
                      <circle key={x} cx={x} cy={index % 2 ? 48 : 96} r={7} fill={index === 2 ? "#67E8D0" : "#EAF4FF"} />
                    ))}
                  </svg>
                ) : (
                  <div className="absolute inset-x-0 bottom-0 h-28 rounded-t-full border border-orbit/30 bg-gradient-to-t from-orbit/20 to-transparent">
                    <div className="absolute left-12 top-8 h-2 w-2 rounded-full bg-solar" />
                    <div className="absolute left-32 top-5 h-1.5 w-1.5 rounded-full bg-aurora" />
                    <div className="absolute right-20 top-10 h-2 w-2 rounded-full bg-starlight" />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function LaunchExperience() {
  const hasSeenIntro = useAstraStore((state) => state.hasSeenIntro);
  const dismissIntro = useAstraStore((state) => state.dismissIntro);
  const reducedMotion = useAstraStore((state) => state.settings.reducedMotion);
  const [bootIndex, setBootIndex] = useState(hasSeenIntro ? launchMessages.length : 0);
  const [factIndex, setFactIndex] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const navRoutes = useMemo(() => routes.slice(0, 6), []);

  useEffect(() => {
    if (hasSeenIntro || reducedMotion) {
      setBootIndex(launchMessages.length);
      return;
    }

    const timer = window.setInterval(() => {
      setBootIndex((index) => {
        if (index >= launchMessages.length) {
          window.clearInterval(timer);
          dismissIntro();
          return index;
        }
        return index + 1;
      });
    }, 560);

    return () => window.clearInterval(timer);
  }, [dismissIntro, hasSeenIntro, reducedMotion]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFactIndex((index) => (index + 1) % educationalFacts.length);
    }, 4400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      onPointerMove={(event) => {
        if (event.pointerType === "mouse") {
          pointerX.set(event.clientX / window.innerWidth - 0.5);
          pointerY.set(event.clientY / window.innerHeight - 0.5);
        }
      }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_12%,rgba(91,167,255,.22),transparent_25rem),radial-gradient(circle_at_84%_20%,rgba(157,124,255,.22),transparent_24rem),radial-gradient(circle_at_48%_82%,rgba(103,232,208,.12),transparent_28rem)]" />
      <div className="earth-limb pointer-events-none absolute -right-44 top-[23rem] z-0 h-[30rem] w-[30rem] opacity-70 sm:hidden" aria-hidden />
      <div className="stellar-ring pointer-events-none -right-28 top-[25rem] z-0 h-[16rem] w-[34rem] opacity-45 sm:hidden" aria-hidden />
      <section className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[96rem] flex-col px-5 py-5 md:px-10">
        <header className="flex items-center justify-between gap-4">
          <Link className="group flex items-center gap-3" href="/" aria-label="AstraSetu home">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-aurora/35 bg-aurora/12 text-aurora shadow-[0_0_28px_rgba(103,232,208,.16)]">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block font-display text-lg font-semibold text-white">AstraSetu</span>
              <span className="hidden text-[0.66rem] uppercase tracking-[0.22em] text-slate-400 sm:block">Explore / simulate / understand</span>
            </span>
          </Link>
          <nav className="hidden rounded-full border border-white/10 bg-[#071022]/72 p-1 shadow-astro backdrop-blur-xl lg:flex" aria-label="Launch navigation">
            {navRoutes.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.href}
                  className="flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-slate-300 transition hover:bg-white/8 hover:text-white"
                  href={route.href}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {route.label}
                </Link>
              );
            })}
          </nav>
          <button
            className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-white/14 bg-white/7 px-3 text-sm font-semibold text-slate-200 transition hover:border-aurora/35 hover:bg-aurora/10 sm:px-4"
            type="button"
            onClick={() => {
              setBootIndex(launchMessages.length);
              dismissIntro();
            }}
          >
            <FastForward className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Skip intro</span>
          </button>
        </header>

        <div className="grid flex-1 items-center gap-6 py-8 lg:grid-cols-[0.84fr_1.16fr] lg:py-10 xl:gap-10">
          <div className="relative z-10">
            <BootSequence bootIndex={bootIndex} />

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
              className="mt-6 sm:mt-8"
            >
                <p className="status-chip">Local-first observatory</p>
                <h1
                  className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-normal text-white sm:mt-5 sm:text-6xl xl:text-7xl"
                  aria-label="AstraSetu"
                >
                  Astra<span className="text-aurora">Setu</span>
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-7 text-slate-100 sm:mt-5 md:text-2xl md:leading-8">
                  India&apos;s Interactive Space Science and Mission Exploration Platform
                </p>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:mt-5">
                  Enter a living digital observatory where mission stories, celestial objects, local sky planning, learning quests, and physics simulations connect into one exploration console.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
                  <CosmicButton href="/command" variant="primary" className="min-h-12 px-6">
                    Enter Command Deck <ArrowRight className="h-4 w-4" aria-hidden />
                  </CosmicButton>
                  <CosmicButton href="/atlas" variant="secondary" className="min-h-12 px-6">
                    Explore the Cosmos
                  </CosmicButton>
                </div>
            </motion.div>

            <div className="mt-7 hidden gap-3 sm:grid sm:grid-cols-2">
              {capabilityLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    className="telemetry-panel group flex items-center justify-between gap-3 rounded-2xl p-3 transition hover:border-aurora/35 hover:bg-aurora/10"
                    href={item.href}
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.045] text-aurora">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-white">{item.label}</span>
                        <span className="text-xs text-slate-400">{item.detail}</span>
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-aurora" aria-hidden />
                  </Link>
                );
              })}
            </div>
          </div>

          <MissionOrbitScene fact={educationalFacts[factIndex]} pointerX={pointerX} pointerY={pointerY} />
        </div>
      </section>

      <PreviewSection />

      <footer className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-8 text-sm text-slate-400 md:px-10">
        Built from <span className="font-semibold text-aurora">Bhawanipatna, Odisha</span> for curious minds everywhere
      </footer>
    </div>
  );
}
