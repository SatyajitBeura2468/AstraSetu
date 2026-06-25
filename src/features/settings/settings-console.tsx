"use client";

import { Download, RotateCcw, Save, ShieldCheck, SlidersHorizontal, UserRound } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/core/page-header";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { DataStatusIndicator } from "@/components/ui/data-status-indicator";
import { HologramPanel } from "@/components/ui/hologram-panel";
import { sourceTransparency } from "@/data/astrasetu";
import { useAstraStore } from "@/store/astra-store";

export function SettingsConsole() {
  const state = useAstraStore((store) => store);
  const [name, setName] = useState(state.explorerName);
  const [location, setLocation] = useState(state.settings.observerLabel);

  function exportDemoData() {
    const payload = JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        source: "AstraSetu local-first demo state",
        explorerName: state.explorerName,
        discoveredObjects: state.discoveredObjects,
        savedObjects: state.savedObjects,
        savedMissions: state.savedMissions,
        savedSimulations: state.savedSimulations,
        completedQuestSteps: state.completedQuestSteps,
        notebookEntries: state.notebookEntries,
        settings: state.settings,
      },
      null,
      2,
    );
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "astrasetu-demo-data.json";
    anchor.click();
    URL.revokeObjectURL(url);
    state.pushToast({ tone: "success", title: "Demo data exported" });
  }

  function reset() {
    if (window.confirm("Reset all AstraSetu local demo data in this browser?")) {
      state.resetLocalData();
      setName("Astra Explorer");
      setLocation("Bhawanipatna, Odisha");
    }
  }

  return (
    <div className="route-shell">
      <PageHeader
        title="Settings"
        description="Control local profile, observatory preferences, accessibility, and data transparency. No login or external account is used in version one."
        status="Demo data"
      />

      <div className="grid gap-5 xl:grid-cols-[.95fr_1.05fr]">
        <section className="grid gap-5">
          <HologramPanel>
            <div className="flex items-center gap-3">
              <UserRound className="h-6 w-6 text-aurora" aria-hidden />
              <h2 className="font-display text-3xl font-semibold text-white">Explorer profile</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
              <label>
                <span className="control-label">Explorer name</span>
                <input
                  className="mt-3 min-h-12 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-white"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <CosmicButton className="self-end" onClick={() => state.setExplorerName(name)} variant="primary">
                <Save className="h-4 w-4" aria-hidden />
                Save profile
              </CosmicButton>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-4">
              {[
                ["Level", "Orbital Learner"],
                ["Streak", state.streak],
                ["Discoveries", state.discoveredObjects.length],
                ["Achievements", state.completedQuestSteps.length],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </HologramPanel>

          <HologramPanel id="accessibility">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="h-6 w-6 text-aurora" aria-hidden />
              <h2 className="font-display text-3xl font-semibold text-white">Observatory and accessibility</h2>
            </div>
            <div className="mt-6 grid gap-5">
              <label>
                <span className="control-label">Observer location</span>
                <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
                  <input
                    className="min-h-12 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-white"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                  />
                  <CosmicButton
                    onClick={() => state.setSettings({ observerLabel: location })}
                    variant="secondary"
                  >
                    Save location
                  </CosmicButton>
                </div>
              </label>
              <Toggle
                checked={state.settings.reducedMotion}
                label="Reduce motion"
                description="Pause unnecessary parallax and continuous motion while retaining clear state changes."
                onChange={(value) => state.setSettings({ reducedMotion: value })}
              />
              <Toggle
                checked={state.settings.highContrast}
                label="High contrast surfaces"
                description="Increase panel contrast for dense control surfaces."
                onChange={(value) => state.setSettings({ highContrast: value })}
              />
            </div>
          </HologramPanel>

          <HologramPanel>
            <h2 className="font-display text-3xl font-semibold text-white">Local data controls</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              These actions affect only this browser. AstraSetu v1 does not upload your profile, notebook, or progress.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <CosmicButton onClick={exportDemoData} variant="ghost">
                <Download className="h-4 w-4" aria-hidden />
                Export demo data
              </CosmicButton>
              <CosmicButton onClick={reset} variant="danger">
                <RotateCcw className="h-4 w-4" aria-hidden />
                Reset local data
              </CosmicButton>
            </div>
          </HologramPanel>
        </section>

        <aside className="grid gap-5">
          <HologramPanel>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-aurora" aria-hidden />
              <h2 className="font-display text-3xl font-semibold text-white">Data transparency</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              AstraSetu distinguishes stable reference facts, demo content, simulations, local calculations, seeded planning prompts, and future live integrations.
            </p>
            <div className="mt-6 space-y-4">
              {sourceTransparency.map((source) => (
                <div key={source.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <DataStatusIndicator status={source.label} />
                  <p className="mt-3 text-sm leading-6 text-slate-300">{source.description}</p>
                </div>
              ))}
            </div>
          </HologramPanel>
        </aside>
      </div>
    </div>
  );
}

function Toggle({
  checked,
  label,
  description,
  onChange,
}: {
  checked: boolean;
  label: string;
  description: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <div>
        <p className="font-semibold text-starlight">{label}</p>
        <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>
      </div>
      <button
        className={`relative h-8 w-14 rounded-full border transition ${
          checked ? "border-aurora bg-aurora/40" : "border-white/20 bg-white/10"
        }`}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
            checked ? "left-7" : "left-1"
          }`}
        />
        <span className="sr-only">{label}</span>
      </button>
    </div>
  );
}
