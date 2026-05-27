import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveals } from "@/components/site/Reveals";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { COURSE_META, MARKETING, TRACKS } from "@/data/designup";

export const metadata: Metadata = {
  title: "DesignUp — go from course-finished to job-ready",
  description:
    "A self-paced course for designers. Three tracks — Craft, Collaboration, Career — that close the gap between finishing a course and being someone a product team can hand a real feature to. Free with an account.",
};

export default function DesignUpPage() {
  const { hero, why, tracksHeading, trackCards, value, howItWorks, finalCta } =
    MARKETING;

  return (
    <main className="min-h-dvh bg-bg-sunken text-text-strong">
      <SiteHeader />

      {/* 1 — Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[620px]"
          style={{
            background:
              "radial-gradient(50% 60% at 12% -8%, color-mix(in srgb, var(--accent-purple) 24%, transparent), transparent 60%), radial-gradient(56% 64% at 90% -10%, color-mix(in srgb, var(--accent-orange) 24%, transparent), transparent 62%), radial-gradient(46% 50% at 50% -6%, color-mix(in srgb, var(--accent-pink) 18%, transparent), transparent 56%)",
          }}
        />
        <Container className="relative z-[1]">
          <div className="mx-auto flex max-w-[860px] flex-col items-center pb-20 pt-40 text-center md:pb-24 md:pt-48">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-text-muted">
              {hero.eyebrow}
            </span>
            <h1 className="font-display reveal mt-5 text-[64px] leading-[1] text-text-strong md:text-[104px]">
              {hero.headline}
            </h1>
            <p className="reveal mt-6 max-w-[680px] text-[16px] leading-relaxed text-text-weak md:text-[18px]">
              {hero.subhead}
            </p>
            <p className="reveal mt-5 font-mono text-[12.5px] tracking-wide text-text-muted">
              {COURSE_META.meta}
            </p>
            <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={COURSE_META.signUpHref}
                className="inline-flex items-center gap-2 rounded-full bg-fill-strong px-6 py-3 text-[15px] font-medium text-text-inverse-strong transition-all hover:-translate-y-0.5 hover:opacity-95"
              >
                {hero.primaryCta} <ArrowRight className="size-4" />
              </Link>
              <a
                href="#inside"
                className="inline-flex items-center gap-1.5 rounded-full border border-stroke-weak bg-bg-card px-6 py-3 text-[15px] font-medium text-text-strong transition-colors hover:bg-bg-card-hover"
              >
                {hero.secondaryCta}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 — Why */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="reveal mx-auto max-w-[760px] text-center">
            <h2 className="font-display text-[32px] leading-[1.1] text-text-strong md:text-[44px]">
              {why.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-[640px] text-[16px] leading-relaxed text-text-weak md:text-[18px]">
              {why.body}
            </p>
          </div>
        </Container>
      </section>

      {/* 3 — The three tracks */}
      <section id="inside" className="scroll-mt-28 py-20 md:py-24">
        <Container>
          <h2 className="font-display reveal mx-auto mb-12 max-w-[16ch] text-center text-[32px] leading-[1.1] text-text-strong md:mb-16 md:text-[48px]">
            {tracksHeading}
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {trackCards.map((card, i) => {
              const tint = TRACKS[i].accent;
              return (
                <div
                  key={card.name}
                  className="reveal flex flex-col rounded-[24px] border p-8"
                  data-delay={i + 1}
                  style={{
                    background: `linear-gradient(160deg, color-mix(in srgb, ${tint} 12%, var(--bg-card)) 0%, var(--bg-card) 60%)`,
                    borderColor: `color-mix(in srgb, ${tint} 26%, var(--stroke-weak))`,
                  }}
                >
                  <span
                    className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: tint }}
                  >
                    {String(i + 1).padStart(2, "0")} · {card.name}
                  </span>
                  <h3 className="font-display mt-3 text-[24px] leading-[1.15] text-text-strong">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-text-weak">
                    {card.body}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4 — The value */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <h2 className="font-display reveal text-center text-[32px] leading-[1.1] text-text-strong md:text-[44px]">
              {value.heading}
            </h2>
            <ul className="reveal mx-auto mt-10 flex max-w-[640px] flex-col gap-4">
              {value.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 rounded-2xl border border-stroke-weak bg-bg-card p-5"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full"
                    style={{
                      background:
                        "color-mix(in srgb, var(--accent-sage) 18%, var(--bg-card))",
                      color: "var(--accent-sage)",
                    }}
                  >
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-[15.5px] leading-[1.55] text-text-strong">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 5 — How it works */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="reveal mx-auto max-w-[820px] rounded-[28px] border border-stroke-weak bg-bg-card p-10 text-center md:p-14">
            <h2 className="font-display text-[26px] leading-[1.15] text-text-strong md:text-[34px]">
              {howItWorks.heading}
            </h2>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[15px] text-text-weak">
              {howItWorks.points.map((p, i) => (
                <span key={p} className="inline-flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden className="text-text-disabled">
                      ·
                    </span>
                  )}
                  {p}
                </span>
              ))}
            </div>
            <p className="mt-5 text-[15px] italic text-text-muted">
              {howItWorks.note}
            </p>
          </div>
        </Container>
      </section>

      {/* 6 — Final CTA */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="reveal mx-auto max-w-[640px] text-center">
            <h2 className="font-display text-[40px] leading-[1.05] text-text-strong md:text-[60px]">
              {finalCta.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-[460px] text-[16px] leading-relaxed text-text-weak md:text-[18px]">
              {finalCta.body}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={COURSE_META.signUpHref}
                className="inline-flex items-center gap-2 rounded-full bg-fill-strong px-6 py-3 text-[15px] font-medium text-text-inverse-strong transition-all hover:-translate-y-0.5 hover:opacity-95"
              >
                {finalCta.primaryCta} <ArrowRight className="size-4" />
              </Link>
              <Link
                href={COURSE_META.loginHref}
                className="inline-flex items-center rounded-full border border-stroke-weak bg-bg-card px-6 py-3 text-[15px] font-medium text-text-strong transition-colors hover:bg-bg-card-hover"
              >
                {finalCta.secondaryCta}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter />
      <Reveals />
    </main>
  );
}
