import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";

const HANDLE_POS = ["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"];

export function OpencanvasHero() {
  return (
    <section className="relative overflow-hidden">
      {/* gradient backdrop — fades into the page background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[680px]"
        style={{
          background:
            "radial-gradient(50% 62% at 12% -8%, color-mix(in srgb, var(--accent-purple) 26%, transparent), transparent 60%), radial-gradient(56% 66% at 90% -10%, color-mix(in srgb, var(--accent-orange) 26%, transparent), transparent 62%), radial-gradient(46% 52% at 50% -6%, color-mix(in srgb, var(--accent-pink) 20%, transparent), transparent 56%)",
        }}
      />

      <Container className="relative z-[1]">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center pb-24 pt-40 text-center md:pb-32 md:pt-48">
          <span
            className="reveal inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium"
            style={{
              background: "color-mix(in srgb, var(--accent-orange) 13%, var(--bg-sunken))",
              color: "var(--accent-orange)",
            }}
          >
            Trusted by designers from product teams worldwide
          </span>

          <h1 className="font-display reveal mt-7 text-[46px] leading-[1.04] text-text-strong [text-wrap:balance] md:text-[74px]">
            Grow into the <br className="hidden md:block" />
            <span className="relative mx-1 inline-block align-baseline">
              <span
                className="relative z-[1] rounded-[7px] px-2.5"
                style={{
                  background: "color-mix(in srgb, var(--accent-orange) 14%, var(--bg-sunken))",
                  color: "var(--accent-orange)",
                  boxShadow: "inset 0 0 0 1.5px var(--accent-orange)",
                }}
              >
                Designer
              </span>
              {HANDLE_POS.map((pos) => (
                <span
                  key={pos}
                  aria-hidden
                  className={`absolute ${pos} z-[2] size-2.5 rounded-[2px] border-2 border-bg-sunken`}
                  style={{ background: "var(--accent-orange)" }}
                />
              ))}
            </span>{" "}
            <span className="text-text-weak">you want to be.</span>
          </h1>

          <p className="reveal mt-7 max-w-[620px] text-[17px] leading-relaxed text-text-weak md:text-[19px]">
            Real-world design skills, honest feedback, and a community that grows
            with you.
          </p>

          <Link
            href="/auth/sign-up"
            className="reveal mt-10 inline-flex items-center gap-2 rounded-full bg-fill-strong px-6 py-3 text-[15px] font-medium text-text-inverse-strong transition-all hover:-translate-y-0.5 hover:opacity-95"
          >
            Join the community <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
