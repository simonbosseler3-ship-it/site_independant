/** Petit sur-titre en mono, précédé d'un trait lumineux. */
export default function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-3 font-mono-jb text-[0.72rem] font-medium uppercase tracking-[0.18em] text-brand-glow ${className}`}
    >
      <span className="h-px w-8 bg-gradient-to-r from-brand-glow to-transparent" aria-hidden="true" />
      {children}
    </p>
  );
}
