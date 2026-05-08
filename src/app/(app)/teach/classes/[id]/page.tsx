import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Avatar } from "@/components/ui/Avatar";
import { Calendar, Clock, Users, Star, Check } from "@/components/ui/Icons";
import { findClass, findMentor } from "@/lib/mock";

const AGENDA = [
  "Walk-through: 5 portfolios, live, with the panel.",
  "Common patterns we see — what works, what's noise.",
  "Live critique exercise: roast a sample portfolio together.",
  "Q&A: bring your career questions.",
];

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = findClass(id);
  if (!c) notFound();
  const m = findMentor(c.mentorId);
  if (!m) notFound();

  const date = new Date(c.startsAt);

  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-10 px-6 py-10 md:px-10">
      <Link href="/teach" className="text-sm text-text-muted hover:text-text-strong">← All sessions</Link>

      <header className="overflow-hidden rounded-2xl border border-stroke-weak bg-bg-card">
        <div className="aspect-[21/9] w-full overflow-hidden border-b border-stroke-faint">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.thumbnail} alt="" className="size-full object-cover" />
        </div>
        <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:p-10">
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="default">{c.level}</Tag>
            <Tag tone="default">{c.format === "online" ? "Online" : "Offline"}</Tag>
            {c.price === 0 ? <Tag tone="accent">Free</Tag> : <Tag tone="default">₹{c.price.toLocaleString("en-IN")}</Tag>}
          </div>
          <h1 className="font-display text-2xl font-medium tracking-tight md:text-3xl">{c.title}</h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-text-weak">{c.description}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })} · {c.durationMin}m
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" /> {c.registered}/{c.capacity} registered
            </span>
          </div>
        </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card className="space-y-4 p-6" hover={false}>
            <h2 className="font-display text-xl font-semibold">What you&rsquo;ll get</h2>
            <ul className="space-y-2">
              {AGENDA.map((line, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-weak">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-orange" />
                  {line}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="space-y-4 p-6" hover={false}>
            <h2 className="font-display text-xl font-semibold">Who is this for</h2>
            <p className="text-sm text-text-weak">
              Designers actively job-hunting in the next 90 days, especially folks transitioning from adjacent fields (graphic, web, motion).
              You&rsquo;ll get the most value if you bring a portfolio link or work-in-progress to share.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {c.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>

          <Card className="flex items-start gap-4 p-6" hover={false}>
            <Avatar name={m.name} src={m.photo} size={56} />
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="font-medium">{m.name}</h3>
              <p className="text-xs text-text-muted">{m.role} · {m.company}</p>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <Star className="size-3.5 text-accent-yellow" /> {m.rating.toFixed(1)}
                </span>
                <span className="flex items-center gap-1 text-text-muted">
                  <Users className="size-3.5" /> {m.sessions} sessions
                </span>
              </div>
              <p className="mt-2 text-sm text-text-weak">{m.bio}</p>
            </div>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="space-y-4 p-6 sticky top-20" hover={false}>
            <div>
              <p className="font-display text-2xl font-semibold">
                {c.price === 0 ? "Free" : `₹${c.price.toLocaleString("en-IN")}`}
              </p>
              <p className="text-xs text-text-muted">{c.registered}/{c.capacity} seats taken</p>
            </div>
            <button className="w-full rounded-full bg-fill-strong py-2.5 text-sm font-medium text-text-inverse-strong">
              Reserve seat
            </button>
            <button className="w-full rounded-full border border-stroke-weak py-2.5 text-sm">
              Add to calendar
            </button>
            <ul className="space-y-2 border-t border-stroke-faint pt-4 text-xs text-text-muted">
              <li>• Live, no recording sent</li>
              <li>• You can cancel up to 24h before</li>
              <li>• Refund policy: full refund before start</li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}
