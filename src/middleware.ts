import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Member-only route gate.
 *
 * Logged-out visitors who hit /dashboard/** are redirected to
 * /auth/sign-up with the original URL preserved as `?next=...` so
 * post-signup we can drop them back where they came from.
 *
 * Session is detected via:
 *   1. Auth.js session cookies (once that lands)
 *   2. A `member_preview` cookie set by the preview sign-in form. Lets
 *      the preview demo the member surfaces before Auth.js is wired —
 *      remove once real auth is in.
 */
const MEMBER_COOKIE_NAMES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
  "member_preview",
];

function hasMemberSession(req: NextRequest): boolean {
  return MEMBER_COOKIE_NAMES.some((name) => req.cookies.get(name));
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (hasMemberSession(req)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/auth/sign-up";
  url.search = `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Gate the member dashboard. Workshops stay public (they're the
  // acquisition funnel).
  matcher: ["/dashboard/:path*"],
};
