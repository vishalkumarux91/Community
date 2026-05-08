"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight, ArrowUpRight, LinkIcon, Sparkles, Star } from "@/components/ui/Icons";
import { usePortfolio, clearPortfolio } from "@/lib/portfolio";

const SAMPLE_CASE_STUDIES: Record<string, { metrics: string[]; image: string; tags: string[] }> = {
  "Razorpay onboarding redesign": {
    metrics: ["18% drop-off ↓", "8M merchants", "6 weeks shipped"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
    tags: ["Fintech", "Onboarding", "Mobile"],
  },
  "Internal design system v2": {
    metrics: ["11 teams", "24 components", "87% adoption"],
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80&auto=format&fit=crop",
    tags: ["Design systems", "Tokens", "Governance"],
  },
  "Indie marketing site": {
    metrics: ["6k visits", "3 months", "Solo build"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80&auto=format&fit=crop",
    tags: ["Marketing", "Framer", "Indie"],
  },
};

const SKILLS = ["Product design", "Design systems", "Prototyping", "User research", "Figma", "Webflow", "Framer", "ProtoPie"];

const EXPERIENCE = [
  { role: "Senior Product Designer", company: "Razorpay", years: "2023 — present" },
  { role: "Product Designer", company: "Swiggy", years: "2020 — 2023" },
  { role: "Junior Designer", company: "ThoughtWorks", years: "2018 — 2020" },
];

export default function PortfolioPage() {
  const { cfg, hydrated } = usePortfolio();

  if (!hydrated) {
    return <div className="px-6 py-16 text-center text-sm text-text-muted">Loading…</div>;
  }

  if (!cfg) {
    return <EmptyState />;
  }

  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-12 px-6 py-10 md:px-10">
      {/* Owner toolbar */}
      <Card
        className="flex flex-col items-start justify-between gap-3 border-dashed bg-transparent p-5 md:flex-row md:items-center"
        hover={false}
      >
        <div className="flex items-center gap-3 text-sm">
          <Sparkles className="size-4 text-accent-orange" />
          <span className="text-text-strong">
            Live at <span className="font-medium">rps.community/{cfg.subdomain}</span>
          </span>
          <span className="hidden text-text-muted md:inline">
            · last generated {new Date(cfg.generatedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/portfolio/builder"
            className="rounded-full border border-stroke-weak px-4 py-1.5 text-xs hover:bg-bg-card-hover"
          >
            Edit
          </Link>
          <button
            onClick={() => {
              clearPortfolio();
              window.location.reload();
            }}
            className="rounded-full px-3 py-1.5 text-xs text-text-muted hover:text-text-strong"
          >
            Reset
          </button>
        </div>
      </Card>

      {/* Hero */}
      <section className="space-y-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
          {cfg.stage === "junior"
            ? "Junior product designer"
            : cfg.stage === "mid"
              ? "Mid-level product designer"
              : "Senior product designer"}
        </p>
        <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] md:text-6xl">
          {cfg.fullName || "Your name"}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-text-weak md:text-base">
          {cfg.hero}
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-fill-strong px-5 py-2 text-sm font-medium text-text-inverse-strong"
          >
            Get in touch <ArrowRight className="size-3.5" />
          </a>
          <a
            href={cfg.linkedin || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-stroke-weak px-4 py-2 text-sm hover:bg-bg-card-hover"
          >
            <LinkIcon className="size-3.5" /> LinkedIn
          </a>
        </div>
      </section>

      {/* Selected work */}
      <section>
        <h2 className="font-display text-xl font-medium tracking-tight md:text-2xl">
          Selected work
        </h2>
        <div className="mt-6 space-y-10">
          {cfg.projects.map((title) => {
            const meta = SAMPLE_CASE_STUDIES[title];
            return (
              <article
                key={title}
                className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:gap-10"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-stroke-weak">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={meta?.image ?? ""}
                    alt={title}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {meta?.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                  </div>
                  <h3 className="font-display text-2xl font-medium tracking-tight">
                    {title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-text-weak">
                    A short framing of the problem, the constraints, and the call I made.
                    The deeper case study walks through process — research → IA → flows → ship.
                  </p>
                  <ul className="flex flex-wrap gap-1.5 pt-1">
                    {meta?.metrics.map((m) => (
                      <li
                        key={m}
                        className="rounded-md border border-stroke-weak bg-bg-card px-2 py-1 text-xs text-text-strong"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm text-text-strong hover:opacity-70"
                  >
                    Read the case study <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Experience */}
      <section className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-medium tracking-tight md:text-2xl">
            Experience
          </h2>
          <ul className="mt-5 divide-y divide-stroke-faint border-y border-stroke-faint">
            {EXPERIENCE.map((e) => (
              <li key={e.role} className="flex items-baseline justify-between py-3.5">
                <div>
                  <p className="font-medium">{e.role}</p>
                  <p className="text-xs text-text-muted">{e.company}</p>
                </div>
                <p className="text-xs text-text-muted">{e.years}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl font-medium tracking-tight md:text-2xl">
            Skills & tools
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <li
                key={s}
                className="rounded-full border border-stroke-weak px-3 py-1 text-xs text-text-weak"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h3 className="font-display text-base font-medium">Recommendations</h3>
            <Card className="mt-3 space-y-3 p-5" hover={false}>
              <p className="flex items-center gap-1 text-xs text-accent-yellow">
                <Star className="size-3" />
                <Star className="size-3" />
                <Star className="size-3" />
                <Star className="size-3" />
                <Star className="size-3" />
              </p>
              <p className="text-sm leading-relaxed text-text-weak">
                &ldquo;Ships craft and clarity. The kind of designer who makes the team
                better around them.&rdquo;
              </p>
              <p className="text-xs text-text-muted">— Manager, ex-Razorpay</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="rounded-2xl border border-stroke-weak bg-bg-card p-8 md:p-12"
      >
        <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
          Let&rsquo;s build something good.
        </h2>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-text-weak">
          Available for senior product design roles, founding designer slots, and
          short-term consulting. Best place to reach me is email or LinkedIn.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <a
            href="#"
            className="rounded-full bg-fill-strong px-5 py-2 text-sm font-medium text-text-inverse-strong"
          >
            hello@example.com
          </a>
          <a
            href={cfg.linkedin || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-stroke-weak px-4 py-2 text-sm hover:bg-bg-card-hover"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col items-center px-6 py-24 text-center">
      <span className="grid size-12 place-items-center rounded-2xl border border-stroke-weak bg-bg-card">
        <Sparkles className="size-5 text-accent-orange" />
      </span>
      <h1 className="mt-5 font-display text-2xl font-medium tracking-tight">
        No portfolio yet.
      </h1>
      <p className="mt-2 text-sm text-text-weak">
        Walk through a quick conversation — drop your LinkedIn, pick a few projects,
        and we&rsquo;ll generate your portfolio in a few minutes.
      </p>
      <Link
        href="/portfolio/builder"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-fill-strong px-5 py-2.5 text-sm font-medium text-text-inverse-strong"
      >
        Start the builder <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
