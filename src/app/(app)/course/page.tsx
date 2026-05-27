"use client";

import { useMemo, useState } from "react";
import {
  TRACKS,
  getResourceLibrary,
  totalLessons,
  courseTotalLessons,
  COURSE_META,
  LESSON_RHYTHM,
  type Track,
  type Part,
  type Lesson,
  type ResourceLink,
  type ResourceKind,
  type LessonTable,
  type LessonSteps,
} from "@/data/designup";
import {
  useCourseProgress,
  lessonKey,
  capstoneKey,
  barKey,
} from "@/lib/useCourseProgress";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Check,
  Play,
  Article,
  Sparkles,
  Grid,
  ChevronDown,
} from "@/components/ui/Icons";

type View =
  | { name: "home" }
  | { name: "resources" }
  | { name: "track"; trackId: string }
  | { name: "lesson"; trackId: string; lessonId: string };

const KIND: Record<
  ResourceKind,
  { label: string; icon: (p: { className?: string }) => React.JSX.Element }
> = {
  watch: { label: "Watch", icon: Play },
  read: { label: "Read", icon: Article },
  use: { label: "Use", icon: Sparkles },
  browse: { label: "Browse", icon: Grid },
};

function pct(done: number, total: number) {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

function ProgressBar({ value, tint }: { value: number; tint: string }) {
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-bg-card-hover"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${value}%`, background: tint }}
      />
    </div>
  );
}

