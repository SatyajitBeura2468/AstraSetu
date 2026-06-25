"use client";

import { Download, FileUp, LinkIcon, NotebookPen, Plus, Save, Trash2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { PageHeader } from "@/components/core/page-header";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { EmptyState } from "@/components/ui/state-panels";
import { HologramPanel } from "@/components/ui/hologram-panel";
import { celestialObjects, missions, simulationKinds } from "@/data/astrasetu";
import { exportNotebook } from "@/lib/notebook";
import { useAstraStore } from "@/store/astra-store";
import type { NotebookEntry } from "@/types/domain";

const linkedOptions = [
  ...celestialObjects.map((object) => object.name),
  ...missions.map((mission) => mission.name),
  ...simulationKinds,
];

export function ResearchNotebook() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const entries = useAstraStore((state) => state.notebookEntries);
  const addNotebookEntry = useAstraStore((state) => state.addNotebookEntry);
  const updateEntry = useAstraStore((state) => state.updateNotebookEntry);
  const deleteEntry = useAstraStore((state) => state.deleteNotebookEntry);
  const importEntries = useAstraStore((state) => state.importNotebookEntries);
  const pushToast = useAstraStore((state) => state.pushToast);
  const [selectedId, setSelectedId] = useState(entries[0]?.id ?? "new");
  const selected = useMemo(() => entries.find((entry) => entry.id === selectedId), [entries, selectedId]);
  const [draft, setDraft] = useState({
    title: "",
    body: "",
    tags: "observation",
    linkedItem: linkedOptions[0],
  });

  function newEntry() {
    setSelectedId("new");
    setDraft({ title: "", body: "", tags: "observation", linkedItem: linkedOptions[0] });
  }

  function edit(entry: NotebookEntry) {
    setSelectedId(entry.id);
    setDraft({
      title: entry.title,
      body: entry.body,
      tags: entry.tags.join(", "),
      linkedItem: entry.linkedItem ?? linkedOptions[0],
    });
  }

  function save() {
    if (selected && selectedId !== "new") {
      updateEntry(selected.id, draft);
    } else {
      const entry = addNotebookEntry(draft);
      setSelectedId(entry.id);
      setDraft({
        title: entry.title,
        body: entry.body,
        tags: entry.tags.join(", "),
        linkedItem: entry.linkedItem ?? linkedOptions[0],
      });
    }
  }

  function downloadExport() {
    const blob = new Blob([exportNotebook(entries)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "astrasetu-notebook-export.json";
    anchor.click();
    URL.revokeObjectURL(url);
    pushToast({
      tone: "success",
      title: "Research exported",
      description: "A local JSON export has been downloaded.",
    });
  }

  async function importFile(file?: File) {
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as { entries?: NotebookEntry[] } | NotebookEntry[];
      const nextEntries = Array.isArray(parsed) ? parsed : parsed.entries;
      if (!Array.isArray(nextEntries)) throw new Error("Missing entries array");
      importEntries(nextEntries);
    } catch (error) {
      pushToast({
        tone: "error",
        title: "Import failed",
        description: error instanceof Error ? error.message : "The file could not be parsed.",
      });
    }
  }

  return (
    <div className="route-shell">
      <PageHeader
        title="Research Notebook"
        description="A local-only research space for observations, simulation notes, mission reflections, tags, linked items, and portable demo exports."
        status="Demo data"
      >
        <CosmicButton onClick={newEntry} variant="primary">
          <Plus className="h-4 w-4" aria-hidden />
          New Entry
        </CosmicButton>
      </PageHeader>

      <div className="grid gap-5 xl:grid-cols-[.42fr_1fr]">
        <aside className="grid gap-5">
          <HologramPanel>
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-semibold text-white">Entries</h2>
              <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-slate-300">
                {entries.length} local
              </span>
            </div>
            <div className="cosmic-scrollbar mt-5 max-h-[34rem] space-y-3 overflow-y-auto pr-1">
              {entries.length === 0 ? (
                <EmptyState title="No research entries yet" description="Create a note after inspecting an object, mission, or simulation." />
              ) : (
                entries.map((entry) => (
                  <button
                    key={entry.id}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      entry.id === selectedId
                        ? "border-solar/45 bg-solar/10"
                        : "border-white/10 bg-white/[0.035] hover:border-orbit/30 hover:bg-orbit/10"
                    }`}
                    type="button"
                    onClick={() => edit(entry)}
                  >
                    <p className="font-semibold text-starlight">{entry.title}</p>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{entry.body}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white/[0.06] px-2 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                ))
              )}
            </div>
          </HologramPanel>

          <HologramPanel>
            <h2 className="font-display text-2xl font-semibold text-white">Import / export</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Notebook data stays in this browser unless you export it. Imports replace the local notebook set.
            </p>
            <div className="mt-5 grid gap-3">
              <CosmicButton onClick={downloadExport} variant="ghost">
                <Download className="h-4 w-4" aria-hidden />
                Export Research
              </CosmicButton>
              <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                accept="application/json"
                onChange={(event) => importFile(event.target.files?.[0])}
              />
              <CosmicButton onClick={() => fileInputRef.current?.click()} variant="secondary">
                <FileUp className="h-4 w-4" aria-hidden />
                Import Research
              </CosmicButton>
            </div>
          </HologramPanel>
        </aside>

        <HologramPanel>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <NotebookPen className="h-6 w-6 text-aurora" aria-hidden />
              <h2 className="font-display text-3xl font-semibold text-white">
                {selected ? "Edit observation" : "New observation"}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {selected ? (
                <CosmicButton onClick={() => deleteEntry(selected.id)} variant="danger">
                  <Trash2 className="h-4 w-4" aria-hidden />
                  Delete
                </CosmicButton>
              ) : null}
              <CosmicButton onClick={save} variant="primary">
                <Save className="h-4 w-4" aria-hidden />
                Save Entry
              </CosmicButton>
            </div>
          </div>

          <div className="mt-6 grid gap-5">
            <label className="block">
              <span className="control-label">Title</span>
              <input
                className="mt-3 min-h-12 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-white placeholder:text-slate-500"
                value={draft.title}
                onChange={(event) => setDraft((value) => ({ ...value, title: event.target.value }))}
                placeholder="e.g. Jupiter moon resonance notes"
              />
            </label>
            <label className="block">
              <span className="control-label">Linked object, mission, or simulation</span>
              <select
                className="mt-3 min-h-12 w-full rounded-2xl border border-white/10 bg-[#0B1022] px-4 text-white"
                value={draft.linkedItem}
                onChange={(event) => setDraft((value) => ({ ...value, linkedItem: event.target.value }))}
              >
                {linkedOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="control-label">Tags</span>
              <input
                className="mt-3 min-h-12 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-white placeholder:text-slate-500"
                value={draft.tags}
                onChange={(event) => setDraft((value) => ({ ...value, tags: event.target.value }))}
                placeholder="moon, mission, orbit"
              />
            </label>
            <label className="block">
              <span className="control-label">
                <span>Research body</span>
                <span className="inline-flex items-center gap-1 text-aurora">
                  <LinkIcon className="h-4 w-4" aria-hidden />
                  Local autosave on submit
                </span>
              </span>
              <textarea
                className="mt-3 min-h-72 w-full resize-y rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-4 text-sm leading-7 text-white placeholder:text-slate-500"
                value={draft.body}
                onChange={(event) => setDraft((value) => ({ ...value, body: event.target.value }))}
                placeholder="Record what you noticed, what changed, and what you want to verify next."
              />
            </label>
          </div>
        </HologramPanel>
      </div>
    </div>
  );
}
