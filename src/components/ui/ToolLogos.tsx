// Tool "logos" for the prototype.
//
// We render each tool as a colored tile using the tool's recognized brand
// color (a factual property of the tool), with a generic letterform monogram.
// This keeps the prototype recognizable without reproducing any trademarked
// logo artwork.

import { cn } from "@/lib/cn";

type LogoProps = { className?: string };

type Spec = {
  /** Recognized primary brand color (factual property). */
  bg: string;
  /** Foreground for the monogram letterform. */
  fg?: string;
  /** Generic monogram — our own typographic mark, not the brand's logo. */
  label: string;
  /** Render the tile with a hairline border (for white/very-light tiles). */
  bordered?: boolean;
};

const SPECS: Record<string, Spec> = {
  figma: { bg: "#0ACF83", fg: "#fff", label: "Fi" },
  framer: { bg: "#0055FF", fg: "#fff", label: "Fr" },
  webflow: { bg: "#146EF5", fg: "#fff", label: "Wf" },
  chatgpt: { bg: "#10A37F", fg: "#fff", label: "GPT" },
  midjourney: { bg: "#0E0E10", fg: "#fff", label: "Mj" },
  notion: { bg: "#ffffff", fg: "#0A0A0B", label: "No", bordered: true },
  maze: { bg: "#1F0F46", fg: "#fff", label: "Mz" },
  zeplin: { bg: "#FDBD39", fg: "#0A0A0B", label: "Zp" },
  spline: { bg: "#7B61FF", fg: "#fff", label: "Sp" },
  lovable: { bg: "#7C3AED", fg: "#fff", label: "Lv" },
};

function MonogramTile({
  spec,
  className,
}: {
  spec: Spec;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-md font-display text-[40%] font-semibold tracking-tight",
        spec.bordered && "border border-stroke-weak",
        className,
      )}
      style={{ background: spec.bg, color: spec.fg ?? "#fff" }}
    >
      {spec.label}
    </span>
  );
}

export function ToolLogo({
  slug,
  fallbackInitial,
  className,
}: {
  slug: string;
  fallbackInitial: string;
  className?: string;
}) {
  const spec = SPECS[slug];
  if (!spec) {
    return (
      <span
        aria-hidden
        className={cn(
          "grid shrink-0 place-items-center rounded-md border border-stroke-weak bg-bg-sunken text-sm font-semibold text-text-strong",
          className,
        )}
      >
        {fallbackInitial}
      </span>
    );
  }
  return <MonogramTile spec={spec} className={className} />;
}
