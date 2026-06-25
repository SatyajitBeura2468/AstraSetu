import type { ReactNode } from "react";

import { DataStatusIndicator } from "@/components/ui/data-status-indicator";
import type { DataStatus } from "@/types/domain";

export function PageHeader({
  title,
  description,
  status,
  children,
}: {
  title: string;
  description: string;
  status?: DataStatus;
  children?: ReactNode;
}) {
  return (
    <header className="mb-5 flex flex-col gap-4 md:mb-7 md:flex-row md:items-end md:justify-between">
      <div className="max-w-4xl">
        <h1 className="font-display text-4xl font-semibold tracking-normal text-starlight md:text-6xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
          {description}
        </p>
        {status ? (
          <div className="mt-4">
            <DataStatusIndicator status={status} />
          </div>
        ) : null}
      </div>
      {children ? <div className="flex flex-wrap items-center gap-3">{children}</div> : null}
    </header>
  );
}
