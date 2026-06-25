import Link from "next/link";
import { SUBMISSIONS, type SubmissionStatus } from "@/data/submissions";
import { findWorkshop } from "@/data/workshops";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata = { title: "Review queue · Internal" };

const STATUS_LABEL: Record<SubmissionStatus, string> = {
  SUBMITTED: "Submitted",
  IN_REVIEW: "In review",
  ASSESSED: "Assessed",
};

const STATUS_TONE: Record<SubmissionStatus, string> = {
  SUBMITTED: "border-hairline bg-signature-yellow text-ink",
  IN_REVIEW: "border-hairline bg-signature-peach text-ink",
  ASSESSED: "border-transparent bg-ink text-on-primary",
};

export default function InternalQueuePage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  return <Queue searchParamsPromise={searchParams} />;
}

async function Queue({
  searchParamsPromise,
}: {
  searchParamsPromise?: Promise<{ status?: string }>;
}) {
  const searchParams = (await searchParamsPromise) ?? {};
  const filter = (searchParams.status as SubmissionStatus | undefined) ?? null;

  const items = (filter ? SUBMISSIONS.filter((s) => s.status === filter) : SUBMISSIONS)
    .slice()
    .sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
    );

  const counts = SUBMISSIONS.reduce(
    (acc, s) => ({ ...acc, [s.status]: (acc[s.status] ?? 0) + 1 }),
    {} as Record<SubmissionStatus, number>,
  );

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-10">
      <header className="mb-10">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
          Review queue
        </p>
        <h1 className="font-display mt-3 text-[32px] font-normal leading-[1.1] tracking-[0] text-ink md:text-[40px]">
          Assessments waiting on the studio.
        </h1>
      </header>

      <nav className="mb-6 flex flex-wrap items-center gap-2 text-[13px]">
        <FilterChip label="All" href="/internal" active={!filter} count={SUBMISSIONS.length} />
        <FilterChip
          label="Submitted"
          href="/internal?status=SUBMITTED"
          active={filter === "SUBMITTED"}
          count={counts.SUBMITTED ?? 0}
        />
        <FilterChip
          label="In review"
          href="/internal?status=IN_REVIEW"
          active={filter === "IN_REVIEW"}
          count={counts.IN_REVIEW ?? 0}
        />
        <FilterChip
          label="Assessed"
          href="/internal?status=ASSESSED"
          active={filter === "ASSESSED"}
          count={counts.ASSESSED ?? 0}
        />
      </nav>

      {items.length === 0 ? (
        <p className="rounded-[10px] border border-hairline bg-surface-bone p-8 text-center text-[14px] text-body">
          Nothing in this bucket.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((s) => {
            const w = findWorkshop(s.workshopSlug);
            return (
              <li key={s.id}>
                <Link
                  href={`/internal/submissions/${s.id}`}
                  className="group flex items-center justify-between gap-4 rounded-[10px] border border-hairline bg-canvas p-5 transition-colors hover:bg-surface-bone"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                      {w?.title ?? s.workshopSlug}
                    </p>
                    <p className="mt-1 font-display text-[16px] font-medium leading-[1.25] tracking-[0] text-ink">
                      {s.memberName}
                      {s.memberRole && (
                        <span className="ml-2 font-sans text-[12px] font-normal text-muted">
                          {s.memberRole}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-[12.5px] text-muted">
                      Submitted{" "}
                      {new Date(s.submittedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span
                    className={`rounded-[8px] border px-2.5 py-1 text-[12px] font-medium ${STATUS_TONE[s.status]}`}
                  >
                    {STATUS_LABEL[s.status]}
                  </span>
                  <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  label,
  href,
  active,
  count,
}: {
  label: string;
  href: string;
  active: boolean;
  count: number;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 transition-colors ${
        active
          ? "bg-ink text-on-primary"
          : "border border-hairline bg-canvas text-body hover:bg-surface-bone hover:text-ink"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 text-[11px] ${active ? "bg-white/15 text-on-primary" : "bg-surface-bone text-muted"}`}
      >
        {count}
      </span>
    </Link>
  );
}
