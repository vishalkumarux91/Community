export function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display text-2xl font-semibold md:text-3xl">{value}</span>
      <span className="text-xs uppercase tracking-wider text-text-muted">{label}</span>
    </div>
  );
}
