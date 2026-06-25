import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function HologramPanel({
  children,
  className,
  as: Component = "section",
  ...props
}: HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "section" | "article" | "aside" | "div";
}) {
  return (
    <Component
      className={cn("glass-panel rounded-[var(--radius)] p-5 md:p-6", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
