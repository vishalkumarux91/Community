import Link from "next/link";
import { Container } from "@/components/ui/Container";

type Card = {
  quote: string;
  name: string;
  role: string;
  tone: string;
};

const CARDS: Card[] = [
  {
    quote:
      "What I like most is that it's not just showcasing tools — it's helping me understand how to use them in real design workflows.",
    name: "Maya R.",
    role: "Senior Product Designer · Swiggy",
    tone: "var(--accent-orange)",
  },
  {
    quote:
      "The mentor sessions paid for themselves in week one. Honest, focused feedback I couldn't get anywhere else — not from Discord, not from Twitter.",
    name: "Aditya K.",
    role: "Product Designer · Razorpay",
    tone: "var(--accent-blue)",
  },
  {
    quote:
      "I broke into product design after six months here. The portfolio builder + critique loop is the closest thing to a design school I've found online.",
    name: "Riya I.",
    role: "Designer · Cred",
    tone: "var(--accent-sage)",
  },
  {
    quote:
      "Finally a community where AI isn't taboo and isn't hype. We actually talk about where it works in real flows — and where it doesn't.",
    name: "Sana D.",
    role: "Staff Designer · Stripe",
    tone: "var(--accent-yellow)",
  },
  {
    quote:
      "The topic paths are tight. No fluff, no filler. I finished Type for Product in a weekend and immediately re-typed our entire dashboard.",
    name: "Vikram P.",
    role: "Lead Designer · Linear",
    tone: "var(--accent-orange)",
  },
  {
    quote:
      "It's the calmest design space I've used in years. I post, I get good notes, I ship. No performance, no noise — just craft.",
    name: "Lea M.",
    role: "Senior Designer · Notion",
    tone: "var(--accent-blue)",
  },
];

function avatarBg(tone: string) {
  return `repeating-linear-gradient(45deg, color-mix(in srgb, ${tone} 65%, var(--bg-card)) 0 5px, color-mix(in srgb, ${tone} 40%, var(--bg-card)) 5px 10px)`;
}

export function TestimonialsBlock() {
  return (
    <section className="border-b border-stroke-faint py-28">
      <Container>
        <div className="mb-14 grid items-end gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <div className="reveal">
            <h2 className="font-display m-0 text-[132px] leading-[0.9] tracking-[-0.03em] text-text-strong md:text-[168px]">
              1,200
              <i className="italic text-accent-orange">+</i>
            </h2>
            <p className="mt-3 max-w-[320px] text-base text-text-weak">
              Designers learning, shipping, and growing together — across
              product teams worldwide.
            </p>
          </div>
          <div className="reveal flex flex-col items-start gap-4">
            <div className="flex items-center" aria-hidden>
              {(["var(--accent-orange)", "var(--accent-blue)", "var(--accent-sage)", "var(--accent-yellow)"] as const).map(
                (tone, i) => (
                  <span
                    key={i}
                    className="-ml-2.5 size-[38px] shrink-0 rounded-full first:ml-0"
                    style={{
                      background: avatarBg(tone),
                      border: "2px solid var(--bg-sunken)",
                    }}
                  />
                ),
              )}
            </div>
            <p className="font-display m-0 max-w-[540px] text-[18px] leading-[1.45] tracking-[-0.01em] text-text-strong md:text-[22px]">
              Don&rsquo;t just take our word for it — hear from designers who
              joined to find a quieter place to grow, get honest critique, and
              ship better work.
            </p>
            <div className="mt-1.5 flex flex-wrap gap-2.5">
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center rounded-full bg-fill-strong px-4.5 py-2.5 text-sm font-medium text-text-inverse-strong transition-opacity hover:opacity-90"
              >
                Become a member
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center rounded-full border border-stroke-weak bg-bg-card px-4.5 py-2.5 text-sm font-medium text-text-strong transition-colors hover:bg-bg-card-hover"
              >
                Read success stories
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <article
              key={i}
              className="flex min-h-[280px] flex-col justify-between gap-6 rounded-2xl border border-stroke-weak bg-bg-card p-7 shadow-[0_1px_0_var(--stroke-faint)] transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_40px_-24px_rgba(0,0,0,0.18)]"
            >
              <q
                className="text-[15px] leading-[1.55] text-text-strong"
                style={{ quotes: "none" }}
              >
                {c.quote}
              </q>
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5 text-[13.5px]">
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-[12.5px] text-text-muted">{c.role}</span>
                </div>
                <span
                  aria-hidden
                  className="size-10 shrink-0 rounded-full border border-stroke-weak"
                  style={{ background: avatarBg(c.tone) }}
                />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
