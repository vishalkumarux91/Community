"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import {
  ArrowRight,
  Check,
  LinkIcon,
  Sparkles,
  Star,
} from "@/components/ui/Icons";

type StageId = "import" | "shape" | "case-studies" | "publish";

const STAGES: { id: StageId; title: string; subtitle: string }[] = [
  {
    id: "import",
    title: "Import",
    subtitle: "Pull from LinkedIn + the rest of your work.",
  },
  {
    id: "shape",
    title: "Shape",
    subtitle: "Pick the projects that match the role you want next.",
  },
  {
    id: "case-studies",
    title: "Case studies",
    subtitle: "Turn bullet points into Problem → Process → Outcome.",
  },
  {
    id: "publish",
    title: "Publish",
    subtitle: "Subdomain or custom domain. We handle the build.",
  },
];

const SOURCES = [
  { id: "linkedin", label: "LinkedIn", required: true, status: "Connected", emoji: "💼", note: "Roles, education, skills auto-imported." },
  { id: "dribbble", label: "Dribbble", required: false, status: "Optional", emoji: "🏀", note: "Pulls visual shots and stats." },
  { id: "behance", label: "Behance", required: false, status: "Connected", emoji: "🎨", note: "Pulls long-form case studies." },
  { id: "github", label: "GitHub", required: false, status: "Optional", emoji: "🐙", note: "Pulls repos and READMEs." },
  { id: "figma", label: "Figma", required: false, status: "Optional", emoji: "🎯", note: "Direct link to working files." },
];

const ROLE_TARGETS = [
  { id: "first-job", label: "First product design job", projects: 3, copy: "Lead with breadth — show you can ship full flows." },
  { id: "mid-level", label: "Mid-level Product Designer", projects: 3, copy: "Lead with one deep system project. Two supporting." },
  { id: "senior", label: "Senior / Design Lead", projects: 4, copy: "Show ambiguity, scope, and team impact." },
];

const PROJECTS = [
  { id: "p-1", title: "Habit-tracker onboarding redesign", role: "Lead designer · 8 weeks", impact: "Activation +14%", recommended: ["mid-level"], picked: true },
  { id: "p-2", title: "B2B SaaS permissions system", role: "Designer · 12 weeks", impact: "Cut admin tickets 38%", recommended: ["senior", "mid-level"], picked: true },
  { id: "p-3", title: "Wellness app IA", role: "Designer · 4 weeks", impact: "Setting find-time -22%", recommended: ["first-job", "mid-level"], picked: true },
  { id: "p-4", title: "Logo system for a sneaker brand", role: "Brand designer · 3 weeks", impact: "—", recommended: [], picked: false },
  { id: "p-5", title: "Internal tool for ops team", role: "Designer · 6 weeks", impact: "Time-on-task -41%", recommended: ["senior"], picked: false },
];

