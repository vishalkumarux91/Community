"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const TABS = ["General", "Product", "Sales", "Courses"] as const;
type Tab = (typeof TABS)[number];

const QUESTIONS: Record<Tab, { q: string; a: string }[]> = {
  General: [
    { q: "What is the platform about?", a: "Opencanvas is a curated home for designers exploring AI tools, courses, and conversations. Everything we publish is reviewed by working designers, not scraped from press releases." },
    { q: "Do I need prior experience with AI tools?", a: "No. Our beginner tracks assume zero AI background, and we link out to the same primary sources we use ourselves so you can dig deeper at your pace." },
    { q: "How often are new courses added?", a: "New tutorials drop weekly, full courses land roughly once a month, and tool reviews refresh whenever a major version ships." },
    { q: "Is there a free tier?", a: "Yes — most tutorials, tool reviews, and the community itself are free forever. Premium tracks unlock instructor Q&A and project critiques." },
  ],
  Product: [
    { q: "Can I suggest a tool to be reviewed?", a: "Absolutely — head to your member dashboard and submit it. Suggestions from members shape our review queue every cycle." },
    { q: "Do you publish negative reviews?", a: "We publish honest ones. If a tool isn't worth your time, we say so and explain why." },
  ],
  Sales: [
    { q: "Do you offer team plans?", a: "Yes — team plans start at five seats with shared course progress and admin billing. Reach out for an enterprise quote." },
    { q: "Can I expense it?", a: "Most members can. We provide itemised invoices on request." },
  ],
  Courses: [
    { q: "How are courses structured?", a: "Each course is a sequence of short video lessons, a hands-on project, and an instructor-graded review at the end." },
    { q: "Are there certificates?", a: "Premium course completions ship with a verifiable certificate you can share on LinkedIn or in a portfolio." },
  ],
};

export function FAQ() {
  const [tab, setTab] = useState<Tab>("General");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = QUESTIONS[tab];

  return (
    <section className="border-b border-stroke-faint py-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-[280px_1fr]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
              Questions
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-text-strong md:text-3xl">
              Frequently asked.
            </h2>

            <div className="mt-6 flex flex-col gap-1">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTab(t);
                    setOpenIndex(0);
                  }}
                  className={cn(
                    "rounded-md px-3 py-2 text-left text-sm transition-colors",
                    t === tab
                      ? "bg-bg-card-hover text-text-strong"
                      : "text-text-weak hover:text-text-strong",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <ul className="divide-y divide-stroke-faint border-y border-stroke-faint">
            {items.map((item, i) => {
              const open = i === openIndex;
              return (
                <li key={item.q}>
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[15px] font-medium text-text-strong"
                    aria-expanded={open}
                  >
                    <span>{item.q}</span>
                    <span
                      className={cn(
                        "grid size-7 shrink-0 place-items-center rounded-full border border-stroke-weak text-text-muted transition-transform",
                        open && "rotate-45 bg-fill-strong text-text-inverse-strong border-transparent",
                      )}
                    >
                      <svg viewBox="0 0 20 20" fill="none" className="size-3" aria-hidden>
                        <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-sm leading-relaxed text-text-weak">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
