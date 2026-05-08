import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV = [
  { href: "/learn", label: "Learn" },
  { href: "/tools", label: "Tools" },
  { href: "/teach", label: "Mentors" },
  { href: "/community", label: "Community" },
  { href: "/jobs", label: "Jobs" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-stroke-faint bg-bg-sunken/80 backdrop-blur-xl">
      <Container className="flex h-[64px] items-center justify-between">
        <Link href="/" className="hover:opacity-90">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text-weak transition-colors hover:text-text-strong"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/auth/sign-in"
            className="hidden rounded-full px-3 py-1.5 text-sm text-text-weak transition-colors hover:text-text-strong md:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up"
            className="rounded-full bg-fill-strong px-4 py-1.5 text-sm font-medium text-text-inverse-strong"
          >
            Get started
          </Link>
        </div>
      </Container>
    </header>
  );
}
