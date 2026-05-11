import { cn } from "@/lib/cn";

/**
 * Opencanvas monogram + wordmark.
 *
 * The monogram is a soft-rounded tile rendering an italic serif "O" — keeps
 * the editorial feel of the design throughout. Both bits are theme-aware
 * because they resolve through fill-strong / text-inverse-strong tokens.
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
          "grid place-items-center rounded-lg bg-fill-strong italic text-text-inverse-strong",
          "font-display",
          monogramSize,
        )}
      >
        O
      </span>
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight">
          Opencanvas
        </span>
      )}
    </span>
  );
}
