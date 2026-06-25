import type { Metadata } from "next";

import { SimulationLab } from "@/features/simulations/simulation-lab";

export const metadata: Metadata = {
  title: "Simulation Lab",
};

export default async function LabPage({
  searchParams,
}: {
  searchParams?: Promise<{ sim?: string }>;
}) {
  const params = await searchParams;
  return <SimulationLab initialSimulation={params?.sim} />;
}
