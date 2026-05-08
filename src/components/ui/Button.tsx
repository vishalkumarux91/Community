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
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-sunken disabled:opacity-50 disabled:pointer-events-none";

  const sizes: Record<Size, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  };

  const variants: Record<Variant, string> = {
    primary:
      "bg-fill-strong text-text-inverse-strong hover:bg-white/90",
    secondary:
      "bg-white/[0.06] text-text-strong hover:bg-white/[0.1] border border-stroke-weak",
    ghost: "text-text-weak hover:text-text-strong hover:bg-white/[0.04]",
    outline:
      "border border-stroke-weak text-text-strong hover:bg-white/[0.04]",
  };

  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
