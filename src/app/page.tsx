import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { PopularCategories } from "@/components/site/PopularCategories";
import { Testimonial } from "@/components/site/Testimonial";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-bg-sunken text-text-strong">
      <SiteHeader />
      <Hero />
      <PopularCategories />
      <Testimonial />
      <SiteFooter />
    </main>
  );
}
