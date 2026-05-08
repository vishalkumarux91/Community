"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function Tabs<T extends string>({
  tabs,
  initial,
  onChange,
  className,
}: {
  tabs: readonly T[];
  initial?: T;
  onChange?: (tab: T) => void;
  className?: string;
}) {
  const [active, setActive] = useState<T>(initial ?? tabs[0]);

  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex rounded-full border border-stroke-weak bg-white/[0.03] p-1",
        className,
      )}
    >
      {tabs.map((t) => {
        const isActive = t === active;
        return (
          <button
            key={t}
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              setActive(t);
              onChange?.(t);
            }}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-fill-strong text-text-inverse-strong"
                : "text-text-weak hover:text-text-strong",
            )}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
