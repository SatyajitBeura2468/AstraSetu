import type { Metadata } from "next";

import { LearningQuests } from "@/features/quests/learning-quests";

export const metadata: Metadata = {
  title: "Learning Quests",
};

export default function QuestsPage() {
  return <LearningQuests />;
}
