import { describe, expect, it } from "vitest";

import { filterCommandResults } from "@/lib/search";
import { isQuestComplete, nextQuestStep, questProgress } from "@/lib/quests";

describe("quests and command search", () => {
  it("tracks quest progression", () => {
    expect(questProgress([], "orbit-engineer")).toBe(0);
    expect(questProgress(["orbit-builder", "save-experiment", "mission-link"], "orbit-engineer")).toBe(100);
    expect(isQuestComplete(["orbit-builder", "save-experiment", "mission-link"], "orbit-engineer")).toBe(true);
  });

  it("finds the next incomplete quest step", () => {
    expect(nextQuestStep(["orbit-builder"], "orbit-engineer")?.id).toBe("save-experiment");
  });

  it("filters command palette results by object and route", () => {
    expect(filterCommandResults("jupiter")[0].href).toContain("jupiter");
    expect(filterCommandResults("settings")[0].href).toContain("settings");
  });
});
