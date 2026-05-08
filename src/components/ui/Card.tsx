import { cn } from "@/lib/cn";

type CardOwnProps = {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
};

// Polymorphic Card. Each `as` value carries the right HTML attribute set
// (so `as="a"` allows `href`, `as="article"` doesn't, etc).
type CardProps =
  | (CardOwnProps & { as?: "div" } & React.HTMLAttributes<HTMLDivElement>)
  | (CardOwnProps & { as: "article" } & React.HTMLAttributes<HTMLElement>)
  | (CardOwnProps & { as: "section" } & React.HTMLAttributes<HTMLElement>)
  | (CardOwnProps & { as: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>);

export function Card({
  className,
  children,
  hover = true,
  as: Component = "div",
  ...props
}: CardProps) {
  return (
    // @ts-expect-error — discriminated union is satisfied at the call site
    <Component
      className={cn(
        "rounded-2xl border border-stroke-weak bg-bg-card transition-colors",
        hover && "hover:border-stroke-strong hover:bg-bg-card-hover",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
