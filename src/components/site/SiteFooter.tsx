import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const COLUMNS = [
  {
    title: "Product",
    items: [
      ["Learn", "/learn"],
      ["Tools", "/tools"],
      ["Mentors", "/teach"],
      ["Portfolio", "/portfolio/builder"],
      ["Jobs", "/jobs"],
    ],
  },
  {
    title: "Community",
    items: [
      ["Feed", "/community"],
      ["Critique", "/community"],
      ["Become a mentor", "/teach/become-mentor"],
      ["Rules", "#"],
    ],
  },
  {
    title: "Company",
    items: [
      ["About", "#"],
      ["Changelog", "#"],
      ["Careers", "#"],
      ["Contact", "#"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-stroke-faint">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-text-weak">
            A calmer community for UI/UX designers — built with the people in it.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title} className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
              {col.title}
            </p>
            <ul className="space-y-2 text-sm">
              {col.items.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-text-weak transition-colors hover:text-text-strong"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-stroke-faint">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-text-muted md:flex-row">
          <p>© {new Date().getFullYear()} RPS Community. Built with the community.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-text-strong">Privacy</Link>
            <Link href="#" className="hover:text-text-strong">Terms</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
