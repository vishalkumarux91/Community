import { redirect } from "next/navigation";

/**
 * The standalone /tools index moved into /learn — tools and topics now live
 * on a single discovery surface, alongside whatever the user is currently
 * learning. /tools/[slug] detail pages still work; only the index moved.
 */
export default function ToolsIndexPage() {
  redirect("/learn");
}
