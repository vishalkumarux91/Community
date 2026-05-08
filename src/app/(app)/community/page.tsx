"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Avatar } from "@/components/ui/Avatar";
import { Upvote, Comment, Bookmark, Sparkles, ArrowRight } from "@/components/ui/Icons";
import { POSTS, type Post } from "@/lib/mock";

const POST_TYPES = [
  { id: "discussion", label: "Discussion" },
  { id: "critique", label: "Critique" },
  { id: "portfolio-review", label: "Portfolio review" },
  { id: "job-prep", label: "Job prep" },
] as const;

const FILTERS = ["Hot", "New", "Top", "Critique", "Portfolio review", "Job prep"] as const;
type Filter = (typeof FILTERS)[number];

export default function CommunityPage() {
  const [filter, setFilter] = useState<Filter>("Hot");

  const visible = useMemo(() => {
    if (filter === "Critique") return POSTS.filter((p) => p.type === "critique");
    if (filter === "Portfolio review") return POSTS.filter((p) => p.type === "portfolio-review");
    if (filter === "Job prep") return POSTS.filter((p) => p.type === "job-prep");
    if (filter === "New") return [...POSTS].reverse();
    if (filter === "Top") return [...POSTS].sort((a, b) => b.upvotes - a.upvotes);
    return POSTS;
  }, [filter]);

  return (
    <div className="mx-auto w-full max-w-[1200px] grid gap-8 px-6 py-10 md:px-10 lg:grid-cols-[1fr_280px]">
      <div className="space-y-6">
        <header>
          <h1 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
            Community
          </h1>
          <p className="mt-1 text-sm text-text-weak">
            Ask, critique, debate, and learn — out in the open.
          </p>
        </header>

        <Composer />

        <div className="flex flex-wrap items-center gap-2 border-b border-stroke-faint pb-4">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                f === filter
                  ? "bg-fill-strong text-text-inverse-strong"
                  : "text-text-weak hover:text-text-strong"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {visible.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      </div>

      <aside className="space-y-5">
        <Card className="space-y-3 p-5" hover={false}>
          <h3 className="font-display text-base font-semibold">Channel guide</h3>
          <ul className="space-y-2 text-sm">
            {[
              ["Critique my design", "/community?type=critique"],
              ["Portfolio reviews", "/community?type=portfolio-review"],
              ["Job prep", "/community?type=job-prep"],
              ["Tools & AI", "/community?tag=tools"],
              ["Career & switching", "/community?tag=career"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-text-weak hover:bg-white/[0.04] hover:text-text-strong">
                  # {label}
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="space-y-3 p-5" hover={false}>
          <h3 className="font-display text-base font-semibold">Live this week</h3>
          <div className="space-y-2 text-sm text-text-weak">
            <div>
              <p className="font-medium text-text-strong">Live portfolio review</p>
              <p className="text-xs">Tue 6 PM · Aanya Sharma</p>
            </div>
            <div>
              <p className="font-medium text-text-strong">Mock interview clinic</p>
              <p className="text-xs">Fri 7 PM · Reena Kapoor</p>
            </div>
          </div>
          <Link href="/teach" className="text-xs text-accent-orange">
            See all sessions →
          </Link>
        </Card>

        <Card className="space-y-3 p-5" hover={false}>
          <h3 className="font-display text-base font-semibold">Community rules</h3>
          <ol className="list-inside list-decimal space-y-1 text-xs text-text-weak">
            <li>Critique the work, not the person.</li>
            <li>Add context to portfolio reviews.</li>
            <li>No recruitment-only posts.</li>
            <li>Mark mentor responses respectfully.</li>
          </ol>
        </Card>
      </aside>
    </div>
  );
}

function Composer() {
  const [body, setBody] = useState("");
  const [postType, setPostType] = useState<(typeof POST_TYPES)[number]["id"]>("discussion");
  const [expanded, setExpanded] = useState(false);

  const canPost = body.trim().length > 0;

  return (
    <Card className="p-4" hover={false}>
      <div className="flex items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://randomuser.me/api/portraits/men/85.jpg"
          alt=""
          className="size-9 shrink-0 rounded-full border border-stroke-weak object-cover"
        />
        <div className="min-w-0 flex-1 space-y-3">
          <textarea
            value={body}
            onFocus={() => setExpanded(true)}
            onChange={(e) => setBody(e.target.value)}
            rows={expanded ? 4 : 1}
            placeholder="Share what's on your mind — ask, critique, debate…"
            className="w-full resize-none bg-transparent text-[15px] leading-relaxed text-text-strong placeholder:text-text-muted focus:outline-none"
          />

          {expanded && (
            <>
              <div className="flex flex-wrap gap-1.5">
                {POST_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setPostType(t.id)}
                    className={
                      "rounded-full border px-3 py-1 text-xs transition-colors " +
                      (postType === t.id
                        ? "border-accent-orange bg-accent-orange/10 text-accent-orange"
                        : "border-stroke-weak text-text-weak hover:border-stroke-strong hover:text-text-strong")
                    }
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-stroke-faint pt-3">
                <p className="flex items-center gap-1.5 text-[11px] text-text-muted">
                  <Sparkles className="size-3 text-accent-orange" />
                  AI will help your post get better feedback
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setBody("");
                      setExpanded(false);
                    }}
                    className="rounded-full px-3 py-1.5 text-xs text-text-weak hover:text-text-strong"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!canPost}
                    className="inline-flex items-center gap-1.5 rounded-full bg-fill-strong px-4 py-1.5 text-xs font-medium text-text-inverse-strong transition-opacity hover:opacity-90 disabled:opacity-40"
                  >
                    Post <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

function PostCard({ post }: { post: Post }) {
  const tone = post.type === "critique" ? "accent" : "default";

  return (
    <Card as="a" href={`/community/post/${post.id}`} className="flex gap-4 p-5">
      <div className="flex flex-col items-center gap-1 text-text-muted">
        <Upvote className="size-4 hover:text-accent-orange" />
        <span className="text-xs font-semibold text-text-strong">{post.upvotes}</span>
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
          <Tag tone={tone}>{post.type.replace("-", " ")}</Tag>
          {post.tags.slice(0, 2).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          <span>•</span>
          <span>{post.postedAgo}</span>
        </div>
        <h3 className="font-medium leading-snug">{post.title}</h3>
        <p className="line-clamp-2 text-sm text-text-weak">{post.body}</p>
        {post.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt=""
            className="mt-3 aspect-[16/8] w-full rounded-lg border border-stroke-weak object-cover"
            loading="lazy"
          />
        )}
        <div className="flex items-center gap-4 pt-1 text-xs text-text-muted">
          <span className="flex items-center gap-2">
            <Avatar name={post.authorName} src={post.authorPhoto} size={20} />
            {post.authorName}
            <span className="text-text-muted">· {post.authorRole}</span>
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <Comment className="size-3.5" /> {post.comments}
          </span>
          <Bookmark className="size-3.5" />
        </div>
      </div>
    </Card>
  );
}
