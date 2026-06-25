import { AlertTriangle, Loader2, Telescope } from "lucide-react";

import { CosmicButton } from "@/components/ui/cosmic-button";

export function LoadingOrbit({ label = "Calibrating AstraSetu" }: { label?: string }) {
  return (
    <div className="thin-panel flex min-h-44 items-center justify-center gap-3 rounded-2xl p-6 text-sm text-slate-300">
      <Loader2 className="h-5 w-5 animate-spin text-aurora" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="thin-panel rounded-2xl p-6 text-center">
      <Telescope className="mx-auto mb-3 h-8 w-8 text-orbit" aria-hidden />
      <h3 className="font-display text-lg font-semibold text-starlight">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-300">{description}</p>
      {actionLabel && onAction ? (
        <CosmicButton className="mt-4" onClick={onAction} variant="ghost">
          {actionLabel}
        </CosmicButton>
      ) : null}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="thin-panel rounded-2xl border-mars/30 p-5 text-sm text-mars">
      <AlertTriangle className="mb-2 h-5 w-5" aria-hidden />
      <strong className="block text-starlight">AstraSetu caught an error state.</strong>
      <span>{message}</span>
    </div>
  );
}
