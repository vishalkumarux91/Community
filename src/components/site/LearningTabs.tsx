"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

type Tool = {
  name: string;
  desc: string;
  rating: number;
  bg: string;
  fg: string;
  paths: number;
  border?: boolean;
};

const TOOLS: Tool[] = [
  {
    name: "Figma",
    desc: "Master frames, auto-layout, variables, and design systems with guided lessons.",
    rating: 4.9,
    bg: "#0ACF83",
    fg: "#fff",
    paths: 12,
  },
  {
    name: "Framer",
    desc: "Build and publish responsive sites with components, CMS, and motion.",
    rating: 4.7,
    bg: "#0055FF",
    fg: "#fff",
    paths: 8,
  },
  {
    name: "Midjourney",
    desc: "Moodboards, concept art, and texture libraries — guided by senior designers.",
    rating: 4.9,
    bg: "#0E0E10",
    fg: "#fff",
    paths: 6,
  },
  {
    name: "ChatGPT",
    desc: "Ideation, copy, and design-ops automation — prompt patterns that ship.",
    rating: 4.8,
    bg: "#10A37F",
    fg: "#fff",
    paths: 9,
  },
  {
    name: "Notion",
    desc: "Briefs, wikis, and design ops — templates from real product teams.",
    rating: 4.6,
    bg: "#fbf8f2",
    fg: "#0a0a0b",
    paths: 5,
    border: true,
  },
  {
    name: "Maze",
    desc: "Unmoderated usability tests, surveys, and prototype testing playbooks.",
    rating: 4.5,
    bg: "#1F0F46",
    fg: "#fff",
    paths: 4,
  },
];

type Topic = {
  name: string;
  desc: string;
  mentor: string;
  initials: string;
  bg: string;
  lessons: number;
};

const TOPICS: Topic[] = [
  {
    name: "Designing with AI",
    desc: "Where AI fits into your product flows — and where it doesn't. With Maya R.",
    mentor: "Maya Rao",
    initials: "MR",
    bg: "linear-gradient(135deg, #f37a4d, #c2410c)",
    lessons: 14,
  },
  {
    name: "Prompt-driven UI",
    desc: "Patterns for chat, autocomplete, and command palettes that feel native.",
    mentor: "Aditya Khanna",
    initials: "AK",
    bg: "linear-gradient(135deg, #d6a84a, #a16207)",
    lessons: 9,
  },
  {
    name: "Type for product",
    desc: "Choosing, pairing, and scaling type for shipping interfaces — not branding decks.",
    mentor: "Riya Iyer",
    initials: "RI",
    bg: "linear-gradient(135deg, #5e9e6a, #1f8a5b)",
    lessons: 11,
  },
  {
    name: "Design systems at scale",
    desc: "Tokens, theming, and governance from teams shipping to millions.",
    mentor: "Sana Doshi",
    initials: "SD",
    bg: "linear-gradient(135deg, #4a7aff, #3b6ef0)",
    lessons: 16,
  },
  {
    name: "Research without a team",
    desc: "Lightweight studies that ship — interviews, diary studies, async tests.",
    mentor: "Vikram Patel",
    initials: "VP",
    bg: "linear-gradient(135deg, #7a6cff, #5b48d6)",
    lessons: 7,
  },
  {
    name: "Motion that helps",
    desc: "Microinteractions and transitions that explain, not decorate.",
    mentor: "Lea Müller",
    initials: "LM",
    bg: "linear-gradient(135deg, #e85d2c, #d6a84a)",
    lessons: 10,
  },
];

const cardBase =
  "group relative flex items-start gap-4 overflow-hidden rounded-[18px] border border-stroke-weak bg-bg-card p-5 shadow-[0_1px_0_var(--stroke-faint)] transition-all hover:-translate-y-0.5 hover:border-stroke-strong hover:shadow-[0_24px_40px_-24px_rgba(0,0,0,0.22),0_1px_0_var(--stroke-faint)]";

