import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { GraduationCap } from "@/components/ui/Icons";

const NAV = [
  { href: "/#learn", label: "Learn" },
  { href: "/community", label: "Community" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex w-full max-w-[980px] items-center justify-between gap-4 rounded-full border border-stroke-weak bg-[color-mix(in_srgb,var(--bg-sunken)_72%,transparent)] py-2 pl-5 pr-2 shadow-[0_10px_34px_-14px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-text-weak transition-colors hover:bg-bg-card-hover hover:text-text-strong"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/designup"
            aria-label="DesignUp course"
            className="wave-btn inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:brightness-105"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--accent-orange) 72%, white) 0%, var(--accent-orange) 50%, color-mix(in srgb, var(--accent-orange) 82%, black) 100%)",
              boxShadow:
                "0 12px 28px -6px color-mix(in srgb, var(--accent-orange) 60%, transparent), 0 2px 6px -2px color-mix(in srgb, var(--accent-orange) 50%, transparent), inset 0 1px 0 color-mix(in srgb, white 48%, transparent), inset 0 -1px 1px color-mix(in srgb, black 20%, transparent)",
            }}
          >
            <GraduationCap className="size-4" />
            <span aria-hidden className="inline-flex">
              {"DesignUp".split("").map((ch, i) => (
                <span
                  key={i}
                  className="wave-letter"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
