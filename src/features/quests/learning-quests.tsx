"use client";

import { ArrowRight, Award, CheckCircle2, Milestone, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { PageHeader } from "@/components/core/page-header";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { DataStatusIndicator } from "@/components/ui/data-status-indicator";
import { HologramPanel } from "@/components/ui/hologram-panel";
import { quests } from "@/data/astrasetu";
import { isQuestComplete, nextQuestStep, questProgress } from "@/lib/quests";
import { useAstraStore } from "@/store/astra-store";

export function LearningQuests() {
  const completed = useAstraStore((state) => state.completedQuestSteps);
  const completeQuestStep = useAstraStore((state) => state.completeQuestStep);
  const [selectedId, setSelectedId] = useState(quests[0].id);
  const selected = quests.find((quest) => quest.id === selectedId) ?? quests[0];
  const progress = questProgress(completed, selected.id);
  const nextStep = nextQuestStep(completed, selected.id);

  return (
    <div className="route-shell">
      <PageHeader
        title="Learning Quests"
        description="A non-childish progress system that turns objects, missions, simulations, and notes into meaningful exploration paths."
        status="Demo data"
      />

      <div className="grid gap-5 xl:grid-cols-[.42fr_1fr]">
        <aside className="grid gap-5">
          <HologramPanel>
            <h2 className="font-display text-2xl font-semibold text-white">Quest paths</h2>
            <div className="mt-5 space-y-3">
              {quests.map((quest) => {
                const questPercent = questProgress(completed, quest.id);
                return (
                  <button
                    key={quest.id}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      quest.id === selected.id
                        ? "border-solar/45 bg-solar/10"
                        : "border-white/10 bg-white/[0.035] hover:border-orbit/30 hover:bg-orbit/10"
                    }`}
                    type="button"
                    onClick={() => setSelectedId(quest.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span>
                        <span className="block font-semibold text-starlight">{quest.title}</span>
                        <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-slate-400">
                          {quest.track}
                        </span>
                      </span>
                      <span className="font-display text-xl font-semibold text-aurora">{questPercent}%</span>
                    </div>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-aurora" style={{ width: `${questPercent}%` }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </HologramPanel>

          <HologramPanel>
            <h2 className="font-display text-2xl font-semibold text-white">Explorer reward</h2>
            <div className="mt-5 rounded-2xl border border-solar/25 bg-solar/10 p-5">
              <Award className="h-8 w-8 text-solar" aria-hidden />
              <p className="mt-4 text-lg font-semibold text-white">{selected.reward}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {isQuestComplete(completed, selected.id)
                  ? "Unlocked locally. This is a demo achievement, not an external account badge."
                  : "Complete every checkpoint to unlock this local achievement."}
              </p>
            </div>
          </HologramPanel>
        </aside>

        <section className="grid gap-5">
          <HologramPanel>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <DataStatusIndicator status={selected.status} />
                <h2 className="mt-5 font-display text-4xl font-semibold text-white">{selected.title}</h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">{selected.description}</p>
              </div>
              {nextStep ? (
                <CosmicButton href={nextStep.route} variant="primary">
                  Start next step <ArrowRight className="h-4 w-4" aria-hidden />
                </CosmicButton>
              ) : (
                <CosmicButton href="/command" variant="secondary">
                  Return to deck
                </CosmicButton>
              )}
            </div>

            <div className="relative mt-8 min-h-80 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#050714]/80 p-6">
              <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 900 360" aria-hidden>
                <path d="M120 235 C 260 60, 410 284, 550 120 S 760 72, 820 230" fill="none" stroke="rgba(91,167,255,.24)" strokeWidth="2" strokeDasharray="8 10" />
              </svg>
              <div className="relative grid gap-4 md:grid-cols-3">
                {selected.steps.map((step, index) => {
                  const done = completed.includes(step.id);
                  return (
                    <article key={step.id} className="rounded-[1.2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur">
                      <div className="flex items-center justify-between gap-3">
                        <span className={`grid h-11 w-11 place-items-center rounded-full border ${done ? "border-aurora/45 bg-aurora/16 text-aurora" : "border-white/16 bg-white/8 text-slate-300"}`}>
                          {done ? <CheckCircle2 className="h-5 w-5" aria-hidden /> : <Milestone className="h-5 w-5" aria-hidden />}
                        </span>
                        <span className="text-xs uppercase tracking-[0.16em] text-slate-400">Checkpoint {index + 1}</span>
                      </div>
                      <h3 className="mt-5 font-display text-xl font-semibold text-white">{step.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 text-sm font-semibold text-slate-200 transition hover:bg-white/10" href={step.route}>
                          Open <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <button
                          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-aurora/25 bg-aurora/10 px-4 text-sm font-semibold text-aurora transition hover:bg-aurora/16 disabled:opacity-60"
                          type="button"
                          disabled={done}
                          onClick={() => completeQuestStep(step.id)}
                        >
                          {done ? "Complete" : "Mark Complete"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </HologramPanel>

          <HologramPanel>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Quest progress", `${progress}%`],
                ["Completed steps", completed.length.toString()],
                ["Active path", selected.track],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                  <Sparkles className="h-5 w-5 text-aurora" aria-hidden />
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </HologramPanel>
        </section>
      </div>
    </div>
  );
}
