"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";

const CONFETTI = [
  // left side
  {
    style: { left: "6%", top: "14%", "--r": "-8deg", "--dur": "7s" },
    kind: "portrait",
    tone: "var(--accent-orange)",
    size: 64,
    src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    style: { left: "12%", top: "42%", "--r": "6deg", "--dur": "8s", "--delay": ".6s" },
    kind: "emoji",
    glyph: "✨",
    size: 38,
    hideSm: true,
  },
  {
    style: { left: "4%", top: "64%", "--r": "-4deg", "--dur": "6.5s", "--delay": "1.1s" },
    kind: "portrait",
    tone: "var(--accent-sage)",
    size: 52,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    style: { left: "16%", top: "78%", "--r": "8deg", "--dur": "7.5s", "--delay": ".3s" },
    kind: "sticker",
    text: "hi, i'm new here",
    hideSm: true,
  },
  // right side
  {
    style: { right: "6%", top: "12%", "--r": "10deg", "--dur": "7s", "--delay": ".4s" },
    kind: "portrait",
    tone: "var(--accent-blue)",
    size: 72,
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&h=240&q=80",
  },
  {
    style: { right: "14%", top: "36%", "--r": "-10deg", "--dur": "6.8s", "--delay": "1.2s" },
    kind: "emoji",
    glyph: "💬",
    size: 40,
    hideSm: true,
  },
  {
    style: { right: "4%", top: "58%", "--r": "-6deg", "--dur": "7.2s", "--delay": ".9s" },
    kind: "portrait",
    tone: "var(--accent-yellow)",
    size: 56,
    src: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    style: { right: "12%", top: "80%", "--r": "4deg", "--dur": "6.4s", "--delay": ".2s" },
    kind: "emoji",
    glyph: "🎨",
    size: 32,
    hideSm: true,
  },
  // top extras
  {
    style: { left: "32%", top: "6%", "--r": "-12deg", "--dur": "7.6s", "--delay": ".7s" },
    kind: "emoji",
    glyph: "👋",
    size: 30,
    hideSm: true,
  },
  {
    style: { right: "30%", top: "4%", "--r": "14deg", "--dur": "8.2s", "--delay": "1.4s" },
    kind: "sticker",
    text: "shipping soon",
    hideSm: true,
  },
] as const;

function portraitBg(tone: string) {
  return `repeating-linear-gradient(45deg, color-mix(in srgb, ${tone} 65%, var(--bg-card)) 0 6px, color-mix(in srgb, ${tone} 40%, var(--bg-card)) 6px 12px)`;
}

export function OpencanvasHero() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    splitAndAnimate(el);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-stroke-faint">
      {/* hero glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[30%] z-[1] size-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-orange) 14%, transparent), transparent 65%)",
        }}
      />

      {/* confetti */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        {CONFETTI.map((c, i) => (
          <div
            key={i}
            className={`bobble absolute ${c.hideSm ? "hidden sm:block" : ""}`}
            style={c.style as React.CSSProperties}
          >
            {c.kind === "portrait" && (
              <div
                className="overflow-hidden rounded-full"
                style={{
                  width: c.size,
                  height: c.size,
                  background: portraitBg(c.tone),
                  border: "3px solid var(--bg-sunken)",
                  boxShadow: "0 8px 24px -8px rgba(0,0,0,0.25)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt=""
                  className="block size-full rounded-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            {c.kind === "emoji" && (
              <span
                className="block leading-none"
                style={{
                  fontSize: c.size,
                  filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.12))",
                }}
              >
                {c.glyph}
              </span>
            )}
            {c.kind === "sticker" && (
              <span
                className="font-display rounded-full italic"
                style={{
                  padding: "6px 12px",
                  fontSize: 16,
                  background: "var(--bg-card)",
                  color: "var(--text-strong)",
                  border: "1px solid var(--stroke-weak)",
                  boxShadow: "0 8px 24px -10px rgba(0,0,0,0.18)",
                  display: "inline-block",
                }}
              >
                {c.text}
              </span>
            )}
          </div>
        ))}
      </div>

      <Container className="relative z-[2] py-20 md:py-28">
        <div className="mx-auto max-w-[820px] text-center">
          <span className="inline-flex items-center rounded-full border border-stroke-weak bg-bg-card px-3 py-1 text-xs text-text-weak">
            Trusted by 1,200+ designers from product teams worldwide
          </span>
          <h1
            ref={headingRef}
            className="font-display mx-auto mt-7 max-w-[820px] text-[56px] font-normal leading-[1.0] text-text-strong [text-wrap:balance] md:text-[96px]"
          >
            Grow as a designer, <em>together</em>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-text-weak md:text-base">
            Curated tools, mentor-led topics, honest critique, and portfolio
            building — in one quiet community.
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
              Become a member <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Wraps each whitespace-separated word in <span class="w"><span>…</span></span>
// for the text-reveal animation. Preserves <em>…</em> for the accent italic.
function splitAndAnimate(el: HTMLElement) {
  const html = el.innerHTML;
  let out = "";
  let i = 0;
  while (i < html.length) {
    if (html[i] === "<") {
      const close = html.indexOf(">", i);
      if (close === -1) break;
      const tag = html.substring(i, close + 1);
      if (/^<em/i.test(tag)) {
        const endIdx = html.indexOf("</em>", close + 1);
        if (endIdx !== -1) {
          const inner = html.substring(close + 1, endIdx);
          // Absorb any punctuation that immediately follows </em> so it
          // can't orphan onto its own line at wide viewports.
          let after = endIdx + 5;
          let trailing = "";
          while (after < html.length && /[.,!?;:…]/.test(html[after])) {
            trailing += html[after];
            after += 1;
          }
          out += `<span class="w"><i style="font-style:italic">${inner}</i>${trailing}</span>`;
          i = after;
          continue;
        }
      }
      out += tag;
      i = close + 1;
    } else {
      const nextLt = html.indexOf("<", i);
      const chunk = nextLt === -1 ? html.substring(i) : html.substring(i, nextLt);
      chunk.split(/(\s+)/).forEach((t) => {
        if (!t) return;
        if (/^\s+$/.test(t)) out += " ";
        else out += `<span class="w"><span>${t}</span></span>`;
      });
      i = nextLt === -1 ? html.length : nextLt;
    }
  }
  el.innerHTML = out;
  el.classList.add("text-reveal");
  // Observe to trigger .in once in view
  if (!("IntersectionObserver" in window)) {
    el.classList.add("in");
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
  );
  io.observe(el);
}
