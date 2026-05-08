import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight, ArrowRight, Sparkles, Check, Clock } from "@/components/ui/Icons";
import { TOPICS } from "@/lib/mock";

const FILTERS = ["All", "Design tool", "Discipline", "AI", "Career"];

// Mock progress state — in production would come from the user's profile.
const PROGRESS: Record<string, { level: "Beginner" | "Intermediate" | "Advanced"; done: number; total: number; nextStep?: { title: string; type: string; estimatedTime: string } }> = {
  figma: {
    level: "Beginner",
    done: 2,
    total: 5,
    nextStep: { title: "Build: a sign-in screen", type: "Exercise", estimatedTime: "45m" },
  },
};

const COMPLETED = [
  { topicSlug: "ux-research", level: "Beginner" as const, completedOn: "Apr 12, 2026" },
];

export default function LearnIndexPage() {
  const inProgressEntries = TOPICS.filter((t) => PROGRESS[t.slug]).map((t) => ({
    topic: t,
    progress: PROGRESS[t.slug],
  }));
  const completedEntries = COMPLETED.map((c) => ({
    topic: TOPICS.find((t) => t.slug === c.topicSlug)!,
    level: c.level,
    completedOn: c.completedOn,
  })).filter((e) => e.topic);

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-12 px-6 py-10 md:px-10">
      <SectionHeading
        eyebrow="Learn"
        title="Guided learning, no more random tabs."
        description="Every topic is broken into beginner / intermediate / advanced — a curated pipeline of videos, articles, docs, exercises, and projects."
      />

      {/* Continue learning */}
      {inProgressEntries.length > 0 && (
        <section>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-lg font-medium tracking-tight md:text-xl">
              Continue learning
            </h2>
            <span className="text-xs text-text-muted">
              {inProgressEntries.length} in progress
            </span>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {inProgressEntries.map(({ topic, progress }) => {
              const pct = Math.round((progress.done / progress.total) * 100);
              return (
                <Card
                  key={topic.slug}
                  as="a"
                  href={`/learn/${topic.slug}`}
                  className="flex flex-col gap-4 p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-md border border-stroke-weak bg-bg-sunken text-lg">
                        {topic.emoji}
                      </span>
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-text-muted">
                          {progress.level} pipeline
                        </p>
                        <h3 className="font-display text-base font-medium">
                          {topic.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-text-strong">
                      {progress.done}/{progress.total}
                    </span>
                  </div>

                  <div className="h-1 rounded-full bg-bg-card-hover">
                    <div
                      className="h-full rounded-full bg-accent-orange"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {progress.nextStep && (
                    <div className="rounded-lg border border-stroke-faint bg-bg-sunken p-3">
                      <p className="text-[11px] uppercase tracking-wider text-text-muted">
                        Next step
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {progress.nextStep.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-text-muted">
                        <Clock className="size-3" /> {progress.nextStep.estimatedTime}
                        <span>·</span>
                        <span>{progress.nextStep.type}</span>
                      </div>
                    </div>
                  )}

                  <span className="inline-flex items-center gap-1 text-sm text-text-strong">
                    Resume <ArrowRight className="size-3.5" />
                  </span>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Completed */}
      {completedEntries.length > 0 && (
        <section>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-lg font-medium tracking-tight md:text-xl">
              Completed
            </h2>
            <span className="text-xs text-text-muted">
              {completedEntries.length} completed
            </span>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {completedEntries.map(({ topic, level, completedOn }) => (
              <Card
                key={topic.slug + level}
                as="a"
                href={`/learn/${topic.slug}`}
                className="flex items-center gap-3 p-4"
              >
                <span className="grid size-9 place-items-center rounded-md border border-stroke-weak bg-bg-sunken text-base">
                  {topic.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {topic.title}
                  </p>
                  <p className="text-[11px] text-text-muted">
                    {level} · finished {completedOn}
                  </p>
                </div>
                <span className="grid size-7 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                  <Check className="size-3.5" />
                </span>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* All journeys */}
      <section>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-lg font-medium tracking-tight md:text-xl">
            All journeys
          </h2>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {FILTERS.map((f, i) => (
            <Tag key={f} tone={i === 0 ? "accent" : "default"}>
              {f}
            </Tag>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => {
            const totalSteps = Object.values(t.journeys).flatMap((j) => j.steps).length;
            const inProgress = !!PROGRESS[t.slug];
            return (
              <Card
                key={t.slug}
                as="a"
                href={`/learn/${t.slug}`}
                className="group flex flex-col gap-4 p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-10 place-items-center rounded-md border border-stroke-weak bg-bg-sunken text-lg">
                    {t.emoji}
                  </span>
                  <ArrowUpRight className="size-4 text-text-muted transition-colors group-hover:text-text-strong" />
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-wider text-text-muted">
                    {t.category}
                  </p>
                  <h3 className="font-display text-lg font-medium">{t.title}</h3>
                  <p className="text-sm leading-relaxed text-text-weak">{t.summary}</p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-stroke-faint pt-3 text-xs text-text-muted">
                  <span>{totalSteps} steps</span>
                  <span className="flex items-center gap-1">
                    {inProgress ? (
                      <>
                        <span className="size-1.5 rounded-full bg-accent-orange" />
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
          })}
        </div>
      </section>

      <Card className="flex flex-col items-start gap-4 border-dashed bg-transparent p-7 md:flex-row md:items-center md:justify-between" hover={false}>
        <div className="space-y-2">
          <h3 className="font-display text-lg font-medium">Don&rsquo;t see your topic?</h3>
          <p className="text-sm text-text-weak">
            Tell us what you want to learn — we&rsquo;ll assemble a curated journey from the best resources on the web.
          </p>
        </div>
        <Link
          href="/learn/new"
          className="inline-flex items-center gap-2 rounded-full bg-fill-strong px-5 py-2 text-sm font-medium text-text-inverse-strong"
        >
          Generate a journey <ArrowUpRight className="size-4" />
        </Link>
      </Card>
    </div>
  );
}
