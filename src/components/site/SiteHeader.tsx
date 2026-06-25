"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// Public primary nav. Forum is members-only — surfaced in the sidebar
// after login, not here.
const NAV = [
  { href: "/workshops", label: "Workshops" },
  { href: "/playbooks", label: "Playbooks" },
  { href: "/resources", label: "Resources" },
] as const;

export function SiteHeader() {
  return (
    // 60px-tall warm-cream bar per Replicate's nav-bar spec.
    <header className="sticky top-0 z-30 border-b border-hairline bg-canvas">
      <Container className="flex h-[60px] items-center justify-between gap-6">
        <Link href="/" className="hover:opacity-90">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[14px] font-semibold text-ink transition-colors hover:bg-surface-bone"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/auth/sign-in"
            className="hidden rounded-full bg-surface-card px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-surface-bone md:inline-flex"
            style={{ border: "1px solid var(--hairline)" }}
          >
            Log in
          </Link>
          <Link
            href="/auth/sign-up"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-on-primary transition-colors hover:bg-[color:var(--primary-deep)]"
          >
            Sign up for free
          </Link>
        </div>
      </Container>
    </header>
  );
}
