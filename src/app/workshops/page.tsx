import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Reveals } from "@/components/site/Reveals";
import { upcomingWorkshops, type Workshop } from "@/data/workshops";
import { Calendar, ArrowRight } from "@/components/ui/Icons";

export const metadata = {
  title: "Workshops · Opencanvas",
  description:
    "Live workshops where designers become industry-ready and learn to ship with AI.",
};

export default function WorkshopsPage() {
  const upcoming = upcomingWorkshops();

  return (
    <main className="min-h-dvh bg-canvas text-ink">
      <SiteHeader />

      <section className="bg-aurora border-b border-hairline">
        <Container className="py-24 md:py-28">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">
            Workshops
          </p>
          <h1 className="font-display mt-3 text-[44px] font-bold leading-[1.0] tracking-[-0.025em] text-ink md:text-[72px]">
            Live builds. Real briefs.{" "}
            <span className="gradient-text">Industry-ready</span> by Friday.
          </h1>
          <p className="mt-5 max-w-[640px] text-[16px] leading-[1.55] text-body md:text-[18px]">
            Every workshop is a live build — you walk away with something
            shippable. Attendees can submit assignments for a written
            assessment from the RPS Studio team.
          </p>
        </Container>
      </section>

      <section className="bg-canvas py-20 md:py-24">
        <Container>
          {upcoming.length === 0 ? (
            <p className="text-[14px] text-body">
              Nothing on the calendar this week. Check back soon.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((w) => (
                <WorkshopCard key={w.id} workshop={w} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <SiteFooter />
      <Reveals />
    </main>
  );
}

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const date = new Date(workshop.datetime);
  const dateStr = date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeStr = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <Link
      href={`/workshops/${workshop.slug}`}
      className="circle-card circle-card--hover group flex flex-col overflow-hidden"
    >
      <div className="aspect-[16/9] overflow-hidden bg-surface-bone">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workshop.heroImage}
          alt=""
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6 p-6">
        <div>
          <div className="flex items-center gap-2 text-[12px] text-mute">
            <Calendar className="size-3.5" />
            <span>
              {dateStr} · {timeStr}
            </span>
            <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-on-primary">
              Live
            </span>
          </div>
          <h3 className="font-display mt-3 text-[24px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
            {workshop.title}
          </h3>
          <p className="mt-2 text-[15px] leading-[1.55] text-body">
            {workshop.description}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-hairline pt-4 text-[13px]">
          <span className="text-mute">
            {workshop.host} · {workshop.hostRole}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-primary transition-transform group-hover:translate-x-0.5">
            Register <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
