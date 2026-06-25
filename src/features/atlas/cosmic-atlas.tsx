"use client";

import { Bookmark, CheckCircle2, Filter, LinkIcon, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ObjectField } from "@/components/charts/object-field";
import { PageHeader } from "@/components/core/page-header";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { DataStatusIndicator } from "@/components/ui/data-status-indicator";
import { HologramPanel } from "@/components/ui/hologram-panel";
import { celestialObjects } from "@/data/astrasetu";
import { cn } from "@/lib/utils";
import { useAstraStore } from "@/store/astra-store";
import type { CelestialType } from "@/types/domain";

const types: Array<CelestialType | "All"> = [
  "All",
  "Planet",
  "Moon",
  "Star",
  "Nebula",
  "Galaxy",
  "Exoplanet",
  "Cluster",
];

export function CosmicAtlas({ initialObject }: { initialObject?: string }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<CelestialType | "All">("All");
  const [selectedSlug, setSelectedSlug] = useState(initialObject ?? celestialObjects[0].slug);
  const discovered = useAstraStore((state) => state.discoveredObjects);
  const saved = useAstraStore((state) => state.savedObjects);
  const markObjectDiscovered = useAstraStore((state) => state.markObjectDiscovered);
  const toggleSavedObject = useAstraStore((state) => state.toggleSavedObject);

  useEffect(() => {
    if (initialObject) setSelectedSlug(initialObject);
  }, [initialObject]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return celestialObjects.filter((object) => {
      const typeMatch = type === "All" || object.type === type;
      const queryMatch =
        !normalized ||
        `${object.name} ${object.type} ${object.summary} ${object.relations.join(" ")}`
          .toLowerCase()
          .includes(normalized);
      return typeMatch && queryMatch;
    });
  }, [query, type]);

  const selected =
    celestialObjects.find((object) => object.slug === selectedSlug) ?? filtered[0] ?? celestialObjects[0];

  return (
    <div className="route-shell">
      <PageHeader
        title="Cosmic Atlas"
        description="A searchable object field for planets, moons, nebulae, galaxies, clusters, stars, and exoplanets with source labels and local discovery state."
        status="Verified static data"
      >
        <CosmicButton href="/notebook?action=new" variant="ghost">
          Write observation
        </CosmicButton>
      </PageHeader>

      <div className="grid gap-5 xl:grid-cols-[1fr_.42fr]">
        <section className="grid gap-5">
          <HologramPanel>
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
                <input
                  className="min-h-12 w-full rounded-2xl border border-white/10 bg-white/[0.055] pl-11 pr-4 text-sm text-white placeholder:text-slate-500"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search Jupiter, Orion, exoplanets, galaxies..."
                />
              </label>
              <div className="cosmic-scrollbar flex gap-2 overflow-x-auto">
                {types.map((item) => (
                  <button
                    key={item}
                    className={cn(
                      "min-h-11 rounded-full border px-4 text-sm font-semibold transition",
                      item === type
                        ? "border-aurora/50 bg-aurora text-slate-950"
                        : "border-white/10 bg-white/[0.045] text-slate-300 hover:bg-white/10",
                    )}
                    type="button"
                    onClick={() => setType(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </HologramPanel>

          <ObjectField objects={filtered.length ? filtered : celestialObjects} selectedSlug={selected.slug} onSelect={setSelectedSlug} />

          <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
            <HologramPanel>
              <div className="flex items-center gap-2 text-sm font-semibold text-aurora">
                <Filter className="h-4 w-4" aria-hidden />
                Object catalogue
              </div>
              <div className="cosmic-scrollbar mt-4 max-h-80 space-y-2 overflow-y-auto pr-1">
                {(filtered.length ? filtered : celestialObjects).map((object) => (
                  <button
                    key={object.slug}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition",
                      selected.slug === object.slug
                        ? "border-solar/45 bg-solar/10"
                        : "border-white/10 bg-white/[0.035] hover:border-orbit/30 hover:bg-orbit/10",
                    )}
                    type="button"
                    onClick={() => setSelectedSlug(object.slug)}
                  >
                    <span
                      className="h-9 w-9 shrink-0 rounded-full border border-white/20"
                      style={{ background: object.color }}
                      aria-hidden
                    />
                    <span>
                      <span className="block font-semibold text-starlight">{object.name}</span>
                      <span className="text-xs text-slate-400">{object.type}</span>
                    </span>
                  </button>
                ))}
              </div>
            </HologramPanel>

            <HologramPanel>
              <h2 className="font-display text-2xl font-semibold text-white">Relationship map</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Relationships are curated reference links, not generated live search results.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {selected.relations.map((relation) => (
                  <span key={relation} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-slate-200">
                    <LinkIcon className="h-4 w-4 text-orbit" aria-hidden />
                    {relation}
                  </span>
                ))}
              </div>
            </HologramPanel>
          </div>
        </section>

        <aside className="grid gap-5">
          <HologramPanel className="sticky top-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <DataStatusIndicator status={selected.status} />
                <h2 className="mt-5 font-display text-3xl font-semibold text-white">{selected.name}</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-400">{selected.type}</p>
              </div>
              <div
                className="h-20 w-20 shrink-0 rounded-full border border-white/20 shadow-[0_0_42px_rgba(91,167,255,.2)]"
                style={{ background: selected.color }}
                aria-hidden
              />
            </div>
            <p className="mt-5 text-base leading-7 text-slate-200">{selected.summary}</p>
            <div className="mt-5 grid gap-3">
              {[
                ["Distance", selected.distance],
                ["Composition", selected.composition],
                ["Visibility", selected.visibility],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-starlight">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-aurora/20 bg-aurora/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-aurora">Why it matters</p>
              <p className="mt-2 text-sm leading-6 text-starlight">{selected.whyItMatters}</p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <CosmicButton onClick={() => markObjectDiscovered(selected.slug)} variant="primary">
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                {discovered.includes(selected.slug) ? "Discovered" : "Mark discovered"}
              </CosmicButton>
              <CosmicButton onClick={() => toggleSavedObject(selected.slug)} variant="ghost">
                <Bookmark className="h-4 w-4" aria-hidden />
                {saved.includes(selected.slug) ? "Saved" : "Save"}
              </CosmicButton>
            </div>
          </HologramPanel>

          <HologramPanel>
            <h2 className="font-display text-xl font-semibold text-white">Constellation explorer</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              This first version models constellation links as curated educational relationships. A verified live catalogue can plug into the provider layer later.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-aurora">
              <Sparkles className="h-4 w-4" aria-hidden />
              {selected.relations.length} relationship nodes available
            </div>
          </HologramPanel>
        </aside>
      </div>
    </div>
  );
}
