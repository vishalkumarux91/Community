import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Stat } from "@/components/ui/Stat";
import { Check, Sparkles } from "@/components/ui/Icons";
import { Input, Textarea } from "@/components/ui/Input";

const REQS = [
  { label: "100 community reputation", done: true, hint: "You have 312" },
  { label: "5+ thoughtful comments on critique posts", done: true, hint: "You have 14" },
  { label: "1+ guide or detailed answer", done: false, hint: "Publish one to qualify" },
  { label: "Verified profile (LinkedIn)", done: true, hint: "Connected" },
];

export default function BecomeMentorPage() {
  return (
    <div className="mx-auto w-full max-w-[920px] space-y-10 px-6 py-10 md:px-10">
      <Link href="/teach" className="text-sm text-text-muted hover:text-text-strong">← Teach</Link>

      <header className="space-y-3">
        <Tag tone="accent">Application</Tag>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Become a mentor
        </h1>
        <p className="max-w-2xl text-sm text-text-weak md:text-base">
          Share what you know, build reputation, and (when you&rsquo;re ready) earn from 1:1 sessions and live workshops.
        </p>
      </header>

      <Card className="grid gap-6 p-6 md:grid-cols-3" hover={false}>
        <Stat value="312" label="Reputation" />
        <Stat value="14" label="Helpful replies" />
        <Stat value="2" label="Guides" />
      </Card>

      <Card className="space-y-4 p-6" hover={false}>
        <h2 className="font-display text-xl font-semibold">Eligibility</h2>
        <ul className="space-y-3">
          {REQS.map((r) => (
            <li key={r.label} className="flex items-start gap-3">
              <span
                className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                  r.done ? "bg-emerald-500/20 text-emerald-300" : "bg-white/[0.06] text-text-muted"
                }`}
              >
                <Check className="size-3" />
              </span>
              <div className="text-sm">
                <p className={r.done ? "text-text-strong" : "text-text-weak"}>{r.label}</p>
                <p className="text-xs text-text-muted">{r.hint}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="space-y-5 p-6" hover={false}>
        <h2 className="font-display text-xl font-semibold">Tell us about yourself</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-text-muted">Current role</label>
            <Input placeholder="Senior Product Designer" />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-text-muted">Company</label>
            <Input placeholder="e.g. Razorpay" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-text-muted">Areas of expertise (pick up to 5)</label>
          <div className="flex flex-wrap gap-2 pt-1">
            {["Portfolio review", "Career switch", "Mock interviews", "Design systems", "0→1 design", "UX research", "Big tech prep", "Indian market", "Fintech", "Consumer apps"].map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-text-muted">Why do you want to mentor?</label>
          <Textarea placeholder="2–4 sentences. We share this with applicants when you're matched." />
        </div>

        <Card className="flex items-start gap-3 border-dashed bg-white/[0.02] p-4" hover={false}>
          <Sparkles className="mt-0.5 size-4 shrink-0 text-accent-orange" />
          <p className="text-xs text-text-weak">
            We review applications weekly. Approved mentors start with 2 free sessions to build their first reviews — then unlock paid bookings.
          </p>
        </Card>

        <div className="flex items-center justify-end gap-2">
          <Link href="/teach" className="rounded-full border border-stroke-weak px-4 py-2 text-sm">
            Cancel
          </Link>
          <button className="rounded-full bg-fill-strong px-5 py-2 text-sm font-medium text-text-inverse-strong">
            Submit application
          </button>
        </div>
      </Card>
    </div>
  );
}
