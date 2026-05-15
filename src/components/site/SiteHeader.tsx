"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type SubLink = {
  href: string;
  label: string;
  desc: string;
  tone: "orange" | "blue" | "sage";
};

const LEARN_LINKS: SubLink[] = [
  {
    href: "/tools",
    label: "Tools",
    desc: "Guided learning inside Figma, Framer, and more.",
    tone: "orange",
  },
  {
    href: "/learn",
    label: "Topics",
    desc: "Mentor-led modules on AI & design craft.",
    tone: "blue",
  },
  {
    href: "/teach",
    label: "Mentors",
    desc: "1:1 reviews with senior product designers.",
    tone: "sage",
  },
];

const TONE_CLASSES: Record<SubLink["tone"], string> = {
  orange:
    "bg-[color-mix(in_srgb,var(--accent-orange)_14%,var(--bg-card))] text-accent-orange",
  blue: "bg-[color-mix(in_srgb,var(--accent-blue)_14%,var(--bg-card))] text-accent-blue",
  sage: "bg-[color-mix(in_srgb,var(--accent-sage)_16%,var(--bg-card))] text-accent-sage",
};

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-stroke-faint bg-[color-mix(in_srgb,var(--bg-sunken)_80%,transparent)] backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="hover:opacity-90">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {/* Level Up featured nav link */}
          <Link
            href="/levelup"
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-text-strong transition-colors hover:bg-bg-card-hover"
          >
            <span
              aria-hidden
              className="nav-pulse size-2 rounded-full"
              style={{ background: "var(--rainbow)" }}
            />
            Level Up
          </Link>

          {/* Learn dropdown */}
          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm text-text-weak transition-colors hover:bg-bg-card-hover hover:text-text-strong"
            >
              Learn
              <svg
                viewBox="0 0 12 12"
                className="size-3 opacity-70 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 4.5 6 7.5 9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              role="menu"
              className="invisible absolute left-0 top-[calc(100%+8px)] min-w-[260px] -translate-y-1 scale-[0.98] rounded-2xl border border-stroke-weak bg-bg-card p-1.5 opacity-0 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.18),0_0_0_1px_var(--stroke-faint)] transition-all group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
            >
              {LEARN_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-bg-card-hover"
                >
                  <span
                    aria-hidden
                    className={`grid size-8 shrink-0 place-items-center rounded-lg ${TONE_CLASSES[item.tone]}`}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      width="16"
                      height="16"
                      fill="none"
                    >
                      <path
                        d="M4 5h12M4 10h12M4 15h8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[13.5px] font-medium text-text-strong">
                      {item.label}
                    </span>
                    <span className="text-xs leading-tight text-text-muted">
                      {item.desc}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/community"
            className="rounded-full px-3.5 py-2 text-sm text-text-weak transition-colors hover:bg-bg-card-hover hover:text-text-strong"
          >
            Community
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/auth/sign-up"
            className="inline-flex items-center gap-1.5 rounded-full bg-fill-strong px-4 py-2 text-sm font-medium text-text-inverse-strong transition-opacity hover:opacity-90"
          >
            Become a member
          </Link>
        </div>
      </Container>
    </header>
  );
}
