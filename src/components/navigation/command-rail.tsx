"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command } from "lucide-react";

import { routes } from "@/data/astrasetu";
import { cn } from "@/lib/utils";

function openPalette() {
  window.dispatchEvent(new CustomEvent("astrasetu:open-palette"));
}

export function CommandRail() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed left-4 top-4 z-50 hidden h-[calc(100vh-2rem)] w-[4.5rem] flex-col items-center gap-3 rounded-[1.35rem] border border-white/12 bg-[#071022]/78 p-3 shadow-astro backdrop-blur-xl md:flex"
      aria-label="Primary"
    >
      <Link
        className="mb-2 grid h-12 w-12 place-items-center rounded-2xl border border-aurora/35 bg-aurora/12 text-aurora"
        href="/"
        aria-label="AstraSetu launch"
      >
        <span className="font-display text-lg font-bold">AS</span>
      </Link>
      <button
        className="grid h-11 w-11 place-items-center rounded-2xl border border-solar/30 bg-solar/10 text-solar transition hover:bg-solar/18"
        type="button"
        aria-label="Open command palette"
        onClick={openPalette}
      >
        <Command className="h-5 w-5" aria-hidden />
      </button>
      <div className="my-2 h-px w-9 bg-white/12" />
      {routes.map((route) => {
        const active = pathname === route.href;
        const Icon = route.icon;
        return (
          <Link
            key={route.href}
            className={cn(
              "group relative grid h-11 w-11 place-items-center rounded-2xl border transition",
              active
                ? "border-orbit/50 bg-orbit/18 text-white"
                : "border-transparent text-slate-400 hover:border-white/12 hover:bg-white/8 hover:text-white",
            )}
            href={route.href}
            aria-label={route.label}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="h-5 w-5" aria-hidden />
            <span className="pointer-events-none absolute left-[3.2rem] z-50 w-max translate-x-2 rounded-xl border border-white/12 bg-[#071022] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-astro transition group-hover:translate-x-0 group-hover:opacity-100">
              {route.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-50 rounded-[1.35rem] border border-white/12 bg-[#071022]/90 p-2 shadow-astro backdrop-blur-xl md:hidden"
      aria-label="Primary mobile"
    >
      <div className="cosmic-scrollbar flex gap-2 overflow-x-auto pb-1">
        <button
          className="grid min-h-12 min-w-12 place-items-center rounded-2xl border border-solar/30 bg-solar/10 text-solar"
          type="button"
          aria-label="Open command palette"
          onClick={openPalette}
        >
          <Command className="h-5 w-5" aria-hidden />
        </button>
        {routes.map((route) => {
          const active = pathname === route.href;
          const Icon = route.icon;
          return (
            <Link
              key={route.href}
              className={cn(
                "flex min-h-12 min-w-[4.9rem] flex-col items-center justify-center gap-1 rounded-2xl border px-2 text-[0.68rem] font-semibold transition",
                active
                  ? "border-orbit/50 bg-orbit/18 text-white"
                  : "border-transparent text-slate-400 hover:bg-white/8 hover:text-white",
              )}
              href={route.href}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {route.shortLabel}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
