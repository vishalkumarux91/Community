import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";

/* Organic clip-path shapes used for the floating portraits. */
const SHAPE = {
  squircle: "30% 70% 70% 30% / 30% 30% 70% 70%",
  hexagon: "polygon(25% 4%, 75% 4%, 100% 50%, 75% 96%, 25% 96%, 0% 50%)",
  octagon:
    "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  star: "polygon(50% 0%, 63% 33%, 98% 35%, 70% 57%, 80% 91%, 50% 72%, 20% 91%, 30% 57%, 2% 35%, 37% 33%)",
} as const;

type Floater = {
  img: string;
  accent: string;
  pos: string;
  size: number;
  rotate: number;
  clip?: string;
  radius?: string;
};

/* Portraits that float around the headline. Hidden below lg. */
const FLOATERS: Floater[] = [
  { img: "12", accent: "var(--accent-purple)", pos: "left-[4%] top-[18%]", size: 116, rotate: -10, radius: "30px" },
  { img: "33", accent: "var(--accent-orange)", pos: "right-[5%] top-[14%]", size: 124, rotate: 8, clip: SHAPE.hexagon },
  { img: "5", accent: "var(--accent-pink)", pos: "left-[10%] bottom-[10%]", size: 120, rotate: 6, clip: SHAPE.octagon },
  { img: "47", accent: "var(--accent-sage)", pos: "right-[8%] bottom-[8%]", size: 128, rotate: -6, clip: SHAPE.star },
];

export function OpencanvasHero() {
  return (
    <section className="relative overflow-hidden">
      {/* gradient backdrop — fades into the page background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[680px]"
        style={{
          background:
            "radial-gradient(50% 62% at 12% -8%, color-mix(in srgb, var(--accent-purple) 22%, transparent), transparent 60%), radial-gradient(56% 66% at 90% -10%, color-mix(in srgb, var(--accent-orange) 20%, transparent), transparent 62%), radial-gradient(46% 52% at 50% -6%, color-mix(in srgb, var(--accent-pink) 16%, transparent), transparent 56%)",
        }}
      />

      <Container className="relative z-[1]">
        {/* ---------- Headline with floating portraits ---------- */}
        <div className="relative mx-auto max-w-[1040px] pb-16 pt-36 text-center md:pt-44">
          {/* floating portraits */}
          {FLOATERS.map((f) => (
            <span
              key={f.img}
              aria-hidden
              className={`pointer-events-none absolute z-[2] hidden overflow-hidden shadow-lg lg:inline-block ${f.pos}`}
              style={{
                width: f.size,
                height: f.size,
                background: f.accent,
                borderRadius: f.radius,
                clipPath: f.clip,
                transform: `rotate(${f.rotate}deg)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.pravatar.cc/240?img=${f.img}`}
                alt=""
                className="size-full scale-[1.08] object-cover"
              />
            </span>
          ))}

          <h1 className="font-display reveal relative z-[1] mx-auto max-w-[840px] text-[46px] leading-[1.04] text-text-strong [text-wrap:balance] md:text-[76px]">
            Grow into the{" "}
            <span style={{ color: "var(--accent-purple)" }}>Designer</span> you
            want to be.
          </h1>

          <p className="reveal relative z-[1] mx-auto mt-7 max-w-[600px] text-[17px] leading-relaxed text-text-weak md:text-[19px]">
            Real-world design skills, honest feedback, and a community that grows
            with you. Learn from people who actually ship.
          </p>

          <div className="reveal relative z-[1] mt-10 flex items-center justify-center gap-3">
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium text-text-inverse-strong transition-all hover:-translate-y-0.5 hover:opacity-95"
              style={{ background: "var(--accent-purple)" }}
            >
              Join the community <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/levelup"
              className="inline-flex items-center rounded-full border border-stroke-strong px-7 py-3.5 text-[15px] font-medium text-text-strong transition-all hover:-translate-y-0.5 hover:bg-bg-card-hover"
            >
              Explore courses
            </Link>
          </div>
        </div>

      </Container>
    </section>
  );
}
