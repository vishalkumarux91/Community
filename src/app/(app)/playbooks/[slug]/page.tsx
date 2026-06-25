import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "@/components/ui/Icons";
import { PLAYBOOKS, findPlaybook } from "@/data/playbooks";
import { findWorkshop } from "@/data/workshops";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PLAYBOOKS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const p = findPlaybook(slug);
  if (!p) return { title: "Playbook · Opencanvas" };
  return { title: `${p.title} · Opencanvas`, description: p.summary };
}

export default async function PlaybookDetailPage({ params }: Params) {
  const { slug } = await params;
  const playbook = findPlaybook(slug);
  if (!playbook) notFound();

  const relatedWorkshop = playbook.relatedWorkshopSlug
    ? findWorkshop(playbook.relatedWorkshopSlug)
    : undefined;

  return (
    <div className="mx-auto w-full max-w-[760px] px-6 py-10 md:px-10">
      <Link
        href="/playbooks"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-3.5" /> All playbooks
      </Link>

      <header className="mt-6">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
          {playbook.topic}
        </p>
        <h1 className="font-display mt-3 text-[36px] font-normal leading-[1.1] tracking-[0] text-ink md:text-[48px]">
          {playbook.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-[13px] text-muted">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> {playbook.readMinutes} min read
          </span>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-body md:text-[17px]">
          {playbook.summary}
        </p>
        <div className="mt-8 overflow-hidden rounded-[10px] border border-hairline bg-surface-bone">
          <div className="aspect-[16/8]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={playbook.cover}
              alt=""
              className="size-full object-cover"
            />
          </div>
        </div>
      </header>

      <article className="prose mt-10 max-w-none text-[15px] leading-[1.7] text-ink [&>h2]:font-display [&>h2]:mt-8 [&>h2]:text-[22px] [&>h2]:font-medium [&>h2]:tracking-[0] [&>p]:my-4">
        {/* TODO: render markdown/MDX when the playbook body model lands.
             For now the raw body is plain text + the markdown headings
             survive as inline ## markers — enough to review the shell. */}
        {playbook.body.split("\n\n").map((para, i) => {
          if (para.startsWith("## ")) {
            return <h2 key={i}>{para.replace(/^##\s*/, "")}</h2>;
          }
          return <p key={i}>{para}</p>;
        })}
      </article>

      {relatedWorkshop && (
        <aside className="mt-12 rounded-[10px] border border-hairline bg-surface-bone p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            Live version
          </p>
          <h3 className="mt-1.5 font-display text-[20px] font-medium leading-[1.2] text-ink">
            {relatedWorkshop.title}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-body">
            {relatedWorkshop.description}
          </p>
          <Link
            href={`/workshops/${relatedWorkshop.slug}`}
            className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink hover:underline"
          >
            View the workshop <ArrowRight className="size-3.5" />
          </Link>
        </aside>
      )}
    </div>
  );
}
