import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Avatar } from "@/components/ui/Avatar";
import { Upvote, Comment, Bookmark, LinkIcon, Sparkles } from "@/components/ui/Icons";
import { Textarea } from "@/components/ui/Input";
import { findPost } from "@/lib/mock";

const SAMPLE_COMMENTS = [
  {
    author: "Reena Kapoor",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "Senior IC, Figma · Mentor",
    isMentor: true,
    body: "Great problem framing. Two specific things to tighten: (1) eligibility before income reduces drop-off in our tests, (2) on the offer screen, the EMI breakdown wins over hero copy in Tier-2. Happy to do a 1:1 on this if you want.",
    upvotes: 24,
    postedAgo: "1h",
  },
  {
    author: "Aman K.",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    role: "Design lead",
    body: "Strong start. The KYC step is doing too much in one screen — split selfie + document into two screens with progress; you'll see a measurable bump in completion.",
    upvotes: 9,
    postedAgo: "2h",
  },
  {
    author: "Priya M.",
    photo: "https://randomuser.me/api/portraits/women/29.jpg",
    role: "Junior PD",
    body: "What target completion rate are you optimizing for? That changes whether you should add the why-we-need-this nudge or strip it out for speed.",
    upvotes: 4,
    postedAgo: "2h",
  },
];

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = findPost(id);
  if (!post) notFound();

  const tone = post.type === "critique" ? "accent" : "default";

  return (
    <div className="mx-auto w-full max-w-[920px] space-y-8 px-6 py-10 md:px-10">
      <Link href="/community" className="text-sm text-text-muted hover:text-text-strong">
        ← Community
      </Link>

      <Card className="space-y-5 p-7" hover={false}>
        <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
          <Tag tone={tone}>{post.type.replace("-", " ")}</Tag>
          {post.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          <span>•</span>
          <span>{post.postedAgo}</span>
        </div>
        <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          {post.title}
        </h1>
        <div className="flex items-center gap-3">
          <Avatar name={post.authorName} src={post.authorPhoto} size={36} />
          <div className="text-sm">
            <p className="font-medium">{post.authorName}</p>
            <p className="text-xs text-text-muted">{post.authorRole}</p>
          </div>
        </div>

        {post.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt=""
            className="aspect-video w-full rounded-xl border border-stroke-weak object-cover"
            loading="lazy"
          />
        )}

        <p className="text-base leading-relaxed text-text-weak">{post.body}</p>

        <div className="flex items-center gap-2 border-t border-stroke-faint pt-4">
          <button className="flex items-center gap-2 rounded-full border border-stroke-weak px-3 py-1.5 text-xs text-text-weak hover:text-text-strong">
            <Upvote className="size-3.5" /> {post.upvotes}
          </button>
          <button className="flex items-center gap-2 rounded-full border border-stroke-weak px-3 py-1.5 text-xs text-text-weak hover:text-text-strong">
            <Comment className="size-3.5" /> {post.comments}
          </button>
          <button className="flex items-center gap-2 rounded-full border border-stroke-weak px-3 py-1.5 text-xs text-text-weak hover:text-text-strong">
            <Bookmark className="size-3.5" /> Save
          </button>
          <button className="flex items-center gap-2 rounded-full border border-stroke-weak px-3 py-1.5 text-xs text-text-weak hover:text-text-strong">
            <LinkIcon className="size-3.5" /> Share
          </button>
          {post.type === "critique" && (
            <button className="ml-auto flex items-center gap-2 rounded-full bg-accent-orange/15 px-4 py-1.5 text-xs font-medium text-accent-orange">
              <Sparkles className="size-3.5" /> Request live review
            </button>
          )}
        </div>
      </Card>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">{post.comments} replies</h2>

        <Card className="space-y-3 p-5" hover={false}>
          <Textarea placeholder="Add your critique. Be specific and kind." />
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Tip: critique work, not people.</p>
            <button className="rounded-full bg-fill-strong px-4 py-1.5 text-xs font-medium text-text-inverse-strong">
              Post reply
            </button>
          </div>
        </Card>

        <ul className="space-y-3">
          {SAMPLE_COMMENTS.map((c) => (
            <li key={c.author}>
              <Card className="space-y-3 p-5" hover={false}>
                <div className="flex items-center gap-3">
                  <Avatar name={c.author} src={c.photo} size={32} />
                  <div className="text-xs">
                    <p className="text-sm font-medium">
                      {c.author}
                      {c.isMentor && (
                        <Tag tone="accent" className="ml-2">Mentor</Tag>
                      )}
                    </p>
                    <p className="text-text-muted">{c.role} · {c.postedAgo}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-text-weak">{c.body}</p>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <button className="flex items-center gap-1 hover:text-text-strong">
                    <Upvote className="size-3.5" /> {c.upvotes}
                  </button>
                  <button className="hover:text-text-strong">Reply</button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
