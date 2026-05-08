import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
          {eyebrow}
        </span>
      )}
      <h1 className="font-display text-2xl font-medium tracking-tight text-text-strong md:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="max-w-[640px] text-[15px] leading-relaxed text-text-weak">
          {description}
        </p>
      )}
      {children}
    </header>
  );
}
