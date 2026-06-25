"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import {
  Calendar,
  Megaphone,
  Book,
  Folder,
} from "@/components/ui/Icons";

type NavItem = {
  href: string;
  label: string;
  icon: (p: { className?: string }) => React.JSX.Element;
};

const NAV: NavItem[] = [
  { href: "/workshops", label: "Workshops", icon: Calendar },
  { href: "/forum", label: "Forum", icon: Megaphone },
  { href: "/playbooks", label: "Playbooks", icon: Book },
  { href: "/resources", label: "Resources", icon: Folder },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-[244px] shrink-0 flex-col border-r border-hairline bg-canvas px-4 py-6 md:flex">
      <Link href="/" className="px-2">
        <Logo />
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-full px-4 py-2.5 text-[14px] font-semibold transition-colors",
                active
                  ? "bg-surface-card text-ink shadow-[0_1px_2px_rgba(32,32,32,0.05)]"
                  : "text-body hover:bg-surface-bone hover:text-ink",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-hairline pt-4">
        <Link
          href="/me"
          className="flex items-center gap-3 rounded-full px-2 py-2 transition-colors hover:bg-surface-bone"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://randomuser.me/api/portraits/men/85.jpg"
            alt="Vivin R."
            className="size-9 rounded-full border border-hairline object-cover"
          />
          <span className="flex flex-col">
            <span className="text-[14px] font-semibold text-ink">Vivin R.</span>
            <span className="text-[12px] text-mute">Mid-level designer</span>
          </span>
        </Link>
        <form action="/api/auth/logout" method="post" className="mt-2 px-2">
          <button
            type="submit"
            className="text-[12px] text-mute hover:text-ink hover:underline"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
