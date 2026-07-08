import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";
import { Check } from "@/components/ui/Icons";

const PERKS = [
  "Live workshops every other Friday",
  "Submit assignments, get an honest assessment",
  "Track your assessment status on your dashboard",
];

type SearchParams = Promise<{ next?: string }>;

export default async function SignUpPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const sp = (await searchParams) ?? {};
  const next = sp.next ?? "/onboarding";

  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[1fr_440px]">
      <div
        className="hidden border-r border-hairline lg:block"
        style={{ background: "var(--signature-cream)" }}
      >
        <div className="flex h-full flex-col justify-between p-12">
          <Link href="/" className="hover:opacity-90">
            <Logo />
          </Link>
          <div className="space-y-6 max-w-md">
            <h2 className="font-display text-[32px] font-normal leading-[1.15] tracking-[0] text-ink md:text-[40px]">
              The community where designers actually level up.
            </h2>
            <ul className="space-y-2.5 text-[14px] text-ink">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span className="grid size-5 place-items-center rounded-full bg-ink text-on-primary">
                    <Check className="size-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-aurora grid place-items-center px-6 py-12">
        <div className="w-full max-w-[400px] space-y-8">
          <Link href="/" className="lg:hidden">
            <Logo />
          </Link>
          <Card className="space-y-6 p-7" hover={false}>
            <header className="space-y-1.5">
              <h1 className="font-display text-[28px] font-normal leading-[1.2] tracking-[0] text-ink">
                Create your account
              </h1>
              <p className="text-[14px] text-body">
                It&rsquo;s free. We&rsquo;ll personalize the rest.
              </p>
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
              or
              <span className="h-px flex-1 bg-hairline" />
            </div>

            <form
              method="post"
              action="/api/auth/preview-login"
              className="space-y-3"
            >
              {/* If the middleware bounced us here from a member-only
                   route, ?next=... carries the original path so the
                   preview-login redirect lands them back where they
                   started. Otherwise default to /onboarding. */}
              <input type="hidden" name="next" value={next} />
              <Input name="name" placeholder="Your name" />
              <Input type="email" name="email" placeholder="Email" />
              <Input
                type="password"
                name="password"
                placeholder="Password (min 8 chars)"
              />
              <button
                type="submit"
                className="block w-full rounded-[12px] bg-ink py-3 text-center text-[14px] font-medium text-on-primary hover:bg-[color:var(--primary-active)]"
              >
                Create account
              </button>
            </form>

            <p className="text-center text-[12px] text-muted">
              By signing up you agree to our community rules.
              <br />
              Have an account?{" "}
              <Link href="/auth/sign-in" className="text-link hover:text-[color:var(--link-active)]">
                Sign in
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
