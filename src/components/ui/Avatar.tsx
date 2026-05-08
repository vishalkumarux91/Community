import { cn } from "@/lib/cn";

export function Avatar({
  name,
  src,
  size = 36,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border border-stroke-weak bg-bg-card font-semibold text-text-strong",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      title={name}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="size-full rounded-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}
