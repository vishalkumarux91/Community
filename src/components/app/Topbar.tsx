import { Search, Bell } from "@/components/ui/Icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-stroke-faint bg-bg-sunken/80 px-6 backdrop-blur md:px-10">
      <div className="flex h-9 max-w-[420px] flex-1 items-center gap-2 rounded-full border border-stroke-weak bg-bg-card px-3.5">
        <Search className="size-4 text-text-muted" />
        <input
          className="h-full flex-1 bg-transparent text-sm placeholder:text-text-muted focus:outline-none"
          placeholder="Search tools, journeys, mentors, posts…"
        />
        <kbd className="hidden rounded border border-stroke-weak px-1.5 py-0.5 text-[11px] text-text-muted md:inline-block">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          aria-label="Notifications"
          className="grid size-9 place-items-center rounded-full border border-stroke-weak text-text-weak transition-colors hover:text-text-strong"
        >
          <Bell className="size-4" />
        </button>
      </div>
    </header>
  );
}
