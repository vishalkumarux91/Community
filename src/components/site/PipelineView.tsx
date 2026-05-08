"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { LearningPath, Step } from "@/data/learn";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import {
  ArrowUpRight,
  Article,
  Check,
  Clock,
  Doc,
  Hammer,
  LinkIcon,
  Play,
  Project,
  Sparkles,
} from "@/components/ui/Icons";

const STEP_ICON: Record<Step["type"], React.ComponentType<{ className?: string }>> = {
  video: Play,
  article: Article,
  doc: Doc,
  exercise: Hammer,
  project: Project,
};

const STEP_LABEL: Record<Step["type"], string> = {
  video: "Video",
  article: "Article",
  doc: "Docs",
  exercise: "Exercise",
  project: "Project",
};

export function PipelineView({ path }: { path: LearningPath }) {
  const firstStep = path.levels[0].steps[0];
  const [activeStepId, setActiveStepId] = useState<string>(firstStep.id);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const allSteps = path.levels.flatMap((l) =>
    l.steps.map((s) => ({ ...s, level: l.level })),
  );
  const active = allSteps.find((s) => s.id === activeStepId)!;
  const ActiveIcon = STEP_ICON[active.type];

  const totalSteps = allSteps.length;
  const doneCount = completed.size;
  const progress = totalSteps ? Math.round((doneCount / totalSteps) * 100) : 0;

  function toggleComplete(id: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)]">
      {/* LEFT: live resource view */}
      <section className="overflow-hidden rounded-3xl border border-stroke-weak bg-bg-card">
        <header className="flex items-start justify-between gap-6 border-b border-stroke-faint p-6">
          <div className="flex flex-1 items-start gap-4">
            <span className="grid size-12 place-items-center rounded-xl bg-white/[0.06] text-text-strong">
              <ActiveIcon className="size-5" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Tag
                  tone={
                    active.level === "Beginner"
                      ? "level-beginner"
                      : active.level === "Intermediate"
                        ? "level-intermediate"
                        : "level-advanced"
                  }
                >
                  {active.level}
                </Tag>
                <Tag>{STEP_LABEL[active.type]}</Tag>
                <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                  <Clock className="size-3.5" />
                  {active.estimatedMinutes} min
                </span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold leading-tight">
                {active.title}
              </h2>
              <p className="mt-1 text-sm text-text-weak">{active.brief}</p>
            </div>
          </div>
          <Button size="sm" variant="secondary">
            <LinkIcon className="size-4" />
            Open source
          </Button>
        </header>

        <div className="grid h-[420px] place-items-center bg-[radial-gradient(ellipse_at_top,rgba(255,122,58,0.12),transparent_60%)] p-8">
          <div className="text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-white/[0.06] text-text-strong">
              <ActiveIcon className="size-7" />
            </div>
            <p className="mt-4 max-w-xs text-sm text-text-muted">
              In the live app, the linked resource opens here. The pipeline on
              the right stays visible so you never lose context.
            </p>
            <p className="mt-2 text-xs text-text-muted">
              Source · {active.source}
            </p>
          </div>
        </div>

        <footer className="space-y-5 border-t border-stroke-faint p-6">
          <div className="flex items-start gap-3 rounded-2xl border border-stroke-weak bg-bg-card-hover p-4">
            <span className="grid size-9 place-items-center rounded-lg bg-accent-orange/15 text-accent-orange">
              <Sparkles className="size-4" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-orange">
                Ask the AI buddy
              </p>
              <p className="mt-1 text-sm text-text-strong">
                &ldquo;{active.prompt}&rdquo;
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-text-weak">
              <span className="font-medium text-text-strong">Goal:</span>{" "}
              {active.goal}
            </p>
            <Button
              size="md"
              variant={completed.has(active.id) ? "outline" : "primary"}
              onClick={() => toggleComplete(active.id)}
            >
              <Check className="size-4" />
              {completed.has(active.id) ? "Mark unfinished" : "Mark complete"}
            </Button>
          </div>
        </footer>
      </section>

      {/* RIGHT: pipeline */}
      <aside className="rounded-3xl border border-stroke-weak bg-bg-card">
        <div className="border-b border-stroke-faint p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold">Your pipeline</h3>
            <span className="text-xs text-text-muted">
              {doneCount}/{totalSteps} done
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-orange to-accent-yellow transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <ol className="divide-y divide-stroke-faint">
          {path.levels.map((level) => (
            <li key={level.level} className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <Tag
                  tone={
                    level.level === "Beginner"
                      ? "level-beginner"
                      : level.level === "Intermediate"
                        ? "level-intermediate"
                        : "level-advanced"
                  }
                >
                  {level.level}
                </Tag>
                <span className="text-xs text-text-muted">
                  {level.steps.length} steps
                </span>
              </div>
              <p className="mb-4 text-xs text-text-muted">{level.summary}</p>

              <div className="relative space-y-2 pl-6">
                <span className="absolute left-[11px] top-2 bottom-2 w-px bg-stroke-faint" />
                {level.steps.map((step) => {
                  const StepIcon = STEP_ICON[step.type];
                  const done = completed.has(step.id);
                  const isActive = step.id === active.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStepId(step.id)}
                      className={cn(
                        "group relative flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors",
                        isActive
                          ? "border-accent-orange/40 bg-accent-orange/[0.06]"
                          : "border-transparent hover:bg-white/[0.03]",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute -left-6 top-4 grid size-6 place-items-center rounded-full border-2 border-bg-card",
                          done
                            ? "bg-accent-orange text-bg-sunken"
                            : isActive
                              ? "bg-fill-strong text-bg-sunken"
                              : "bg-white/[0.08] text-text-muted",
                        )}
                      >
                        {done ? (
                          <Check className="size-3" />
                        ) : (
                          <StepIcon className="size-3" />
                        )}
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium leading-tight">
                          {step.title}
                        </span>
                        <span className="mt-1 flex items-center gap-2 text-[11px] text-text-muted">
                          <span className="uppercase tracking-wider">
                            {STEP_LABEL[step.type]}
                          </span>
                          <span>·</span>
                          <span>{step.estimatedMinutes}m</span>
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 text-text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
