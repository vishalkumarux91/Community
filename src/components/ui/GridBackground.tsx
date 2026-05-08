import { cn } from "@/lib/cn";

/**
 * Decorative rounded-square grid lifted from the Figma background pattern.
 * Rendered as a fixed-size SVG so it scales cleanly and stays GPU-cheap.
 */
export function GridBackground({
  className,
  cell = 56,
  rows = 12,
  cols = 22,
}: {
  className?: string;
  cell?: number;
  rows?: number;
  cols?: number;
}) {
  const width = cols * cell;
  const height = rows * cell;
  const radius = cell * 0.32;

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn("pointer-events-none select-none", className)}
    >
      <defs>
        <radialGradient id="gridFade" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="white" stopOpacity="0.18" />
          <stop offset="60%" stopColor="white" stopOpacity="0.04" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="gridMask">
          <rect width={width} height={height} fill="url(#gridFade)" />
        </mask>
      </defs>
      <g mask="url(#gridMask)">
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * cell + 2}
              y={r * cell + 2}
              width={cell - 4}
              height={cell - 4}
              rx={radius}
              ry={radius}
              fill="none"
              stroke="white"
              strokeOpacity="0.55"
              strokeWidth="1"
            />
          )),
        )}
      </g>
    </svg>
  );
}
