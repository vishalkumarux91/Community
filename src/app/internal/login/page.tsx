/**
 * Internal-console login.
 *
 * Single env-provisioned credential (see build spec §5.2). The form
 * here is UI only — when INTERNAL_EMAIL + INTERNAL_PASSWORD_HASH are
 * set, this POSTs to /api/internal/login which compares against the
 * env vars and sets a signed httpOnly cookie. Until then it falls
 * through to /internal directly so the structure is reviewable.
 */
export const metadata = {
  title: "Internal · Opencanvas",
};

export default function InternalLoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-canvas px-6 text-ink">
      <form
        action="/api/internal/login"
        method="post"
        className="w-full max-w-[380px] space-y-5 rounded-[12px] border border-hairline bg-canvas p-7"
      >
        <header className="space-y-1.5">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            RPS Studio · Internal
          </p>
          <h1 className="font-display text-[24px] font-normal leading-[1.2] tracking-[0] text-ink">
            Sign in to the review console
          </h1>
          <p className="text-[13px] text-body">
            Single shared credential. Ask the team lead if you don&rsquo;t
            have it.
          </p>
        </header>

        <label className="flex flex-col gap-1.5 text-[13px] text-body">
          Email
          <input
            type="email"
            name="email"
            autoComplete="username"
            required
            className="rounded-[6px] border border-hairline bg-canvas px-3 py-2.5 text-[14px] text-ink placeholder:text-muted focus:border-[color:var(--info-border)] focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[13px] text-body">
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            className="rounded-[6px] border border-hairline bg-canvas px-3 py-2.5 text-[14px] text-ink placeholder:text-muted focus:border-[color:var(--info-border)] focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-[12px] bg-ink py-2.5 text-[14px] font-medium text-on-primary transition-colors hover:bg-[color:var(--primary-active)]"
        >
          Log in
        </button>
        <p className="text-center text-[11px] text-muted">
          This area is for the RPS Studio team only.
        </p>
      </form>
    </main>
  );
}
