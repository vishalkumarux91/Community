import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";

const PILLARS = [
  {
    title: "Learn",
    body:
      "Pick a topic — Figma, design systems, UX research — and get an AI-curated path of videos, articles, exercises, and projects. No more random tabs.",
    href: "/learn",
  },
  {
    title: "Mentor sessions",
    body:
      "1:1 portfolio reviews and live workshops with senior designers from product teams shipping at scale. Booked by the hour.",
    href: "/teach",
  },
  {
    title: "Honest critique",
    body:
      "Drop your work in the open. Get focused feedback from the community — and from mentors who opt in to your post.",
    href: "/community",
  },
  {
    title: "Portfolio builder",
    body:
      "Import LinkedIn. We suggest case studies based on the role you're targeting, then ship a live portfolio site in minutes.",
    href: "/portfolio/builder",
  },
];

export function PopularCategories() {
  return (
    <section className="border-b border-stroke-faint py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
            What you get
          </p>
          <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-text-strong md:text-3xl">
            Four pillars, one quiet home.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text-weak">
            Built for designers who&rsquo;d rather stop tab-hopping and start shipping.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <li key={p.title} className="space-y-3">
              <p className="text-[11px] uppercase tracking-wider text-text-muted">
                0{i + 1}
              </p>
              <h3 className="font-display text-xl font-medium text-text-strong">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-text-weak">{p.body}</p>
              <Link
                href={p.href}
                className="inline-flex items-center gap-1.5 text-sm text-text-strong transition-opacity hover:opacity-70"
              >
                Open {p.title.toLowerCase()} <ArrowRight className="size-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
