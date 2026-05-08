"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "@/components/ui/Icons";

type Theme = "light" | "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Resolve current theme on mount: explicit attr first, fall back to system.
  useEffect(() => {
    const explicit = document.documentElement.getAttribute("data-theme") as Theme | null;
    if (explicit === "light" || explicit === "dark") {
      setTheme(explicit);
      return;
    }
    setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  // Render a placeholder sized like the real button until we know the theme,
  // so the toggle never flashes an inverted icon on hydration.
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={
        "grid size-9 place-items-center rounded-full border border-stroke-weak text-text-weak transition-colors hover:text-text-strong " +
        (className ?? "")
      }
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
