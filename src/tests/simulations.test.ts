import { describe, expect, it } from "vitest";

import {
  classifyOrbit,
  lensAmplification,
  stellarStages,
  transitDepthPercent,
} from "@/lib/simulations";

describe("simulation utilities", () => {
  it("classifies low altitude as surface impact", () => {
    expect(
      classifyOrbit({ centralMassEarths: 1, distanceEarthRadii: 1.01, velocityKms: 7.8 }),
    ).toBe("surface impact");
  });

  it("classifies near circular velocity as near circular orbit", () => {
    expect(
      classifyOrbit({ centralMassEarths: 1, distanceEarthRadii: 2, velocityKms: 5.6 }),
    ).toBe("near circular orbit");
  });

  it("calculates deeper transits for larger planets", () => {
    expect(transitDepthPercent(1, 10)).toBeGreaterThan(transitDepthPercent(1, 1));
  });

  it("increases lens amplification with better alignment", () => {
    expect(lensAmplification(0, 8)).toBeGreaterThan(lensAmplification(80, 8));
  });

  it("changes stellar stages by mass regime", () => {
    expect(stellarStages(12)).toContain("Supernova");
    expect(stellarStages(1)).toContain("White dwarf");
  });
});
