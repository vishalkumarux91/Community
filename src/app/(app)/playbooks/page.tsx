import Link from "next/link";
import { Clock, ArrowRight } from "@/components/ui/Icons";
import { PLAYBOOKS } from "@/data/playbooks";

export const metadata = {
  title: "Playbooks · Opencanvas",
  description:
    "RPS's own evergreen guides — the durable version of every workshop's concept.",
};

export default function PlaybooksPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-10">
      <header className="mb-10">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
          Playbooks
        </p>
        <h1 className="font-display mt-3 text-[36px] font-normal leading-[1.1] tracking-[0] text-ink md:text-[48px]">
          Evergreen guides from the RPS team.
        </h1>
        <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-body md:text-[16px]">
          The durable version of every workshop. Processes, prompts, and
          rituals that hold up after the live session ends.
        </p>
      </header>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PLAYBOOKS.map((p) => (
          <li key={p.id}>
            <Link
              href={`/playbooks/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[10px] border border-hairline bg-canvas transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[16/9] overflow-hidden bg-surface-bone">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.cover}
                  alt=""
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                    {p.topic}
                  </p>
                  <h2 className="mt-2 font-display text-[20px] font-medium leading-[1.25] text-ink">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-body">
                    {p.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[12px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" /> {p.readMinutes} min read
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-ink transition-transform group-hover:translate-x-0.5">
                    Read <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
