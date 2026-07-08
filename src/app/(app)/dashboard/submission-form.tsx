"use client";

import { useState } from "react";
import { ArrowRight, Check } from "@/components/ui/Icons";

/**
 * Inline assignment upload — lives on the dashboard so members can drop
 * their deliverable link without leaving the page.
 *
 * Stub only: real submission POSTs to the API once auth + DB land. For
 * now it flips into a local "submitted" state so the full flow is
 * reviewable end-to-end.
 */
export function SubmissionForm({
  workshopTitle,
  brief,
  dueAt,
}: {
  workshopTitle: string;
  brief: string;
  dueAt: string | null;
}) {
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-4 flex items-center gap-4 rounded-[16px] border border-hairline bg-surface-card p-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-r from-primary to-[#ff6a3d] text-on-primary">
          <Check className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-[17px] font-bold text-ink">
            Submitted for assessment.
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-body">
            Your link for <span className="font-medium text-ink">{workshopTitle}</span>{" "}
            is in the RPS Studio review queue. Its status will move to{" "}
            <span className="font-medium text-ink">In review</span> above — assessments are
            done by hand, usually back within a week.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-lift mt-4 rounded-[16px] border border-hairline bg-surface-card p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
            Assignment · {workshopTitle}
          </p>
          <p className="mt-1.5 max-w-[620px] text-[13.5px] leading-relaxed text-body">
            {brief}
          </p>
        </div>
        {dueAt && (
          <span className="shrink-0 rounded-full border border-hairline bg-surface-bone px-2.5 py-1 text-[12px] text-muted">
            Due{" "}
            {new Date(dueAt).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <label className="flex flex-col gap-1.5 text-[12.5px] font-medium text-body">
          Your link <span className="font-normal text-muted">(required)</span>
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-work.com or figma.com/file/…"
            className="rounded-[10px] border border-hairline bg-canvas px-3.5 py-2.5 text-[14px] text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[12.5px] font-medium text-body">
          Note <span className="font-normal text-muted">(optional)</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="A few lines on the choices you made and what you'd push further."
            className="resize-y rounded-[10px] border border-hairline bg-canvas px-3.5 py-2.5 text-[14px] leading-relaxed text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-[11.5px] text-muted">
          You can resubmit until the due date.
        </p>
        <button
          type="submit"
          className="btn-press inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-[#ff6a3d] px-5 py-2.5 text-[13.5px] font-semibold text-on-primary shadow-[0_8px_20px_-8px_rgba(234,40,4,0.5)]"
        >
          Submit for assessment <ArrowRight className="size-3.5" />
        </button>
      </div>
    </form>
  );
}
