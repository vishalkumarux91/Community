import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Check } from "@/components/ui/Icons";

const FEATURES: { title: string; desc: string }[] = [
  {
    title: "~3 hours, bite-size lessons",
    desc: "Watch one on the train, ship the lesson tomorrow.",
  },
  {
    title: "Curated by senior designers shipping today",
    desc: "Not a 2020 YouTube playlist with rebrands every quarter.",
  },
  {
    title: "Real Figma files, briefs & rituals",
    desc: "Every lesson ships with a template you can fork.",
  },
  {
    title: "Certificate + priority access to RPS Studio jobs",
    desc: "Finish the course, earn a signed certificate, and get fast-tracked when Rock Paper Scissors Studio opens roles.",
  },
];

const LESSONS: { n: string; title: string; t: string }[] = [
  { n: "02", title: "Discovery questions to ask in kickoff", t: "18m" },
  { n: "03", title: "Reading a brief — what's missing", t: "14m" },
  { n: "04", title: "Working with PMs and engineers", t: "26m" },
  { n: "05", title: "Design critique — giving and receiving", t: "31m" },
  { n: "06", title: "Shipping at pace — scope & tradeoffs", t: "29m" },
];

export function LevelUpFeature() {
  return (
    <section
      id="levelup"
      className="relative overflow-hidden border-b border-stroke-faint py-28 md:py-32"
    >
      {/* Rainbow conic blob in the top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[200px] -right-[200px] z-0 size-[800px] rounded-full"
        style={{
          background:
            "conic-gradient(from 140deg at 50% 50%, rgba(255,122,182,0.30) 0deg, rgba(255,122,69,0.30) 60deg, rgba(245,196,81,0.30) 120deg, rgba(95,209,163,0.30) 180deg, rgba(106,163,255,0.30) 240deg, rgba(180,139,255,0.30) 300deg, rgba(255,122,182,0.30) 360deg)",
          filter: "blur(120px)",
          opacity: 0.7,
        }}
      />

      <Container className="relative z-[1]">
        <div className="grid items-center gap-16 md:grid-cols-[1fr_1.05fr] md:gap-20">
          {/* Text */}
          <div>
            <span
              className="inline-flex items-center gap-2.5 rounded-full border border-stroke-weak bg-bg-card px-3.5 py-1.5 pl-2 text-xs font-medium text-text-strong"
            >
              <span
                aria-hidden
                className="size-[18px] shrink-0 rounded-full"
                style={{ background: "var(--rainbow)" }}
              />
              New ·{" "}
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-muted">
                Members-only
              </span>
            </span>
            <h2 className="font-display mt-6 mb-6 text-[56px] font-light leading-[0.96] tracking-[-0.04em] md:text-[82px]">
              The mini-course juniors <em>actually</em> need.
            </h2>
            <p className="mb-8 max-w-lg text-[18px] leading-[1.5] text-text-weak">
              Design school skips the practical stuff. Level Up is a curated
              playlist that teaches how design teams actually work — how files
              are kept clean, what to ask in discovery, how to ship with PMs
              and engineers, how good critique sounds.
            </p>

            <ul className="mb-9 flex flex-col">
              {FEATURES.map((f, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3.5 border-t border-dashed border-stroke-weak py-3.5 text-[15px] text-text-strong ${i === FEATURES.length - 1 ? "border-b" : ""}`}
                >
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: "var(--rainbow)" }}
                  >
                    <Check className="size-[11px]" />
                  </span>
                  <span className="flex-1">
                    <b className="font-semibold">{f.title}</b>
                    <span className="mt-0.5 block text-[13.5px] text-text-weak">
                      {f.desc}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/levelup"
                className="inline-flex items-center gap-1.5 rounded-full bg-fill-strong px-5 py-2.5 text-sm font-medium text-text-inverse-strong transition-opacity hover:opacity-90"
              >
                Start Level Up <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/levelup"
                className="rounded-full border border-stroke-strong bg-transparent px-5 py-2.5 text-sm font-medium text-text-strong transition-colors hover:bg-bg-card-hover"
              >
                See full syllabus
              </Link>
            </div>
          </div>

          {/* Playlist preview card */}
          <div className="relative">
            <span
              className="absolute -top-[18px] -left-4 z-[2] rounded-full border border-stroke-weak bg-bg-card px-3.5 py-2 text-sm italic"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-strong)",
                boxShadow: "0 12px 30px -10px rgba(14,14,15,0.18)",
                transform: "rotate(-6deg)",
                letterSpacing: "-0.01em",
              }}
            >
              a real curriculum, finally
            </span>
            <span
              className="absolute -bottom-4 -right-2 z-[2] rounded-full border border-stroke-weak bg-bg-card px-3.5 py-2 text-sm italic"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-strong)",
                boxShadow: "0 12px 30px -10px rgba(14,14,15,0.18)",
                transform: "rotate(4deg)",
                letterSpacing: "-0.01em",
              }}
            >
              certificate + RPS priority
            </span>

            <div
              className="relative rounded-[22px] border border-stroke-weak bg-bg-card p-5.5 [transform:rotate(-0.5deg)]"
              style={{
                padding: 22,
                boxShadow:
                  "0 40px 80px -30px rgba(14,14,15,0.22), 0 8px 24px -12px rgba(14,14,15,0.08), 0 0 0 1px var(--stroke-faint)",
              }}
            >
              <div className="flex items-center justify-between px-1 pb-4 pt-1 text-[11px] uppercase tracking-[0.16em] text-text-muted">
                <span>Level Up · Playlist</span>
                <span className="font-mono text-xs normal-case tracking-normal">
                  6 lessons · 2h 48m
                </span>
              </div>

              {/* Featured "now playing" lesson */}
              <div className="mb-2 flex gap-4 rounded-2xl border border-stroke-weak bg-bg-sunken p-4">
                <div
                  className="relative grid h-21 w-27 shrink-0 place-items-center overflow-hidden rounded-[10px]"
                  style={{
                    width: 108,
                    height: 84,
                    background:
                      "radial-gradient(circle at 25% 30%, rgba(255,122,182,0.85), transparent 55%), radial-gradient(circle at 75% 70%, rgba(106,163,255,0.85), transparent 55%), radial-gradient(circle at 50% 90%, rgba(245,196,81,0.65), transparent 60%), #1a1a1d",
                  }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 3px)",
                      mixBlendMode: "overlay",
                    }}
                  />
                  <span
                    className="relative z-[1] grid size-[34px] place-items-center rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.97)",
                      color: "#0e0e0f",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                    }}
                  >
                    <svg
                      viewBox="0 0 12 12"
                      width="11"
                      height="11"
                      fill="currentColor"
                    >
                      <path d="M3 1.5v9l8-4.5z" />
                    </svg>
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <span
                    className="now-pulse inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-accent-pink before:size-[5px] before:rounded-full before:bg-accent-pink before:content-['']"
                  >
                    Now playing
                  </span>
                  <h4 className="mt-1 mb-1 text-[16px] font-semibold leading-tight tracking-[-0.015em] text-text-strong">
                    Figma file hygiene
                  </h4>
                  <p className="mb-1.5 text-[12.5px] leading-snug text-text-weak">
                    Folders, components, naming, branches — the conventions
                    every shipping team uses.
                  </p>
                  <span className="font-mono text-[11px] text-text-muted">
                    22 min · Lesson 01
                  </span>
                </div>
              </div>

              {/* Remaining lessons list */}
              <ol className="m-0 list-none p-0">
                {LESSONS.map((l) => (
                  <li
                    key={l.n}
                    className="grid grid-cols-[22px_1fr_auto] items-center gap-3.5 rounded-lg border-t border-stroke-faint px-2.5 py-3.5 text-sm transition-all hover:translate-x-0.5 hover:bg-bg-card-hover"
                  >
                    <span className="font-mono text-[11px] text-text-muted">
                      {l.n}
                    </span>
                    <span className="truncate text-text-strong">{l.title}</span>
                    <span className="font-mono text-[11px] text-text-muted">
                      {l.t}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-3.5 flex items-center justify-between border-t border-stroke-faint px-1 pt-3.5 pb-1 text-xs text-text-muted">
                <span>22 of 168 min watched</span>
                <div
                  aria-hidden
                  className="ml-4 h-1 max-w-[180px] flex-1 overflow-hidden rounded-full bg-bg-card-hover"
                >
                  <i
                    className="block h-full w-[22%] rounded-full"
                    style={{ background: "var(--rainbow)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
