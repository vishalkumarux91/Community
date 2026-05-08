"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stat } from "@/components/ui/Stat";
import { Briefcase, ArrowUpRight, ArrowRight, Sparkles, Hammer, Project, Comment, Calendar, Heart, MapPin } from "@/components/ui/Icons";
import { JOBS, type JobListing } from "@/lib/mock";
import { useFavorites } from "@/lib/useFavorites";

const SOURCE_FILTERS = ["All sources", "LinkedIn", "Wellfound", "Shine", "Naukri", "Y Combinator", "Hirect"] as const;
const LEVEL_FILTERS = ["All levels", "Junior", "Mid", "Senior", "Lead"] as const;
const REMOTE_FILTERS = ["Any", "Remote", "Hybrid", "On-site"] as const;

const TRACKS = [
  { title: "Portfolio polish", helper: "Get your portfolio review-ready in 1 week.", steps: ["AI portfolio builder", "Live review session", "Mentor 1:1"], href: "/portfolio/builder", icon: Project },
  { title: "Interview prep", helper: "App critiques, design exercises, behavioral.", steps: ["Question bank", "Mock interviews", "Panel-style exercises"], href: "#interview", icon: Comment },
  { title: "Take-home library", helper: "Real briefs, scoring rubrics, sample submissions.", steps: ["Briefs by company", "Time-boxed exercises", "Reviewer notes"], href: "#take-homes", icon: Hammer },
];

const QUESTION_BANK = [
  { q: "Walk me through a project you're most proud of.", tone: "Behavioral", company: "Universal" },
  { q: "Critique any app on your phone right now.", tone: "App critique", company: "Big tech" },
  { q: "Design a feature for [your favorite product] that doesn't exist yet.", tone: "Product sense", company: "Razorpay" },
  { q: "How would you improve onboarding for first-time users in Tier-2 cities?", tone: "Indian market", company: "Swiggy / Zomato" },
  { q: "Tell me about a time you disagreed with a PM. How did you resolve it?", tone: "Behavioral", company: "Universal" },
];

const TAKE_HOMES = [
  { title: "Razorpay — design a settlement reporting flow", duration: "5 days", tags: ["Fintech", "Reporting"], submitted: 142 },
  { title: "Swiggy — redesign post-order experience", duration: "3 days", tags: ["Consumer", "Logistics"], submitted: 217 },
  { title: "Notion — improve mobile capture flow", duration: "Open-ended", tags: ["Productivity", "Mobile"], submitted: 89 },
];

