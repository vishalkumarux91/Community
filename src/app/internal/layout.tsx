import Link from "next/link";

/**
 * Internal-console layout. Lives outside the (app) member group so it
 * doesn't inherit the member sidebar. Auth gate is a cookie set by
 * /internal/login when the env-credential check passes — wired in §5.2
 * of the build spec; left as TODO until the env vars exist.
 */
export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-ink">
      <header className="sticky top-0 z-30 border-b border-hairline bg-canvas">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-6">
          <Link href="/internal" className="inline-flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-[10px] bg-ink text-[14px] font-medium text-on-primary">
              O
            </span>
            <span className="text-[14px] font-medium tracking-tight text-ink">
              Opencanvas · Internal
            </span>
          </Link>
          <nav className="flex items-center gap-2 text-[13px] text-body">
            <Link
              href="/internal"
              className="rounded-[8px] px-3 py-1.5 hover:bg-surface-bone hover:text-ink"
            >
              Review queue
            </Link>
            <form action="/api/internal/logout" method="post">
              <button
                type="submit"
                className="rounded-[8px] border border-hairline px-3 py-1.5 text-[13px] font-medium text-ink hover:bg-surface-bone"
              >
                Log out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
