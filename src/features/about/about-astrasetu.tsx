import Image from "next/image";
import { ArrowRight, BookOpenText, Database, Rocket, ShieldCheck } from "lucide-react";

import { PageHeader } from "@/components/core/page-header";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { DataStatusIndicator } from "@/components/ui/data-status-indicator";
import { HologramPanel } from "@/components/ui/hologram-panel";
import { designConcepts, sourceTransparency } from "@/data/astrasetu";

export function AboutAstraSetu() {
  return (
    <div className="route-shell">
      <PageHeader
        title="About AstraSetu"
        description="A flagship local-first space-science platform built around wonder, transparency, Indian scientific curiosity, and real interaction."
        status="Demo data"
      >
        <CosmicButton href="/command" variant="primary">
          Enter Command Deck <ArrowRight className="h-4 w-4" aria-hidden />
        </CosmicButton>
      </PageHeader>

      <div className="grid gap-5 xl:grid-cols-[1fr_.42fr]">
        <section className="grid gap-5">
          <HologramPanel>
            <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
              <div>
                <Rocket className="h-8 w-8 text-solar" aria-hidden />
                <h2 className="mt-5 font-display text-3xl font-semibold text-white">
                  Product philosophy
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  AstraSetu is designed as a bridge between cinematic mission control, cosmic atlas, simulation laboratory, personal observatory, and research notebook. It avoids pretending demo data is live and focuses on making scientific relationships understandable through interaction.
                </p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-[#050714]/80 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Experience arc</p>
                <div className="mt-5 grid gap-3">
                  {["Arrival", "System awakening", "Mission orientation", "Cosmic exploration", "Scientific experimentation", "Saved research", "Reason to return"].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-aurora/12 text-sm font-semibold text-aurora">{index + 1}</span>
                      <span className="font-semibold text-starlight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </HologramPanel>

          <HologramPanel>
            <div className="flex items-center gap-3">
              <BookOpenText className="h-6 w-6 text-aurora" aria-hidden />
              <h2 className="font-display text-3xl font-semibold text-white">Design concepts</h2>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              These generated concept screens are stored in the project as visual direction references. The shipped UI is implemented as code-native controls, not pasted screenshots.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {designConcepts.map((concept) => (
                <figure key={concept.src} className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/[0.035]">
                  <Image
                    src={concept.src}
                    alt={`${concept.label} AstraSetu concept`}
                    width={1024}
                    height={768}
                    className="aspect-video w-full object-cover"
                  />
                  <figcaption className="border-t border-white/10 p-3 text-sm font-semibold text-slate-200">
                    {concept.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </HologramPanel>
        </section>

        <aside className="grid gap-5">
          <HologramPanel>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-aurora" aria-hidden />
              <h2 className="font-display text-2xl font-semibold text-white">Data posture</h2>
            </div>
            <div className="mt-5 space-y-4">
              {sourceTransparency.slice(0, 4).map((source) => (
                <div key={source.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <DataStatusIndicator status={source.label} compact />
                  <p className="mt-3 text-sm leading-6 text-slate-300">{source.description}</p>
                </div>
              ))}
            </div>
          </HologramPanel>

          <HologramPanel>
            <Database className="h-7 w-7 text-solar" aria-hidden />
            <h2 className="mt-4 font-display text-2xl font-semibold text-white">Architecture ready for more</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The v1 architecture separates seed data, provider interfaces, local persistence, simulation utilities, route features, and API handlers so future verified live data, auth, and database sync can be added cleanly.
            </p>
            <CosmicButton className="mt-5" href="/settings" variant="ghost">
              Review data labels
            </CosmicButton>
          </HologramPanel>
        </aside>
      </div>
    </div>
  );
}
