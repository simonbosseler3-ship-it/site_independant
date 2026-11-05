import ScrollReveal from "@/app/components/ScrollReveal";

/**
 * Titre de section unique pour tout le site : mêmes couleurs, tailles et rythme partout.
 * - `index` : numéro décoratif (ex. "01"), masqué des lecteurs d'écran.
 * - `as` : niveau de titre sémantique (h1 pour un en-tête de page, h2 par défaut).
 */
export default function SectionHeading({
  title,
  description,
  index,
  as: Tag = "h2",
  align = "left",
  size = "md",
  className = "",
  children,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  index?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  size?: "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}) {
  const centered = align === "center";
  return (
    <ScrollReveal className={`${centered ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
      {index && (
        <span
          className={`mb-5 flex items-center gap-3 font-mono-jb text-xs text-brand-glow ${centered ? "justify-center" : ""}`}
          aria-hidden="true"
        >
          ({index})
          <span className="h-px w-10 bg-gradient-to-r from-brand-glow/70 to-transparent" />
        </span>
      )}
      <Tag
        className={`font-display font-semibold text-fg ${
          size === "lg" ? "text-display-lg" : "text-display-md"
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p className={`mt-5 text-base sm:text-lg leading-relaxed text-fg-muted ${centered ? "mx-auto" : ""} max-w-2xl`}>
          {description}
        </p>
      )}
      {children}
    </ScrollReveal>
  );
}
