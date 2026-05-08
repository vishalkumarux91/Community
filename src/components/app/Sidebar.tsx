"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import {
  Home,
  Compass,
  Tools,
  Users,
  Briefcase,
  Megaphone,
  Layers,
} from "@/components/ui/Icons";

type NavItem = {
  href: string;
  label: string;
  icon: (p: { className?: string }) => React.JSX.Element;
};

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/learn", label: "Learn", icon: Compass },
  { href: "/tools", label: "Tools", icon: Tools },
  { href: "/community", label: "Community", icon: Megaphone },
  { href: "/teach", label: "Mentors", icon: Users },
  { href: "/portfolio", label: "Portfolio", icon: Layers },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-[244px] shrink-0 flex-col border-r border-stroke-faint bg-bg-sunken px-4 py-6 md:flex">
      <Link href="/" className="px-2">
        <Logo />
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-bg-card-hover text-text-strong"
                  : "text-text-weak hover:bg-bg-card-hover hover:text-text-strong",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-stroke-faint pt-4">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-bg-card-hover"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://randomuser.me/api/portraits/men/85.jpg"
            alt="Vivin R."
            className="size-8 rounded-full border border-stroke-weak object-cover"
          />
          <span className="flex flex-col">
            <span className="text-sm text-text-strong">Vivin R.</span>
            <span className="text-[11px] text-text-muted">Mid-level designer</span>
          </span>
        </Link>
      </div>
    </aside>
  );
}
