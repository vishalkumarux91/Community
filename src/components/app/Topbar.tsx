"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { Search, Bell, Calendar, Sparkles } from "@/components/ui/Icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type NavItem = {
  href: string;
  label: string;
  icon: (p: { className?: string }) => React.JSX.Element;
};

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Sparkles },
  { href: "/workshops", label: "Workshops", icon: Calendar },
];

export function Topbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-stroke-faint bg-bg-sunken/80 px-6 backdrop-blur md:px-10">
      <Link href="/" className="shrink-0 hover:opacity-90">
        <Logo />
      </Link>

      <nav aria-label="Primary" className="flex items-center gap-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-semibold transition-all duration-200",
                active
                  ? "bg-surface-card text-ink shadow-[0_2px_10px_rgba(32,32,32,0.08)]"
                  : "text-body hover:bg-surface-bone hover:text-ink",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="ml-auto hidden h-9 max-w-[320px] flex-1 items-center gap-2 rounded-full border border-stroke-weak bg-bg-card px-3.5 sm:flex">
        <Search className="size-4 text-text-muted" />
        <input
          className="h-full flex-1 bg-transparent text-sm placeholder:text-text-muted focus:outline-none"
          placeholder="Search your workshops…"
        />
        <kbd className="hidden rounded border border-stroke-weak px-1.5 py-0.5 text-[11px] text-text-muted md:inline-block">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:ml-0">
        <ThemeToggle />
        <button
          aria-label="Notifications"
          className="grid size-9 place-items-center rounded-full border border-stroke-weak text-text-weak transition-colors hover:text-text-strong"
        >
          <Bell className="size-4" />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://randomuser.me/api/portraits/men/85.jpg"
          alt="Vivin R."
          className="size-9 rounded-full border border-hairline object-cover"
        />
        <form action="/api/auth/logout" method="post" className="hidden lg:block">
          <button
            type="submit"
            className="text-[12px] text-mute transition-colors hover:text-ink hover:underline"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
