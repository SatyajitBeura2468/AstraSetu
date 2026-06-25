import type { Metadata } from "next";

import { ResearchNotebook } from "@/features/notebook/research-notebook";

export const metadata: Metadata = {
  title: "Research Notebook",
};

export default function NotebookPage() {
  return <ResearchNotebook />;
}
