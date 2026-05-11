import { redirect } from "next/navigation";

/**
 * The post-login home was retired — the community feed is now the landing
 * surface for signed-in members. Anything still pointing at /dashboard (old
 * bookmarks, links in older emails) gets bounced to /community.
 */
export default function DashboardPage() {
  redirect("/community");
}
