"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Compass, Search, Shuffle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { celestialObjects } from "@/data/astrasetu";
import { filterCommandResults } from "@/lib/search";
import { useAstraStore } from "@/store/astra-store";

export function CommandPalette() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pushToast = useAstraStore((state) => state.pushToast);

  const results = useMemo(() => filterCommandResults(query), [query]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    }

    function handleOpenPalette() {
      setOpen(true);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("astrasetu:open-palette", handleOpenPalette);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("astrasetu:open-palette", handleOpenPalette);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(id);
  }, [open]);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  function randomObject() {
    const index = Math.floor(Math.random() * celestialObjects.length);
    const object = celestialObjects[index];
    pushToast({
      tone: "info",
      title: `Random discovery: ${object.name}`,
      description: object.summary,
    });
    go(`/atlas?object=${object.slug}`);
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] bg-black/50 p-3 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="AstraSetu command palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="absolute inset-0 cursor-default" type="button" onClick={() => setOpen(false)}>
            <span className="sr-only">Close command palette</span>
          </button>
          <motion.div
            className="glass-panel relative mx-auto mt-[8vh] w-full max-w-2xl overflow-hidden rounded-[1.35rem]"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 p-4">
              <Search className="h-5 w-5 text-aurora" aria-hidden />
              <input
                ref={inputRef}
                className="min-h-11 flex-1 bg-transparent text-base text-white placeholder:text-slate-500"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Navigate, search objects, open simulations..."
                aria-label="Search AstraSetu commands"
              />
              <button
                className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                type="button"
                aria-label="Close command palette"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="max-h-[56vh] overflow-y-auto p-3">
              <button
                className="mb-3 flex w-full items-center gap-3 rounded-2xl border border-aurora/25 bg-aurora/10 p-3 text-left text-sm transition hover:bg-aurora/16"
                type="button"
                onClick={randomObject}
              >
                <Shuffle className="h-5 w-5 text-aurora" aria-hidden />
                <span>
                  <span className="block font-semibold text-starlight">Discover random object</span>
                  <span className="text-xs text-slate-300">Open a seeded atlas entry and record curiosity.</span>
                </span>
              </button>
              <div className="space-y-2">
                {results.map((result) => (
                  <button
                    key={result.id}
                    className="flex w-full items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.035] p-3 text-left transition hover:border-orbit/35 hover:bg-orbit/10"
                    type="button"
                    onClick={() => go(result.href)}
                  >
                    <Compass className="mt-1 h-4 w-4 text-orbit" aria-hidden />
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-sm font-semibold text-starlight">
                        {result.label}
                        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.1em] text-slate-400">
                          {result.group}
                        </span>
                      </span>
                      <span className="mt-1 line-clamp-2 text-xs leading-5 text-slate-300">
                        {result.description}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
