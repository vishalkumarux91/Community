"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function SiteHeader() {
  return (
    // 60px-tall warm-cream bar per Replicate's nav-bar spec.
    <header className="sticky top-0 z-30 border-b border-hairline bg-canvas">
      <Container className="flex h-[60px] items-center justify-between gap-6">
        <Link href="/" className="hover:opacity-90">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/auth/sign-in"
            className="btn-press btn-circle inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-on-primary hover:bg-[color:var(--primary-deep)]"
          >
            Log in
          </Link>
        </div>
      </Container>
    </header>
  );
}
