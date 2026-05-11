import { SiteHeader } from "@/components/site/SiteHeader";
import { OpencanvasHero } from "@/components/site/OpencanvasHero";
import { LogoStrip } from "@/components/site/LogoStrip";
import { Bento } from "@/components/site/Bento";
import { LearningTabs } from "@/components/site/LearningTabs";
import { TestimonialsBlock } from "@/components/site/TestimonialsBlock";
import { FAQSection } from "@/components/site/FAQSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveals } from "@/components/site/Reveals";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-bg-sunken text-text-strong">
      <SiteHeader />
      <OpencanvasHero />
      <LogoStrip />
      <Bento />
      <LearningTabs />
      <TestimonialsBlock />
      <FAQSection />
      <SiteFooter />
      <Reveals />
    </main>
  );
}
