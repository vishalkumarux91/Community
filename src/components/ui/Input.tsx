import { cn } from "@/lib/cn";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border border-stroke-weak bg-white/[0.04] px-4 text-sm text-text-strong placeholder:text-text-muted focus:border-stroke-strong focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-xl border border-stroke-weak bg-white/[0.04] px-4 py-3 text-sm text-text-strong placeholder:text-text-muted focus:border-stroke-strong focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
