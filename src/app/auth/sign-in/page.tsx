import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";

export default function SignInPage() {
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-2">
      <div className="hidden border-r border-stroke-faint lg:block">
        <div className="flex h-full flex-col justify-between p-12">
          <Link href="/" className="hover:opacity-90">
            <Logo />
          </Link>
          <figure className="max-w-md">
            <blockquote className="font-display text-xl font-medium leading-snug tracking-tight text-text-strong">
              “What I like most is that it&rsquo;s not just showcasing tools — it&rsquo;s
              helping me understand how to use them in real design workflows.”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 text-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Maya R."
                className="size-9 rounded-full border border-stroke-weak object-cover"
              />
              <span className="flex flex-col">
                <span className="text-text-strong">Maya R.</span>
                <span className="text-text-muted">Senior Product Designer · Swiggy</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="grid place-items-center px-6 py-12">
        <div className="w-full max-w-[400px] space-y-8">
          <Link href="/" className="lg:hidden">
            <Logo />
          </Link>
          <Card className="space-y-6 p-7" hover={false}>
            <header className="space-y-1.5">
              <h1 className="font-display text-2xl font-medium tracking-tight">Welcome back</h1>
              <p className="text-sm text-text-weak">Sign in to keep building.</p>
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
              or use email
              <span className="h-px flex-1 bg-stroke-faint" />
            </div>

            <form className="space-y-3">
              <Input type="email" placeholder="you@design.studio" />
              <Input type="password" placeholder="Password" />
              <button type="submit" className="w-full rounded-full bg-fill-strong py-2.5 text-sm font-medium text-text-inverse-strong">
                Sign in
              </button>
            </form>

            <p className="text-center text-xs text-text-muted">
              New here?{" "}
              <Link href="/auth/sign-up" className="text-text-strong">
                Create an account
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
