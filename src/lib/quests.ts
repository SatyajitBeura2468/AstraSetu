import { quests } from "@/data/astrasetu";

export function questProgress(completedStepIds: string[], questId: string) {
  const quest = quests.find((item) => item.id === questId);
  if (!quest) return 0;
  const completed = quest.steps.filter((step) => completedStepIds.includes(step.id)).length;
  return Math.round((completed / quest.steps.length) * 100);
}

export function isQuestComplete(completedStepIds: string[], questId: string) {
  return questProgress(completedStepIds, questId) === 100;
}

export function nextQuestStep(completedStepIds: string[], questId: string) {
  const quest = quests.find((item) => item.id === questId);
  return quest?.steps.find((step) => !completedStepIds.includes(step.id));
}
