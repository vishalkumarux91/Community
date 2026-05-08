import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg-sunken text-text-strong">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
