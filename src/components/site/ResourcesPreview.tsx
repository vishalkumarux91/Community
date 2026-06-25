import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";
import { blogs, inspiration, type Resource } from "@/data/resources";

/**
 * Homepage resources band — two stacked bucket previews:
 * Blogs and Inspiration. Three image-on-top cards per bucket.
 */
export function ResourcesPreview() {
  const blogPicks = blogs().slice(0, 3);
  const inspirationPicks = inspiration().slice(0, 3);

  return (
    <section className="border-b border-hairline bg-canvas py-24 md:py-32">
      <Container>
        <div className="reveal mb-12 grid items-end gap-6 md:grid-cols-[1.4fr_auto]">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">
              Resources
            </p>
            <h2 className="font-display mt-3 text-[44px] font-bold leading-[1.0] tracking-[-0.025em] text-ink md:text-[72px]">
              A tidy, curated list — <em>not</em> another pile.
            </h2>
            <p className="mt-4 max-w-[560px] text-[16px] leading-[1.55] text-body md:text-[18px]">
              Blogs for the craft. Inspiration for the tools shaping how
              design ships today.
            </p>
          </div>
          <Link
            href="/resources"
            className="justify-self-start rounded-full border border-hairline bg-surface-card px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-surface-bone md:justify-self-end"
          >
            All resources →
          </Link>
        </div>

        <Bucket title="Blogs" items={blogPicks} />
        <Bucket title="Inspiration" items={inspirationPicks} className="mt-12" />
      </Container>
    </section>
  );
}

function Bucket({
  title,
  items,
  className = "",
}: {
  title: string;
  items: Resource[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">
        {title}
      </h3>
      <ul className="grid gap-6 md:grid-cols-3">
        {items.map((r) => (
          <li key={r.id}>
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-[10px] border border-hairline bg-surface-card transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[16/9] overflow-hidden bg-surface-bone">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.cover}
                  alt=""
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-3 p-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mute">
                    {r.source}
                  </p>
                  <h4 className="mt-2 text-[16px] font-semibold leading-[1.3] text-ink">
                    {r.title}
                  </h4>
                </div>
                <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                  Open <ArrowRight className="size-3" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
