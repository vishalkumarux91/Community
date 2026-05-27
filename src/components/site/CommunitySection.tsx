import { Container } from "@/components/ui/Container";
import { Comment, Briefcase, HelpCircle } from "@/components/ui/Icons";

type Card = {
  icon: (p: { className?: string }) => React.JSX.Element;
  title: string;
  desc: string;
  tint: string;
};

const CARDS: Card[] = [
  {
    icon: Comment,
    title: "Get your work critiqued",
    desc: "Post a screen and get real, constructive feedback from the community — actionable notes, not vague vibes.",
    tint: "var(--accent-purple)",
  },
  {
    icon: Briefcase,
    title: "Portfolio reviews",
    desc: "Share your portfolio before you apply and tighten it with people who've already been hired.",
    tint: "var(--accent-orange)",
  },
  {
    icon: HelpCircle,
    title: "Ask anything",
    desc: "From “is this spacing right?” to “how do I handle this interview?” — someone here has been exactly where you are.",
    tint: "var(--accent-yellow)",
  },
  {
    icon: Comment,
    title: "Talk design",
    desc: "Trends, tools, careers, and the messy in-between of becoming a designer. The conversations you wish you had in school.",
    tint: "var(--accent-sage)",
  },
];

export function CommunitySection() {
  return (
    <section id="community" className="relative overflow-hidden">
      {/* warm multi-accent gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(58% 55% at 16% -4%, color-mix(in srgb, var(--accent-orange) 18%, transparent), transparent 70%), radial-gradient(54% 55% at 86% 6%, color-mix(in srgb, var(--accent-purple) 18%, transparent), transparent 72%), radial-gradient(72% 60% at 50% 112%, color-mix(in srgb, var(--accent-yellow) 14%, transparent), transparent 72%)",
        }}
      />

      <Container className="relative z-[1] py-24 md:py-32">
        <div className="reveal mx-auto max-w-[760px] text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-text-muted">
            The community
          </p>
          <h2 className="font-display mx-auto mt-5 max-w-[18ch] text-[40px] leading-[1.05] text-text-strong [text-wrap:balance] md:text-[60px]">
            A place to ask, share, and get better —{" "}
            <span className="text-accent-purple">together.</span>
          </h2>
          <p className="font-figtree mx-auto mt-6 max-w-[54ch] text-[16px] leading-[1.6] text-text-weak md:text-[18px]">
            Topics give you the foundation. The community keeps you moving — an
            open, friendly space built for designers. No gatekeeping, no
            judgment.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="reveal group relative overflow-hidden rounded-[28px] border p-8 transition-transform duration-300 hover:-translate-y-1 md:p-10"
                data-delay={Math.min(i + 1, 4)}
                style={{
                  background: `linear-gradient(155deg, color-mix(in srgb, ${c.tint} 13%, var(--bg-card)) 0%, var(--bg-card) 62%)`,
                  borderColor: `color-mix(in srgb, ${c.tint} 26%, var(--stroke-weak))`,
                  boxShadow: "0 1px 0 var(--stroke-faint)",
                }}
              >
                <span
                  className="grid size-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6"
                  style={{
                    background: `color-mix(in srgb, ${c.tint} 20%, var(--bg-card))`,
                    color: c.tint,
                  }}
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="font-figtree mt-6 text-[21px] font-semibold tracking-[-0.01em] text-text-strong md:text-[23px]">
                  {c.title}
                </h3>
                <p className="font-figtree mt-3 max-w-[46ch] text-[15.5px] leading-[1.6] text-text-weak">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