export function PortfolioBuilder() {
  const [stage, setStage] = useState<StageId>("import");
  const [target, setTarget] = useState(ROLE_TARGETS[1].id);
  const [picked, setPicked] = useState<Set<string>>(
    new Set(PROJECTS.filter((p) => p.picked).map((p) => p.id)),
  );

  const stageIndex = STAGES.findIndex((s) => s.id === stage);

  function togglePicked(id: string) {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      {/* sidebar stages */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <Card className="p-2">
          <ol className="space-y-1">
            {STAGES.map((s, i) => {
              const isActive = s.id === stage;
              const isDone = i < stageIndex;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setStage(s.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors",
                      isActive
                        ? "bg-white/[0.05]"
                        : "hover:bg-white/[0.03]",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-semibold",
                        isDone
                          ? "bg-accent-orange text-bg-sunken"
                          : isActive
                            ? "bg-fill-strong text-bg-sunken"
                            : "bg-white/[0.06] text-text-muted",
                      )}
                    >
                      {isDone ? <Check className="size-3" /> : i + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-medium leading-tight">
                        {s.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-text-muted">
                        {s.subtitle}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Card>
      </aside>

      {/* stage content */}
      <section>
        {stage === "import" && (
          <Card className="space-y-6 p-6 md:p-8">
            <header>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Import your work
              </h2>
              <p className="mt-2 max-w-[600px] text-sm text-text-weak">
                Start with LinkedIn — we&rsquo;ll auto-extract roles, projects,
                and skills. Add other sources to give your AI co-pilot more to
                work with.
              </p>
            </header>

            <div className="flex h-12 items-center gap-3 rounded-2xl border border-stroke-weak bg-white/[0.04] px-4">
              <LinkIcon className="size-4 text-text-muted" />
              <input
                type="url"
                defaultValue="https://linkedin.com/in/your-handle"
                className="h-full flex-1 bg-transparent text-sm focus:outline-none"
              />
              <Button size="sm">Refresh import</Button>
            </div>

            <ul className="grid gap-3 md:grid-cols-2">
              {SOURCES.map((s) => {
                const connected = s.status === "Connected";
                return (
                  <li
                    key={s.id}
                    className={cn(
                      "flex items-start justify-between gap-4 rounded-2xl border p-4 transition-colors",
                      connected
                        ? "border-emerald-400/30 bg-emerald-400/[0.04]"
                        : "border-stroke-weak bg-white/[0.02]",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid size-9 place-items-center rounded-lg bg-white/[0.06] text-lg">
                        {s.emoji}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{s.label}</p>
                        <p className="text-xs text-text-muted">{s.note}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={connected ? "outline" : "secondary"}
                    >
                      {connected ? "Connected" : "Connect"}
                    </Button>
                  </li>
                );
              })}
            </ul>

            <footer className="flex items-center justify-between border-t border-stroke-faint pt-5">
              <span className="text-xs text-text-muted">
                We never post on your behalf — read-only access.
              </span>
              <Button onClick={() => setStage("shape")}>
                Next · Shape your portfolio <ArrowRight className="size-4" />
              </Button>
            </footer>
          </Card>
        )}

        {stage === "shape" && (
          <Card className="space-y-8 p-6 md:p-8">
            <header>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Pick your target role
              </h2>
              <p className="mt-2 max-w-[600px] text-sm text-text-weak">
                We&rsquo;ll suggest which 3–4 projects to lead with based on what
                hiring managers actually look for at this level.
              </p>
            </header>

            <div className="grid gap-3 md:grid-cols-3">
              {ROLE_TARGETS.map((r) => {
                const active = r.id === target;
                return (
                  <button
                    key={r.id}
                    onClick={() => setTarget(r.id)}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition-colors",
                      active
                        ? "border-accent-orange bg-accent-orange/[0.06]"
                        : "border-stroke-weak hover:border-stroke-strong",
                    )}
                  >
                    <p className="text-sm font-semibold">{r.label}</p>
                    <p className="mt-2 text-xs text-text-muted">{r.copy}</p>
                    <p className="mt-3 text-xs text-text-strong">
                      Recommended: {r.projects} projects
                    </p>
                  </button>
                );
              })}
            </div>

            <div>
              <div className="flex items-end justify-between">
                <h3 className="font-display text-lg font-semibold">
                  Pick {ROLE_TARGETS.find((r) => r.id === target)?.projects} projects to feature
                </h3>
                <span className="text-xs text-text-muted">
                  {picked.size} selected
                </span>
              </div>

              <ul className="mt-4 space-y-2">
                {PROJECTS.map((p) => {
                  const isPicked = picked.has(p.id);
                  const recommended = p.recommended.includes(target);
                  return (
                    <li
                      key={p.id}
                      className={cn(
                        "flex items-center justify-between gap-4 rounded-2xl border p-4 transition-colors",
                        isPicked
                          ? "border-accent-orange/40 bg-accent-orange/[0.04]"
                          : "border-stroke-weak hover:bg-white/[0.02]",
                      )}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium">{p.title}</span>
                          {recommended && (
                            <Tag tone="accent">
                              <Sparkles className="size-3" />
                              Recommended
                            </Tag>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-text-muted">
                          {p.role} · Impact: {p.impact}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant={isPicked ? "outline" : "secondary"}
                        onClick={() => togglePicked(p.id)}
                      >
                        {isPicked ? "Picked" : "Pick"}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <footer className="flex items-center justify-between border-t border-stroke-faint pt-5">
              <Button variant="ghost" onClick={() => setStage("import")}>
                Back
              </Button>
              <Button onClick={() => setStage("case-studies")}>
                Next · Write case studies <ArrowRight className="size-4" />
              </Button>
            </footer>
          </Card>
        )}

        {stage === "case-studies" && (
          <Card className="space-y-6 p-6 md:p-8">
            <header>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Turn bullets into stories
              </h2>
              <p className="mt-2 max-w-[600px] text-sm text-text-weak">
                Drop your raw notes from a project. Our AI rewrites them as a{" "}
                <span className="text-text-strong">Problem → Process → Outcome</span>{" "}
                draft you can edit. We don&rsquo;t auto-publish.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Raw notes
                </label>
                <textarea
                  rows={12}
                  defaultValue={`- onboarding had 38% activation
- ran 7 user interviews
- found that step 2 was asking too much
- shipped a 2-screen version
- activation went to 52%`}
                  className="w-full resize-none rounded-2xl border border-stroke-weak bg-white/[0.02] p-4 text-sm leading-relaxed text-text-strong focus:border-stroke-strong focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-orange">
                  <Sparkles className="size-3" />
                  AI draft
                </label>
                <article className="space-y-3 rounded-2xl border border-accent-orange/30 bg-accent-orange/[0.04] p-4 text-sm leading-relaxed text-text-strong">
                  <h4 className="font-display text-base font-semibold">
                    The Problem
                  </h4>
                  <p className="text-text-weak">
                    Activation sat at 38% — our onboarding asked users for
                    color preferences before they understood the product.
                  </p>
                  <h4 className="font-display text-base font-semibold">
                    The Process
                  </h4>
                  <p className="text-text-weak">
                    Seven interviews surfaced the friction at step 2. We cut
                    the step entirely and tested a 2-screen version with five
                    users before shipping.
                  </p>
                  <h4 className="font-display text-base font-semibold">
                    The Outcome
                  </h4>
                  <p className="text-text-weak">
                    Activation moved from 38% to 52% in three weeks.
                    Color-theme settings now live in profile, not onboarding.
                  </p>
                </article>
              </div>
            </div>

            <footer className="flex items-center justify-between border-t border-stroke-faint pt-5">
              <Button variant="ghost" onClick={() => setStage("shape")}>
                Back
              </Button>
              <Button onClick={() => setStage("publish")}>
                Next · Publish <ArrowRight className="size-4" />
              </Button>
            </footer>
          </Card>
        )}

        {stage === "publish" && (
          <Card className="space-y-6 p-6 md:p-8">
            <header>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Publish your portfolio
              </h2>
              <p className="mt-2 max-w-[600px] text-sm text-text-weak">
                Your portfolio ships as a static site. Free subdomain by
                default — bring your own domain when you&rsquo;re ready.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-accent-orange/40 bg-accent-orange/[0.05] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-orange">
                    Free
                  </span>
                  <Tag tone="accent">Selected</Tag>
                </div>
                <p className="mt-3 font-medium">yourname.opencanvas.community</p>
                <p className="mt-1 text-xs text-text-muted">
                  Built and deployed in seconds.
                </p>
              </div>
              <div className="rounded-2xl border border-stroke-weak p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Custom domain
                </span>
                <p className="mt-3 font-medium">yourname.com</p>
                <p className="mt-1 text-xs text-text-muted">
                  We give you the DNS records. SSL handled for you.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-stroke-weak bg-white/[0.02] p-5">
              <div className="flex items-center gap-3">
                <Star className="size-4 text-accent-yellow" />
                <p className="text-sm font-medium">
                  Get a mentor portfolio review before going live
                </p>
              </div>
              <p className="mt-2 text-xs text-text-muted">
                One free 15-minute review with a senior designer is included
                with every published portfolio.
              </p>
            </div>

            <footer className="flex items-center justify-between border-t border-stroke-faint pt-5">
              <Button variant="ghost" onClick={() => setStage("case-studies")}>
                Back
              </Button>
              <Button>
                Publish portfolio <ArrowRight className="size-4" />
              </Button>
            </footer>
          </Card>
        )}
      </section>
    </div>
  );
}
