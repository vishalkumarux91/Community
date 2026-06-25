import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";

export function OpencanvasHero() {
  return (
    // Warm cream canvas hero. Display type runs aggressive at 96px+
    // per Replicate's "type as decoration" rule — tight line-height,
    // negative letter-spacing, weight 700.
    <section className="border-b border-hairline bg-canvas">
      <Container className="py-24 md:py-32">
        <div className="mx-auto max-w-[920px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-card px-3 py-1.5 text-[13px] font-semibold text-ink">
            <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-on-primary">
              Live
            </span>
            Workshops + assignments, every other Friday
          </span>
          <h1 className="font-display mx-auto mt-7 max-w-[920px] text-[56px] font-bold leading-[1.0] tracking-[-0.03em] text-ink [text-wrap:balance] md:text-[96px]">
            Become industry-ready.{" "}
            <em>Ship</em> with AI.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-[16px] leading-[1.55] text-body md:text-[18px]">
            A community for early-career designers. Live workshops, real
            assignments, honest assessments from senior designers — plus a
            tidy library of playbooks and resources.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-on-primary transition-colors hover:bg-[color:var(--primary-deep)]"
            >
              Sign up for free <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/workshops"
              className="rounded-full border border-hairline bg-surface-card px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-surface-bone"
            >
              Browse workshops
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
