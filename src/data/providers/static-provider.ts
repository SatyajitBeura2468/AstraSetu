import {
  celestialObjects,
  getDailyBriefing,
  missions,
  quests,
  skyEvents,
} from "@/data/astrasetu";
import type { AstraDataProvider } from "@/data/providers/contracts";

export const staticDataProvider: AstraDataProvider = {
  getBriefing: getDailyBriefing,
  listAtlasObjects: () => celestialObjects,
  getAtlasObject: (slug) => celestialObjects.find((object) => object.slug === slug),
  listMissions: () => missions,
  getMission: (slug) => missions.find((mission) => mission.slug === slug),
  listEvents: () => skyEvents,
  listQuests: () => quests,
};
