import { celestialObjects, missions, routes, simulationKinds } from "@/data/astrasetu";

export type CommandResult = {
  id: string;
  label: string;
  description: string;
  href: string;
  group: "Route" | "Object" | "Mission" | "Simulation" | "Action";
};

export const commandResults: CommandResult[] = [
  ...routes.map((route) => ({
    id: `route-${route.href}`,
    label: route.label,
    description: route.description,
    href: route.href,
    group: "Route" as const,
  })),
  ...celestialObjects.map((object) => ({
    id: `object-${object.slug}`,
    label: object.name,
    description: `${object.type} - ${object.summary}`,
    href: `/atlas?object=${object.slug}`,
    group: "Object" as const,
  })),
  ...missions.map((mission) => ({
    id: `mission-${mission.slug}`,
    label: mission.name,
    description: `${mission.agency} - ${mission.objective}`,
    href: `/missions?mission=${mission.slug}`,
    group: "Mission" as const,
  })),
  ...simulationKinds.map((simulation) => ({
    id: `sim-${simulation}`,
    label: simulation,
    description: "Open a deterministic educational simulation.",
    href: `/lab?sim=${encodeURIComponent(simulation.toLowerCase())}`,
    group: "Simulation" as const,
  })),
  {
    id: "action-note",
    label: "Create notebook entry",
    description: "Open the local research notebook editor.",
    href: "/notebook?action=new",
    group: "Action",
  },
  {
    id: "action-settings",
    label: "Toggle reduced motion",
    description: "Open Settings to change motion preferences.",
    href: "/settings#accessibility",
    group: "Action",
  },
];

export function filterCommandResults(query: string, limit = 9) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return commandResults.slice(0, limit);

  return commandResults
    .map((result) => {
      const target = `${result.label} ${result.description} ${result.group}`.toLowerCase();
      const index = target.indexOf(normalized);
      return {
        result,
        score: index === -1 ? Number.POSITIVE_INFINITY : index + result.label.length / 100,
      };
    })
    .filter((item) => Number.isFinite(item.score))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((item) => item.result);
}
