"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Input } from "@/components/ui/Input";
import { ArrowRight, ArrowLeft, Sparkles, Check } from "@/components/ui/Icons";

const ROLES = [
  { id: "student", label: "Design student", helper: "Learning the craft." },
  { id: "career-switch", label: "Career switcher", helper: "Coming from graphic, web, or another field." },
  { id: "junior", label: "Junior designer", helper: "0–2 years in product design." },
  { id: "mid", label: "Mid-level / senior", helper: "3+ years, leveling up." },
  { id: "lead", label: "Lead / mentor", helper: "Want to teach and contribute." },
];

const GOALS = [
  "Find my first job",
  "Build a portfolio",
  "Get better at Figma",
  "Learn design systems",
  "Switch from graphic design",
  "Prep for big-tech interviews",
  "Find a mentor",
  "Teach what I know",
];

const TOOLS = ["Figma", "Framer", "Webflow", "Notion", "Midjourney", "ChatGPT", "Maze", "Zeplin"];

const STEPS = ["Role", "Goals", "Tools", "Done"] as const;

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<string | null>(null);
  const [goals, setGoals] = useState<Set<string>>(new Set());
  const [tools, setTools] = useState<Set<string>>(new Set());
  const [name, setName] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="grid min-h-dvh place-items-center bg-bg-sunken px-6 py-12">
      <div className="w-full max-w-[640px] space-y-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-accent-orange to-accent-yellow text-bg-sunken">
            <Sparkles className="size-4" />
          </span>
          <span className="font-display font-semibold">RPS Community</span>
        </Link>

        <ol className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  i <= step ? "bg-accent-orange" : "bg-white/[0.06]",
                )}
              />
            </li>
          ))}
        </ol>

        <Card className="space-y-6 p-6 md:p-8" hover={false}>
          {step === 0 && (
            <>
              <header>
                <h1 className="font-display text-2xl font-semibold">Welcome 👋</h1>
                <p className="mt-2 text-sm text-text-weak">First, tell us where you are in your design journey.</p>
              </header>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-text-muted">Your name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="What should we call you?" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-text-muted">I am a…</label>
                <div className="grid gap-3 md:grid-cols-2">
                  {ROLES.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={cn(
                        "rounded-xl border p-4 text-left transition-colors",
                        role === r.id ? "border-accent-orange bg-accent-orange/10" : "border-stroke-weak hover:border-stroke-strong",
                      )}
                    >
                      <p className="font-medium">{r.label}</p>
                      <p className="mt-1 text-xs text-text-muted">{r.helper}</p>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <header>
                <h1 className="font-display text-2xl font-semibold">What are you here for?</h1>
                <p className="mt-2 text-sm text-text-weak">Pick all that apply — we&rsquo;ll personalize your home.</p>
              </header>
              <div className="flex flex-wrap gap-2">
                {GOALS.map((g) => {
                  const on = goals.has(g);
                  return (
                    <button
                      key={g}
                      onClick={() =>
                        setGoals((prev) => {
                          const next = new Set(prev);
                          next.has(g) ? next.delete(g) : next.add(g);
                          return next;
                        })
                      }
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm transition-colors",
                        on ? "border-accent-orange bg-accent-orange/15 text-accent-orange" : "border-stroke-weak text-text-weak hover:border-stroke-strong",
                      )}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <header>
                <h1 className="font-display text-2xl font-semibold">Which tools do you use?</h1>
                <p className="mt-2 text-sm text-text-weak">We&rsquo;ll surface guides and posts for these first.</p>
              </header>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {TOOLS.map((t) => {
                  const on = tools.has(t);
                  return (
                    <button
                      key={t}
                      onClick={() =>
                        setTools((prev) => {
                          const next = new Set(prev);
                          next.has(t) ? next.delete(t) : next.add(t);
                          return next;
                        })
                      }
                      className={cn(
                        "rounded-xl border p-3 text-sm transition-colors",
                        on ? "border-accent-orange bg-accent-orange/10" : "border-stroke-weak hover:border-stroke-strong",
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <header className="space-y-3 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-300">
                  <Check className="size-6" />
                </span>
                <h1 className="font-display text-2xl font-semibold">You&rsquo;re in.</h1>
                <p className="text-sm text-text-weak">
                  We&rsquo;ll set up your home around: {role ?? "—"} · {goals.size} goals · {tools.size} tools.
                </p>
              </header>
              <Link
                href="/dashboard"
                className="block rounded-full bg-fill-strong py-2.5 text-center text-sm font-medium text-text-inverse-strong"
              >
                Go to my home
              </Link>
            </>
          )}

          {step < 3 && (
            <div className="flex items-center justify-between border-t border-stroke-faint pt-4">
              {step > 0 ? (
                <button onClick={back} className="inline-flex items-center gap-2 rounded-full border border-stroke-weak px-4 py-2 text-sm">
                  <ArrowLeft className="size-4" /> Back
                </button>
              ) : <span />}
              <button
                onClick={next}
                disabled={(step === 0 && !role) || (step === 1 && goals.size === 0)}
                className="inline-flex items-center gap-2 rounded-full bg-fill-strong px-5 py-2 text-sm font-medium text-text-inverse-strong disabled:opacity-40"
              >
                Continue <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
