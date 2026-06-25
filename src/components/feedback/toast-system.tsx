"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useEffect } from "react";

import { useAstraStore } from "@/store/astra-store";

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

export function ToastSystem() {
  const toasts = useAstraStore((state) => state.toasts);
  const removeToast = useAstraStore((state) => state.removeToast);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((toast) => window.setTimeout(() => removeToast(toast.id), 4400));
    return () => timers.forEach(window.clearTimeout);
  }, [removeToast, toasts]);

  return (
    <div
      className="fixed right-4 top-4 z-[80] flex w-[min(26rem,calc(100vw-2rem))] flex-col gap-3"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.tone];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              className="glass-panel rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 text-aurora" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-starlight">{toast.title}</p>
                  {toast.description ? (
                    <p className="mt-1 text-xs leading-5 text-slate-300">{toast.description}</p>
                  ) : null}
                </div>
                <button
                  className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
