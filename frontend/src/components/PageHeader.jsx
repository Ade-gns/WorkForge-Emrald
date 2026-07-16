export default function PageHeader({ label, title, subtitle, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="animate-fade-up">
        {label && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">{label}</p>}
        <h1 className="font-display text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-zinc-400 sm:text-base">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
