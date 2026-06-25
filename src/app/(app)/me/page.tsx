import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import { mySubmissions } from "@/data/submissions";

export const metadata = {
  title: "Account · Opencanvas",
};

export default function MePage() {
  const submissions = mySubmissions();
  const assessed = submissions.filter((s) => s.status === "ASSESSED").length;
  const inFlight = submissions.length - assessed;

  return (
    <div className="mx-auto w-full max-w-[920px] px-6 py-10 md:px-10">
      <header className="mb-10">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
          Account
        </p>
        <h1 className="font-display mt-3 text-[36px] font-normal leading-[1.1] tracking-[0] text-ink md:text-[44px]">
          Welcome back, Vivin.
        </h1>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Submissions" value={String(submissions.length)} />
        <Stat label="In review" value={String(inFlight)} />
        <Stat label="Assessed" value={String(assessed)} />
      </div>

      <Link
        href="/me/submissions"
        className="mt-8 inline-flex items-center gap-1.5 rounded-[12px] border border-hairline bg-canvas px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-surface-bone"
      >
        View My submissions <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] border border-hairline bg-canvas p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p className="font-display mt-2 text-[36px] font-normal leading-none text-ink">
        {value}
      </p>
    </div>
  );
}
