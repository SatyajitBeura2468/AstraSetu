import * as Astronomy from "astronomy-engine";

import { celestialObjects } from "@/data/astrasetu";

export type ObserverLocation = {
  label: string;
  latitude: number;
  longitude: number;
};

export const defaultLocation: ObserverLocation = {
  label: "Bhawanipatna, Odisha",
  latitude: 19.9074,
  longitude: 83.166,
};

export function moonPhaseLabel(phaseDegrees: number) {
  const normalized = ((phaseDegrees % 360) + 360) % 360;
  if (normalized < 22.5 || normalized >= 337.5) return "New Moon";
  if (normalized < 67.5) return "Waxing Crescent";
  if (normalized < 112.5) return "First Quarter";
  if (normalized < 157.5) return "Waxing Gibbous";
  if (normalized < 202.5) return "Full Moon";
  if (normalized < 247.5) return "Waning Gibbous";
  if (normalized < 292.5) return "Last Quarter";
  return "Waning Crescent";
}

export function getMoonPhase(date = new Date()) {
  const phaseDegrees = Astronomy.MoonPhase(date);
  const illumination = (1 - Math.cos((phaseDegrees * Math.PI) / 180)) / 2;
  return {
    phaseDegrees,
    label: moonPhaseLabel(phaseDegrees),
    illumination,
  };
}

export function getVisibleObjectSuggestions(date = new Date()) {
  const month = date.getMonth();
  if ([10, 11, 0, 1].includes(month)) return ["Orion Nebula", "Pleiades", "Jupiter"];
  if ([2, 3, 4].includes(month)) return ["Moon", "Mars", "Pleiades"];
  if ([5, 6, 7].includes(month)) return ["Moon", "Saturn", "Milky Way Core"];
  return ["Andromeda Galaxy", "Jupiter", "Moon"];
}

export function skyPlanner(date = new Date(), location = defaultLocation) {
  const moon = getMoonPhase(date);
  const suggestions = getVisibleObjectSuggestions(date);
  const suggestedObject =
    celestialObjects.find((object) => suggestions.includes(object.name)) ?? celestialObjects[0];

  return {
    location,
    date: date.toISOString(),
    moon,
    visibleObjects: suggestions,
    suggestedTarget: suggestedObject,
    status: "Local calculation" as const,
  };
}
