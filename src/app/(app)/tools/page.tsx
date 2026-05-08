"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star, ArrowUpRight, Search, Heart, Grid, Rows } from "@/components/ui/Icons";
import { ToolLogo } from "@/components/ui/ToolLogos";
import { TOOLS, type Tool, type ToolCategory } from "@/lib/mock";
import { useFavorites } from "@/lib/useFavorites";

const CATEGORIES: ("All" | ToolCategory)[] = [
  "All",
  "Design",
  "Prototyping",
  "AI",
  "Research",
  "Handoff",
  "Collaboration",
  "No-code",
  "Inspiration",
  "Dev",
];

type View = "grid" | "rows" | "category";

export default function ToolsPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [q, setQ] = useState("");
  const [view, setView] = useState<View>("grid");
  const favorites = useFavorites("rps:fav-tools");

  const filtered = useMemo(
    () =>
      TOOLS.filter(
        (t) =>
          (cat === "All" || t.category === cat) &&
          (q === "" || t.name.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q],
  );

  const grouped = useMemo(() => {
    const map = new Map<ToolCategory, Tool[]>();
    for (const t of filtered) {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category)!.push(t);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-10 px-6 py-10 md:px-10">
      <SectionHeading
        eyebrow={`Tools · ${TOOLS.length} curated`}
        title="Curated tools, not a tool dump."
        description="Picked from the past two years of design + dev launches and the tools we actually use. Every one comes with a guided learning journey, not a marketing page."
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex h-10 max-w-sm flex-1 items-center gap-2 rounded-full border border-stroke-weak bg-bg-card px-4">
          <Search className="size-4 text-text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-full flex-1 bg-transparent text-sm placeholder:text-text-muted focus:outline-none"
            placeholder="Search tools…"
          />
        </div>

        <div className="flex items-center gap-3">
          {favorites.count > 0 && (
            <span className="text-xs text-text-muted">
              {favorites.count} favorited
            </span>
          )}
          <ViewSwitcher view={view} setView={setView} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              c === cat
                ? "border-stroke-strong bg-fill-strong text-text-inverse-strong"
                : "border-stroke-weak text-text-weak hover:border-stroke-strong hover:text-text-strong"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {view === "grid" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <ToolGridCard key={tool.slug} tool={tool} fav={favorites} />
          ))}
        </div>
      )}

      {view === "rows" && (
        <div className="divide-y divide-stroke-faint border-y border-stroke-faint">
          {filtered.map((tool) => (
            <ToolRow key={tool.slug} tool={tool} fav={favorites} />
          ))}
        </div>
      )}

      {view === "category" && (
        <div className="space-y-10">
          {grouped.map(([category, tools]) => (
            <section key={category}>
              <h2 className="font-display text-lg font-medium tracking-tight">
                {category}
                <span className="ml-2 text-sm font-normal text-text-muted">
                  · {tools.length}
                </span>
              </h2>
              <div className="mt-4 grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group flex items-start gap-3"
                  >
                    <ToolLogo
                      slug={tool.slug}
                      fallbackInitial={tool.name[0]}
                      className="size-10"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-text-strong">{tool.name}</h3>
                        <span className="flex items-center gap-1 text-xs text-text-muted">
                          <Star className="size-3 text-accent-yellow" />
                          {tool.rating}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-sm text-text-weak">
                        {tool.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <Card className="p-10 text-center" hover={false}>
          <p className="text-sm text-text-weak">No tools match that filter yet.</p>
        </Card>
      )}
    </div>
  );
}

function ViewSwitcher({ view, setView }: { view: View; setView: (v: View) => void }) {
  const VIEWS: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: "grid", label: "Grid", icon: <Grid className="size-3.5" /> },
    { id: "rows", label: "List", icon: <Rows className="size-3.5" /> },
    { id: "category", label: "By category", icon: <Star className="size-3.5" /> },
  ];

  return (
    <div className="inline-flex items-center rounded-full border border-stroke-weak p-0.5">
      {VIEWS.map((v) => (
        <button
          key={v.id}
          onClick={() => setView(v.id)}
          className={
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors " +
            (view === v.id
              ? "bg-fill-strong text-text-inverse-strong"
              : "text-text-weak hover:text-text-strong")
          }
        >
          {v.icon}
          {v.label}
        </button>
      ))}
    </div>
  );
}

function FavoriteButton({
  active,
  onClick,
}: {
  active: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={active ? "Unfavorite" : "Favorite"}
      className={
        "grid size-7 place-items-center rounded-full border transition-colors " +
        (active
          ? "border-accent-orange/40 bg-accent-orange/10 text-accent-orange"
          : "border-stroke-weak text-text-muted hover:text-text-strong")
      }
    >
      <Heart className="size-3.5" filled={active} />
    </button>
  );
}

function ToolGridCard({
  tool,
  fav,
}: {
  tool: Tool;
  fav: ReturnType<typeof useFavorites>;
}) {
  const isFav = fav.has(tool.slug);
  return (
    <Card className="group flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between">
        <Link href={`/tools/${tool.slug}`} className="hover:opacity-90">
          <ToolLogo
            slug={tool.slug}
            fallbackInitial={tool.name[0]}
            className="size-10"
          />
        </Link>
        <div className="flex items-center gap-1.5">
          <Tag tone="default">{tool.pricing}</Tag>
          <FavoriteButton
            active={isFav}
            onClick={(e) => {
              e.preventDefault();
              fav.toggle(tool.slug);
            }}
          />
        </div>
      </div>
      <Link href={`/tools/${tool.slug}`} className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base font-medium">{tool.name}</h3>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Star className="size-3 text-accent-yellow" />
            {tool.rating}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-text-weak">
          {tool.shortDescription}
        </p>
      </Link>
      <div className="mt-auto flex items-center justify-between border-t border-stroke-faint pt-3 text-xs text-text-muted">
        <span className="uppercase tracking-wider">{tool.category}</span>
        <Link
          href={`/tools/${tool.slug}`}
          className="inline-flex items-center gap-1 hover:text-text-strong"
        >
          Learn it <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </Card>
  );
}

function ToolRow({
  tool,
  fav,
}: {
  tool: Tool;
  fav: ReturnType<typeof useFavorites>;
}) {
  const isFav = fav.has(tool.slug);
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 md:grid-cols-[auto_1.5fr_1fr_120px_80px_24px_28px]">
      <Link href={`/tools/${tool.slug}`}>
        <ToolLogo slug={tool.slug} fallbackInitial={tool.name[0]} className="size-10" />
      </Link>
      <Link href={`/tools/${tool.slug}`} className="min-w-0">
        <h3 className="truncate text-sm font-medium text-text-strong">{tool.name}</h3>
        <p className="truncate text-xs text-text-muted">{tool.shortDescription}</p>
      </Link>
      <span className="hidden text-xs text-text-muted md:block">
        <Tag>{tool.category}</Tag>
      </span>
      <span className="hidden text-xs text-text-muted md:block">{tool.pricing}</span>
      <span className="hidden items-center gap-1 text-xs text-text-muted md:flex">
        <Star className="size-3 text-accent-yellow" />
        {tool.rating}
      </span>
      <FavoriteButton active={isFav} onClick={() => fav.toggle(tool.slug)} />
      <Link
        href={`/tools/${tool.slug}`}
        className="hidden text-text-muted hover:text-text-strong md:block"
      >
        <ArrowUpRight className="size-4" />
      </Link>
    </div>
  );
}
