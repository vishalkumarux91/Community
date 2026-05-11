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
  "group relative flex min-h-[280px] flex-col overflow-hidden rounded-[22px] border border-stroke-weak bg-bg-card transition-all duration-300 hover:-translate-y-1 hover:border-stroke-strong hover:shadow-[0_24px_48px_-24px_rgba(10,10,11,0.22)]";

function Arrow() {
  return (
    <span
      aria-hidden
      className="absolute right-4 top-4 z-[2] grid size-9 place-items-center rounded-full border border-stroke-weak bg-bg-sunken text-text-weak transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:-rotate-12 group-hover:bg-bg-card group-hover:text-[var(--tint)]"
    >
      {ARROW}
    </span>
  );
}

export function Bento() {
  return (
    <section className="border-b border-stroke-faint py-28">
      <Container>
        <div className="reveal mb-14 max-w-[720px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
            What you get
          </p>
          <h2 className="font-display mt-3.5 mb-4 text-[44px] font-normal leading-[1.02] tracking-[-0.015em] md:text-[72px]">
            Four pillars, <em className="italic text-accent-orange">one</em>{" "}
            quiet home.
          </h2>
          <p className="max-w-[560px] text-[17px] leading-[1.55] text-text-weak">
            Built for designers who&rsquo;d rather stop tab-hopping and start
            shipping.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[minmax(280px,auto)_minmax(280px,auto)]">
          {/* LEARN — tall left */}
          <Link
            href="/learn"
            className={`${tileBase} md:col-start-1 md:row-span-2`}
            style={{ ["--tint" as string]: "var(--accent-orange)" }}
          >
            <Arrow />
            <div
              className="relative flex-1 overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--accent-orange) 12%, transparent), transparent 60%)",
              }}
            >
              <div className="flex h-full flex-col justify-center gap-3.5 p-7">
                {[
                  ["1", "Watch · Type at scale", "Video"],
                  ["2", "Read · Spacing systems", "Article"],
                  ["3", "Practice · Rebuild a flow", "Exercise"],
                  ["4", "Ship · Capstone project", "Project"],
                ].map(([n, lbl, tag]) => (
                  <div
                    key={n}
                    className="flex items-center gap-3.5 rounded-xl border border-stroke-weak bg-bg-sunken p-3 transition-all group-hover:translate-x-1"
                  >
                    <span
                      className="grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold text-accent-orange"
                      style={{
                        background:
                          "color-mix(in srgb, var(--accent-orange) 18%, var(--bg-card))",
                      }}
                    >
                      {n}
                    </span>
                    <span className="text-[13px] text-text-strong">{lbl}</span>
                    <span className="ml-auto text-[10px] uppercase tracking-[0.12em] text-text-muted">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-stroke-faint px-7 pb-6 pt-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-orange">
                01
              </span>
              <h3 className="font-display m-0 text-[32px] leading-[1.05] tracking-[-0.01em]">
                Learn
              </h3>
              <p className="m-0 text-[14.5px] leading-[1.55] text-text-weak">
                Pick a topic — Figma, design systems, UX research — and follow a
                curated path of videos, articles, exercises, and projects.
              </p>
            </div>
          </Link>

          {/* MENTOR */}
          <Link
            href="/teach"
            className={`${tileBase} md:col-start-2 md:row-start-1`}
            style={{ ["--tint" as string]: "var(--accent-blue)" }}
          >
            <Arrow />
            <div
              className="relative flex-1 overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--accent-blue) 12%, transparent), transparent 60%)",
              }}
            >
              <div className="flex h-full items-center gap-3.5 p-6">
                <div className="flex flex-1 flex-col gap-1.5 rounded-[10px] border border-stroke-weak bg-bg-sunken p-3">
                  <div className="flex justify-between text-[10px] uppercase tracking-[0.08em] text-text-muted">
                    <span>Wed</span>
                    <span className="inline-flex items-center gap-1 text-accent-sage before:size-[5px] before:rounded-full before:bg-accent-sage before:content-['']">
                      3 free
                    </span>
                  </div>
                  <div className="h-4 rounded border border-stroke-weak bg-bg-card-hover transition-transform group-hover:translate-x-0.5" />
                  <div
                    className="h-4 rounded border transition-transform group-hover:translate-x-0.5"
                    style={{
                      background:
                        "linear-gradient(90deg, color-mix(in srgb, var(--accent-blue) 28%, transparent), color-mix(in srgb, var(--accent-blue) 8%, transparent))",
                      borderColor:
                        "color-mix(in srgb, var(--accent-blue) 40%, transparent)",
                    }}
                  />
                  <div className="h-4 rounded border border-stroke-weak bg-bg-card-hover" />
                  <div
                    className="h-4 rounded border"
                    style={{
                      background:
                        "linear-gradient(90deg, color-mix(in srgb, var(--accent-blue) 28%, transparent), color-mix(in srgb, var(--accent-blue) 8%, transparent))",
                      borderColor:
                        "color-mix(in srgb, var(--accent-blue) 40%, transparent)",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-stroke-faint px-7 pb-6 pt-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-blue">
                02
              </span>
              <h3 className="font-display m-0 text-[32px] leading-[1.05] tracking-[-0.01em]">
                Mentor sessions
              </h3>
              <p className="m-0 text-[14.5px] leading-[1.55] text-text-weak">
                1:1 portfolio reviews and live workshops with senior designers
                shipping at scale.
              </p>
            </div>
          </Link>

          {/* CRITIQUE */}
          <Link
            href="/community"
            className={`${tileBase} md:col-start-3 md:row-start-1`}
            style={{ ["--tint" as string]: "var(--accent-yellow)" }}
          >
            <Arrow />
            <div
              className="relative flex-1 overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--accent-yellow) 12%, transparent), transparent 60%)",
              }}
            >
              <div className="relative h-full p-6">
                <div
                  className="absolute inset-6 overflow-hidden rounded-[10px] border border-stroke-weak"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(214,168,74,0.20), rgba(214,168,74,0.04) 60%, color-mix(in srgb, var(--text-strong) 2%, transparent))",
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      top: 14,
                      left: 14,
                      right: "40%",
                      height: 7,
                      borderRadius: 4,
                      background:
                        "color-mix(in srgb, var(--text-strong) 10%, transparent)",
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      top: 26,
                      left: 14,
                      width: 50,
                      height: 5,
                      borderRadius: 4,
                      opacity: 0.7,
                      background:
                        "color-mix(in srgb, var(--text-strong) 10%, transparent)",
                    }}
                  />
                </div>
                <span
                  className="absolute z-[2] grid size-[22px] scale-0 place-items-center text-[11px] font-bold text-white opacity-0 transition-all duration-500 ease-[cubic-bezier(.3,.9,.3,1.4)] group-hover:scale-100 group-hover:opacity-100"
                  style={{
                    top: "36%",
                    left: "30%",
                    borderRadius: "999px 999px 999px 2px",
                    background: "var(--accent-orange)",
                    boxShadow: "0 4px 12px rgba(232,93,44,0.4)",
                    transitionDelay: "0.1s",
                  }}
                >
                  !
                </span>
                <span
                  className="absolute z-[2] grid size-[22px] scale-0 place-items-center text-[11px] font-bold opacity-0 transition-all duration-500 ease-[cubic-bezier(.3,.9,.3,1.4)] group-hover:scale-100 group-hover:opacity-100"
                  style={{
                    top: "58%",
                    right: "28%",
                    borderRadius: "999px 999px 999px 2px",
                    background: "var(--accent-yellow)",
                    color: "#1a1410",
                    boxShadow: "0 4px 12px rgba(214,168,74,0.4)",
                    transitionDelay: "0.3s",
                  }}
                >
                  ?
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-stroke-faint px-7 pb-6 pt-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-yellow">
                03
              </span>
              <h3 className="font-display m-0 text-[32px] leading-[1.05] tracking-[-0.01em]">
                Honest critique
              </h3>
              <p className="m-0 text-[14.5px] leading-[1.55] text-text-weak">
                Drop your work in the open and get focused feedback from the
                community.
              </p>
            </div>
          </Link>

          {/* PORTFOLIO — wide bottom */}
          <Link
            href="/portfolio/builder"
            className={`${tileBase} md:col-span-2 md:col-start-2 md:row-start-2`}
            style={{ ["--tint" as string]: "var(--accent-sage)" }}
          >
            <Arrow />
            <div
              className="relative flex-1 overflow-hidden"
              style={{
                perspective: "800px",
                background:
                  "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--accent-sage) 12%, transparent), transparent 60%),",
              }}
            >
              <div className="relative h-full p-6">
                {[
                  { c: "c1", left: "12%", top: "18%", rot: "-8deg", hover: "rotate(-14deg) translate(-16px, -6px)", z: 1 },
                  { c: "c2", left: "30%", top: "22%", rot: "-1deg", hover: "rotate(-2deg) translateY(-14px)", z: 2, accent: true },
                  { c: "c3", left: "48%", top: "18%", rot: "6deg", hover: "rotate(10deg) translate(16px, -6px)", z: 1 },
                ].map((card) => (
                  <div
                    key={card.c}
                    className={`absolute aspect-[4/3] w-[28%] overflow-hidden rounded-[10px] border border-stroke-weak bg-bg-card transition-all duration-[550ms] group-hover:[transform:var(--hov)] ${
                      card.accent ? "group-hover:border-accent-sage" : ""
                    }`}
                    style={{
                      left: card.left,
                      top: card.top,
                      zIndex: card.z,
                      transform: `rotate(${card.rot})`,
                      boxShadow: "0 12px 30px -8px rgba(0,0,0,0.18)",
                      ["--hov" as string]: card.hover,
                    }}
                  >
                    <div
                      className="h-[64%]"
                      style={{
                        background:
                          "linear-gradient(135deg, color-mix(in srgb, var(--accent-sage) 32%, transparent), color-mix(in srgb, var(--accent-sage) 6%, transparent))",
                      }}
                    />
                    <div className="flex flex-col gap-1.5 p-3">
                      <i className="block h-1 w-4/5 rounded-full bg-text-muted" />
                      <i className="block h-1 w-1/2 rounded-full bg-stroke-weak" />
                    </div>
                  </div>
                ))}
                <span
                  className="absolute right-6 bottom-6 z-[3] inline-flex translate-y-1.5 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold text-accent-sage opacity-0 transition-all delay-200 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{
                    background:
                      "color-mix(in srgb, var(--accent-sage) 22%, var(--bg-card))",
                    borderColor:
                      "color-mix(in srgb, var(--accent-sage) 50%, transparent)",
                  }}
                >
                  <span className="size-1.5 rounded-full bg-accent-sage" />
                  Published
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-stroke-faint px-7 pb-6 pt-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-sage">
                04
              </span>
              <h3 className="font-display m-0 text-[32px] leading-[1.05] tracking-[-0.01em]">
                Portfolio builder
              </h3>
              <p className="m-0 text-[14.5px] leading-[1.55] text-text-weak">
                Import LinkedIn. We suggest case studies based on the role
                you&rsquo;re targeting, then ship a live portfolio site in
                minutes.
              </p>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
