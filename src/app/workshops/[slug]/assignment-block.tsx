"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Check } from "@/components/ui/Icons";
import type { Assignment } from "@/data/workshops";

/**
 * Assignment block — public to read, gated for action.
 *
 * The brief + rubric are always visible (so logged-out visitors can
 * preview the work shape before signing up). The submit form here is a
 * UI scaffold only — when auth + DB land, it'll POST to the API and
 * mirror to /me/submissions. For now it simulates the submit in local
 * state so the structure is reviewable.
 */
export function AssignmentBlock({
  assignment,
  workshopSlug: _workshopSlug,
  isPast,
}: {
  assignment: Assignment;
  workshopSlug: string;
  isPast: boolean;
}) {
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Stub: real submission lands once auth + DB are wired. Drop into
    // local "thanks" state so the structure is reviewable end-to-end.
    setSubmitted(true);
  }

  return (
    <section
      className="border-b border-hairline bg-surface-bone py-20 md:py-24"
      id="assignment"
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.05fr]">
          {/* Brief + rubric */}
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
              Assignment
            </p>
            <h2 className="font-display mt-3 text-[28px] font-normal leading-[1.15] tracking-[0] text-ink md:text-[36px]">
              Submit your work, get an honest assessment.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-body md:text-[15px]">
              {assignment.brief}
            </p>

            {assignment.dueAt && (
              <p className="mt-4 inline-flex rounded-[6px] border border-hairline bg-canvas px-2.5 py-1 text-[12px] text-muted">
                Due{" "}
                {new Date(assignment.dueAt).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}

            <div className="mt-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                You&rsquo;ll be scored on
              </p>
              <ul className="mt-3 flex flex-col">
                {assignment.rubric.map((c) => (
                  <li
                    key={c.key}
                    className="flex items-start gap-3 border-t border-hairline py-3 text-[14px] text-ink first:border-t-0"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-on-primary">
                      <Check className="size-3" />
                    </span>
                    <span className="flex-1">
                      <span className="font-medium">{c.label}</span>
                      {c.hint && (
                        <span className="mt-0.5 block text-[13px] text-body">
                          {c.hint}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Submit card */}
          <div className="rounded-[12px] border border-hairline bg-canvas p-6 md:p-8">
            {submitted ? (
              <div className="flex h-full flex-col justify-center text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-ink text-on-primary">
                  <Check className="size-5" />
                </span>
                <h3 className="font-display mt-4 text-[22px] font-medium tracking-[0] text-ink">
                  Submitted.
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-body">
                  Your work is in the RPS Studio review queue. You&rsquo;ll see
                  the assessment in My submissions when it&rsquo;s back —
                  usually within a week.
                </p>
                <Link
                  href="/dashboard"
                  className="mx-auto mt-5 inline-flex items-center gap-1.5 rounded-[12px] border border-hairline bg-canvas px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-surface-bone"
                >
                  View on my dashboard <ArrowRight className="size-3.5" />
                </Link>
              </div>
            ) : !isPast ? (
              // The session hasn't aired yet — assignment block previews
              // the brief but the submit form is closed until the live
              // session is over.
              <div className="flex h-full flex-col justify-center text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                  Opens after the live session
                </p>
                <p className="font-display mt-3 text-[22px] font-medium tracking-[0] text-ink">
                  Submissions open once we&rsquo;ve all built it together.
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-body">
                  Attend live — or catch the recording in the days after — then
                  drop your work here for a written RPS Studio assessment.
                </p>
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <header>
                  <h3 className="font-display text-[22px] font-medium leading-[1.2] tracking-[0] text-ink">
                    Submit your work
                  </h3>
                  <p className="mt-1.5 text-[13px] text-body">
                    A live URL is required; the note + image are optional.
                  </p>
                </header>
                <label className="flex flex-col gap-1.5 text-[13px] text-body">
                  Live URL <span className="text-muted">(required)</span>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://"
                    className="rounded-[6px] border border-hairline bg-canvas px-3 py-2.5 text-[14px] text-ink placeholder:text-muted focus:border-[color:var(--info-border)] focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[13px] text-body">
                  Note <span className="text-muted">(optional)</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    placeholder="A few lines on the choices you made, the trade-offs, what you'd push further."
                    className="resize-y rounded-[6px] border border-hairline bg-canvas px-3 py-2.5 text-[14px] leading-relaxed text-ink placeholder:text-muted focus:border-[color:var(--info-border)] focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[13px] text-body">
                  Image <span className="text-muted">(optional)</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="rounded-[6px] border border-hairline bg-canvas px-3 py-2 text-[13px] text-body file:mr-3 file:rounded-[6px] file:border-0 file:bg-surface-bone file:px-3 file:py-1.5 file:text-[12px] file:font-medium file:text-ink hover:file:bg-surface-strong"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-[12px] bg-ink px-4 py-3 text-[14px] font-medium text-on-primary transition-colors hover:bg-[color:var(--primary-active)]"
                >
                  Submit for assessment <ArrowRight className="size-3.5" />
                </button>
                <p className="text-center text-[11px] text-muted">
                  You&rsquo;ll need to be signed in. We&rsquo;ll prompt you on
                  submit.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
