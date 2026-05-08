import { Container } from "@/components/ui/Container";

export function Testimonial() {
  return (
    <section className="border-b border-stroke-faint py-28">
      <Container>
        <figure className="mx-auto max-w-2xl text-center">
          <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight text-text-strong md:text-3xl">
            “What I like most is that it&rsquo;s not just showcasing tools — it&rsquo;s
            helping me understand how to use them in real design workflows.”
          </blockquote>
          <figcaption className="mt-6 flex flex-col items-center gap-1 text-sm">
            <span className="font-medium text-text-strong">Maya Rao</span>
            <span className="text-text-muted">Senior Product Designer · Swiggy</span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
