import { Topbar } from "@/components/app/Topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-aurora flex min-h-dvh flex-col text-text-strong">
      <Topbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
