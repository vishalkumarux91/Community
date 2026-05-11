"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Clock,
} from "@/components/ui/Icons";
import { TOPICS, TOOLS, type Tool, type Topic } from "@/lib/mock";

/* ----------------------------------------------------------------
   Mock "what I'm learning right now" state.
   In production this would come from the user's profile / progress.
   ---------------------------------------------------------------- */
type InProgressTool = {
  kind: "tool";
  slug: string; // matches a TOOLS slug
  percent: number;
  nextStep: { title: string; type: string; estimatedTime: string };
};
type InProgressTopic = {
  kind: "topic";
  slug: string; // matches a TOPICS slug
  level: "Beginner" | "Intermediate" | "Advanced";
  done: number;
  total: number;
  nextStep: { title: string; type: string; estimatedTime: string };
};

const IN_PROGRESS: (InProgressTool | InProgressTopic)[] = [
  {
    kind: "tool",
    slug: "figma",
    percent: 60,
    nextStep: {
      title: "Auto Layout fundamentals",
      type: "Article",
      estimatedTime: "20m",
    },
  },
  {
    kind: "topic",
    slug: "design-systems",
    level: "Beginner",
    done: 2,
    total: 6,
    nextStep: {
      title: "Tokens 101 — naming for scale",
      type: "Video",
      estimatedTime: "32m",
    },
  },
  {
    kind: "tool",
    slug: "framer",
    percent: 15,
    nextStep: {
      title: "Responsive breakpoints",
      type: "Exercise",
      estimatedTime: "45m",
    },
  },
];

const TOOL_CATEGORIES = [
  "All",
  "Design",
  "Prototyping",
  "AI",
  "Research",
  "Collaboration",
  "No-code",
  "Inspiration",
] as const;

const TOPIC_CATEGORIES = ["All", "Design tool", "Discipline"] as const;

const TONE: Record<string, string> = {
  Design: "var(--accent-orange)",
  Prototyping: "var(--accent-blue)",
  AI: "var(--accent-yellow)",
  Research: "var(--accent-sage)",
  Collaboration: "var(--accent-blue)",
  "No-code": "var(--accent-orange)",
  Inspiration: "var(--accent-yellow)",
  Handoff: "var(--accent-sage)",
  Dev: "var(--accent-blue)",
  "Design tool": "var(--accent-orange)",
  Discipline: "var(--accent-sage)",
};

/* ================================================================ */

