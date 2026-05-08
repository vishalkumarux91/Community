import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Star, ArrowUpRight, Users, Sparkles, Clock } from "@/components/ui/Icons";
import { ToolLogo } from "@/components/ui/ToolLogos";
import { findTool, findTopic, TOOLS } from "@/lib/mock";

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = findTool(slug);
  if (!tool) notFound();

  const topic = findTopic(tool.topicSlug);
  const related = TOOLS.filter((t) => t.slug !== tool.slug && t.category === tool.category).slice(0, 3);
  const beginnerSteps = topic?.journeys.Beginner.steps.slice(0, 4) ?? [];

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-10 px-6 py-10 md:px-10">
      <Link href="/tools" className="text-sm text-text-muted hover:text-text-strong">
        ← All tools
      </Link>

      <header className="flex flex-col gap-6 rounded-2xl border border-stroke-weak bg-bg-card p-8 md:flex-row md:items-center md:p-10">
        <ToolLogo
          slug={tool.slug}
          fallbackInitial={tool.name[0]}
          className="size-16"
        />
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="default">{tool.category}</Tag>
            <Tag tone="default">{tool.pricing}</Tag>
            <span className="flex items-center gap-1 text-xs text-text-weak">
              <Star className="size-3 text-accent-yellow" />
              {tool.rating} · {tool.reviews.toLocaleString()} reviews
            </span>
          </div>
          <h1 className="font-display text-2xl font-medium tracking-tight md:text-3xl">{tool.name}</h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-text-weak">{tool.shortDescription}</p>
          {topic && (
            <Link
              href={`/learn/${topic.slug}`}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-fill-strong px-5 py-2 text-sm font-medium text-text-inverse-strong"
            >
              Start guided journey <ArrowUpRight className="size-4" />
            </Link>
          )}
        </div>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <Card className="space-y-3 p-6" hover={false}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-text-muted">
            <Users className="size-3.5" /> Who is this for?
          </div>
          <p className="text-sm text-text-weak">{tool.audience}</p>
        </Card>
        <Card className="space-y-3 p-6" hover={false}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-text-muted">
            <Sparkles className="size-3.5 text-accent-orange" /> What problem does it solve?
          </div>
          <p className="text-sm text-text-weak">{tool.problem}</p>
        </Card>
      </div>

      {topic && beginnerSteps.length > 0 && (
        <section>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                Learning pipeline
              </h2>
              <p className="mt-1 text-sm text-text-weak">
                A curated path. Click through and the resource opens in the workspace.
              </p>
            </div>
            <Link href={`/learn/${topic.slug}`} className="text-sm text-text-weak hover:text-text-strong inline-flex items-center gap-1.5">
              Open journey <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <ol className="mt-5 space-y-3">
            {beginnerSteps.map((s, i) => (
              <Card key={s.id} className="flex items-center gap-4 p-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-stroke-weak text-sm font-semibold">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="capitalize">{s.type}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="size-3" /> {s.estimatedTime}</span>
                    {s.source && (<><span>•</span><span>{s.source}</span></>)}
                  </div>
                  <p className="mt-1 font-medium">{s.title}</p>
                </div>
                <ArrowUpRight className="size-5 text-text-muted" />
              </Card>
            ))}
          </ol>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
            Related tools
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Card key={r.slug} as="a" href={`/tools/${r.slug}`} className="space-y-2 p-5">
                <span className="text-2xl">{r.emoji}</span>
                <h3 className="font-medium">{r.name}</h3>
                <p className="line-clamp-2 text-xs text-text-muted">{r.shortDescription}</p>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
