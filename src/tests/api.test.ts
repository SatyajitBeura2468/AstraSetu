import { describe, expect, it } from "vitest";

import { GET as healthGet } from "@/app/api/health/route";
import { GET as atlasGet } from "@/app/api/atlas/route";
import { GET as skyGet } from "@/app/api/sky/route";

describe("api route response shapes", () => {
  it("returns health status", async () => {
    const response = healthGet();
    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.data.service).toBe("AstraSetu");
  });

  it("returns atlas object list", async () => {
    const response = atlasGet();
    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.data.length).toBeGreaterThan(3);
  });

  it("returns a sky planner payload", async () => {
    const response = skyGet(new Request("https://astrasetu.local/api/sky?date=2026-06-25T18:00:00.000Z"));
    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.data.moon.label).toEqual(expect.any(String));
    expect(body.data.status).toBe("Local calculation");
  });
});
