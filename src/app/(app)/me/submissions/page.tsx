import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import { mySubmissions, type SubmissionStatus } from "@/data/submissions";
import { findWorkshop } from "@/data/workshops";

export const metadata = { title: "My submissions · Opencanvas" };

const STATUS_LABEL: Record<SubmissionStatus, string> = {
  SUBMITTED: "Submitted",
  IN_REVIEW: "In review",
  ASSESSED: "Assessed",
};

const STATUS_TONE: Record<SubmissionStatus, string> = {
  SUBMITTED: "border-hairline bg-surface-bone text-ink",
  IN_REVIEW: "border-hairline bg-signature-cream text-ink",
  ASSESSED: "border-transparent bg-ink text-on-primary",
};

export default function MySubmissionsPage() {
  const submissions = mySubmissions();

  return (
    <div className="mx-auto w-full max-w-[920px] px-6 py-10 md:px-10">
      <header className="mb-10">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
          My submissions
        </p>
        <h1 className="font-display mt-3 text-[36px] font-normal leading-[1.1] tracking-[0] text-ink md:text-[44px]">
          Your work, your assessments.
        </h1>
        <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-body">
          Every workshop assignment you&rsquo;ve submitted, with its current
          status and (once it&rsquo;s back) the RPS Studio score.
        </p>
      </header>

      {submissions.length === 0 ? (
        <div className="rounded-[10px] border border-hairline bg-surface-bone p-8 text-center">
          <p className="font-display text-[20px] font-medium text-ink">
            No submissions yet.
          </p>
          <p className="mt-2 text-[14px] text-body">
            Attend a workshop and submit your work — it shows up here.
          </p>
          <Link
            href="/workshops"
            className="mt-5 inline-flex items-center gap-1.5 rounded-[12px] bg-ink px-4 py-2.5 text-[14px] font-medium text-on-primary transition-colors hover:bg-[color:var(--primary-active)]"
          >
            Browse workshops <ArrowRight className="size-3.5" />
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {submissions.map((s) => {
            const workshop = findWorkshop(s.workshopSlug);
            return (
              <li
                key={s.id}
                className="rounded-[10px] border border-hairline bg-canvas p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                      Workshop
                    </p>
                    <Link
                      href={`/workshops/${s.workshopSlug}`}
                      className="mt-1 block font-display text-[18px] font-medium leading-[1.25] tracking-[0] text-ink hover:underline"
                    >
                      {workshop?.title ?? s.workshopSlug}
                    </Link>
                    <p className="mt-2 text-[12.5px] text-muted">
                      Submitted{" "}
                      {new Date(s.submittedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      ·{" "}
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-link hover:underline"
                      >
                        {prettyUrl(s.url)}
                      </a>
                    </p>
                  </div>
                  <span
                    className={`rounded-[8px] border px-2.5 py-1 text-[12px] font-medium ${STATUS_TONE[s.status]}`}
                  >
                    {STATUS_LABEL[s.status]}
                    {s.assessment ? ` · ${s.assessment.overall}` : ""}
                  </span>
                </div>

                {s.note && (
                  <p className="mt-4 rounded-[8px] border border-hairline bg-surface-bone px-3.5 py-3 text-[13px] leading-relaxed text-body">
                    {s.note}
                  </p>
                )}

                {s.assessment && (
                  <div className="mt-4 border-t border-hairline pt-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                      Assessment
                    </p>
                    <ul className="mt-3 grid gap-2 md:grid-cols-2">
                      {s.assessment.scores.map((sc) => (
                        <li
                          key={sc.key}
                          className="flex items-center justify-between rounded-[6px] border border-hairline bg-canvas px-3 py-2 text-[13px]"
                        >
                          <span className="capitalize text-body">{sc.key}</span>
                          <span className="font-mono text-[12px] font-medium text-ink">
                            {sc.score} / 5
                          </span>
                        </li>
                      ))}
                    </ul>
                    {s.assessment.notes && (
                      <p className="mt-3 text-[13px] leading-relaxed text-body">
                        {s.assessment.notes}
                      </p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function prettyUrl(url: string) {
  try {
    const u = new URL(url);
    return u.host + (u.pathname === "/" ? "" : u.pathname);
  } catch {
    return url;
  }
}
