"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Check, Play, Clock, ArrowRight, Sparkles } from "@/components/ui/Icons";
import {
  LEVEL_UP_LESSONS,
  LEVEL_UP_TOTAL_MINUTES,
  type LevelUpLesson,
} from "@/data/levelup";

const STORAGE_KEY = "opencanvas:levelup:completed-v1";
const NAME_KEY = "opencanvas:levelup:name-v1";

export default function LevelUpPage() {
  const [activeId, setActiveId] = useState<string>(LEVEL_UP_LESSONS[0].id);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);
  const [name, setName] = useState<string>("");

  // Hydrate from localStorage so progress persists between sessions.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCompleted(new Set(JSON.parse(raw)));
      const storedName = localStorage.getItem(NAME_KEY);
      if (storedName) setName(storedName);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
    } catch {}
  }, [completed, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(NAME_KEY, name);
    } catch {}
  }, [name, hydrated]);

  const active = useMemo(
    () => LEVEL_UP_LESSONS.find((l) => l.id === activeId) ?? LEVEL_UP_LESSONS[0],
    [activeId],
  );

  const minutesWatched = useMemo(
    () =>
      LEVEL_UP_LESSONS.filter((l) => completed.has(l.id)).reduce(
        (sum, l) => sum + l.durationMin,
        0,
      ),
    [completed],
  );

  const totalCount = LEVEL_UP_LESSONS.length;
  const doneCount = completed.size;
  const allDone = doneCount === totalCount;
  const percent = Math.round((minutesWatched / LEVEL_UP_TOTAL_MINUTES) * 100);

  function toggle(id: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function reset() {
    setCompleted(new Set());
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-10">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="size-[18px] rounded-full"
            style={{ background: "var(--rainbow)" }}
          />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
            Members-only · Level Up
          </span>
        </div>
        <h1 className="font-display mt-4 text-[44px] font-light leading-[0.98] tracking-[-0.035em] md:text-[64px]">
          The mini-course juniors <em>actually</em> need.
        </h1>
        <p className="mt-4 max-w-[640px] text-[15px] leading-relaxed text-text-weak md:text-base">
          Six short YouTube lessons (~2h 48m total) on the practical stuff
          design school skips. Mark each as complete to earn your certificate
          and unlock priority access to design roles at Rock Paper Scissors
          Studio.
        </p>

        {/* Progress bar */}
        <div className="mt-6 rounded-2xl border border-stroke-weak bg-bg-card p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
                Progress
              </p>
              <p className="mt-1 text-[24px] font-light tracking-tight text-text-strong">
                {doneCount} of {totalCount} lessons ·{" "}
                <span className="text-text-weak">{minutesWatched}m / {LEVEL_UP_TOTAL_MINUTES}m</span>
              </p>
            </div>
            <span
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium",
                allDone
                  ? "border-stroke-strong bg-fill-strong text-text-inverse-strong"
                  : "border-stroke-weak bg-bg-sunken text-text-strong",
              )}
            >
              {allDone ? "Course completed" : `${percent}% complete`}
            </span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg-card-hover">
            <div
              className="h-full rounded-full transition-[width] duration-500 ease-out"
              style={{
                width: `${percent}%`,
                background: "var(--rainbow)",
              }}
            />
          </div>
        </div>
      </header>

      {/* Layout: player + playlist */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section>
          {/* Video player */}
          <div className="overflow-hidden rounded-2xl border border-stroke-weak bg-bg-deep">
            <div className="relative aspect-video">
              <iframe
                key={active.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?rel=0&modestbranding=1`}
                title={active.title}
                className="absolute inset-0 size-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          {/* Active lesson meta */}
          <div className="mt-6 rounded-2xl border border-stroke-weak bg-bg-card p-6">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="font-mono uppercase tracking-[0.16em] text-text-muted">
                Lesson {active.number}
              </span>
              <span className="inline-flex items-center gap-1 text-text-muted">
                <Clock className="size-3.5" /> {active.durationMin} min
              </span>
              <span className="text-text-muted">·</span>
              <span className="text-text-weak">{active.channel}</span>
            </div>
            <h2 className="font-display mt-3 text-[28px] font-light leading-tight tracking-[-0.02em] md:text-[34px]">
              {active.title}
            </h2>
            <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-text-weak">
              {active.brief}
            </p>
            <p className="mt-3 max-w-[640px] rounded-xl border border-stroke-faint bg-bg-sunken p-4 text-[14px] leading-relaxed text-text-strong">
              <span
                className="mr-2 inline-flex items-center gap-1.5 font-medium"
                style={{ color: "var(--accent-pink)" }}
              >
                <Sparkles className="size-3.5" /> Takeaway
              </span>
              {active.takeaway}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => toggle(active.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  completed.has(active.id)
                    ? "border border-stroke-weak bg-bg-sunken text-text-strong"
                    : "bg-fill-strong text-text-inverse-strong hover:opacity-90",
                )}
              >
                {completed.has(active.id) ? (
                  <>
                    <Check className="size-3.5" /> Marked complete
                  </>
                ) : (
                  <>Mark as complete</>
                )}
              </button>
              <a
                href={`https://youtu.be/${active.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-text-weak underline-offset-4 hover:text-text-strong hover:underline"
              >
                Open on YouTube
              </a>
            </div>
          </div>

          {/* Certificate & RPS Studio reward — shown when all lessons done */}
          <CompletionPanel
            allDone={allDone}
            name={name}
            onNameChange={setName}
            onReset={reset}
          />
        </section>

        {/* Playlist sidebar */}
        <aside>
          <div className="sticky top-24 rounded-2xl border border-stroke-weak bg-bg-card p-3.5">
            <div className="flex items-center justify-between px-2 pb-2 pt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
              <span>Playlist</span>
              <span>{LEVEL_UP_LESSONS.length} lessons · {Math.floor(LEVEL_UP_TOTAL_MINUTES / 60)}h {LEVEL_UP_TOTAL_MINUTES % 60}m</span>
            </div>
            <ol className="m-0 flex list-none flex-col gap-1 p-0">
              {LEVEL_UP_LESSONS.map((l) => (
                <PlaylistRow
                  key={l.id}
                  lesson={l}
                  isActive={l.id === active.id}
                  isDone={completed.has(l.id)}
                  onSelect={() => setActiveId(l.id)}
                  onToggleDone={() => toggle(l.id)}
                />
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PlaylistRow({
  lesson,
  isActive,
  isDone,
  onSelect,
  onToggleDone,
}: {
  lesson: LevelUpLesson;
  isActive: boolean;
  isDone: boolean;
  onSelect: () => void;
  onToggleDone: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
          isActive
            ? "border-stroke-strong bg-bg-card-hover"
            : "border-stroke-weak bg-bg-sunken hover:bg-bg-card-hover",
        )}
      >
        <span
          role="checkbox"
          aria-checked={isDone}
          onClick={(e) => {
            e.stopPropagation();
            onToggleDone();
          }}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              onToggleDone();
            }
          }}
          tabIndex={0}
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-full border transition-all",
            isDone
              ? "border-transparent text-white"
              : "border-stroke-weak bg-bg-card text-text-muted hover:text-text-strong",
          )}
          style={isDone ? { background: "var(--rainbow)" } : undefined}
        >
          {isDone ? (
            <Check className="size-3.5" />
          ) : isActive ? (
            <Play className="size-3" />
          ) : (
            <span className="font-mono text-[10px]">{lesson.number}</span>
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13.5px] font-medium text-text-strong">
            {lesson.title}
          </span>
          <span className="mt-0.5 block text-[11.5px] text-text-muted">
            {lesson.channel} · {lesson.durationMin}m
          </span>
        </span>
      </button>
    </li>
  );
}

