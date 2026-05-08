"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Avatar } from "@/components/ui/Avatar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star, Calendar, Clock, Users, ArrowUpRight, Heart, UserPlus, UserCheck } from "@/components/ui/Icons";
import { MENTORS, CLASSES } from "@/lib/mock";
import { useFavorites } from "@/lib/useFavorites";

const FILTERS = ["All", "Portfolio review", "Career switch", "Big tech prep", "Design systems", "0→1", "UX research"];

export default function TeachIndexPage() {
  const favorites = useFavorites("rps:fav-mentors");
  const following = useFavorites("rps:follow-mentors");

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-12 px-6 py-10 md:px-10">
      <SectionHeading
        eyebrow="Mentors"
        title="Designers who've shipped what you're trying to build."
        description="Book a 1:1, join a live workshop, or get your portfolio reviewed in front of an audience. All mentors are vetted and rated by the community."
      >
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="#mentors" className="inline-flex items-center gap-2 rounded-full bg-fill-strong px-5 py-2 text-sm font-medium text-text-inverse-strong">
            Browse mentors
          </Link>
          <Link href="/teach/become-mentor" className="inline-flex items-center gap-2 rounded-full border border-stroke-weak px-5 py-2 text-sm">
            Become a mentor
          </Link>
        </div>
      </SectionHeading>

      <section>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl font-medium tracking-tight md:text-2xl">Upcoming sessions</h2>
          <Link href="#" className="text-sm text-text-weak hover:text-text-strong inline-flex items-center gap-1">
            See all <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CLASSES.map((c) => {
            const m = MENTORS.find((x) => x.id === c.mentorId)!;
            const date = new Date(c.startsAt);
            return (
              <Card key={c.id} as="a" href={`/teach/classes/${c.id}`} className="group flex flex-col overflow-hidden p-0">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-stroke-faint">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.thumbnail}
                    alt=""
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-bg-sunken/80 px-2 py-0.5 text-[11px] font-medium text-text-strong backdrop-blur">
                    {c.price === 0 ? "Free" : `₹${c.price.toLocaleString("en-IN")}`}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Calendar className="size-3.5" />
                    {date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                    <span>·</span>
                    <Clock className="size-3.5" />
                    {date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                    <span>·</span>
                    <span>{c.durationMin}m</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag tone="default">{c.level}</Tag>
                  </div>
                  <h3 className="font-medium leading-snug">{c.title}</h3>
                  <div className="mt-auto flex items-center gap-3 border-t border-stroke-faint pt-4">
                    <Avatar name={m.name} src={m.photo} size={28} />
                    <span className="flex-1 text-xs">
                      <span className="font-medium">{m.name}</span>
                      <span className="text-text-muted"> · {m.company}</span>
                    </span>
                    <span className="text-xs text-text-muted">
                      {c.registered}/{c.capacity}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="mentors">
        <h2 className="font-display text-xl font-medium tracking-tight md:text-2xl">Find a mentor</h2>
        <p className="mt-1 text-sm text-text-weak">Filter by skill, role, or career goal.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((t, i) => (
            <Tag key={t} tone={i === 0 ? "accent" : "default"}>{t}</Tag>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MENTORS.map((m) => {
            const isFavorited = favorites.has(m.id);
            const isFollowing = following.has(m.id);
            return (
              <Card key={m.id} className="space-y-4 p-5">
                <div className="flex items-start gap-4">
                  <Avatar name={m.name} src={m.photo} size={48} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium">{m.name}</h3>
                    <p className="truncate text-xs text-text-muted">
                      {m.role} · {m.company}
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <Star className="size-3.5 text-accent-yellow" /> {m.rating.toFixed(1)}
                      </span>
                      <span className="flex items-center gap-1 text-text-muted">
                        <Users className="size-3.5" /> {m.sessions}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => favorites.toggle(m.id)}
                    aria-label={isFavorited ? "Unfavorite" : "Favorite"}
                    className={
                      "grid size-8 place-items-center rounded-full border transition-colors " +
                      (isFavorited
                        ? "border-accent-orange/40 bg-accent-orange/10 text-accent-orange"
                        : "border-stroke-weak text-text-muted hover:text-text-strong")
                    }
                  >
                    <Heart className="size-4" filled={isFavorited} />
                  </button>
                </div>
                <p className="line-clamp-3 text-sm text-text-weak">{m.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.expertise.slice(0, 3).map((e) => (
                    <Tag key={e}>{e}</Tag>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-stroke-faint pt-4">
                  <span className="text-sm">
                    ₹{m.hourlyRate.toLocaleString("en-IN")}<span className="text-xs text-text-muted">/hr</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => following.toggle(m.id)}
                      className={
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors " +
                        (isFollowing
                          ? "border-stroke-strong bg-bg-card-hover text-text-strong"
                          : "border-stroke-weak text-text-weak hover:text-text-strong")
                      }
                    >
                      {isFollowing ? <UserCheck className="size-3.5" /> : <UserPlus className="size-3.5" />}
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                    <button
                      disabled={!m.available}
                      className="rounded-full bg-fill-strong px-4 py-1.5 text-xs font-medium text-text-inverse-strong disabled:opacity-50"
                    >
                      {m.available ? "Book" : "Waitlist"}
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <Card className="flex flex-col items-start gap-4 border-dashed bg-transparent p-7 md:flex-row md:items-center md:justify-between" hover={false}>
        <div className="space-y-2">
          <h3 className="font-display text-lg font-medium">Want to teach?</h3>
          <p className="text-sm text-text-weak max-w-md">
            Active members with high-quality contributions are invited to mentor. Earn reputation by answering, reviewing, and posting — then apply when you&rsquo;re ready.
          </p>
        </div>
        <Link
          href="/teach/become-mentor"
          className="inline-flex items-center gap-2 rounded-full bg-fill-strong px-5 py-2 text-sm font-medium text-text-inverse-strong"
        >
          Become a mentor <ArrowUpRight className="size-4" />
        </Link>
      </Card>
    </div>
  );
}
