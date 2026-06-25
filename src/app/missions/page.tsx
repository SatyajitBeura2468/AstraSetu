import type { Metadata } from "next";

import { MissionControl } from "@/features/missions/mission-control";

export const metadata: Metadata = {
  title: "Mission Control",
};

export default async function MissionsPage({
  searchParams,
}: {
  searchParams?: Promise<{ mission?: string }>;
}) {
  const params = await searchParams;
  return <MissionControl initialMission={params?.mission} />;
}