const tileBase =
  "grid size-[54px] shrink-0 place-items-center rounded-xl text-base font-semibold text-white shadow-[0_6px_14px_-6px_rgba(0,0,0,0.25)]";

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" width="11" height="11" fill="#d6a84a" aria-hidden>
      <path d="M10 1.6 12.6 7l5.9.85-4.27 4.16 1 5.87L10 15.13 4.77 17.88l1-5.87L1.5 7.85 7.4 7Z" />
    </svg>
  );
}

function ArrowOut() {
  return (
    <span
      aria-hidden
      className="absolute right-4 top-4 grid size-[30px] -translate-x-1 translate-y-1 place-items-center rounded-full border border-stroke-weak bg-bg-sunken opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
    >
      <svg
        viewBox="0 0 20 20"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 14 14 6m0 0H7m7 0v7" />
      </svg>
    </span>
  );
}

export function LearningTabs() {
  const [tab, setTab] = useState<"tools" | "topics">("tools");

  return (
    <section className="border-b border-stroke-faint py-28" id="learn">
      <Container>
        <div className="reveal mb-10 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-[560px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
              Learning
            </p>
            <h2 className="font-display mb-4 mt-3.5 text-[44px] font-normal leading-[1.02] tracking-[-0.015em] md:text-[56px]">
              Two paths,{" "}
              <em className="italic text-accent-orange">one</em> craft.
            </h2>
            <p className="text-[17px] leading-[1.55] text-text-weak">
              Master the tools you ship in, or go deep on the topics that shape
              the work. Pick the path that fits where you are.
            </p>
          </div>
          <div
            role="tablist"
            className="inline-flex rounded-full border border-stroke-weak bg-bg-card p-1"
          >
            {(["tools", "topics"] as const).map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
                  tab === key
                    ? "bg-fill-strong text-text-inverse-strong"
                    : "text-text-weak hover:text-text-strong"
                }`}
              >
                {key === "tools" ? "By tools" : "By topics"}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] ${
                    tab === key
                      ? "bg-white/15 text-text-inverse-strong"
                      : "bg-bg-card-hover text-text-muted"
                  }`}
                >
                  6
                </span>
              </button>
            ))}
          </div>
        </div>

        {tab === "tools" ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t) => (
              <a
                key={t.name}
                href="#"
                className={cardBase}
                style={{
                  borderColor: undefined,
                }}
              >
                <ArrowOut />
                <span
                  className={tileBase}
                  style={{
                    background: t.bg,
                    color: t.fg,
                    border: t.border ? "1px solid var(--stroke-weak)" : undefined,
                  }}
                >
                  {t.name.slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1 pr-6">
                  <div className="flex items-center gap-2.5">
                    <h3 className="m-0 text-base font-semibold">{t.name}</h3>
                    <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                      <StarIcon /> {t.rating}
                    </span>
                  </div>
                  <p className="my-2 text-[13.5px] leading-[1.55] text-text-weak">
                    {t.desc}
                  </p>
                  <small className="inline-flex w-full items-center gap-1.5 border-t border-dashed border-stroke-weak pt-2.5 text-[10.5px] uppercase tracking-[0.1em] text-text-muted before:size-[5px] before:rounded-full before:bg-accent-orange before:content-['']">
                    {t.paths} guided paths
                  </small>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((t) => (
              <a key={t.name} href="#" className={cardBase}>
                <ArrowOut />
                <span
                  className={`${tileBase} font-display text-2xl italic`}
                  style={{ background: t.bg, fontWeight: 400 }}
                >
                  {t.initials}
                </span>
                <div className="min-w-0 flex-1 pr-6">
                  <div className="flex items-center gap-2.5">
                    <h3 className="m-0 text-base font-semibold">{t.name}</h3>
                    <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                      {t.lessons} lessons
                    </span>
                  </div>
                  <p className="my-2 text-[13.5px] leading-[1.55] text-text-weak">
                    {t.desc}
                  </p>
                  <small className="inline-flex w-full items-center gap-1.5 border-t border-dashed border-stroke-weak pt-2.5 text-[10.5px] uppercase tracking-[0.1em] text-text-muted before:size-[5px] before:rounded-full before:bg-accent-orange before:content-['']">
                    With {t.mentor}
                  </small>
                </div>
              </a>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
