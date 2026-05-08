import { cn } from "@/lib/cn";

type Tone = "neutral" | "orange" | "blue" | "green" | "purple" | "yellow";

const TONES: Record<Tone, string> = {
  neutral: "bg-white/[0.06] text-text-weak border-stroke-weak",
  orange: "bg-orange-500/15 text-accent-orange border-orange-500/30",
  blue: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  purple: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
  yellow: "bg-amber-500/15 text-accent-yellow border-amber-500/30",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
