import type { Metadata } from "next";

import { NightObservatory } from "@/features/observatory/night-observatory";

export const metadata: Metadata = {
  title: "Night Observatory",
};

export default function ObservatoryPage() {
  return <NightObservatory />;
}
