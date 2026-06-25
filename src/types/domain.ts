import type { LucideIcon } from "lucide-react";

export type DataStatus =
  | "Verified static data"
  | "Educational simulation"
  | "Demo data"
  | "Seeded event data"
  | "Local calculation"
  | "Future live integration";

export type CelestialType =
  | "Planet"
  | "Moon"
  | "Star"
  | "Nebula"
  | "Galaxy"
  | "Exoplanet"
  | "Cluster";

export type CelestialObject = {
  slug: string;
  name: string;
  type: CelestialType;
  distance: string;
  composition: string;
  visibility: string;
  magnitude?: string;
  summary: string;
  whyItMatters: string;
  relations: string[];
  color: string;
  radius: number;
  status: DataStatus;
};

export type MissionCategory =
  | "India"
  | "Moon"
  | "Mars"
  | "Solar"
  | "Deep Space"
  | "Human Spaceflight"
  | "Observatory";

export type Mission = {
  slug: string;
  name: string;
  agency: string;
  category: MissionCategory[];
  launch: string;
  stage: string;
  destination: string;
  objective: string;
  significance: string;
  trajectory: Array<{ label: string; progress: number }>;
  status: DataStatus;
};

export type Briefing = {
  id: string;
  title: string;
  object: string;
  idea: string;
  whyItMatters: string;
  actionLabel: string;
  route: string;
  status: DataStatus;
};

export type QuestStep = {
  id: string;
  title: string;
  description: string;
  route: string;
};

export type Quest = {
  id: string;
  title: string;
  track: string;
  description: string;
  steps: QuestStep[];
  reward: string;
  status: DataStatus;
};

export type NotebookEntry = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  linkedItem?: string;
  createdAt: string;
  updatedAt: string;
};

export type ExplorerProfile = {
  name: string;
  level: string;
  streak: number;
  discoveryCount: number;
  savedExperiments: number;
  achievementCount: number;
};

export type AppRoute = {
  href: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
};

export type SimulationKind =
  | "Gravity Forge"
  | "Orbit Builder"
  | "Exoplanet Transit Lab"
  | "Gravitational Lens Lab"
  | "Stellar Evolution Explorer";

export type SkyEvent = {
  id: string;
  title: string;
  window: string;
  description: string;
  status: DataStatus;
};
