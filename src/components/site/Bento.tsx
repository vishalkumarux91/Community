import Link from "next/link";
import { Container } from "@/components/ui/Container";

const ARROW = (
  <svg viewBox="0 0 20 20" width="14" height="14" fill="none">
    <path
      d="M6 14 14 6m0 0H7m7 0v7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const tileBase =
  "group relative flex min-h-[440px] flex-col overflow-hidden rounded-[22px] border border-stroke-weak bg-bg-card transition-all duration-300 hover:-translate-y-1 hover:border-stroke-strong hover:shadow-[0_24px_48px_-24px_rgba(10,10,11,0.22)]";

function Arrow({ tint }: { tint: string }) {
  return (
    <span
      aria-hidden
      className="absolute right-4 top-4 z-[2] grid size-9 place-items-center rounded-full border border-stroke-weak bg-bg-sunken text-text-weak transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:-rotate-12 group-hover:bg-bg-card"
      style={{
        ["--tint" as string]: tint,
      }}
    >
      <span className="group-hover:[color:var(--tint)]">{ARROW}</span>
    </span>
  );
}

const LEVEL_UP_LESSONS = [
  { n: "01", name: "Figma file hygiene", t: "22m", active: true },
  { n: "02", name: "Discovery questions", t: "18m" },
  { n: "03", name: "Design critique", t: "31m" },
];

const LEARN_STEPS = [
  { n: 1, label: "Watch · Type at scale", tag: "Video" },
  { n: 2, label: "Read · Spacing systems", tag: "Article" },
  { n: 3, label: "Practice · Rebuild a flow", tag: "Exercise" },
];

const COMMUNITY_BUBBLES = [
  { text: "good crit, fwiw", className: "top-[18%] left-[12%] rotate-[-3deg]" },
  {
    text: "try -2 tracking",
    className: "top-[16%] right-[10%] rotate-[2deg]",
    radius: "14px 14px 4px 14px",
  },
  { text: "love this flow ✨", className: "bottom-[18%] left-[22%] rotate-[1deg]" },
];

const COMMUNITY_AVS = [
  "var(--accent-pink)",
  "var(--accent-orange)",
  "var(--accent-sage)",
  "var(--accent-blue)",
  "var(--accent-purple)",
];

export function Bento() {
  return (
    <section className="border-b border-stroke-faint py-28">
      <Container>
        <div className="reveal mx-auto mb-14 max-w-[720px] text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
            What you get
          </p>
          <h2 className="font-display mt-3.5 mb-4 text-[44px] font-light leading-[0.98] tracking-[-0.035em] md:text-[76px]">
            Three pillars, <em>one</em> quiet home.
          </h2>
          <p className="mx-auto max-w-[560px] text-[17px] leading-[1.55] text-text-weak">
            Level Up gets you off the ground. Learn and Community keep you
            growing — long after the playlist ends.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[1fr]">
          {/* LEVEL UP */}
          <Link
            href="/levelup"
            className={tileBase}
            style={{ ["--tint" as string]: "var(--accent-pink)" }}
          >
            <Arrow tint="var(--accent-pink)" />
            <div
              className="relative flex-1 overflow-hidden p-7"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--accent-pink) 12%, transparent), transparent 60%)",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute"
                style={{
                  top: "-40%",
                  right: "-20%",
                  width: "80%",
                  aspectRatio: "1",
                  borderRadius: "999px",
                  background:
                    "conic-gradient(from 160deg, rgba(255,122,182,0.45), rgba(255,122,69,0.45), rgba(245,196,81,0.45), rgba(95,209,163,0.45), rgba(106,163,255,0.45), rgba(180,139,255,0.45), rgba(255,122,182,0.45))",
                  filter: "blur(60px)",
                  opacity: 0.6,
                }}
              />
              <div className="relative flex h-full flex-col justify-center gap-3">
                {LEVEL_UP_LESSONS.map((l, i) => (
                  <div
                    key={l.n}
                    className={`relative flex items-center gap-3.5 rounded-xl border border-stroke-weak bg-bg-sunken p-3.5 transition-all duration-300 group-hover:translate-x-1 ${
                      l.active ? "" : ""
                    }`}
                    style={{
                      transitionDelay: `${i * 40}ms`,
                      borderColor: l.active
                        ? "color-mix(in srgb, var(--accent-pink) 50%, transparent)"
                        : undefined,
                    }}
                  >
                    <span className="w-[22px] shrink-0 font-mono text-[11px] text-text-muted">
                      {l.n}
                    </span>
                    <span
                      className="grid size-[26px] shrink-0 place-items-center rounded-full text-white"
                      style={{
                        background: l.active
                          ? "var(--rainbow)"
                          : "var(--text-strong)",
                        color: l.active ? "#fff" : "var(--bg-card)",
                      }}
                    >
                      <svg viewBox="0 0 12 12" width="9" height="9" fill="currentColor">
                        <path d="M3 1.5v9l8-4.5z" />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13.5px] text-text-strong">
                      {l.name}
                    </span>
                    <span className="font-mono text-[11px] text-text-muted">
                      {l.t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-stroke-faint px-7 pb-6 pt-5">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: "var(--accent-pink)" }}
              >
                01 · USP
              </span>
              <h3 className="font-display m-0 text-[34px] font-light leading-[1.0] tracking-[-0.025em]">
                Level Up
              </h3>
              <p className="m-0 text-[14.5px] leading-[1.55] text-text-weak">
                A short, curated playlist that teaches the practical stuff —
                file hygiene, discovery, critique, shipping — design school
                skips.
              </p>
            </div>
          </Link>

          {/* LEARN */}
          <Link
            href="/learn"
            className={tileBase}
            style={{ ["--tint" as string]: "var(--accent-blue)" }}
          >
            <Arrow tint="var(--accent-blue)" />
            <div
              className="relative flex-1 overflow-hidden p-7"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--accent-blue) 12%, transparent), transparent 60%)",
              }}
            >
              <div className="flex h-full flex-col justify-center gap-3.5">
                {LEARN_STEPS.map((s, i) => (
                  <div
                    key={s.n}
                    className="flex items-center gap-3.5 rounded-xl border border-stroke-weak bg-bg-sunken p-3 transition-all duration-300 group-hover:translate-x-1"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <span
                      className="grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold"
                      style={{
                        background:
                          "color-mix(in srgb, var(--accent-blue) 18%, var(--bg-card))",
                        color: "var(--accent-blue)",
                      }}
                    >
                      {s.n}
                    </span>
                    <span className="text-[13px] text-text-strong">
                      {s.label}
                    </span>
                    <span className="ml-auto text-[10px] uppercase tracking-[0.12em] text-text-muted">
                      {s.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-stroke-faint px-7 pb-6 pt-5">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: "var(--accent-blue)" }}
              >
                02
              </span>
              <h3 className="font-display m-0 text-[34px] font-light leading-[1.0] tracking-[-0.025em]">
                Learn
              </h3>
              <p className="m-0 text-[14.5px] leading-[1.55] text-text-weak">
                Pick a tool or topic — Figma, design systems, AI — and follow a
                curated path of videos, articles, and exercises.
              </p>
            </div>
          </Link>

          {/* COMMUNITY */}
          <Link
            href="/community"
            className={tileBase}
            style={{ ["--tint" as string]: "var(--accent-sage)" }}
          >
            <Arrow tint="var(--accent-sage)" />
            <div
              className="relative flex flex-1 items-center justify-center overflow-hidden p-7"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--accent-sage) 12%, transparent), transparent 60%)",
                minHeight: 200,
              }}
            >
              {COMMUNITY_BUBBLES.map((b, i) => (
                <span
                  key={i}
                  className={`absolute ${b.className} max-w-[200px] rounded-[14px_14px_14px_4px] border border-stroke-weak bg-bg-sunken px-3.5 py-2 text-xs text-text-strong`}
                  style={{
                    borderRadius: b.radius ?? "14px 14px 14px 4px",
                    boxShadow: "0 6px 18px -8px rgba(14,14,15,0.18)",
                  }}
                >
                  {b.text}
                </span>
              ))}
              <div className="relative z-[2] flex items-center">
                {COMMUNITY_AVS.map((tone, i) => (
                  <span
                    key={i}
                    className="size-11 rounded-full border-[3px] transition-transform duration-300"
                    style={{
                      borderColor: "var(--bg-card)",
                      marginLeft: i === 0 ? 0 : -10,
                      background: `repeating-linear-gradient(45deg, color-mix(in srgb, ${tone} 65%, var(--bg-card)) 0 5px, color-mix(in srgb, ${tone} 40%, var(--bg-card)) 5px 10px)`,
                      transitionDelay: `${i * 50}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-stroke-faint px-7 pb-6 pt-5">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: "var(--accent-sage)" }}
              >
                03
              </span>
              <h3 className="font-display m-0 text-[34px] font-light leading-[1.0] tracking-[-0.025em]">
                Community
              </h3>
              <p className="m-0 text-[14.5px] leading-[1.55] text-text-weak">
                Honest critique, 1:1 mentor sessions, and a calm feed where
                designers actually help each other ship better work.
              </p>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