export default function JobsPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-12 px-6 py-10 md:px-10">
      <SectionHeading
        eyebrow="Jobs & career"
        title="From learning to landing the role."
        description="A live design jobs feed aggregated across LinkedIn, Wellfound, Shine, Naukri, and YC — plus interview prep, take-homes, and mentor mocks built into the same flow."
      />

      <Card className="grid gap-6 p-6 md:grid-cols-4" hover={false}>
        <Stat value="312" label="Reputation" />
        <Stat value="2/3" label="Portfolio steps" />
        <Stat value="14" label="Questions practiced" />
        <Stat value="0" label="Mock interviews" />
      </Card>

      <SmartApply />

      <JobFeed />

      <section>
        <h2 className="font-display text-xl font-medium tracking-tight md:text-2xl">Tracks</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {TRACKS.map((t) => {
            const Icon = t.icon;
            return (
              <Card key={t.title} as="a" href={t.href} className="p-6">
                <Icon className="size-5 text-text-muted" />
                <h3 className="mt-4 font-display text-base font-medium">{t.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-weak">{t.helper}</p>
                <ul className="mt-4 space-y-1.5 text-xs text-text-muted">
                  {t.steps.map((s) => <li key={s}>· {s}</li>)}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-sm">
                  Open track <ArrowUpRight className="size-4" />
                </span>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="interview">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl font-medium tracking-tight md:text-2xl">Interview question bank</h2>
          <Link href="#" className="text-sm text-text-weak hover:text-text-strong inline-flex items-center gap-1">
            Open full bank <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-5 space-y-3">
          {QUESTION_BANK.map((q) => (
            <Card key={q.q} className="flex items-center gap-4 p-5" hover={false}>
              <Briefcase className="size-5 text-text-muted" />
              <p className="flex-1 text-sm">{q.q}</p>
              <Tag tone="default">{q.tone}</Tag>
              <span className="hidden text-xs text-text-muted md:inline">{q.company}</span>
              <button className="rounded-full border border-stroke-weak px-3 py-1.5 text-xs">Practice</button>
            </Card>
          ))}
        </div>
      </section>

      <section id="take-homes">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl font-medium tracking-tight md:text-2xl">Take-home library</h2>
          <span className="text-xs text-text-muted">All briefs anonymized.</span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {TAKE_HOMES.map((t) => (
            <Card key={t.title} className="space-y-3 p-5">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Calendar className="size-3.5" /> {t.duration}
              </div>
              <h3 className="font-medium leading-snug">{t.title}</h3>
              <div className="flex flex-wrap gap-2">
                {t.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
              <div className="flex items-center justify-between border-t border-stroke-faint pt-3 text-xs text-text-muted">
                <span>{t.submitted} submissions</span>
                <span className="inline-flex items-center gap-1">
                  Open brief <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function SmartApply() {
  const [link, setLink] = useState("");
  return (
    <Card className="p-6 md:p-8" hover={false}>
      <div className="flex flex-col gap-2">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-orange/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-accent-orange">
          <Sparkles className="size-3" /> Smart apply
        </span>
        <h2 className="font-display text-xl font-medium tracking-tight md:text-2xl">
          Paste any job link. We&rsquo;ll prep your application.
        </h2>
        <p className="text-sm text-text-weak">
          LinkedIn, Wellfound, Shine, Naukri, Hirect, company careers — drop the URL. We extract the brief, match it to your portfolio, and draft your cover note + tailored case studies.
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-2 rounded-xl border border-stroke-weak bg-bg-sunken p-2 md:flex-row md:items-center">
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://www.linkedin.com/jobs/view/…"
          className="h-9 flex-1 bg-transparent px-3 text-sm placeholder:text-text-muted focus:outline-none"
        />
        <button
          disabled={!link.trim()}
          className="inline-flex items-center justify-center gap-1.5 rounded-md bg-fill-strong px-4 py-2 text-sm font-medium text-text-inverse-strong disabled:opacity-40"
        >
          Prep application <ArrowRight className="size-3.5" />
        </button>
      </div>
    </Card>
  );
}

function JobFeed() {
  const [source, setSource] = useState<(typeof SOURCE_FILTERS)[number]>("All sources");
  const [level, setLevel] = useState<(typeof LEVEL_FILTERS)[number]>("All levels");
  const [remote, setRemote] = useState<(typeof REMOTE_FILTERS)[number]>("Any");
  const [q, setQ] = useState("");
  const saved = useFavorites("rps:saved-jobs");

  const filtered = useMemo(
    () =>
      JOBS.filter(
        (j) =>
          (source === "All sources" || j.source === source) &&
          (level === "All levels" || j.level === level) &&
          (remote === "Any" || j.remote === remote) &&
          (q === "" ||
            (j.role + j.company + j.tags.join(" ")).toLowerCase().includes(q.toLowerCase())),
      ),
    [source, level, remote, q],
  );

  return (
    <section>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display text-xl font-medium tracking-tight md:text-2xl">
            Live design jobs feed
          </h2>
          <p className="mt-1 text-sm text-text-weak">
            Aggregated from LinkedIn, Wellfound, Shine, Naukri, YC, and more.
          </p>
        </div>
        {saved.count > 0 && (
          <span className="text-xs text-text-muted">{saved.count} saved</span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search role, company, tag…"
          className="h-9 max-w-[260px] flex-1 rounded-full border border-stroke-weak bg-bg-card px-4 text-sm placeholder:text-text-muted focus:outline-none"
        />
        <Select value={source} options={[...SOURCE_FILTERS]} onChange={(v) => setSource(v as (typeof SOURCE_FILTERS)[number])} />
        <Select value={level} options={[...LEVEL_FILTERS]} onChange={(v) => setLevel(v as (typeof LEVEL_FILTERS)[number])} />
        <Select value={remote} options={[...REMOTE_FILTERS]} onChange={(v) => setRemote(v as (typeof REMOTE_FILTERS)[number])} />
      </div>

      <div className="mt-5 divide-y divide-stroke-faint border-y border-stroke-faint">
        {filtered.map((job) => (
          <JobRow key={job.id} job={job} saved={saved} />
        ))}
        {filtered.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-text-muted">
            No matching jobs in the feed yet — try widening your filters.
          </p>
        )}
      </div>
    </section>
  );
}

function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-full border border-stroke-weak bg-bg-card px-3 text-xs text-text-strong focus:outline-none"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function JobRow({
  job,
  saved,
}: {
  job: JobListing;
  saved: ReturnType<typeof useFavorites>;
}) {
  const isSaved = saved.has(job.id);
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 md:grid-cols-[auto_2fr_1fr_140px_100px_28px_28px] md:gap-6">
      <span
        className="grid size-10 shrink-0 place-items-center rounded-md text-xs font-semibold text-white"
        style={{ background: job.companyColor }}
        aria-hidden
      >
        {job.companyInitial}
      </span>

      <div className="min-w-0">
        <h3 className="truncate text-sm font-medium text-text-strong">{job.role}</h3>
        <p className="truncate text-xs text-text-muted">
          {job.company} · {job.postedAgo}
        </p>
        <div className="mt-1 hidden flex-wrap gap-1 md:flex">
          {job.tags.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>

      <span className="hidden flex-col gap-0.5 text-xs text-text-muted md:flex">
        <span className="flex items-center gap-1">
          <MapPin className="size-3" /> {job.location}
        </span>
        <span>
          {job.remote} · {job.level}
        </span>
      </span>

      <span className="hidden text-xs text-text-strong md:block">{job.salaryRange}</span>

      <span className="hidden md:block">
        <Tag tone="default">via {job.source}</Tag>
      </span>

      <button
        onClick={() => saved.toggle(job.id)}
        aria-label={isSaved ? "Unsave" : "Save"}
        className={
          "grid size-7 place-items-center rounded-full border transition-colors " +
          (isSaved
            ? "border-accent-orange/40 bg-accent-orange/10 text-accent-orange"
            : "border-stroke-weak text-text-muted hover:text-text-strong")
        }
      >
        <Heart className="size-3.5" filled={isSaved} />
      </button>

      <a
        href={job.applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Apply"
        className="grid size-7 place-items-center rounded-full border border-stroke-weak text-text-muted hover:text-text-strong"
      >
        <ArrowUpRight className="size-3.5" />
      </a>
    </div>
  );
}
