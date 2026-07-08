import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Calendar, Clock } from "@/components/ui/Icons";
import { nextWorkshop } from "@/data/workshops";

/**
 * Homepage workshops band — a single hero card for the next live
 * session. Picks the soonest UPCOMING workshop from the data file.
 */
export function WorkshopsPreview() {
  const workshop = nextWorkshop();
  if (!workshop) return null;

  const date = new Date(workshop.datetime);
  const dateStr = date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const timeStr = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <section className="border-b border-hairline bg-canvas py-24 md:py-32">
      <Container>
        <div className="reveal mb-12 grid items-end gap-6 md:grid-cols-[1.4fr_auto]">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">
              Next workshop
            </p>
            <h2 className="font-display mt-3 text-[44px] font-bold leading-[1.0] tracking-[-0.025em] text-ink md:text-[72px]">
              Live builds, <em>real</em> briefs.
            </h2>
            <p className="mt-4 max-w-[560px] text-[16px] leading-[1.55] text-body md:text-[18px]">
              Show up live, ship something, submit it for an honest
              assessment from the RPS Studio team.
            </p>
          </div>
          <Link
            href="/workshops"
            className="justify-self-start rounded-full border border-hairline bg-surface-card px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-surface-bone md:justify-self-end"
          >
            All workshops →
          </Link>
        </div>

        {/* Hero card — image left, content right at desktop. */}
        <Link
          href={`/workshops/${workshop.slug}`}
          className="circle-card circle-card--hover group grid overflow-hidden md:grid-cols-[1.2fr_1fr]"
        >
          <div className="aspect-[16/10] overflow-hidden bg-surface-bone md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={workshop.heroImage}
              alt=""
              className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-between gap-8 p-8 md:p-10">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-[13px] text-mute">
                <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-on-primary">
                  Live
                </span>
                <Calendar className="size-3.5" />
                {dateStr}
                <span className="mx-1 text-hairline">·</span>
                <Clock className="size-3.5" />
                {timeStr}
              </div>
              <h3 className="font-display mt-4 text-[32px] font-bold leading-[1.05] tracking-[-0.02em] text-ink md:text-[40px]">
                {workshop.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-body md:text-[16px]">
                {workshop.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-5 text-[13px]">
              <span className="text-mute">
                Hosted by{" "}
                <span className="font-semibold text-ink">{workshop.host}</span> ·{" "}
                {workshop.hostRole}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                Register <ArrowRight className="size-3.5" />
              </span>
            </div>
          </div>
        </Link>
      </Container>
    </section>
  );
}
