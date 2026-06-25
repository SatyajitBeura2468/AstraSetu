"use client";

import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Command, FastForward, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CosmicButton } from "@/components/ui/cosmic-button";
import { educationalFacts, launchMessages, routes } from "@/data/astrasetu";
import { useAstraStore } from "@/store/astra-store";

export function LaunchExperience() {
  const hasSeenIntro = useAstraStore((state) => state.hasSeenIntro);
  const dismissIntro = useAstraStore((state) => state.dismissIntro);
  const reducedMotion = useAstraStore((state) => state.settings.reducedMotion);
  const [bootIndex, setBootIndex] = useState(hasSeenIntro ? launchMessages.length : 0);
  const [factIndex, setFactIndex] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const planetX = useTransform(pointerX, [-0.5, 0.5], [-16, 16]);
  const planetY = useTransform(pointerY, [-0.5, 0.5], [10, -10]);

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
    }, 620);

    return () => window.clearInterval(timer);
  }, [dismissIntro, hasSeenIntro, reducedMotion]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFactIndex((index) => (index + 1) % educationalFacts.length);
    }, 4400);
    return () => window.clearInterval(timer);
  }, []);

  const ready = bootIndex >= launchMessages.length;

  return (
    <section
      className="relative flex min-h-screen overflow-hidden px-5 py-5 md:px-10"
      onPointerMove={(event) => {
        pointerX.set(event.clientX / window.innerWidth - 0.5);
        pointerY.set(event.clientY / window.innerHeight - 0.5);
      }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(91,167,255,.18),transparent_24rem),radial-gradient(circle_at_88%_10%,rgba(255,209,102,.12),transparent_20rem)]" />
      <motion.div
        className="pointer-events-none absolute -right-28 bottom-[-18rem] h-[42rem] w-[42rem] rounded-full border border-orbit/20 bg-[radial-gradient(circle_at_35%_30%,rgba(255,209,102,.26),rgba(91,167,255,.08)_34%,rgba(5,7,20,.84)_64%)] shadow-[0_0_120px_rgba(91,167,255,.18)] md:-right-12 md:bottom-[-15rem] md:h-[54rem] md:w-[54rem]"
        style={{ x: planetX, y: planetY }}
        aria-hidden
      />
      <div className="pointer-events-none absolute left-[4%] top-[18%] h-[32rem] w-[62rem] -rotate-12 rounded-[50%] border border-orbit/20" aria-hidden />
      <div className="pointer-events-none absolute left-[8%] top-[22%] h-[25rem] w-[54rem] -rotate-12 rounded-[50%] border border-aurora/10" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-7xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <Link className="flex items-center gap-3" href="/" aria-label="AstraSetu home">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-aurora/35 bg-aurora/12 text-aurora">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-display text-lg font-semibold text-white">AstraSetu</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-300 lg:flex" aria-label="Launch navigation">
            {routes.slice(0, 6).map((route) => (
              <Link key={route.href} className="transition hover:text-white" href={route.href}>
                {route.label}
              </Link>
            ))}
          </nav>
          <button
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            type="button"
            onClick={() => {
              setBootIndex(launchMessages.length);
              dismissIntro();
            }}
          >
            <FastForward className="h-4 w-4" aria-hidden />
            Skip intro
          </button>
        </header>

        <div className="grid flex-1 items-center gap-8 py-16 lg:grid-cols-[1.06fr_.94fr] lg:py-10">
          <div>
            <div className="mb-7 max-w-xl rounded-[1.35rem] border border-white/12 bg-black/24 p-4 font-mono text-xs text-slate-300 shadow-astro backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-2 text-aurora">
                <Command className="h-4 w-4" aria-hidden />
                System awakening
              </div>
              <div className="space-y-2">
                {launchMessages.map((message, index) => (
                  <div key={message} className={index < bootIndex ? "text-slate-200" : "text-slate-600"}>
                    <span className="text-solar">{index < bootIndex ? "OK" : "--"}</span> {message}
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={ready ? "ready" : "booting"}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: reducedMotion ? 0 : 0.45 }}
              >
                <h1 className="font-display text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
                  AstraSetu
                </h1>
                <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-200 md:text-2xl">
                  India&apos;s Interactive Space Science and Mission Exploration Platform
                </p>
                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">
                  Enter a local-first observatory where missions, celestial objects, learning quests, and scientific simulations connect into one living exploration console.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <CosmicButton href="/command" variant="primary">
                    Enter Command Deck <ArrowRight className="h-4 w-4" aria-hidden />
                  </CosmicButton>
                  <CosmicButton href="/atlas" variant="secondary">
                    Explore the Cosmos
                  </CosmicButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative min-h-[28rem] lg:min-h-[38rem]">
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-astro backdrop-blur-sm" />
            <div className="absolute inset-5 rounded-[1.6rem] border border-orbit/20 bg-[radial-gradient(circle_at_40%_22%,rgba(91,167,255,.22),transparent_24%),radial-gradient(circle_at_70%_72%,rgba(103,232,208,.13),transparent_26%)]" />
            <div className="absolute left-10 right-10 top-10 rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Discovery ticker</p>
              <p className="mt-3 min-h-12 text-sm leading-6 text-starlight">{educationalFacts[factIndex]}</p>
            </div>
            <div className="absolute bottom-10 left-8 right-8 grid gap-3 sm:grid-cols-3">
              {["Mission stories", "Object atlas", "Simulation lab"].map((item, index) => (
                <div key={item} className="signal-line rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">Module {index + 1}</p>
                  <p className="mt-2 font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="pb-3 text-sm text-slate-400">
          Built from Bhawanipatna, Odisha for curious minds everywhere
        </footer>
      </div>
    </section>
  );
}
