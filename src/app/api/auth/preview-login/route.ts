import { NextResponse } from "next/server";

/**
 * Preview-only "sign in" — sets a member_preview cookie so the
 * middleware lets the user through to /forum, /playbooks, /me/**.
 *
 * Stand-in until Auth.js (Google + LinkedIn) lands. The cookie is
 * httpOnly so client JS can't read it, but it's not signed — anything
 * that depends on real identity must wait for Auth.js.
 */
export async function POST(request: Request) {
  const formData = await request.formData();
  const next = String(formData.get("next") ?? "/forum");
  const safeNext = next.startsWith("/") ? next : "/forum";

  const res = NextResponse.redirect(new URL(safeNext, request.url), {
    status: 303,
  });
  res.cookies.set("member_preview", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // 7 days — short enough that stale preview sessions don't
    // accumulate; long enough not to nag through a typical demo.
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
