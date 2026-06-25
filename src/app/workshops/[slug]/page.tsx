import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Check,
} from "@/components/ui/Icons";
import { WORKSHOPS, findWorkshop } from "@/data/workshops";
import { AssignmentBlock } from "./assignment-block";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return WORKSHOPS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const w = findWorkshop(slug);
  if (!w) return { title: "Workshop · Opencanvas" };
  return {
    title: `${w.title} · Opencanvas`,
    description: w.description,
  };
}

export default async function WorkshopDetailPage({ params }: Params) {
  const { slug } = await params;
  const workshop = findWorkshop(slug);
  if (!workshop) notFound();

  const date = new Date(workshop.datetime);
  const dateStr = date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <main className="min-h-dvh bg-canvas text-ink">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-hairline bg-canvas">
        <Container className="py-12 md:py-16">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" /> All workshops
          </Link>

          {/* Cover image — landscape, full-width inside the container. */}
          <div className="mt-6 overflow-hidden rounded-[16px] border border-hairline bg-surface-bone">
            <div className="aspect-[16/7]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={workshop.heroImage}
                alt=""
                className="size-full object-cover"
              />
            </div>
          </div>

          <div className="mt-10 grid items-start gap-12 md:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-mute">
                <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold tracking-wider text-on-primary">
                  Live
                </span>
                Upcoming workshop
              </div>
              <h1 className="font-display mt-4 text-[44px] font-bold leading-[1.0] tracking-[-0.025em] text-ink md:text-[64px]">
                {workshop.title}
              </h1>
              <p className="mt-5 text-[16px] leading-[1.55] text-body md:text-[18px]">
                {workshop.longDescription ?? workshop.description}
              </p>
            </div>

            {/* Meta + register card */}
            <aside className="rounded-[16px] border border-hairline bg-surface-bone p-6">
              <dl className="grid gap-4 text-[14px]">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                    When
                  </dt>
                  <dd className="mt-1 flex items-center gap-2 text-ink">
                    <Calendar className="size-4 text-muted" />
                    {dateStr}
                  </dd>
                  <dd className="mt-1 flex items-center gap-2 text-ink">
                    <Clock className="size-4 text-muted" />
                    {timeStr} · {workshop.durationMin} min
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                    Host
                  </dt>
                  <dd className="mt-1 text-ink">{workshop.host}</dd>
                  <dd className="text-[13px] text-muted">{workshop.hostRole}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                    You&rsquo;ll walk away with
                  </dt>
                  <dd className="mt-1 text-[13px] leading-relaxed text-body">
                    {workshop.deliverable}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-hairline pt-5">
                {/* Funnel CTA: logged-out visitors are pitched on joining
                     the community; member registration is wired once
                     auth lands. */}
                <Link
                  href="/auth/sign-up"
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-3 text-[14px] font-semibold text-on-primary transition-colors hover:bg-[color:var(--primary-deep)]"
                >
                  Join the community to attend <ArrowRight className="size-3.5" />
                </Link>
                <p className="mt-3 text-center text-[12px] text-mute">
                  Already a member?{" "}
                  <Link
                    href="/auth/sign-in"
                    className="text-link hover:underline"
                  >
                    Log in to register
                  </Link>
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* What you'll do */}
      <section className="border-b border-hairline bg-canvas py-20 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">
                What you&rsquo;ll do
              </p>
              <h2 className="font-display mt-3 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[40px]">
                Live build, real brief.
              </h2>
            </div>
            <ul className="flex flex-col">
              {[
                "Walk through the brief together — what good looks like, what failure looks like.",
                "Live build, alongside the host. Your screen, your file.",
                "Submit your work as an assignment for an RPS Studio assessment.",
                "Get a written assessment + score back in your account.",
              ].map((step) => (
                <li
                  key={step}
                  className="flex items-start gap-3 border-t border-hairline py-4 text-[15px] text-ink first:border-t-0"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-on-primary">
                    <Check className="size-3" />
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Assignment block — visible to everyone, gated for action */}
      {workshop.assignment && (
        <AssignmentBlock
          assignment={workshop.assignment}
          workshopSlug={workshop.slug}
          isPast={false}
        />
      )}

      <SiteFooter />
    </main>
  );
}
