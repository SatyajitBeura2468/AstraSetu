import type { Metadata } from "next";

import { CommandDeck } from "@/features/command/command-deck";

export const metadata: Metadata = {
  title: "Command Deck",
};

export default function CommandPage() {
  return <CommandDeck />;
}
