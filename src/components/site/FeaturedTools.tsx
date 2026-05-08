import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Star, ArrowRight } from "@/components/ui/Icons";
import { ToolLogo } from "@/components/ui/ToolLogos";

type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  initial: string;
};

const TOOLS: Tool[] = [
  { slug: "figma", name: "Figma", initial: "F", category: "Design", description: "Collaborative interface design tool — the industry default.", rating: 4.9, reviews: 18420 },
  { slug: "framer", name: "Framer", initial: "Fr", category: "Prototyping", description: "Design and publish responsive websites visually.", rating: 4.7, reviews: 4310 },
  { slug: "midjourney", name: "Midjourney", initial: "MJ", category: "AI", description: "Cinematic AI image generation for moodboards & concept art.", rating: 4.9, reviews: 7340 },
  { slug: "chatgpt", name: "ChatGPT", initial: "GPT", category: "AI", description: "Conversational AI for ideation, copy, and code.", rating: 4.8, reviews: 21200 },
  { slug: "notion", name: "Notion", initial: "N", category: "Collaboration", description: "Docs, wikis, and project tracking — the designer's second brain.", rating: 4.6, reviews: 9120 },
  { slug: "maze", name: "Maze", initial: "M", category: "Research", description: "Unmoderated usability tests, surveys, and prototype testing.", rating: 4.5, reviews: 1820 },
];

export function FeaturedTools() {
  return (
    <section className="border-b border-stroke-faint py-24">
      <Container>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
              Tools
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-text-strong md:text-3xl">
              Hand-picked, honestly reviewed.
            </h2>
          </div>
          <Link
            href="/tools"
            className="hidden items-center gap-1.5 text-sm text-text-weak hover:text-text-strong md:inline-flex"
          >
            All tools <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}`}
                className="group flex items-start gap-4"
              >
                <ToolLogo
                  slug={tool.slug}
                  fallbackInitial={tool.initial}
                  className="size-11"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-text-strong group-hover:text-text-strong">
                      {tool.name}
                    </h3>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Star className="size-3 text-accent-yellow" />
                      {tool.rating}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-text-weak">
                    {tool.description}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-wider text-text-muted">
                    {tool.category} · {tool.reviews.toLocaleString()} reviews
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
