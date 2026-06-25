import { NextResponse } from "next/server";

/** Clears the preview-session cookie and bounces to the homepage. */
export async function POST(request: Request) {
  const res = NextResponse.redirect(new URL("/", request.url), { status: 303 });
  res.cookies.set("member_preview", "", { path: "/", maxAge: 0 });
  return res;
}
