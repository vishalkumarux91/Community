"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Tag } from "@/components/ui/Tag";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import {
  Play,
  Article,
  Doc,
  Hammer,
  Project,
  Check,
  Clock,
  Sparkles,
  ArrowLeft,
  LinkIcon,
} from "@/components/ui/Icons";
import type { Topic, JourneyStep, Level, ResourceType } from "@/lib/mock";

const LEVELS: readonly Level[] = ["Beginner", "Intermediate", "Advanced"] as const;

const TYPE_ICON: Record<ResourceType, (p: { className?: string }) => React.JSX.Element> = {
  video: Play,
  article: Article,
  doc: Doc,
  exercise: Hammer,
  project: Project,
};

const TYPE_LABEL: Record<ResourceType, string> = {
  video: "Video",
  article: "Article",
  doc: "Doc",
  exercise: "Exercise",
  project: "Project",
};

export function JourneyView({ topic }: { topic: Topic }) {
  const [level, setLevel] = useState<Level>("Beginner");
  const journey = topic.journeys[level];
  const [selectedId, setSelectedId] = useState<string>(journey.steps[0].id);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const selected = journey.steps.find((s) => s.id === selectedId) ?? journey.steps[0];
  const completedCount = journey.steps.filter((s) => completed.has(s.id)).length;
  const progress = Math.round((completedCount / journey.steps.length) * 100);

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="flex h-[calc(100dvh-64px)] flex-col">
      {/* Topic header */}
      <header className="flex flex-col gap-4 border-b border-stroke-faint bg-bg-raised px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-3">
          <Link
            href="/learn"
            className="flex size-8 items-center justify-center rounded-full border border-stroke-weak text-text-weak hover:text-text-strong"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <span className="grid size-10 place-items-center rounded-md border border-stroke-weak bg-bg-sunken text-lg">
            {topic.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-text-muted">
              <span>{topic.category}</span>
              <span>·</span>
              <span>AI-curated</span>
            </div>
            <h1 className="font-display text-xl font-medium tracking-tight md:text-2xl">{topic.title}</h1>
          </div>
        </div>

        <Tabs tabs={LEVELS} initial={level} onChange={setLevel} />
      </header>

      {/* Split view */}
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(360px,420px)_1fr]">
        {/* Pipeline panel */}
        <aside className="flex min-h-0 flex-col border-r border-stroke-faint">
          <div className="border-b border-stroke-faint px-6 py-4">
            <p className="text-xs uppercase tracking-wider text-text-muted">{level} pipeline</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-accent-orange transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-text-muted">
                {completedCount}/{journey.steps.length}
              </span>
            </div>
          </div>

          <ol className="flex-1 overflow-y-auto px-3 py-4">
            {journey.steps.map((step, idx) => {
              const Icon = TYPE_ICON[step.type];
              const isSelected = step.id === selected.id;
              const isDone = completed.has(step.id);
              return (
                <li key={step.id} className="relative">
                  {idx < journey.steps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[26px] top-12 h-[calc(100%-32px)] w-px bg-stroke-weak"
                    />
                  )}
                  <button
                    onClick={() => setSelectedId(step.id)}
                    className={cn(
                      "relative flex w-full gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                      isSelected ? "bg-white/[0.06]" : "hover:bg-white/[0.03]",
                    )}
                  >
                    <span
                      className={cn(
                        "z-10 grid size-7 shrink-0 place-items-center rounded-full border text-[11px] font-semibold transition-colors",
                        isDone
                          ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-300"
                          : isSelected
                            ? "border-accent-orange bg-accent-orange/20 text-accent-orange"
                            : "border-stroke-weak bg-bg-sunken text-text-muted",
                      )}
                    >
                      {isDone ? <Check className="size-3.5" /> : idx + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-text-muted">
                        <Icon className="size-3.5" /> {TYPE_LABEL[step.type]}
                      </span>
                      <span className="mt-1 block text-sm font-medium leading-snug text-text-strong">
                        {step.title}
                      </span>
                      <span className="mt-1 flex items-center gap-2 text-[11px] text-text-muted">
                        <Clock className="size-3" /> {step.estimatedTime}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* Content panel */}
        <section className="flex min-h-0 flex-col overflow-y-auto">
          <div className="border-b border-stroke-faint px-6 py-5 md:px-10">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Tag tone="default">{TYPE_LABEL[selected.type]}</Tag>
              {selected.source && (
                <span className="flex items-center gap-1 text-text-muted">
                  <LinkIcon className="size-3.5" />
                  {selected.source}
                </span>
              )}
              <span className="flex items-center gap-1 text-text-muted">
                <Clock className="size-3.5" /> {selected.estimatedTime}
              </span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
              {selected.title}
            </h2>
            <p className="mt-2 text-sm text-text-weak">{selected.description}</p>
          </div>

          <ResourcePreview step={selected} />

          <div className="space-y-5 px-6 pb-10 pt-6 md:px-10">
            <Card className="space-y-3 p-5" hover={false}>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent-orange">
                <Sparkles className="size-3.5" /> What you should be able to do after this
              </div>
              <p className="text-sm text-text-weak">{selected.goal}</p>
            </Card>

            {selected.prompt && (
              <Card className="space-y-3 p-5" hover={false}>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-text-muted">
                  <Sparkles className="size-3.5 text-accent-orange" /> Stuck? Try this AI prompt
                </div>
                <p className="rounded-xl bg-bg-sunken/40 p-4 font-mono text-sm leading-relaxed text-text-strong">
                  &ldquo;{selected.prompt}&rdquo;
                </p>
              </Card>
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => toggle(selected.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                  completed.has(selected.id)
                    ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
                    : "border-stroke-weak hover:border-stroke-strong",
                )}
              >
                <Check className="size-4" />
                {completed.has(selected.id) ? "Marked complete" : "Mark as complete"}
              </button>

              <NextStepButton
                step={selected}
                journey={journey}
                onSelect={(id) => setSelectedId(id)}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ResourcePreview({ step }: { step: JourneyStep; topicGradient?: string }) {
  // We can't iframe arbitrary content (CORS / X-Frame-Options) so we show a styled placeholder
  // that mimics how the real split-view would render the resource.
  const Icon = TYPE_ICON[step.type];
  return (
    <div className="relative aspect-video w-full border-b border-stroke-faint bg-bg-card-hover">
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="grid size-12 place-items-center rounded-lg border border-stroke-weak bg-bg-card">
            <Icon className="size-5 text-text-strong" />
          </span>
          <div>
            <p className="text-sm font-medium">Resource opens here in the live app</p>
            <p className="mt-1 text-xs text-text-muted">{step.source ?? "Inline content"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NextStepButton({
  step,
  journey,
  onSelect,
}: {
  step: JourneyStep;
  journey: { steps: JourneyStep[] };
  onSelect: (id: string) => void;
}) {
  const idx = journey.steps.findIndex((s) => s.id === step.id);
  const next = journey.steps[idx + 1];
  if (!next) {
    return (
      <span className="text-sm text-text-muted">You&rsquo;re at the last step 🎉</span>
    );
  }
  return (
    <button
      onClick={() => onSelect(next.id)}
      className="inline-flex items-center gap-2 rounded-full bg-fill-strong px-5 py-2 text-sm font-medium text-text-inverse-strong"
    >
      Next: {next.title.length > 28 ? next.title.slice(0, 28) + "…" : next.title}
    </button>
  );
}
