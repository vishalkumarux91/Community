import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "@/components/ui/Icons";
import { enrolledWorkshops, findWorkshop, type Workshop } from "@/data/workshops";
import { mySubmissions, type Submission, type SubmissionStatus } from "@/data/submissions";
import { SubmissionForm } from "./submission-form";

export const metadata = { title: "Dashboard · Opencanvas" };

const STATUS_LABEL: Record<SubmissionStatus, string> = {
  SUBMITTED: "Submitted",
  IN_REVIEW: "In review",
  ASSESSED: "Assessed",
};

const STATUS_TONE: Record<SubmissionStatus, string> = {
  SUBMITTED: "border-hairline bg-surface-bone text-ink",
  IN_REVIEW: "border-transparent bg-gradient-to-r from-[#f4d35e] to-[#f4a8a0] text-[#202020]",
  ASSESSED: "border-transparent bg-gradient-to-r from-primary to-[#ff6a3d] text-on-primary",
};

export default function DashboardPage() {
  const workshops = enrolledWorkshops();
  const submissions = mySubmissions();

  // Assignments open for submission: the workshop is over, it has an
  // assignment, and the member hasn't submitted for it yet.
  const pending = workshops.filter(
    (w) =>
      w.status === "PAST" &&
      w.assignment &&
      !submissions.some((s) => s.assignmentId === w.assignment!.id),
  );

  return (
    <div className="mx-auto w-full max-w-[980px] px-6 py-10 md:px-10">
      <header className="reveal-up mb-10">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
          Dashboard
        </p>
        <h1 className="font-display mt-3 text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-ink md:text-[48px]">
          Welcome back, <span className="gradient-text">Vivin</span>.
        </h1>
        <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-body">
          Your enrolled workshops, assignments, and assessment status — all in
          one place.
        </p>
      </header>

      {/* Enrolled workshops */}
      <section className="reveal-up mb-12" style={{ animationDelay: "80ms" }}>
        <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">
          My workshops
        </h2>
        {workshops.length === 0 ? (
          <EmptyCard
            title="No workshops yet."
            body="Browse the calendar and attend your first live build."
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {workshops.map((w) => (
              <EnrolledCard key={w.id} workshop={w} />
            ))}
          </div>
        )}
      </section>

      {/* Assignments to submit — open assignments with an inline upload
           form so members can drop their link without leaving the page. */}
      {pending.length > 0 && (
        <section className="reveal-up mb-12" style={{ animationDelay: "160ms" }}>
          <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">
            Submit your assignment
          </h2>
          <p className="mb-4 text-[13px] text-body">
            You attended these workshops — drop your link to get assessed.
          </p>
          {pending.map((w) => (
            <SubmissionForm
              key={w.id}
              workshopTitle={w.title}
              brief={w.assignment!.brief}
              dueAt={w.assignment!.dueAt}
            />
          ))}
        </section>
      )}

      {/* Assessment status — submitted work + its review state. */}
      <section className="reveal-up" style={{ animationDelay: "240ms" }}>
        <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">
          Assessment status
        </h2>
        {submissions.length === 0 ? (
          <EmptyCard
            title="Nothing submitted yet."
            body="Once you submit an assignment, its review status and score show up here."
          />
        ) : (
          <ul className="flex flex-col gap-4">
            {submissions.map((s) => (
              <SubmissionCard key={s.id} submission={s} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function EnrolledCard({ workshop }: { workshop: Workshop }) {
  const date = new Date(workshop.datetime);
  const upcoming = workshop.status === "UPCOMING";
  return (
    <Link
      href={`/workshops/${workshop.slug}`}
      className="circle-card circle-card--hover group flex flex-col overflow-hidden"
    >
      <div className="aspect-[16/7] overflow-hidden bg-surface-bone">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workshop.heroImage}
          alt=""
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-[12px] text-mute">
          <span
            className={`rounded-full px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider ${
              upcoming
                ? "bg-gradient-to-r from-primary to-[#ff6a3d] text-on-primary"
                : "bg-surface-bone text-mute"
            }`}
          >
            {upcoming ? "Upcoming" : "Completed"}
          </span>
          <Calendar className="size-3.5" />
          {date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          <Clock className="ml-1 size-3.5" />
          {date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
        </div>
        <h3 className="font-display text-[20px] font-bold leading-[1.15] tracking-[-0.015em] text-ink">
          {workshop.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-body">
          {workshop.description}
        </p>
      </div>
    </Link>
  );
}

function SubmissionCard({ submission: s }: { submission: Submission }) {
  return (
    <li className="circle-card circle-card--hover p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
            Submission
          </p>
          <Link
            href={`/workshops/${s.workshopSlug}`}
            className="mt-1 block font-display text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-ink hover:underline"
          >
            {workshopTitle(s)}
          </Link>
          <p className="mt-2 text-[12.5px] text-muted">
            Submitted{" "}
            {new Date(s.submittedAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}{" "}
            ·{" "}
            <a href={s.url} target="_blank" rel="noreferrer" className="text-link hover:underline">
              {prettyUrl(s.url)}
            </a>
          </p>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-[12px] font-semibold ${STATUS_TONE[s.status]}`}
        >
          {STATUS_LABEL[s.status]}
          {s.assessment ? ` · ${s.assessment.overall}` : ""}
        </span>
      </div>

      {s.assessment ? (
        <div className="mt-4 border-t border-hairline pt-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
            Assessment
          </p>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {s.assessment.scores.map((sc) => (
              <li
                key={sc.key}
                className="flex items-center justify-between rounded-[10px] border border-hairline bg-canvas px-3 py-2 text-[13px]"
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
      ) : (
        <p className="mt-4 rounded-[10px] border border-hairline bg-surface-bone px-3.5 py-3 text-[13px] leading-relaxed text-body">
          Your work is with the RPS Studio team — assessments are done by hand,
          usually back within a week.
        </p>
      )}
    </li>
  );
}

function EmptyCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[16px] border border-hairline bg-surface-bone p-8 text-center">
      <p className="font-display text-[20px] font-bold text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-[440px] text-[14px] text-body">{body}</p>
      <Link
        href="/workshops"
        className="btn-press mt-5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-[#ff6a3d] px-5 py-2.5 text-[14px] font-semibold text-on-primary"
      >
        Browse workshops <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}

function workshopTitle(s: Submission) {
  return findWorkshop(s.workshopSlug)?.title ?? s.workshopSlug;
}

function prettyUrl(url: string) {
  try {
    const u = new URL(url);
    return u.host + (u.pathname === "/" ? "" : u.pathname);
  } catch {
    return url;
  }
}
