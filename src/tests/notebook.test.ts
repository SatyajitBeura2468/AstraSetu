import { describe, expect, it } from "vitest";

import {
  createNotebookEntry,
  deleteNotebookEntry,
  normalizeTags,
  updateNotebookEntry,
} from "@/lib/notebook";

describe("notebook utilities", () => {
  it("normalizes and deduplicates tags", () => {
    expect(normalizeTags("Moon, moon, Mission")).toEqual(["moon", "mission"]);
  });

  it("creates, updates, and deletes notebook entries", () => {
    const now = new Date("2026-06-25T00:00:00.000Z");
    const entry = createNotebookEntry(
      { title: "Moon note", body: "Phase observation", tags: "moon", linkedItem: "Moon" },
      now,
    );
    expect(entry.title).toBe("Moon note");
    const updated = updateNotebookEntry([entry], entry.id, { title: "Updated", tags: "moon, orbit" }, now);
    expect(updated[0].title).toBe("Updated");
    expect(updated[0].tags).toEqual(["moon", "orbit"]);
    expect(deleteNotebookEntry(updated, entry.id)).toHaveLength(0);
  });
});
