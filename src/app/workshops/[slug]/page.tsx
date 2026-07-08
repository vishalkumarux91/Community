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
                <span className="rounded-full bg-gradient-to-r from-primary to-[#ff6a3d] px-2 py-0.5 text-[11px] font-bold tracking-wider text-on-primary">
                  {workshop.status === "UPCOMING" ? "Live" : "Recorded"}
                </span>
                {workshop.status === "UPCOMING" ? "Upcoming workshop" : "Past workshop"}
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
                    {workshop.trainers && workshop.trainers.length > 1
                      ? "Trainers"
                      : "Host"}
                  </dt>
                  {workshop.trainers && workshop.trainers.length > 0 ? (
                    workshop.trainers.map((t) => (
                      <dd key={t.name} className="mt-2 flex items-center gap-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="size-8 shrink-0 rounded-full border border-hairline object-cover"
                          loading="lazy"
                        />
                        <span className="flex min-w-0 flex-col leading-tight">
                          <span className="text-[13px] font-medium text-ink">
                            {t.name}
                          </span>
                          <span className="text-[12px] text-muted">{t.role}</span>
                        </span>
                      </dd>
                    ))
                  ) : (
                    <>
                      <dd className="mt-1 text-ink">{workshop.host}</dd>
                      <dd className="text-[13px] text-muted">
                        {workshop.hostRole}
                      </dd>
                    </>
                  )}
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
                  href="/auth/sign-up?next=/onboarding"
                  className="btn-press flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-[#ff6a3d] px-5 py-3 text-[14px] font-semibold text-on-primary shadow-[0_10px_24px_-10px_rgba(234,40,4,0.6)]"
                >
                  Attend this workshop <ArrowRight className="size-3.5" />
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

      {/* Who this is for */}
      {workshop.audience && workshop.audience.length > 0 && (
        <section className="bg-aurora border-b border-hairline py-20 md:py-24">
          <Container>
            <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">
                  Who this is for
                </p>
                <h2 className="font-display mt-3 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[40px]">
                  Built for designers who want to <span className="gradient-text">ship</span>.
                </h2>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {workshop.audience.map((a) => (
                  <li
                    key={a}
                    className="card-lift flex items-start gap-3 rounded-[14px] border border-hairline bg-surface-card p-4 text-[14px] leading-relaxed text-body"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gradient-to-r from-primary to-[#ff6a3d] text-on-primary">
                      <Check className="size-3" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {/* Agenda */}
      {workshop.agenda && workshop.agenda.length > 0 && (
        <section className="border-b border-hairline bg-canvas py-20 md:py-24">
          <Container>
            <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">
                  Agenda
                </p>
                <h2 className="font-display mt-3 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[40px]">
                  {workshop.durationMin} minutes, start to shipped.
                </h2>
              </div>
              <ol className="flex flex-col">
                {workshop.agenda.map((item, i) => (
                  <li
                    key={item.title}
                    className="group flex gap-5 border-t border-hairline py-5 first:border-t-0"
                  >
                    <div className="flex shrink-0 flex-col items-center">
                      <span className="font-display grid size-9 place-items-center rounded-full bg-surface-bone text-[14px] font-bold text-ink transition-colors group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-[#ff6a3d] group-hover:text-on-primary">
                        {i + 1}
                      </span>
                    </div>
                    <div className="min-w-0">
                      {item.duration && (
                        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mute">
                          {item.duration}
                        </span>
                      )}
                      <h3 className="mt-0.5 text-[16px] font-semibold text-ink md:text-[17px]">
                        {item.title}
                      </h3>
                      {item.detail && (
                        <p className="mt-1 text-[14px] leading-relaxed text-body">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>
      )}

      {/* Your trainers */}
      {workshop.trainers && workshop.trainers.length > 0 && (
        <section className="bg-aurora border-b border-hairline py-20 md:py-24">
          <Container>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">
              Your trainers
            </p>
            <h2 className="font-display mt-3 max-w-[720px] text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[40px]">
              Learn from the people who <span className="gradient-text">do this daily</span>.
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {workshop.trainers.map((t) => (
                <div
                  key={t.name}
                  className="card-lift flex items-start gap-4 rounded-[16px] border border-hairline bg-surface-card p-6"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="size-16 shrink-0 rounded-full border border-hairline object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display text-[20px] font-bold leading-[1.2] tracking-[-0.01em] text-ink">
                      {t.name}
                    </h3>
                    <p className="mt-0.5 text-[13px] font-semibold text-primary">
                      {t.role}
                    </p>
                    {t.bio && (
                      <p className="mt-2 text-[13.5px] leading-relaxed text-body">
                        {t.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Assignment block — visible to everyone, gated for action */}
      {workshop.assignment && (
        <AssignmentBlock
          assignment={workshop.assignment}
          workshopSlug={workshop.slug}
          isPast={workshop.status === "PAST"}
        />
      )}

      <SiteFooter />
    </main>
  );
}
