/**
 * En-tête de page intérieure, identique sur tout le site.
 * Animation CSS (visible dès le HTML serveur, bon pour le LCP).
 */
export default function PageHeader({
  title,
  description,
  align = "left",
  children,
  className = "",
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  children?: React.ReactNode;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <header className={`pt-36 sm:pt-44 pb-12 sm:pb-16 ${centered ? "text-center" : ""} ${className}`}>
      <h1
        className={`animate-rise font-display text-display-lg font-semibold text-fg max-w-4xl ${centered ? "mx-auto" : ""}`}
        style={{ animationDelay: "60ms" }}
      >
        {title}
      </h1>
      {description && (
        <div
          className={`animate-rise mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-fg-muted ${centered ? "mx-auto" : ""}`}
          style={{ animationDelay: "180ms" }}
        >
          {description}
        </div>
      )}
      {children && (
        <div className="animate-rise mt-10" style={{ animationDelay: "280ms" }}>
          {children}
        </div>
      )}
    </header>
  );
}
