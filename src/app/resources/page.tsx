import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";
import { blogs, inspiration, type Resource } from "@/data/resources";

export const metadata = {
  title: "Resources · Opencanvas",
  description:
    "A curated list of blogs and inspiration / AI resources for designers becoming industry-ready.",
};

export default function ResourcesPage() {
  return (
    <main className="min-h-dvh bg-canvas text-ink">
      <SiteHeader />

      <section className="border-b border-hairline bg-canvas">
        <Container className="py-24 md:py-28">
          <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
            Resources
          </p>
          <h1 className="font-display mt-3 text-[40px] font-normal leading-[1.1] tracking-[0] text-ink md:text-[56px]">
            A tidy, curated list — <em>not</em> another reading pile.
          </h1>
          <p className="mt-4 max-w-[640px] text-[14px] leading-relaxed text-body md:text-[16px]">
            Two buckets, hand-picked. Blogs for the craft; inspiration for
            the tools shaping how design ships today.
          </p>
        </Container>
      </section>

      <ResourceBucket
        title="Blogs"
        eyebrow="01"
        description="External + internal reading worth the open tab."
        items={blogs()}
      />
      <ResourceBucket
        title="Inspiration"
        eyebrow="02"
        description="Design + AI tools, libraries, and references shaping how designers ship."
        items={inspiration()}
      />

      <SiteFooter />
    </main>
  );
}

function ResourceBucket({
  title,
  eyebrow,
  description,
  items,
}: {
  title: string;
  eyebrow: string;
  description: string;
  items: Resource[];
}) {
  return (
    <section className="border-b border-hairline bg-canvas py-20 md:py-24">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="max-w-[560px]">
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
              {eyebrow}
            </p>
            <h2 className="font-display mt-3 text-[28px] font-normal leading-[1.15] tracking-[0] text-ink md:text-[36px]">
              {title}
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-body">{description}</p>
          </div>
          <span className="text-[13px] text-muted">{items.length} picks</span>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <li key={r.id}>
              <ResourceCard resource={r} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-[10px] border border-hairline bg-canvas transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[16/9] overflow-hidden bg-surface-bone">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resource.cover}
          alt=""
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
            {resource.source}
          </p>
          <h3 className="mt-2 text-[16px] font-medium leading-[1.3] text-ink">
            {resource.title}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-body">
            {resource.blurb}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-ink transition-transform group-hover:translate-x-0.5">
          Open <ArrowRight className="size-3.5" />
        </span>
      </div>
    </a>
  );
}
