import { SiteHeader } from "@/components/site/SiteHeader";
import { OpencanvasHero } from "@/components/site/OpencanvasHero";
import { WorkshopsPreview } from "@/components/site/WorkshopsPreview";
import { ResourcesPreview } from "@/components/site/ResourcesPreview";
import { FAQSection } from "@/components/site/FAQSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveals } from "@/components/site/Reveals";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-canvas text-ink">
      <SiteHeader />
      <OpencanvasHero />
      <WorkshopsPreview />
      <ResourcesPreview />
      <FAQSection />
      <SiteFooter />
      <Reveals />
    </main>
  );
}
