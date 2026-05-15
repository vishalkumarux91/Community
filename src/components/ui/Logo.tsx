import { cn } from "@/lib/cn";

/**
 * Opencanvas monogram + wordmark.
 *
 * Rainbow-tinted "O" tile renders the italic serif glyph; reads as a
 * refracted-light beam across the brand.
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
          "grid place-items-center rounded-[10px] italic",
          "font-display",
          monogramSize,
        )}
        style={{
          background: "var(--rainbow)",
          color: "#0e0e0f",
          fontWeight: 500,
          boxShadow:
            "0 6px 18px -8px rgba(106,163,255,0.55), 0 0 0 1px rgba(243,240,234,0.08) inset",
        }}
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
