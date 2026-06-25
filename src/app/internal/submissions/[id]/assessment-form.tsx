"use client";

import { useState } from "react";
import type { RubricCriterion } from "@/data/workshops";
import type { Assessment } from "@/data/submissions";

/**
 * Assessment form. Provider-agnostic — once the DB lands, this POSTs
 * `{submission, rubric, scores, overall, notes}` to /api/internal/assess
 * and the same shape will be the AI-scorer interface in Phase 2.
 *
 * Default scale is 1–5 per criterion; RPS can swap it for any integer
 * range by changing the `MAX` constant.
 */
const MIN = 1;
const MAX = 5;

export function AssessmentForm({
  submissionId: _submissionId,
  rubric,
  existing,
}: {
  submissionId: string;
  rubric: RubricCriterion[];
  existing?: Assessment;
}) {
  const [scores, setScores] = useState<Record<string, number>>(() => {
    const seed: Record<string, number> = {};
    rubric.forEach((c) => {
      const found = existing?.scores.find((s) => s.key === c.key);
      seed[c.key] = found?.score ?? 3;
    });
    return seed;
  });
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [saved, setSaved] = useState(false);

  const avg =
    Object.values(scores).reduce((a, b) => a + b, 0) /
    Math.max(rubric.length, 1);
  const overall = `${avg.toFixed(1)} / ${MAX}`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Stub: wire to POST /api/internal/assess when DB lands.
    setSaved(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[12px] border border-hairline bg-canvas p-6"
    >
      <header className="mb-5">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
          Assessment
        </p>
        <h2 className="font-display mt-2 text-[22px] font-medium leading-[1.2] tracking-[0] text-ink">
          Score against the rubric.
        </h2>
        <p className="mt-2 text-[12.5px] text-muted">
          {MIN}–{MAX} per criterion. Overall is auto-computed but
          editable.
        </p>
      </header>

      <fieldset className="flex flex-col gap-4">
        {rubric.map((c) => (
          <div key={c.key}>
            <div className="flex items-center justify-between text-[13px]">
              <label className="font-medium text-ink" htmlFor={`s-${c.key}`}>
                {c.label}
              </label>
              <span className="font-mono text-[12px] text-muted">
                {scores[c.key]} / {MAX}
              </span>
            </div>
            {c.hint && (
              <p className="mt-1 text-[12px] text-muted">{c.hint}</p>
            )}
            <input
              id={`s-${c.key}`}
              type="range"
              min={MIN}
              max={MAX}
              value={scores[c.key]}
              onChange={(e) =>
                setScores((p) => ({ ...p, [c.key]: Number(e.target.value) }))
              }
              className="mt-2 w-full accent-[color:var(--ink)]"
            />
          </div>
        ))}
      </fieldset>

      <div className="mt-5 rounded-[10px] border border-hairline bg-surface-bone p-3.5">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          Overall
        </p>
        <p className="font-display mt-1 text-[22px] font-medium tracking-[0] text-ink">
          {overall}
        </p>
      </div>

      <label className="mt-5 flex flex-col gap-1.5 text-[13px] text-body">
        Notes for the member
        <textarea
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What worked, where it could go further. Specific beats general."
          className="resize-y rounded-[6px] border border-hairline bg-canvas px-3 py-2.5 text-[14px] leading-relaxed text-ink placeholder:text-muted focus:border-[color:var(--info-border)] focus:outline-none"
        />
      </label>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-[12px] text-muted">
          {saved
            ? "Saved. Member will see the assessment in My submissions."
            : existing
              ? "Loaded from a previous assessment."
              : "Opening this submission marks it In review."}
        </span>
        <button
          type="submit"
          className="rounded-[12px] bg-ink px-5 py-2.5 text-[14px] font-medium text-on-primary transition-colors hover:bg-[color:var(--primary-active)]"
        >
          {existing ? "Update assessment" : "Save assessment"}
        </button>
      </div>
    </form>
  );
}
