import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";

type SearchParams = Promise<{ next?: string }>;

export default async function SignInPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const sp = (await searchParams) ?? {};
  const next = sp.next ?? "/forum";

  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-2">
      <div
        className="hidden border-r border-hairline lg:block"
        style={{ background: "var(--signature-cream)" }}
      >
        <div className="flex h-full flex-col justify-between p-12">
          <Link href="/" className="hover:opacity-90">
            <Logo />
          </Link>
          <figure className="max-w-md">
            <blockquote className="font-display text-[26px] font-normal leading-[1.25] tracking-[0] text-ink">
              &ldquo;The workshop assessments are the unlock. Three written
              reviews taught me more about my own craft than two years on
              the job.&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 text-[14px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Maya R."
                className="size-9 rounded-full border border-hairline object-cover"
              />
              <span className="flex flex-col">
                <span className="text-ink">Maya R.</span>
                <span className="text-muted">Senior Product Designer · Swiggy</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="grid place-items-center bg-canvas px-6 py-12">
        <div className="w-full max-w-[400px] space-y-8">
          <Link href="/" className="lg:hidden">
            <Logo />
          </Link>
          <Card className="space-y-6 p-7" hover={false}>
            <header className="space-y-1.5">
              <h1 className="font-display text-[28px] font-normal leading-[1.2] tracking-[0] text-ink">
                Welcome back
              </h1>
              <p className="text-[14px] text-body">Sign in to keep building.</p>
            </header>

            <div className="space-y-2">
              <button className="flex w-full items-center justify-center gap-3 rounded-[12px] border border-hairline bg-canvas py-2.5 text-[14px] font-medium text-ink hover:bg-surface-bone">
                <span className="grid size-5 place-items-center rounded-full border border-hairline text-[11px] font-semibold">G</span>
                Continue with Google
              </button>
              <button className="flex w-full items-center justify-center gap-3 rounded-[12px] border border-hairline bg-canvas py-2.5 text-[14px] font-medium text-ink hover:bg-surface-bone">
                <span className="grid size-5 place-items-center rounded-[2px] border border-hairline text-[10px] font-semibold">in</span>
                Continue with LinkedIn
              </button>
            </div>

            <div className="flex items-center gap-3 text-[12px] text-muted">
              <span className="h-px flex-1 bg-hairline" />
              or use email
              <span className="h-px flex-1 bg-hairline" />
            </div>

            <form
              method="post"
              action="/api/auth/preview-login"
              className="space-y-3"
            >
              {/* The middleware redirected here with ?next=<original
                   path>; pass it through so we bounce back after
                   logging in. */}
              <input type="hidden" name="next" value={next} />
              <Input type="email" name="email" placeholder="you@design.studio" />
              <Input type="password" name="password" placeholder="Password" />
              <button
                type="submit"
                className="w-full rounded-[12px] bg-ink py-3 text-[14px] font-medium text-on-primary hover:bg-[color:var(--primary-active)]"
              >
                Sign in
              </button>
            </form>

            <p className="text-center text-[12px] text-muted">
              New here?{" "}
              <Link href="/auth/sign-up" className="text-link hover:underline">
                Create an account
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
