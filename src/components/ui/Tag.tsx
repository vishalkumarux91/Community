import { cn } from "@/lib/cn";

type Tone = "default" | "level-beginner" | "level-intermediate" | "level-advanced" | "accent" | "solid";

export function Tag({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const tones: Record<Tone, string> = {
    default: "border-stroke-weak text-text-weak bg-transparent",
    "level-beginner": "border-stroke-weak text-text-weak bg-transparent",
    "level-intermediate": "border-stroke-weak text-text-weak bg-transparent",
    "level-advanced": "border-stroke-weak text-text-weak bg-transparent",
    accent: "border-transparent text-accent-orange bg-accent-orange/10",
    solid: "border-transparent bg-fill-strong text-text-inverse-strong",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
