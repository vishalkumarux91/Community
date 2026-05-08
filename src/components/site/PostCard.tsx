import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Avatar } from "@/components/ui/Avatar";
import { Bookmark, Comment, Upvote } from "@/components/ui/Icons";
import type { Post } from "@/data/community";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card as="article" className="overflow-hidden p-0">
      <div className="flex gap-4 p-5">
        <div className="hidden flex-col items-center gap-1 sm:flex">
          <button className="grid size-9 place-items-center rounded-lg border border-stroke-weak text-text-muted transition-colors hover:border-accent-orange hover:text-accent-orange">
            <Upvote className="size-4" />
          </button>
          <span className="text-sm font-semibold">
            {post.upvotes.toLocaleString()}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
            {post.pinned && <Tag tone="accent">Pinned</Tag>}
            <Tag tone={post.kind === "Critique" ? "accent" : "default"}>
              {post.kind}
            </Tag>
            <span>·</span>
            <span>{post.postedAgo} ago</span>
            <span>·</span>
            <span>by {post.author}</span>
          </header>

          <Link href={`/community/${post.id}`} className="block">
            <h3 className="mt-2 font-display text-lg font-semibold leading-snug transition-colors hover:text-accent-orange md:text-xl">
              {post.title}
            </h3>
          </Link>

          <p className="mt-1.5 line-clamp-2 text-sm text-text-weak">
            {post.body}
          </p>

          {post.hasImage && (
            <div
              className={`mt-3 h-44 rounded-xl bg-gradient-to-br ${post.imageGradient}`}
              aria-hidden
            />
          )}

          <footer className="mt-4 flex flex-wrap items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1.5 sm:hidden">
              <Upvote className="size-3.5" />
              {post.upvotes}
            </span>
            <span className="flex items-center gap-1.5">
              <Comment className="size-3.5" />
              {post.comments} comments
            </span>
            <span className="flex items-center gap-1.5">
              <Bookmark className="size-3.5" />
              {post.saves} saves
            </span>
            <span className="flex items-center gap-2 sm:ml-auto">
              <Avatar name={post.author} size={20} />
              <span className="text-text-muted">{post.authorTitle}</span>
            </span>
          </footer>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
