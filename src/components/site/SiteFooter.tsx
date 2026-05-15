import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";

const COLUMNS: { title: string; items: [string, string, boolean?][] }[] = [
  {
    title: "Level Up",
    items: [
      ["Overview", "/levelup", true],
      ["Syllabus", "/levelup"],
      ["For teams", "/levelup"],
    ],
  },
  {
    title: "Learn",
    items: [
      ["Tools", "/tools"],
      ["Topics", "/learn"],
      ["Mentors", "/teach"],
    ],
  },
  {
    title: "Community",
    items: [
      ["Feed", "/community"],
      ["Critique", "/community"],
      ["Become a mentor", "/teach/become-mentor"],
      ["About", "#"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-stroke-faint bg-bg-raised text-text-strong">
      {/* Rainbow radial wash */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 110%, rgba(255,122,182,0.32) 0%, transparent 60%), radial-gradient(60% 60% at 80% 110%, rgba(106,163,255,0.32) 0%, transparent 60%), radial-gradient(80% 70% at 50% 130%, rgba(245,196,81,0.22) 0%, transparent 65%)",
        }}
      />
      {/* Tiny dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--text-strong) 5%, transparent) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      <Container className="relative z-[2]">
        <div className="grid gap-12 py-24 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:pb-16 md:pt-24">
          <div>
            <h3 className="font-display m-0 text-[46px] leading-[0.98] tracking-[-0.035em]">
              Follow what <i>we&rsquo;re building</i>
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-weak">
              Quiet weekly notes — new mentors, fresh topics, deals on tools.
            </p>
            <Link
              href="/auth/sign-up"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-fill-strong bg-fill-strong px-5 py-2.5 text-sm font-medium text-text-inverse-strong transition-all hover:-translate-y-px hover:opacity-90"
            >
              Become a member <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.items.map(([label, href, isNew]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 text-[15px] text-text-strong opacity-85 transition-opacity hover:opacity-100"
                    >
                      {label}
                      {isNew && (
                        <span
                          className="rounded-full border px-1.5 py-0.5 text-[10px] tracking-wider text-text-strong"
                          style={{
                            background:
                              "color-mix(in srgb, var(--accent-pink) 22%, transparent)",
                            borderColor:
                              "color-mix(in srgb, var(--accent-pink) 40%, transparent)",
                          }}
                        >
                          NEW
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-4 border-t border-stroke-weak py-7 font-mono text-[12.5px] text-text-weak md:grid-cols-2 md:pb-10">
          <div>
            <span className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-text-muted">
              © Opencanvas
            </span>
            <span>{new Date().getFullYear()} · Made with care, in public.</span>
          </div>
          <div>
            <span className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Instagram
            </span>
            @opencanvas.community
          </div>
        </div>
      </Container>
    </footer>
  );
}
