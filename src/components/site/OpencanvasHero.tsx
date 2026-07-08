import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";

export function OpencanvasHero() {
  return (
    // Warm cream canvas hero. Display type runs aggressive at 96px+
    // per Replicate's "type as decoration" rule — tight line-height,
    // negative letter-spacing, weight 700.
    <section className="bg-circle-hero border-b border-hairline">
      <Container className="py-24 md:py-32">
        <div className="mx-auto max-w-[920px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-card px-3 py-1.5 text-[13px] font-semibold text-ink">
            <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-on-primary">
              New
            </span>
            Next live workshop starts this Friday — seats open
          </span>
          <h1 className="font-display mx-auto mt-7 max-w-[920px] text-[56px] font-bold leading-[1.0] tracking-[-0.03em] text-ink [text-wrap:balance] md:text-[96px]">
            Become industry-ready.{" "}
            <span className="gradient-text">Ship with AI.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-[16px] leading-[1.55] text-body md:text-[18px]">
            A community for early-career designers. Attend live workshops,
            submit real assignments, and get honest assessments from senior
            designers.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link
              href="/auth/sign-up"
              className="btn-press btn-circle inline-flex items-center gap-1.5 rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-on-primary hover:bg-[color:var(--primary-deep)]"
            >
              Sign up for free <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/workshops"
              className="btn-press rounded-full border border-hairline bg-surface-card px-7 py-3.5 text-[15px] font-semibold text-ink shadow-[0_6px_18px_-10px_rgba(16,24,40,0.35)] hover:bg-surface-bone"
            >
              Browse workshops
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
