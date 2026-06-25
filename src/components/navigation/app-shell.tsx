"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { ToastSystem } from "@/components/feedback/toast-system";
import { CommandPalette } from "@/components/navigation/command-palette";
import { CommandRail, MobileNavigation } from "@/components/navigation/command-rail";
import { CosmicBackground } from "@/components/scene/cosmic-background";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLaunch = pathname === "/";

  return (
    <>
      <CosmicBackground />
      <a
        className="fixed left-4 top-4 z-[90] -translate-y-20 rounded-full bg-aurora px-4 py-2 text-sm font-semibold text-slate-950 transition focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a>
      {!isLaunch ? (
        <>
          <CommandRail />
          <MobileNavigation />
        </>
      ) : null}
      <main id="main">{children}</main>
      <CommandPalette />
      <ToastSystem />
    </>
  );
}