export default function LearnPage() {
  const [tab, setTab] = useState<"tools" | "topics">("tools");
  const [toolFilter, setToolFilter] =
    useState<(typeof TOOL_CATEGORIES)[number]>("All");
  const [topicFilter, setTopicFilter] =
    useState<(typeof TOPIC_CATEGORIES)[number]>("All");

  const inProgressItems = useMemo(
    () =>
      IN_PROGRESS.map((p) => {
        if (p.kind === "tool") {
          const tool = TOOLS.find((t) => t.slug === p.slug);
          return tool ? { ...p, item: tool } : null;
        }
        const topic = TOPICS.find((t) => t.slug === p.slug);
        return topic ? { ...p, item: topic } : null;
      }).filter(Boolean) as (
        | (InProgressTool & { item: Tool })
        | (InProgressTopic & { item: Topic })
      )[],
    [],
  );

  const filteredTools = useMemo(
    () =>
      toolFilter === "All"
        ? TOOLS
        : TOOLS.filter((t) => t.category === toolFilter),
    [toolFilter],
  );
  const filteredTopics = useMemo(
    () =>
      topicFilter === "All"
        ? TOPICS
        : TOPICS.filter((t) => t.category === topicFilter),
    [topicFilter],
  );

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-16 px-6 py-12 md:px-10">
      {/* ============== HEADER ============== */}
      <header className="space-y-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
          Learn
        </span>
        {inProgressItems.length > 0 ? (
          <>
            <h1 className="font-display text-[44px] font-normal leading-[1.02] tracking-[-0.015em] text-text-strong md:text-[64px]">
              Pick up where{" "}
              <em className="italic text-accent-orange">you left off</em>.
            </h1>
            <p className="max-w-[560px] text-[15px] leading-relaxed text-text-weak md:text-base">
              Your in-progress tools and topics live here, alongside everything
              new to explore — no jumping between pages.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display text-[44px] font-normal leading-[1.02] tracking-[-0.015em] text-text-strong md:text-[64px]">
              Start something{" "}
              <em className="italic text-accent-orange">worth learning</em>.
            </h1>
            <p className="max-w-[560px] text-[15px] leading-relaxed text-text-weak md:text-base">
              Browse every tool and topic in the library. Pick anything and
              we&rsquo;ll start tracking your progress right here.
            </p>
          </>
        )}
      </header>

      {/* ============== CONTINUE LEARNING ============== */}
      {inProgressItems.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-normal tracking-tight md:text-[28px]">
              Continue learning
            </h2>
            <span className="text-xs text-text-muted">
              {inProgressItems.length} in progress
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inProgressItems.map((entry, i) => {
              const isTool = entry.kind === "tool";
              const tint = TONE[entry.item.category] ?? "var(--accent-orange)";
              const percent =
                entry.kind === "tool"
                  ? entry.percent
                  : Math.round((entry.done / entry.total) * 100);
              const href = isTool
                ? `/tools/${entry.slug}`
                : `/learn/${entry.slug}`;

              return (
                <Card
                  key={i}
                  as="a"
                  href={href}
                  className="group flex flex-col gap-4 p-6"
                  style={
                    {
                      ["--tint"]: tint,
                    } as React.CSSProperties
                  }
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="grid size-11 shrink-0 place-items-center rounded-xl border border-stroke-weak text-lg"
                        style={{
                          background:
                            "color-mix(in srgb, var(--tint) 14%, var(--bg-card))",
                          color: "var(--tint)",
                        }}
                      >
                        {entry.item.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
                          {isTool ? "Tool" : `${entry.level} pipeline`}
                          <span className="mx-1.5 text-stroke-strong">·</span>
                          <span style={{ color: tint }}>
                            {entry.item.category}
                          </span>
                        </p>
                        <h3 className="font-display truncate text-[20px] font-normal leading-tight">
                          {isTool ? entry.item.name : entry.item.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-text-strong">
                      {percent}%
                    </span>
                  </div>

                  <div className="h-1 rounded-full bg-bg-card-hover">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percent}%`,
                        background: tint,
                      }}
                    />
                  </div>

                  <div className="rounded-xl border border-stroke-faint bg-bg-sunken p-3.5">
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
                      Next up
                    </p>
                    <p className="mt-1 text-sm font-medium text-text-strong">
                      {entry.nextStep.title}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 text-[11px] text-text-muted">
                      <Clock className="size-3" />
                      {entry.nextStep.estimatedTime}
                      <span>·</span>
                      <span>{entry.nextStep.type}</span>
                    </div>
                  </div>

                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-text-strong">
                    Resume{" "}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* ============== DISCOVER MORE ============== */}
      <section className="space-y-7">
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-[560px] space-y-2.5">
            <h2 className="font-display text-2xl font-normal tracking-tight md:text-[28px]">
              Discover more
            </h2>
            <p className="text-[14.5px] leading-relaxed text-text-weak">
              Browse every tool and topic in the library. Tap a card to start a
              guided path — your progress shows back up here automatically.
            </p>
          </div>

          {/* Tabs */}
          <div
            role="tablist"
            className="inline-flex rounded-full border border-stroke-weak bg-bg-card p-1"
          >
            {(["tools", "topics"] as const).map((key) => {
              const count = key === "tools" ? TOOLS.length : TOPICS.length;
              const isActive = tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setTab(key)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
                    isActive
                      ? "bg-fill-strong text-text-inverse-strong"
                      : "text-text-weak hover:text-text-strong"
                  }`}
                >
                  {key === "tools" ? "By tools" : "By topics"}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      isActive
                        ? "bg-white/15 text-text-inverse-strong"
                        : "bg-bg-card-hover text-text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter pills */}
        {tab === "tools" ? (
          <div className="-mx-1 flex flex-wrap items-center gap-1.5">
            {TOOL_CATEGORIES.map((c) => {
              const active = toolFilter === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setToolFilter(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-fill-strong bg-fill-strong text-text-inverse-strong"
                      : "border-stroke-weak bg-bg-card text-text-weak hover:bg-bg-card-hover hover:text-text-strong"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="-mx-1 flex flex-wrap items-center gap-1.5">
            {TOPIC_CATEGORIES.map((c) => {
              const active = topicFilter === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setTopicFilter(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-fill-strong bg-fill-strong text-text-inverse-strong"
                      : "border-stroke-weak bg-bg-card text-text-weak hover:bg-bg-card-hover hover:text-text-strong"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        )}

        {/* Grid */}
        {tab === "tools" ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((t) => (
              <ToolCard
                key={t.slug}
                tool={t}
                inProgress={
                  IN_PROGRESS.some(
                    (p) => p.kind === "tool" && p.slug === t.slug,
                  )
                }
              />
            ))}
            {filteredTools.length === 0 && (
              <p className="text-sm text-text-muted">
                Nothing in this category yet.
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTopics.map((t) => (
              <TopicCard
                key={t.slug}
                topic={t}
                inProgress={
                  IN_PROGRESS.some(
                    (p) => p.kind === "topic" && p.slug === t.slug,
                  )
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* ============== CTA ============== */}
      <Card
        className="flex flex-col items-start gap-4 border-dashed bg-transparent p-7 md:flex-row md:items-center md:justify-between"
        hover={false}
      >
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-normal tracking-tight">
            Don&rsquo;t see your topic?
          </h3>
          <p className="text-sm text-text-weak">
            Tell us what you want to learn — we&rsquo;ll assemble a curated
            journey from the best resources on the web.
          </p>
        </div>
        <Link
          href="/learn/new"
          className="inline-flex items-center gap-2 rounded-full bg-fill-strong px-5 py-2.5 text-sm font-medium text-text-inverse-strong transition-opacity hover:opacity-90"
        >
          Generate a journey <ArrowUpRight className="size-4" />
        </Link>
      </Card>
    </div>
  );
}

/* ================ CARDS ================ */

function ToolCard({ tool, inProgress }: { tool: Tool; inProgress: boolean }) {
  const tint = TONE[tool.category] ?? "var(--accent-orange)";
  return (
    <Card
      as="a"
      href={`/tools/${tool.slug}`}
      className="group flex flex-col gap-4 p-6"
      style={{ ["--tint"]: tint } as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <span
          className="grid size-11 place-items-center rounded-xl border border-stroke-weak text-lg"
          style={{
            background:
              "color-mix(in srgb, var(--tint) 14%, var(--bg-card))",
            color: tint,
          }}
        >
          {tool.emoji}
        </span>
        <ArrowUpRight className="size-4 text-text-muted transition-colors group-hover:text-text-strong" />
      </div>
      <div className="space-y-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
          {tool.category}
          {tool.pricing && (
            <>
              <span className="mx-1.5 text-stroke-strong">·</span>
              {tool.pricing}
            </>
          )}
        </p>
        <h3 className="font-display text-[22px] font-normal leading-tight">
          {tool.name}
        </h3>
        <p className="text-[13.5px] leading-relaxed text-text-weak">
          {tool.shortDescription}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-stroke-faint pt-3 text-xs text-text-muted">
        <span className="inline-flex items-center gap-1">
          <Star /> {tool.rating}
          <span className="text-stroke-strong">·</span>
          {tool.reviews.toLocaleString()} reviews
        </span>
        <span className="flex items-center gap-1">
          {inProgress ? (
            <>
              <span
                className="size-1.5 rounded-full"
                style={{ background: tint }}
              />
              In progress
            </>
          ) : (
            <>
              <Sparkles className="size-3" /> Guided path
            </>
          )}
        </span>
      </div>
    </Card>
  );
}

function TopicCard({
  topic,
  inProgress,
}: {
  topic: Topic;
  inProgress: boolean;
}) {
  const tint = TONE[topic.category] ?? "var(--accent-orange)";
  const totalSteps = Object.values(topic.journeys).flatMap((j) => j.steps)
    .length;
  return (
    <Card
      as="a"
      href={`/learn/${topic.slug}`}
      className="group flex flex-col gap-4 p-6"
      style={{ ["--tint"]: tint } as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <span
          className="grid size-11 place-items-center rounded-xl border border-stroke-weak text-lg"
          style={{
            background:
              "color-mix(in srgb, var(--tint) 14%, var(--bg-card))",
            color: tint,
          }}
        >
          {topic.emoji}
        </span>
        <ArrowUpRight className="size-4 text-text-muted transition-colors group-hover:text-text-strong" />
      </div>
      <div className="space-y-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
          {topic.category}
        </p>
        <h3 className="font-display text-[22px] font-normal leading-tight">
          {topic.title}
        </h3>
        <p className="text-[13.5px] leading-relaxed text-text-weak">
          {topic.summary}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-stroke-faint pt-3 text-xs text-text-muted">
        <span>{totalSteps} steps</span>
        <span className="flex items-center gap-1">
          {inProgress ? (
            <>
              <span
                className="size-1.5 rounded-full"
                style={{ background: tint }}
              />
              In progress
            </>
          ) : (
            <>
              <Sparkles className="size-3" /> AI-curated
            </>
          )}
        </span>
      </div>
    </Card>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" width="11" height="11" fill="#d6a84a" aria-hidden>
      <path d="M10 1.6 12.6 7l5.9.85-4.27 4.16 1 5.87L10 15.13 4.77 17.88l1-5.87L1.5 7.85 7.4 7Z" />
    </svg>
  );
}
