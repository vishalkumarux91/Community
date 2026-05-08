"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Sparkles } from "@/components/ui/Icons";
import { TOPICS } from "@/lib/mock";

const SUGGESTIONS = [
  "Master Figma in 4 weeks",
  "Switch from graphic design to product",
  "Prep for big-tech design interviews",
  "Build a design system from scratch",
];

const COMPANIES = ["Razorpay", "Swiggy", "Microsoft", "Atlassian", "Figma", "Stripe"];

export function Hero() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [isPending, startTransition] = useTransition();

  const submit = () => {
    if (!prompt.trim()) return;
    // naive topic match — in production, AI would interpret + route
    const lower = prompt.toLowerCase();
    const match = TOPICS.find((t) => lower.includes(t.title.toLowerCase()));
    startTransition(() => {
      router.push(match ? `/learn/${match.slug}` : "/learn");
    });
  };

  return (
    <section className="relative overflow-hidden border-b border-stroke-faint">
      {/* very subtle peach blur, off-screen left */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-accent-orange/[0.07] blur-3xl" />

      <Container className="relative pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-stroke-weak bg-bg-card px-3 py-1 text-xs text-text-weak">
            Trusted by 1,200+ designers from product teams worldwide
          </span>

          <h1 className="mt-7 font-display text-[44px] font-medium leading-[1.05] tracking-[-0.025em] text-text-strong md:text-[68px]">
            Grow as a designer,
            <br className="hidden md:block" /> together.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-text-weak md:text-base">
            Curated tools, AI-built learning paths, mentor sessions, and honest
            critique — in one quiet community.
          </p>

          <div className="mt-9 flex items-center justify-center gap-2.5">
            <Link
              href="/community"
              className="rounded-full border border-stroke-weak bg-bg-card px-5 py-2.5 text-sm font-medium text-text-strong transition-colors hover:bg-bg-card-hover"
            >
              Browse community
            </Link>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-1.5 rounded-full bg-fill-strong px-5 py-2.5 text-sm font-medium text-text-inverse-strong transition-opacity hover:opacity-90"
            >
              Get started — it&rsquo;s free <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* prompt input */}
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-stroke-weak bg-bg-card p-2 shadow-[0_1px_0_0_var(--stroke-faint)]">
            <div className="flex items-start gap-3 px-3 pt-3">
              <Sparkles className="mt-1 size-4 shrink-0 text-accent-orange" />
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
                placeholder="What do you want to learn or get better at?"
                rows={2}
                className="min-h-[52px] flex-1 resize-none bg-transparent text-[15px] leading-relaxed text-text-strong placeholder:text-text-muted focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between border-t border-stroke-faint p-2">
              <span className="px-2 text-xs text-text-muted">↵ to start</span>
              <button
                onClick={submit}
                disabled={!prompt.trim() || isPending}
                className="grid size-8 place-items-center rounded-md bg-fill-strong text-text-inverse-strong transition-opacity hover:opacity-90 disabled:opacity-30"
                aria-label="Generate journey"
              >
                <ArrowRight className="size-4 -rotate-90" />
              </button>
            </div>
          </div>

          <ul className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-1.5">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button
                  onClick={() => setPrompt(s)}
                  className="rounded-full border border-stroke-weak bg-bg-card px-3 py-1 text-xs text-text-weak transition-colors hover:text-text-strong"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
            Members from
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-text-muted">
            {COMPANIES.map((c) => (
              <li key={c} className="font-medium">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* live preview card */}
      <Container className="relative pb-24">
        <div className="mx-auto max-w-5xl">
          <DemoPreview />
        </div>
      </Container>
    </section>
  );
}

function DemoPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-stroke-weak bg-bg-card shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]">
      {/* fake browser chrome */}
      <div className="flex items-center justify-between border-b border-stroke-faint px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-stroke-weak" />
          <span className="size-2.5 rounded-full bg-stroke-weak" />
          <span className="size-2.5 rounded-full bg-stroke-weak" />
        </div>
        <span className="rounded-md bg-bg-card-hover px-3 py-0.5 text-[11px] text-text-muted">
          rps.community/learn/figma
        </span>
        <span className="w-12" />
      </div>

      {/* Mock journey UI */}
      <div className="grid gap-0 md:grid-cols-[280px_1fr]">
        <div className="space-y-3 border-b border-stroke-faint p-5 md:border-b-0 md:border-r">
          <p className="text-[11px] uppercase tracking-wider text-text-muted">
            Beginner pipeline
          </p>
          <div className="space-y-2.5">
            {[
              { n: 1, type: "Video", title: "Figma in 2 hours", time: "2h", active: true },
              { n: 2, type: "Article", title: "Auto Layout fundamentals", time: "20m" },
              { n: 3, type: "Exercise", title: "Build: a sign-in screen", time: "45m" },
              { n: 4, type: "Project", title: "Mini-project: 4-screen flow", time: "3h" },
            ].map((s) => (
              <div
                key={s.n}
                className={
                  "flex items-start gap-2.5 rounded-lg p-2 " +
                  (s.active ? "bg-bg-card-hover" : "")
                }
              >
                <span
                  className={
                    "grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold " +
                    (s.active
                      ? "bg-accent-orange/20 text-accent-orange"
                      : "border border-stroke-weak text-text-muted")
                  }
                >
                  {s.n}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted">
                    {s.type}
                  </p>
                  <p className="truncate text-xs font-medium text-text-strong">
                    {s.title}
                  </p>
                  <p className="text-[10px] text-text-muted">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center gap-2 text-[11px] text-text-muted">
            <span className="rounded-full border border-stroke-weak px-2 py-0.5">
              Video
            </span>
            <span>youtube.com</span>
            <span>·</span>
            <span>2h</span>
          </div>
          <h3 className="font-display text-base font-medium text-text-strong">
            Figma in 2 hours — The Crash Course
          </h3>
          <div className="aspect-video w-full rounded-lg border border-stroke-faint bg-bg-card-hover" />
          <div className="rounded-lg border border-stroke-faint bg-bg-sunken p-3">
            <p className="text-[11px] uppercase tracking-wider text-accent-orange">
              ★ What you should be able to do after this
            </p>
            <p className="mt-1.5 text-xs text-text-weak">
              Navigate Figma confidently and recreate a simple landing page from a
              brief.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
