"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Who is Opencanvas for?",
    a: "Working UI/UX designers — from those breaking into product through senior ICs at scaling teams. If you'd rather have a calmer place to learn, get feedback, and grow than another feed full of noise, you'll feel at home.",
  },
  {
    q: "How is this different from a Discord or Slack?",
    a: "Most chat communities optimize for activity; we optimize for outcomes. Conversations are anchored to your work, your topics, and your goals — not the loudest channel of the day. Mentors live here, not in DMs.",
  },
  {
    q: "Do I have to pay to join?",
    a: "Reading critiques, browsing tools, and following topics is free. Mentor sessions, premium topics, and the portfolio builder are part of the Member plan — month-to-month, no contracts.",
  },
  {
    q: "Can I become a mentor?",
    a: "Yes. We onboard a small batch of senior designers each quarter. Apply through the Become a mentor link in the footer; we'll ask about your background, the topics you'd cover, and your availability.",
  },
  {
    q: "How do critiques work?",
    a: "Drop your work into a public crit thread or a private mentor review. Public crits get community comments within 24h; mentor reviews come back with a written report and a 30-min recorded walkthrough.",
  },
  {
    q: "What's your AI policy?",
    a: "Use it; don't hide it. AI is a tool in your stack — we teach prompt patterns, evaluation, and where AI fits in real flows. Submissions should disclose AI assistance, especially in critique and portfolio work.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="border-b border-stroke-faint py-28">
      <Container>
        <div className="grid gap-14 md:grid-cols-[minmax(280px,360px)_1fr] md:gap-20">
          <div className="reveal">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
              Questions
            </p>
            <h2 className="font-display mb-4 mt-3.5 text-[44px] font-normal leading-[1.02] tracking-[-0.015em] md:text-[56px]">
              Good things to know.
            </h2>
            <p className="text-[17px] leading-[1.55] text-text-weak">
              Can&rsquo;t find what you&rsquo;re looking for? Email us at{" "}
              <a
                href="mailto:hi@opencanvas.community"
                className="text-accent-orange"
                style={{ borderBottom: "1px solid currentColor" }}
              >
                hi@opencanvas.community
              </a>
              .
            </p>
          </div>
          <div className="flex flex-col">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`border-t border-stroke-weak py-5 ${
                    i === FAQS.length - 1 ? "border-b" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 border-0 bg-transparent p-0 text-left"
                  >
                    <span className="font-display text-[22px] font-normal leading-[1.25] text-text-strong md:text-[26px]">
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={`grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-fill-strong bg-fill-strong text-text-inverse-strong"
                          : "border-stroke-weak text-text-weak"
                      }`}
                    >
                      <svg viewBox="0 0 20 20" width="14" height="14" fill="none">
                        <path
                          d="M10 5v10M5 10h10"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height,margin-top] duration-300 ease-out"
                    style={{
                      maxHeight: isOpen ? 360 : 0,
                      marginTop: isOpen ? 14 : 0,
                    }}
                  >
                    <p className="m-0 max-w-[64ch] text-[15px] leading-[1.65] text-text-weak">
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
