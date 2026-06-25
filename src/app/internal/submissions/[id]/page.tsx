import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/ui/Icons";
import {
  SUBMISSIONS,
  findSubmission,
  rubricForAssignment,
} from "@/data/submissions";
import { findWorkshop } from "@/data/workshops";
import { AssessmentForm } from "./assessment-form";

type Params = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return SUBMISSIONS.map((s) => ({ id: s.id }));
}

export default async function InternalSubmissionPage({ params }: Params) {
  const { id } = await params;
  const submission = findSubmission(id);
  if (!submission) notFound();

  const workshop = findWorkshop(submission.workshopSlug);
  const assignment = workshop?.assignment;
  const rubric = rubricForAssignment(submission.assignmentId);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-10">
      <Link
        href="/internal"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-3.5" /> Back to queue
      </Link>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Left: the submitted work + brief */}
        <section className="space-y-6">
          <header>
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
              Submission
            </p>
            <h1 className="font-display mt-2 text-[28px] font-normal leading-[1.15] tracking-[0] text-ink md:text-[36px]">
              {submission.memberName}
              {submission.memberRole && (
                <span className="ml-3 font-sans text-[14px] font-normal text-muted">
                  {submission.memberRole}
                </span>
              )}
            </h1>
            <p className="mt-2 text-[13px] text-muted">
              Workshop:{" "}
              <Link
                href={`/workshops/${submission.workshopSlug}`}
                className="text-link hover:underline"
              >
                {workshop?.title ?? submission.workshopSlug}
              </Link>
              {" · "}submitted{" "}
              {new Date(submission.submittedAt).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </header>

          {assignment && (
            <div className="rounded-[10px] border border-hairline bg-surface-bone p-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                Brief
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-body">
                {assignment.brief}
              </p>
            </div>
          )}

          <div className="rounded-[10px] border border-hairline bg-canvas p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              Work
            </p>
            <a
              href={submission.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-medium text-link hover:underline"
            >
              {submission.url}
            </a>
            {submission.imageUrl && (
              <div className="mt-4 overflow-hidden rounded-[8px] border border-hairline">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={submission.imageUrl}
                  alt="Submitted work"
                  className="block w-full"
                />
              </div>
            )}
            {submission.note && (
              <div className="mt-4 rounded-[8px] border border-hairline bg-surface-bone p-3.5 text-[13px] leading-relaxed text-body">
                {submission.note}
              </div>
            )}
          </div>
        </section>

        {/* Right: assessment form */}
        <aside className="lg:sticky lg:top-24">
          <AssessmentForm
            submissionId={submission.id}
            rubric={rubric}
            existing={submission.assessment}
          />
        </aside>
      </div>
    </div>
  );
}
