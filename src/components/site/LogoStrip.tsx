import { Container } from "@/components/ui/Container";

const BRANDS: { name: string; svg: React.JSX.Element }[] = [
  { name: "Northwind", svg: <circle cx="16" cy="16" r="12" /> },
  { name: "Quadra", svg: <rect x="5" y="5" width="22" height="22" rx="3" /> },
  { name: "Vertex", svg: <polygon points="16,4 28,26 4,26" /> },
  {
    name: "Lattice Co.",
    svg: (
      <path d="M10 4h12a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z" />
    ),
  },
  { name: "Honeycomb", svg: <path d="M16 4 28 11v10L16 28 4 21V11Z" /> },
  {
    name: "Orbital",
    svg: (
      <>
        <circle cx="16" cy="16" r="12" />
        <circle cx="16" cy="16" r="4" fill="var(--bg-raised)" />
      </>
    ),
  },
  {
    name: "Mosaic",
    svg: (
      <path d="M5 5h10v10H5Zm12 0h10v10H17Zm-12 12h10v10H5Zm12 0h10v10H17Z" />
    ),
  },
  { name: "Apex", svg: <path d="M16 4 4 28h24Z" /> },
  {
    name: "Loop & Co.",
    svg: (
      <path d="M6 6h8v8H6Zm12 0a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z" />
    ),
  },
  { name: "Kite Studio", svg: <path d="M4 16 16 4l12 12-12 12Z" /> },
  {
    name: "Plus Labs",
    svg: (
      <path
        d="M16 4a12 12 0 1 1 0 24 12 12 0 0 1 0-24Zm0 6v12M10 16h12"
        stroke="currentColor"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />
    ),
  },
  { name: "Tessera", svg: <path d="M8 4h16v6h-6v18h-4V10H8Z" /> },
];

export function LogoStrip() {
  // Render the brand row twice so the marquee can loop seamlessly.
  const row = (
    <div className="flex w-max items-center gap-14">
      {[...BRANDS, ...BRANDS].map((b, i) => (
        <span
          key={i}
          aria-hidden={i >= BRANDS.length}
          className="font-display inline-flex items-center gap-2.5 whitespace-nowrap text-[22px] tracking-[-0.005em] text-text-weak transition-colors hover:text-text-strong"
        >
          <svg
            viewBox="0 0 32 32"
            fill="currentColor"
            className="size-[22px] shrink-0"
            aria-hidden
          >
            {b.svg}
          </svg>
          <span className="font-normal">{b.name}</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="group:hover-pause relative overflow-hidden border-y border-stroke-faint bg-bg-raised py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, color-mix(in srgb, var(--accent-orange) 6%, transparent), transparent 70%)",
        }}
      />
      <Container>
        <p className="reveal mb-10 text-center text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
          Members from
        </p>
      </Container>
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div className="animate-marquee">{row}</div>
      </div>
    </section>
  );
}
