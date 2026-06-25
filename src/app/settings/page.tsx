import type { Metadata } from "next";

import { SettingsConsole } from "@/features/settings/settings-console";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return <SettingsConsole />;
}
