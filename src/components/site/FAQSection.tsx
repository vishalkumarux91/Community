"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do workshops work?",
    a: "Live, hosted by senior designers, every other Friday. You watch live (or catch the recording), build alongside the host, and walk away with something shippable. Each workshop pairs with an assignment you can submit for an honest assessment from the RPS Studio team.",
  },
  {
    q: "How do assignments + assessments work?",
    a: "Attended a workshop? The assignment block opens after the live session. Drop a link to your work + an optional note + image; the RPS Studio team reviews it against a public rubric and writes back a per-criterion score plus notes. Status shows up live in My submissions.",
  },
  {
    q: "Do I have to pay to join?",
    a: "No. Joining the community is free. Workshops, the forum, playbooks, and the resources library are all open to members — no contracts, no upsell.",
  },
  {
    q: "Who is Opencanvas for?",
    a: "Early-career designers becoming industry-ready and learning to ship with AI. Whether you're a design student, a career switcher, or 0–5 years into product design, the loop is built for you.",
  },
  {
    q: "What's the difference between Playbooks and Resources?",
    a: "Playbooks are RPS's own evergreen guides — the durable version of every workshop. Resources are curated pointers — blogs + inspiration (design and AI tools) — we wish more designers had open in a tab.",
  },
  {
    q: "How is the forum different from a Discord?",
    a: "Most chat communities optimize for activity; we optimize for the work you're shipping. The forum is independent of the workshop loop — open for any design question, critique request, or job-prep thread. Slower, anchored to your work.",
  },
  {
    q: "What's your AI policy?",
    a: "Use it; don't hide it. AI is a tool in your stack — we run workshops on prompt patterns and shipping with it. Assignment submissions should disclose AI assistance so reviewers can read your craft choices, not just the output.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="border-b border-hairline bg-canvas py-24 md:py-32">
      <Container>
        <div className="grid gap-14 md:grid-cols-[minmax(280px,360px)_1fr] md:gap-20">
          <div className="reveal">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">
              Questions
            </p>
            <h2 className="font-display mt-3 mb-4 text-[44px] font-bold leading-[1.0] tracking-[-0.025em] text-ink md:text-[64px]">
              Good things to know.
            </h2>
            <p className="text-[16px] leading-[1.55] text-body">
              Can&rsquo;t find what you&rsquo;re looking for? Email us at{" "}
              <a
                href="mailto:hi@opencanvas.community"
                className="text-link hover:opacity-80"
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
                  className={`border-t border-hairline py-5 ${
                    i === FAQS.length - 1 ? "border-b" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 border-0 bg-transparent p-0 text-left"
                  >
                    <span className="font-display text-[22px] font-bold leading-[1.2] tracking-[-0.015em] text-ink md:text-[26px]">
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-primary bg-primary text-on-primary"
                          : "border-hairline text-mute"
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
                    <p className="m-0 max-w-[64ch] text-[15px] leading-[1.65] text-body">
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
