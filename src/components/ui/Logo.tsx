import { cn } from "@/lib/cn";

/**
 * Opencanvas monogram + wordmark.
 *
 * Hot-orange round monogram with a heavy "O" — Replicate's "stamp,
 * not a notification" rule applied to the brand mark. Pill-shaped
 * per the system's friendly-precision radius.
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
  const monogramSize =
    size === "sm" ? "size-7 text-[15px]" : "size-8 text-[18px]";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className={cn(
          "grid place-items-center rounded-full bg-primary text-on-primary",
          "font-display font-bold",
          monogramSize,
        )}
      >
        O
      </span>
      {showWordmark && (
        <span className="font-display text-[17px] font-bold tracking-[-0.02em] text-ink">
          Opencanvas
        </span>
      )}
    </span>
  );
}
