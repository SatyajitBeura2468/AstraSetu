import type { Metadata } from "next";

import { AboutAstraSetu } from "@/features/about/about-astrasetu";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return <AboutAstraSetu />;
}
