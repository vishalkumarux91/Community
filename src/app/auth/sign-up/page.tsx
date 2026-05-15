import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";
import { Check } from "@/components/ui/Icons";

const PERKS = [
  "Level Up — the mini-course juniors actually need",
  "Certificate + priority access to RPS Studio jobs",
  "Live mentor sessions & honest critique",
  "Curated tools, topics, and journeys",
];

export default function SignUpPage() {
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[1fr_440px]">
      <div className="hidden border-r border-stroke-faint lg:block">
        <div className="flex h-full flex-col justify-between p-12">
          <Link href="/" className="hover:opacity-90">
            <Logo />
          </Link>
          <div className="space-y-6 max-w-md">
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight">
              The community where designers actually level up.
            </h2>
            <ul className="space-y-2 text-sm text-text-weak">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span className="grid size-5 place-items-center rounded-full border border-stroke-weak text-text-muted">
                    <Check className="size-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid place-items-center px-6 py-12">
        <div className="w-full max-w-[400px] space-y-8">
          <Link href="/" className="lg:hidden">
            <Logo />
          </Link>
          <Card className="space-y-6 p-7" hover={false}>
            <header className="space-y-1.5">
              <h1 className="font-display text-2xl font-medium tracking-tight">Create your account</h1>
              <p className="text-sm text-text-weak">It&rsquo;s free. We&rsquo;ll personalize the rest.</p>
            </header>

            <div className="space-y-2">
              <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-stroke-weak bg-bg-card py-2.5 text-sm hover:bg-bg-card-hover">
                <span className="grid size-5 place-items-center rounded-full border border-stroke-weak text-[11px] font-bold">G</span>
                Continue with Google
              </button>
              <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-stroke-weak bg-bg-card py-2.5 text-sm hover:bg-bg-card-hover">
                <span className="grid size-5 place-items-center rounded border border-stroke-weak text-[10px] font-bold">in</span>
                Continue with LinkedIn
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span className="h-px flex-1 bg-stroke-faint" />
              or
              <span className="h-px flex-1 bg-stroke-faint" />
            </div>

            <form className="space-y-3">
              <Input placeholder="Your name" />
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password (min 8 chars)" />
              <Link
                href="/onboarding"
                className="block rounded-full bg-fill-strong py-2.5 text-center text-sm font-medium text-text-inverse-strong"
              >
                Create account
              </Link>
            </form>

            <p className="text-center text-xs text-text-muted">
              By signing up you agree to our community rules.
              <br />
              Have an account? <Link href="/auth/sign-in" className="text-text-strong">Sign in</Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
