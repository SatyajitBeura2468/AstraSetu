import type { Metadata } from "next";

import { CosmicAtlas } from "@/features/atlas/cosmic-atlas";

export const metadata: Metadata = {
  title: "Cosmic Atlas",
};

export default async function AtlasPage({
  searchParams,
}: {
  searchParams?: Promise<{ object?: string }>;
}) {
  const params = await searchParams;
  return <CosmicAtlas initialObject={params?.object} />;
}