function CompletionPanel({
  allDone,
  name,
  onNameChange,
  onReset,
}: {
  allDone: boolean;
  name: string;
  onNameChange: (name: string) => void;
  onReset: () => void;
}) {
  return (
    <section
      className={cn(
        "relative mt-6 overflow-hidden rounded-2xl border bg-bg-card p-7 transition-all",
        allDone ? "border-stroke-strong" : "border-stroke-weak",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 size-[420px] rounded-full opacity-50"
        style={{
          background:
            "conic-gradient(from 140deg, rgba(255,122,182,0.45), rgba(255,122,69,0.45), rgba(245,196,81,0.45), rgba(95,209,163,0.45), rgba(106,163,255,0.45), rgba(180,139,255,0.45), rgba(255,122,182,0.45))",
          filter: "blur(70px)",
        }}
      />
      <div className="relative">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
          <Sparkles className="size-3.5" /> Reward
        </div>
        <h2 className="font-display mt-3 text-[28px] font-light leading-tight tracking-[-0.02em] md:text-[34px]">
          {allDone
            ? "Course complete — claim your certificate."
            : "Finish all six lessons to unlock your reward."}
        </h2>
        <p className="mt-3 max-w-[600px] text-[14.5px] leading-relaxed text-text-weak">
          Completing Level Up earns you a signed Opencanvas certificate and
          priority access when{" "}
          <strong className="text-text-strong">
            Rock Paper Scissors Studio
          </strong>{" "}
          opens design roles — applications go to the top of the pile, ahead of
          the public queue.
        </p>

        {allDone ? (
          <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_1fr]">
            <Certificate name={name || "Your name"} />
            <div className="flex flex-col gap-3 rounded-xl border border-stroke-weak bg-bg-sunken p-5">
              <label className="flex flex-col gap-1.5 text-[13px] text-text-weak">
                Name on certificate
                <input
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="Full name"
                  className="rounded-lg border border-stroke-weak bg-bg-card px-3 py-2 text-sm text-text-strong placeholder:text-text-muted focus:border-stroke-strong focus:outline-none"
                />
              </label>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-fill-strong px-4 py-2.5 text-sm font-medium text-text-inverse-strong transition-opacity hover:opacity-90"
              >
                Download certificate
              </button>
              <Link
                href="mailto:hi@opencanvas.community?subject=RPS%20Studio%20priority%20access"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-stroke-strong px-4 py-2.5 text-sm font-medium text-text-strong transition-colors hover:bg-bg-card-hover"
              >
                Request RPS Studio referral <ArrowRight className="size-3.5" />
              </Link>
              <button
                type="button"
                onClick={onReset}
                className="text-[12px] text-text-muted underline-offset-2 hover:text-text-strong hover:underline"
              >
                Reset progress
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-3 text-[13.5px] text-text-weak md:grid-cols-3">
            <Perk
              title="Signed certificate"
              body="A verifiable Opencanvas certificate you can share on LinkedIn or in a cover letter."
            />
            <Perk
              title="RPS Studio priority"
              body="Skip the public queue when Rock Paper Scissors Studio opens design openings."
            />
            <Perk
              title="Mentor intro"
              body="One free 30-min intro session with an Opencanvas mentor to plan your next move."
            />
          </div>
        )}
      </div>
    </section>
  );
}

function Perk({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-stroke-faint bg-bg-sunken p-4">
      <p className="text-[13px] font-medium text-text-strong">{title}</p>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-text-weak">
        {body}
      </p>
    </div>
  );
}

function Certificate({ name }: { name: string }) {
  const issued = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div
      className="relative aspect-[1.4/1] overflow-hidden rounded-2xl border bg-bg-sunken p-8 text-center"
      style={{
        borderColor: "color-mix(in srgb, var(--accent-pink) 28%, transparent)",
        background:
          "radial-gradient(120% 80% at 50% 10%, color-mix(in srgb, var(--accent-pink) 10%, var(--bg-card)), var(--bg-card))",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 rounded-xl border"
        style={{
          borderColor:
            "color-mix(in srgb, var(--accent-pink) 24%, transparent)",
        }}
      />
      <div className="relative">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted"
        >
          Opencanvas · Certificate of Completion
        </span>
        <p className="mt-5 text-[12px] uppercase tracking-[0.16em] text-text-muted">
          This certifies that
        </p>
        <p
          className="font-display mt-2 text-[28px] font-light leading-tight tracking-[-0.02em] text-text-strong md:text-[34px]"
        >
          {name}
        </p>
        <p className="mt-3 text-[12.5px] leading-relaxed text-text-weak">
          has completed the Level Up mini-course covering Figma file hygiene,
          discovery, working with PMs and engineers, design critique, and
          shipping at pace.
        </p>
        <div className="mt-5 flex items-center justify-center gap-6 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          <span>Issued · {issued}</span>
          <span>·</span>
          <span>Verified · Opencanvas</span>
        </div>
        <div
          aria-hidden
          className="mx-auto mt-5 h-1 w-24 rounded-full"
          style={{ background: "var(--rainbow)" }}
        />
      </div>
    </div>
  );
}
