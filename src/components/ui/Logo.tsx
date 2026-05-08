import { cn } from "@/lib/cn";

/**
 * Monogram + wordmark. Solid, theme-aware (no gradients) — pulls fill-strong
 * + text-inverse-strong from the active palette so it inverts cleanly across
 * light and dark.
 */
export function Logo({
  size = "md",
  showWordmark = true,
  className,
}: {
  size?: "sm" | "md";
  showWordmark?: boolean;
  className?: string;
}) {
  const monogramSize = size === "sm" ? "size-7 text-[11px]" : "size-8 text-xs";

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className={cn(
          "grid place-items-center rounded-md bg-fill-strong font-semibold text-text-inverse-strong",
          monogramSize,
        )}
      >
        R
      </span>
      {showWordmark && (
        <span className="font-display text-[15px] font-semibold tracking-tight">
          RPS Community
        </span>
      )}
    </span>
  );
}
