import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  const base =
    "btn-press inline-flex items-center justify-center gap-2 rounded-full font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-sunken disabled:opacity-50 disabled:pointer-events-none";

  const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-7 text-base",
  };

  const variants: Record<Variant, string> = {
    primary:
      "btn-circle bg-primary text-on-primary hover:bg-[color:var(--primary-deep)]",
    secondary:
      "bg-surface-card text-text-strong border border-stroke-weak shadow-[0_6px_18px_-10px_rgba(16,24,40,0.35)] hover:bg-surface-bone",
    ghost: "text-text-weak hover:text-text-strong hover:bg-surface-bone",
    outline:
      "border border-stroke-weak text-text-strong hover:bg-surface-bone",
  };

  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
