import type { Briefing, CelestialObject, Mission, Quest, SkyEvent } from "@/types/domain";

export type AstraDataProvider = {
  getBriefing: (date?: Date) => Briefing;
  listAtlasObjects: () => CelestialObject[];
  getAtlasObject: (slug: string) => CelestialObject | undefined;
  listMissions: () => Mission[];
  getMission: (slug: string) => Mission | undefined;
  listEvents: () => SkyEvent[];
  listQuests: () => Quest[];
};
