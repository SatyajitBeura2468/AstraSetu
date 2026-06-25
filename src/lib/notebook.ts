import type { NotebookEntry } from "@/types/domain";
import { stableId } from "@/lib/utils";

export type NotebookDraft = {
  title: string;
  body: string;
  tags: string;
  linkedItem?: string;
};

export function normalizeTags(tags: string | string[]) {
  const list = Array.isArray(tags) ? tags : tags.split(",");
  return Array.from(
    new Set(
      list
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
        .slice(0, 8),
    ),
  );
}

export function createNotebookEntry(draft: NotebookDraft, now = new Date()): NotebookEntry {
  const title = draft.title.trim() || "Untitled observation";
  const timestamp = now.toISOString();

  return {
    id: stableId("note"),
    title,
    body: draft.body.trim(),
    tags: normalizeTags(draft.tags),
    linkedItem: draft.linkedItem?.trim() || undefined,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function updateNotebookEntry(
  entries: NotebookEntry[],
  id: string,
  patch: Partial<NotebookDraft>,
  now = new Date(),
) {
  return entries.map((entry) =>
    entry.id === id
      ? {
          ...entry,
          title: patch.title?.trim() || entry.title,
          body: patch.body ?? entry.body,
          tags: patch.tags ? normalizeTags(patch.tags) : entry.tags,
          linkedItem: patch.linkedItem?.trim() || entry.linkedItem,
          updatedAt: now.toISOString(),
        }
      : entry,
  );
}

export function deleteNotebookEntry(entries: NotebookEntry[], id: string) {
  return entries.filter((entry) => entry.id !== id);
}

export function exportNotebook(entries: NotebookEntry[]) {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      source: "AstraSetu local-only demo notebook",
      entries,
    },
    null,
    2,
  );
}