function StepsBlock({ steps, tint }: { steps: LessonSteps; tint: string }) {
  return (
    <div className="space-y-3">
      {steps.caption && (
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          {steps.caption}
        </p>
      )}
      <div className="grid gap-2.5 sm:grid-cols-2">
        {steps.items.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-stroke-weak bg-bg-card p-4"
            style={{ borderLeft: `3px solid ${tint}` }}
          >
            <p className="text-[13px] font-semibold text-text-strong">{s.label}</p>
            <p className="mt-1 text-[13px] leading-snug text-text-weak">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TableBlock({ table }: { table: LessonTable }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stroke-weak">
      <table className="w-full border-collapse text-left text-[14px]">
        <thead>
          <tr className="bg-bg-card-hover">
            {table.head.map((h) => (
              <th
                key={h}
                className="border-b border-stroke-weak px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-text-muted"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="align-top">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 leading-snug ${
                    i < table.rows.length - 1 ? "border-b border-stroke-faint" : ""
                  } ${j === 0 ? "font-medium text-text-strong" : "text-text-weak"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A track's lessons flattened in reading order, with their part attached. */
function flatLessons(track: Track) {
  return track.parts.flatMap((part) =>
    part.lessons.map((lesson) => ({ part, lesson })),
  );
}

export default function CoursePage() {
  const { has, toggle, set } = useCourseProgress();
  const [view, setView] = useState<View>({ name: "home" });

  const trackDone = (t: Track) =>
    t.parts.reduce(
      (n, p) =>
        n + p.lessons.filter((l) => has(lessonKey(t.id, l.id))).length,
      0,
    );

  const overallDone = TRACKS.reduce((n, t) => n + trackDone(t), 0);
  const overallTotal = courseTotalLessons();

  // First not-yet-complete lesson across the whole course.
  const next = useMemo(() => {
    for (const t of TRACKS) {
      for (const p of t.parts) {
        for (const l of p.lessons) {
          if (!has(lessonKey(t.id, l.id)))
            return { trackId: t.id, lesson: l, trackName: t.name };
        }
      }
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overallDone]);

  const activeTrackIndex =
    TRACKS.findIndex((t) => trackDone(t) < totalLessons(t)) + 1 || TRACKS.length;

  return (
    <div className="mx-auto w-full max-w-[920px] px-6 py-10 md:px-10">
      {view.name === "home" && (
        <CourseHome
          trackDone={trackDone}
          overallDone={overallDone}
          overallTotal={overallTotal}
          activeTrackIndex={activeTrackIndex}
          next={next}
          onOpenTrack={(trackId) => setView({ name: "track", trackId })}
          onOpenLesson={(trackId, lessonId) =>
            setView({ name: "lesson", trackId, lessonId })
          }
          onOpenResources={() => setView({ name: "resources" })}
        />
      )}

      {view.name === "track" && (
        <TrackView
          track={TRACKS.find((t) => t.id === view.trackId)!}
          has={has}
          toggle={toggle}
          set={set}
          done={trackDone(TRACKS.find((t) => t.id === view.trackId)!)}
          onBack={() => setView({ name: "home" })}
          onOpenLesson={(lessonId) =>
            setView({ name: "lesson", trackId: view.trackId, lessonId })
          }
        />
      )}

      {view.name === "lesson" && (
        <LessonView
          track={TRACKS.find((t) => t.id === view.trackId)!}
          lessonId={view.lessonId}
          has={has}
          set={set}
          onBackToTrack={() =>
            setView({ name: "track", trackId: view.trackId })
          }
          onOpenLesson={(lessonId) =>
            setView({ name: "lesson", trackId: view.trackId, lessonId })
          }
        />
      )}

      {view.name === "resources" && (
        <ResourceLibrary onBack={() => setView({ name: "home" })} />
      )}
    </div>
  );
}

// ── Course Home ──────────────────────────────────────────────────────────

function CourseHome({
  trackDone,
  overallDone,
  overallTotal,
  activeTrackIndex,
  next,
  onOpenTrack,
  onOpenLesson,
  onOpenResources,
}: {
  trackDone: (t: Track) => number;
  overallDone: number;
  overallTotal: number;
  activeTrackIndex: number;
  next: { trackId: string; lesson: Lesson; trackName: string } | null;
  onOpenTrack: (trackId: string) => void;
  onOpenLesson: (trackId: string, lessonId: string) => void;
  onOpenResources: () => void;
}) {
  const overall = pct(overallDone, overallTotal);

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
          Your course · free for members
        </span>
        <h1 className="font-display text-3xl tracking-tight md:text-4xl">
          {COURSE_META.name}
        </h1>
        <p className="text-sm text-text-weak">
          {overall}% complete · You&rsquo;re on Track {activeTrackIndex} of{" "}
          {TRACKS.length}
        </p>
        <div className="max-w-md">
          <ProgressBar value={overall} tint="var(--accent-orange)" />
        </div>
        {next ? (
          <button
            onClick={() => onOpenLesson(next.trackId, next.lesson.id)}
            className="inline-flex items-center gap-2 rounded-full bg-fill-strong px-5 py-2.5 text-sm font-medium text-text-inverse-strong transition-opacity hover:opacity-90"
          >
            {overall === 0 ? "Start" : "Continue"}: {next.lesson.title}
            <ArrowRight className="size-4" />
          </button>
        ) : (
          <p className="text-sm font-medium text-accent-sage">
            🎉 You&rsquo;ve completed every lesson. Go get the job.
          </p>
        )}
      </header>

      <div className="grid gap-4">
        {TRACKS.map((t) => {
          const total = totalLessons(t);
          const done = trackDone(t);
          return (
            <button
              key={t.id}
              onClick={() => onOpenTrack(t.id)}
              className="w-full rounded-2xl border border-stroke-weak bg-bg-card p-6 text-left transition-colors hover:border-stroke-strong hover:bg-bg-card-hover"
            >
              <div className="flex items-start gap-4">
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-xl font-mono text-sm font-semibold"
                  style={{
                    background: `color-mix(in srgb, ${t.accent} 16%, var(--bg-card))`,
                    color: t.accent,
                  }}
                >
                  {String(t.n).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="font-display text-lg">
                      {t.name} — {t.title}
                    </h3>
                    <span className="text-xs text-text-muted">
                      {done}/{total} lessons
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-weak">
                    {t.subtitle}
                  </p>
                  <div className="mt-4">
                    <ProgressBar value={pct(done, total)} tint={t.accent} />
                  </div>
                </div>
                <ArrowRight className="mt-1 size-4 shrink-0 text-text-muted" />
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onOpenResources}
        className="inline-flex items-center gap-2 text-sm font-medium text-accent-orange hover:underline"
      >
        Resource Library — all curated links in one place
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  );
}

// ── Track view ───────────────────────────────────────────────────────────

function TrackView({
  track,
  has,
  toggle,
  set,
  done,
  onBack,
  onOpenLesson,
}: {
  track: Track;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  set: (id: string, v: boolean) => void;
  done: number;
  onBack: () => void;
  onOpenLesson: (lessonId: string) => void;
}) {
  const total = totalLessons(track);
  const barDone = track.bar.filter((_, i) =>
    has(barKey(track.id, i)),
  ).length;

  return (
    <div className="space-y-12">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-strong"
      >
        <ArrowLeft className="size-4" /> Course home
      </button>

      {/* ── Header ───────────────────────────────────────────── */}
      <header className="space-y-5 border-b border-stroke-faint pb-10">
        <span
          className="font-mono text-[11px] font-medium uppercase tracking-[0.2em]"
          style={{ color: track.accent }}
        >
          Track {track.n} of {TRACKS.length} · {track.name}
        </span>
        <h1 className="font-display text-[34px] leading-[1.05] tracking-tight md:text-[44px]">
          {track.title}
        </h1>
        <p className="max-w-[660px] text-[16px] leading-relaxed text-text-weak">
          {track.intro}
        </p>
        <div className="flex items-center gap-3 pt-1">
          <div className="max-w-xs flex-1">
            <ProgressBar value={pct(done, total)} tint={track.accent} />
          </div>
          <span className="text-xs font-medium text-text-muted">
            {done}/{total} lessons
          </span>
        </div>
      </header>

      {/* ── Start here — track intro (where students begin) ──── */}
      <details
        open
        className="group rounded-2xl border border-stroke-weak bg-bg-card"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 font-medium text-text-strong">
          <span className="flex items-center gap-2.5">
            <span
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: track.accent }}
            >
              Start here
            </span>
            <span className="text-sm">
              About this track &amp; how each lesson works
            </span>
          </span>
          <ChevronDown className="size-4 shrink-0 text-text-muted transition-transform group-open:rotate-180" />
        </summary>
        <div className="space-y-4 border-t border-stroke-faint px-5 py-5">
          {track.about?.map((para, i) => (
            <p key={i} className="text-[14px] leading-relaxed text-text-weak">
              {para}
            </p>
          ))}
          <div className="grid gap-2 sm:grid-cols-2">
            {LESSON_RHYTHM.map((r) => (
              <div key={r.label} className="rounded-lg bg-bg-sunken p-3">
                <p className="text-[13px] font-semibold text-text-strong">
                  {r.label}
                </p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-text-muted">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </details>

      {/* ── Curriculum (the lessons lead) ────────────────────── */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            The curriculum
          </h2>
          <span className="text-[11px] text-text-muted">
            {track.parts.length} parts · {total} lessons
          </span>
        </div>
        <div className="space-y-3">
          {track.parts.map((part, i) => (
            <PartAccordion
              key={part.id}
              track={track}
              part={part}
              defaultOpen={i === 0}
              has={has}
              set={set}
              onOpenLesson={onOpenLesson}
            />
          ))}
        </div>
      </section>

      {/* ── Bridge / what's next ─────────────────────────────── */}
      {track.outro && (
        <Card
          className="p-6 md:p-7"
          hover={false}
          style={{
            background: `linear-gradient(160deg, color-mix(in srgb, ${track.accent} 11%, var(--bg-card)), var(--bg-card) 72%)`,
            borderColor: `color-mix(in srgb, ${track.accent} 24%, var(--stroke-weak))`,
          }}
        >
          <span
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: track.accent }}
          >
            What&rsquo;s next
          </span>
          <h2 className="font-display mt-2 text-xl">{track.outro.title}</h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-text-weak">
            {track.outro.body}
          </p>
        </Card>
      )}

      {/* ── The Bar — the end-of-track self-check ────────────── */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Check yourself
          </h2>
          <span className="text-[11px] text-text-muted">
            {barDone}/{track.bar.length} ticked
          </span>
        </div>
        <Card
          className="p-6 md:p-7"
          hover={false}
          style={{
            background: `linear-gradient(160deg, color-mix(in srgb, ${track.accent} 8%, var(--bg-card)), var(--bg-card) 78%)`,
          }}
        >
          <div className="flex items-start gap-3.5">
            <span
              className="grid size-10 shrink-0 place-items-center rounded-xl"
              style={{
                background: `color-mix(in srgb, ${track.accent} 18%, var(--bg-card))`,
                color: track.accent,
              }}
            >
              <Check className="size-5" />
            </span>
            <div>
              <h3 className="font-display text-xl leading-tight">
                The Bar — {track.barTitle}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-weak">
                Once you&rsquo;ve worked through the lessons above, this is the
                honest checklist. Tick a box when it&rsquo;s true, or open the
                lesson that gets you there.
              </p>
            </div>
          </div>
          <ul className="mt-5 space-y-1 border-t border-stroke-faint pt-4">
            {track.bar.map((item, i) => {
              const id = barKey(track.id, i);
              const ticked = has(id);
              return (
                <li
                  key={i}
                  className="flex items-start gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-bg-card-hover"
                >
                  <button
                    onClick={() => toggle(id)}
                    aria-pressed={ticked}
                    aria-label={ticked ? "Mark not done" : "Mark done"}
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors"
                    style={
                      ticked
                        ? {
                            background: track.accent,
                            borderColor: track.accent,
                            color: "var(--bg-card)",
                          }
                        : { borderColor: "var(--stroke-strong)" }
                    }
                  >
                    {ticked && <Check className="size-3" />}
                  </button>
                  <button
                    onClick={() =>
                      item.ref ? onOpenLesson(item.ref) : toggle(id)
                    }
                    className="group flex flex-1 items-start gap-1.5 text-left"
                  >
                    <span
                      className={`text-[14px] leading-snug ${
                        ticked
                          ? "text-text-muted line-through"
                          : "text-text-strong"
                      } ${item.ref ? "group-hover:underline" : ""}`}
                    >
                      {item.text}
                    </span>
                    {item.ref && (
                      <ArrowRight className="mt-1 size-3.5 shrink-0 text-text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
      </section>

    </div>
  );
}

function PartAccordion({
  track,
  part,
  defaultOpen,
  has,
  set,
  onOpenLesson,
}: {
  track: Track;
  part: Part;
  defaultOpen: boolean;
  has: (id: string) => boolean;
  set: (id: string, v: boolean) => void;
  onOpenLesson: (lessonId: string) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const capId = capstoneKey(track.id, part.id);
  const capDone = has(capId);
  const lessonsDone = part.lessons.filter((l) =>
    has(lessonKey(track.id, l.id)),
  ).length;

  return (
    <Card className="overflow-hidden p-0" hover={false}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-bg-card-hover"
      >
        <span
          className="grid size-10 shrink-0 place-items-center rounded-xl font-mono text-sm font-semibold"
          style={{
            background: `color-mix(in srgb, ${track.accent} 15%, var(--bg-card))`,
            color: track.accent,
          }}
        >
          {part.number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[17px] leading-snug">
            {part.title}
          </span>
          <span className="mt-0.5 block text-[12.5px] text-text-muted">
            {part.blurb}
          </span>
        </span>
        <span className="hidden shrink-0 items-center gap-2 sm:flex">
          <span className="h-1.5 w-16 overflow-hidden rounded-full bg-bg-card-hover">
            <span
              className="block h-full rounded-full"
              style={{
                width: `${pct(lessonsDone, part.lessons.length)}%`,
                background: track.accent,
              }}
            />
          </span>
          <span className="text-xs text-text-muted">
            {lessonsDone}/{part.lessons.length}
          </span>
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-stroke-faint">
          {part.intro && (
            <p className="border-b border-stroke-faint px-5 py-4 text-[13.5px] leading-relaxed text-text-weak">
              {part.intro}
            </p>
          )}
          <ul>
            {part.lessons.map((lesson) => {
              const lDone = has(lessonKey(track.id, lesson.id));
              return (
                <li key={lesson.id}>
                  <button
                    onClick={() => onOpenLesson(lesson.id)}
                    className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-bg-card-hover"
                  >
                    <span
                      aria-hidden
                      className="grid size-5 shrink-0 place-items-center rounded-full border"
                      style={
                        lDone
                          ? {
                              background: track.accent,
                              borderColor: track.accent,
                              color: "var(--bg-card)",
                            }
                          : { borderColor: "var(--stroke-strong)" }
                      }
                    >
                      {lDone && <Check className="size-3" />}
                    </span>
                    <span className="flex-1 text-sm text-text-strong">
                      {lesson.title}
                    </span>
                    <ArrowRight className="size-3.5 text-text-muted" />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Capstone */}
          <div className="flex items-start gap-3 border-t border-stroke-faint bg-bg-sunken px-5 py-4">
            <button
              onClick={() => set(capId, !capDone)}
              aria-pressed={capDone}
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors"
              style={
                capDone
                  ? {
                      background: track.accent,
                      borderColor: track.accent,
                      color: "var(--bg-card)",
                    }
                  : { borderColor: "var(--stroke-strong)" }
              }
              aria-label={capDone ? "Mark capstone incomplete" : "Mark capstone complete"}
            >
              {capDone && <Check className="size-3" />}
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Capstone
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-text-weak">
                {part.capstone}
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

// ── Lesson view ──────────────────────────────────────────────────────────

function LessonView({
  track,
  lessonId,
  has,
  set,
  onBackToTrack,
  onOpenLesson,
}: {
  track: Track;
  lessonId: string;
  has: (id: string) => boolean;
  set: (id: string, v: boolean) => void;
  onBackToTrack: () => void;
  onOpenLesson: (lessonId: string) => void;
}) {
  const flat = flatLessons(track);
  const idx = flat.findIndex((x) => x.lesson.id === lessonId);
  const entry = flat[idx];
  if (!entry) return null;
  const { part, lesson } = entry;
  const id = lessonKey(track.id, lesson.id);
  const done = has(id);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const nextL = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <div className="space-y-7">
      <button
        onClick={onBackToTrack}
        className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-strong"
      >
        <ArrowLeft className="size-4" /> {track.name}
      </button>

      <header className="space-y-2">
        <span
          className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
          style={{ color: track.accent }}
        >
          {part.number} · {part.title}
        </span>
        <h1 className="font-display text-2xl tracking-tight md:text-3xl">
          {lesson.title}
        </h1>
      </header>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          The idea
        </h2>
        {lesson.idea.map((para, i) => (
          <p key={i} className="text-[15.5px] leading-relaxed text-text-strong">
            {para}
          </p>
        ))}
      </section>

      {lesson.steps && <StepsBlock steps={lesson.steps} tint={track.accent} />}

      {lesson.table && <TableBlock table={lesson.table} />}

      {lesson.inTheWild && (
        <section className="space-y-2 rounded-2xl border border-stroke-weak bg-bg-card p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            In the wild
          </h2>
          <p className="text-[15px] leading-relaxed text-text-weak">
            {lesson.inTheWild}
          </p>
        </section>
      )}

      {lesson.links && lesson.links.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Watch / read — free, third-party resources
          </h2>
          <ul className="space-y-2">
            {lesson.links.map((link) => (
              <ResourceRow key={link.url} link={link} tint={track.accent} />
            ))}
          </ul>
        </section>
      )}

      {lesson.tryIt && (
        <section
          className="space-y-2 rounded-2xl border p-5"
          style={{
            background: `color-mix(in srgb, ${track.accent} 7%, var(--bg-card))`,
            borderColor: `color-mix(in srgb, ${track.accent} 24%, var(--stroke-weak))`,
          }}
        >
          <h2
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: track.accent }}
          >
            Try it
          </h2>
          <p className="text-[15px] leading-relaxed text-text-strong">
            {lesson.tryIt}
          </p>
        </section>
      )}

      {lesson.pitfall && (
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            What juniors get wrong
          </h2>
          <p className="text-[15px] leading-relaxed text-text-weak">
            {lesson.pitfall}
          </p>
        </section>
      )}

      {lesson.sayThis && (
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Say this
          </h2>
          <blockquote className="border-l-2 border-stroke-strong pl-4 text-[15px] italic leading-relaxed text-text-weak">
            {lesson.sayThis}
          </blockquote>
        </section>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 border-t border-stroke-faint pt-6">
        <button
          onClick={() => set(id, !done)}
          aria-pressed={done}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
          style={
            done
              ? {
                  background: "color-mix(in srgb, var(--accent-sage) 16%, var(--bg-card))",
                  color: "var(--accent-sage)",
                }
              : { background: "var(--fill-strong)", color: "var(--text-inverse-strong)" }
          }
        >
          {done ? (
            <>
              <Check className="size-4" /> Completed
            </>
          ) : (
            "Mark as complete"
          )}
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            disabled={!prev}
            onClick={() => prev && onOpenLesson(prev.lesson.id)}
            className="inline-flex items-center gap-1.5 rounded-full border border-stroke-weak bg-bg-card px-4 py-2 text-sm text-text-strong transition-colors hover:bg-bg-card-hover disabled:opacity-40"
          >
            <ArrowLeft className="size-4" /> Previous
          </button>
          <button
            disabled={!nextL}
            onClick={() => nextL && onOpenLesson(nextL.lesson.id)}
            className="inline-flex items-center gap-1.5 rounded-full border border-stroke-weak bg-bg-card px-4 py-2 text-sm text-text-strong transition-colors hover:bg-bg-card-hover disabled:opacity-40"
          >
            Next <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ResourceRow({ link, tint }: { link: ResourceLink; tint: string }) {
  const meta = KIND[link.kind];
  const Icon = meta.icon;
  return (
    <li>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-xl border border-stroke-weak bg-bg-card p-3.5 transition-colors hover:bg-bg-card-hover"
      >
        <span
          className="grid size-9 shrink-0 place-items-center rounded-lg"
          style={{
            background: `color-mix(in srgb, ${tint} 16%, var(--bg-card))`,
            color: tint,
          }}
        >
          <Icon className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-text-strong">
            {link.title}
          </span>
          <span className="block truncate text-xs text-text-muted">
            {meta.label} · {link.source}
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs text-text-muted">
          External
          <ArrowUpRight className="size-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </span>
      </a>
    </li>
  );
}

// ── Resource library ─────────────────────────────────────────────────────

function ResourceLibrary({ onBack }: { onBack: () => void }) {
  const links = getResourceLibrary();
  return (
    <div className="space-y-7">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-strong"
      >
        <ArrowLeft className="size-4" /> Course home
      </button>
      <header className="space-y-2">
        <h1 className="font-display text-3xl tracking-tight">Resource Library</h1>
        <p className="text-sm text-text-weak">
          Every curated link from the course, in one place. All are free,
          third-party resources by independent creators — open in a new tab.
        </p>
      </header>
      <ul className="space-y-2">
        {links.map((link) => (
          <ResourceRow key={link.url} link={link} tint="var(--accent-orange)" />
        ))}
      </ul>
    </div>
  );
}
