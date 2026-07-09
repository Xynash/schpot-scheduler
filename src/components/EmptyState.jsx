export default function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-ink/30 bg-white/50 py-16 text-center">
      {Icon && <Icon size={28} className="text-ink/25 mb-3" strokeWidth={2} />}
      <p className="font-bold uppercase tracking-wide text-sm">{title}</p>
      {subtitle && <p className="mt-1 text-sm text-ink/40">{subtitle}</p>}
    </div>
  );
}