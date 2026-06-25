"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createNotebookEntry, deleteNotebookEntry, updateNotebookEntry } from "@/lib/notebook";
import type { NotebookDraft } from "@/lib/notebook";
import type { NotebookEntry } from "@/types/domain";

export type ToastTone = "success" | "error" | "info";

export type ToastMessage = {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
};

export type AstraSettings = {
  reducedMotion: boolean;
  observerLabel: string;
  latitude: number;
  longitude: number;
  highContrast: boolean;
};

export type AstraState = {
  hasSeenIntro: boolean;
  explorerName: string;
  streak: number;
  discoveredObjects: string[];
  savedObjects: string[];
  savedMissions: string[];
  savedSimulations: string[];
  completedQuestSteps: string[];
  notebookEntries: NotebookEntry[];
  settings: AstraSettings;
  toasts: ToastMessage[];
  dismissIntro: () => void;
  setExplorerName: (name: string) => void;
  setSettings: (patch: Partial<AstraSettings>) => void;
  markObjectDiscovered: (slug: string) => void;
  toggleSavedObject: (slug: string) => void;
  toggleSavedMission: (slug: string) => void;
  saveSimulation: (name: string) => void;
  completeQuestStep: (id: string) => void;
  addNotebookEntry: (draft: NotebookDraft) => NotebookEntry;
  updateNotebookEntry: (id: string, patch: Partial<NotebookDraft>) => void;
  deleteNotebookEntry: (id: string) => void;
  importNotebookEntries: (entries: NotebookEntry[]) => void;
  resetLocalData: () => void;
  pushToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
};

const defaultSettings: AstraSettings = {
  reducedMotion: false,
  observerLabel: "Bhawanipatna, Odisha",
  latitude: 19.9074,
  longitude: 83.166,
  highContrast: false,
};

const initialEntries: NotebookEntry[] = [
  {
    id: "seed-note-lunar",
    title: "First observation prompt",
    body: "Use this local-only notebook to link objects, missions, and simulations. Try saving the Moon phase from the Observatory.",
    tags: ["demo", "moon", "local"],
    linkedItem: "Moon",
    createdAt: "2026-06-25T00:00:00.000Z",
    updatedAt: "2026-06-25T00:00:00.000Z",
  },
];

function uniqueAdd(list: string[], value: string) {
  return list.includes(value) ? list : [...list, value];
}

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function makeToastId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const useAstraStore = create<AstraState>()(
  persist(
    (set, get) => ({
      hasSeenIntro: false,
      explorerName: "Astra Explorer",
      streak: 1,
      discoveredObjects: [],
      savedObjects: [],
      savedMissions: [],
      savedSimulations: [],
      completedQuestSteps: [],
      notebookEntries: initialEntries,
      settings: defaultSettings,
      toasts: [],
      dismissIntro: () => set({ hasSeenIntro: true }),
      setExplorerName: (name) => {
        set({ explorerName: name.trim() || "Astra Explorer" });
        get().pushToast({
          tone: "success",
          title: "Explorer profile updated",
          description: "Your local profile has been saved in this browser.",
        });
      },
      setSettings: (patch) => {
        set((state) => ({ settings: { ...state.settings, ...patch } }));
        get().pushToast({
          tone: "success",
          title: "Settings updated",
          description: "AstraSetu saved the preference locally.",
        });
      },
      markObjectDiscovered: (slug) => {
        set((state) => ({
          discoveredObjects: uniqueAdd(state.discoveredObjects, slug),
        }));
        get().pushToast({
          tone: "success",
          title: "Discovery recorded",
          description: "Your explorer progress was updated locally.",
        });
      },
      toggleSavedObject: (slug) => {
        set((state) => ({ savedObjects: toggle(state.savedObjects, slug) }));
        get().pushToast({ tone: "success", title: "Object library updated" });
      },
      toggleSavedMission: (slug) => {
        set((state) => ({ savedMissions: toggle(state.savedMissions, slug) }));
        get().pushToast({ tone: "success", title: "Mission archive updated" });
      },
      saveSimulation: (name) => {
        set((state) => ({ savedSimulations: uniqueAdd(state.savedSimulations, name) }));
        get().pushToast({
          tone: "success",
          title: "Simulation saved",
          description: `${name} is now part of your local experiment log.`,
        });
      },
      completeQuestStep: (id) => {
        set((state) => ({
          completedQuestSteps: uniqueAdd(state.completedQuestSteps, id),
        }));
        get().pushToast({
          tone: "success",
          title: "Quest checkpoint complete",
          description: "Progress is stored in local demo mode.",
        });
      },
      addNotebookEntry: (draft) => {
        const entry = createNotebookEntry(draft);
        set((state) => ({ notebookEntries: [entry, ...state.notebookEntries] }));
        get().pushToast({
          tone: "success",
          title: "Notebook entry saved",
          description: "The note is stored locally in this browser.",
        });
        return entry;
      },
      updateNotebookEntry: (id, patch) => {
        set((state) => ({
          notebookEntries: updateNotebookEntry(state.notebookEntries, id, patch),
        }));
        get().pushToast({ tone: "success", title: "Notebook entry updated" });
      },
      deleteNotebookEntry: (id) => {
        set((state) => ({
          notebookEntries: deleteNotebookEntry(state.notebookEntries, id),
        }));
        get().pushToast({ tone: "info", title: "Notebook entry deleted" });
      },
      importNotebookEntries: (entries) => {
        set({ notebookEntries: entries });
        get().pushToast({
          tone: "success",
          title: "Notebook imported",
          description: "Imported entries replaced the local notebook set.",
        });
      },
      resetLocalData: () => {
        set({
          hasSeenIntro: false,
          explorerName: "Astra Explorer",
          streak: 1,
          discoveredObjects: [],
          savedObjects: [],
          savedMissions: [],
          savedSimulations: [],
          completedQuestSteps: [],
          notebookEntries: initialEntries,
          settings: defaultSettings,
          toasts: [],
        });
        get().pushToast({
          tone: "info",
          title: "Local demo data reset",
          description: "AstraSetu is back to its seeded first-run state.",
        });
      },
      pushToast: (toast) => {
        const id = makeToastId();
        set((state) => ({
          toasts: [{ ...toast, id }, ...state.toasts].slice(0, 4),
        }));
      },
      removeToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
      },
    }),
    {
      name: "astrasetu-local-state",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        hasSeenIntro: state.hasSeenIntro,
        explorerName: state.explorerName,
        streak: state.streak,
        discoveredObjects: state.discoveredObjects,
        savedObjects: state.savedObjects,
        savedMissions: state.savedMissions,
        savedSimulations: state.savedSimulations,
        completedQuestSteps: state.completedQuestSteps,
        notebookEntries: state.notebookEntries,
        settings: state.settings,
      }),
    },
  ),
);
