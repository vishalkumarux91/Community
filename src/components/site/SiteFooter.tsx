import Link from "next/link";
import { Container } from "@/components/ui/Container";

const COLUMNS: { title: string; items: [string, string][] }[] = [
  {
    title: "Community",
    items: [
      ["Workshops", "/workshops"],
      ["Playbooks", "/playbooks"],
      ["Resources", "/resources"],
    ],
  },
  {
    title: "Account",
    items: [
      ["Sign in", "/auth/sign-in"],
      ["Sign up", "/auth/sign-up"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      {/* Cream callout banner — Replicate uses a warm-canvas CTA before
           the deep footer, not a gray one. */}
      <Container className="pt-24 pb-16">
        <div className="grid items-center gap-6 rounded-[16px] bg-surface-bone p-10 md:grid-cols-[1.4fr_auto] md:p-12">
          <div>
            <h3 className="font-display m-0 text-[36px] font-bold leading-[1.05] tracking-[-0.025em] text-ink md:text-[48px]">
              Start growing with Opencanvas.
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-[1.55] text-body">
              Free to join. Workshops, an honest community, and assessments
              from senior designers.
            </p>
          </div>
          <Link
            href="/auth/sign-up"
            className="justify-self-start rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-on-primary transition-colors hover:bg-[color:var(--primary-deep)]"
          >
            Sign up for free
          </Link>
        </div>
      </Container>

      {/* Deep-ink footer per Replicate's `footer` component spec. */}
      <div className="bg-surface-deep text-on-dark">
        <Container className="pt-16">
          <div className="grid gap-12 pb-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              <h4 className="font-display m-0 text-[24px] font-bold leading-[1.15] tracking-[-0.015em] text-on-dark">
                Follow what we&rsquo;re building.
              </h4>
              <p
                className="mt-3 max-w-xs text-[14px] leading-[1.55]"
                style={{ color: "var(--on-dark-mute)" }}
              >
                Quiet weekly notes — new workshops, fresh playbooks, picked
                articles.
              </p>
              <Link
                href="/auth/sign-up"
                className="mt-5 inline-flex rounded-full border border-[color:var(--divider-dark)] px-4 py-2 text-[14px] font-semibold text-on-dark transition-colors hover:bg-white/5"
              >
                Become a member
              </Link>
            </div>

            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4
                  className="mb-3.5 text-[12px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: "var(--on-dark-mute)" }}
                >
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.items.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-[14px] text-on-dark transition-opacity hover:opacity-80"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="grid gap-4 border-t py-7 text-[13px] md:grid-cols-2 md:pb-10"
            style={{
              color: "var(--on-dark-mute)",
              borderColor: "var(--divider-dark)",
            }}
          >
            <div>© {new Date().getFullYear()} Opencanvas · Made with care, in public.</div>
            <div className="md:text-right">@opencanvas.community</div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
