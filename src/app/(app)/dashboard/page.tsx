import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Avatar } from "@/components/ui/Avatar";
import { Stat } from "@/components/ui/Stat";
import { ArrowUpRight, Sparkles, Calendar, Clock, Users, Comment, Upvote } from "@/components/ui/Icons";
import { TOPICS, MENTORS, CLASSES, POSTS } from "@/lib/mock";

export default function DashboardPage() {
  const inProgress = TOPICS[0]; // pretend the user is mid-way through Figma
  const nextStep = inProgress.journeys.Beginner.steps[2];
  const upNext = CLASSES.slice(0, 2);

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-10 px-6 py-10 md:px-10">
      {/* Greeting */}
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-text-muted">Welcome back, Vivin</p>
          <h1 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
            Pick up where you left off.
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-8 md:flex md:gap-12">
          <Stat value="62%" label="Figma journey" />
          <Stat value="14" label="Day streak" />
          <Stat value="3" label="Posts pending" />
        </div>
      </header>

      {/* Continue learning */}
      <section>
        <SectionHeader
          title="Continue learning"
          href="/learn"
          hrefLabel="Browse all journeys"
        />
        <div className="mt-5 grid gap-5 lg:grid-cols-[2fr_1fr]">
          <Card className="relative overflow-hidden p-7" hover={false}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Tag tone="default">{inProgress.category}</Tag>
                <Tag tone="default">Beginner journey</Tag>
              </div>
              <h3 className="font-display text-xl font-medium">{inProgress.title}</h3>
              <p className="text-sm text-text-weak max-w-md">{inProgress.summary}</p>

              <div className="mt-2 rounded-lg border border-stroke-weak bg-bg-sunken p-4">
                <p className="text-xs uppercase tracking-wider text-text-muted">Next step</p>
                <p className="mt-1 font-medium">{nextStep.title}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" /> {nextStep.estimatedTime}
                  </span>
                  <span>•</span>
                  <span className="capitalize">{nextStep.type}</span>
                </div>
              </div>

              <Link
                href={`/learn/${inProgress.slug}`}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-fill-strong px-5 py-2 text-sm font-medium text-text-inverse-strong"
              >
                Resume journey <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Card>

          <Card className="space-y-4 p-6" hover={false}>
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-text-muted" />
              <h3 className="font-display text-base font-medium">Recommended for you</h3>
            </div>
            <p className="text-xs text-text-muted">
              Based on your Figma progress and goals.
            </p>
            <ul className="space-y-3">
              {TOPICS.slice(1).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/learn/${t.slug}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-stroke-weak bg-bg-card p-3 transition-colors hover:bg-bg-card-hover"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-md border border-stroke-weak bg-bg-sunken text-sm">
                        {t.emoji}
                      </span>
                      <span className="text-sm font-medium">{t.title}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Upcoming + Mentors */}
      <section className="grid gap-5 lg:grid-cols-2">
        <div>
          <SectionHeader
            title="Upcoming sessions"
            href="/teach"
            hrefLabel="View all"
          />
          <div className="mt-5 space-y-3">
            {upNext.map((c) => {
              const mentor = MENTORS.find((m) => m.id === c.mentorId)!;
              const date = new Date(c.startsAt);
              return (
                <Card key={c.id} as="a" href={`/teach/classes/${c.id}`} className="flex items-center justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Calendar className="size-3.5" />
                      {date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                      <span>•</span>
                      <Clock className="size-3.5" />
                      {date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <h4 className="mt-1 truncate font-medium">{c.title}</h4>
                    <p className="mt-1 text-xs text-text-muted">
                      with {mentor.name} • {c.registered}/{c.capacity} registered
                    </p>
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 text-text-muted" />
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <SectionHeader
            title="Mentors matched to you"
            href="/teach"
            hrefLabel="Browse all"
          />
          <div className="mt-5 space-y-3">
            {MENTORS.slice(0, 3).map((m) => (
              <Card key={m.id} as="a" href={`/teach`} className="flex items-center gap-4 p-5">
                <Avatar name={m.name} src={m.photo} size={44} />
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium">{m.name}</h4>
                  <p className="truncate text-xs text-text-muted">
                    {m.role} · {m.company}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs">
                  <Users className="size-3.5 text-text-muted" />
                  {m.sessions}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community pulse */}
      <section>
        <SectionHeader
          title="Community pulse"
          href="/community"
          hrefLabel="See feed"
        />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {POSTS.slice(0, 4).map((p) => (
            <Card key={p.id} as="a" href={`/community/post/${p.id}`} className="space-y-3 p-5">
              <div className="flex items-center gap-2">
                <Tag tone={p.type === "critique" ? "accent" : "default"}>
                  {p.type.replace("-", " ")}
                </Tag>
                <span className="text-xs text-text-muted">{p.postedAgo}</span>
              </div>
              <h4 className="font-medium leading-snug">{p.title}</h4>
              <div className="flex items-center gap-4 text-xs text-text-muted">
                <span className="flex items-center gap-1.5"><Upvote className="size-3.5" /> {p.upvotes}</span>
                <span className="flex items-center gap-1.5"><Comment className="size-3.5" /> {p.comments}</span>
                <span className="ml-auto">by {p.authorName}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, href, hrefLabel }: { title: string; href?: string; hrefLabel?: string }) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="font-display text-lg font-medium tracking-tight md:text-xl">{title}</h2>
      {href && (
        <Link href={href} className="text-sm text-text-weak hover:text-text-strong inline-flex items-center gap-1.5">
          {hrefLabel} <ArrowUpRight className="size-3.5" />
        </Link>
      )}
    </div>
  );
}
