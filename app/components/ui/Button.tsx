import Link from "next/link";
import Magnetic from "@/app/components/ui/Magnetic";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_0_0_1px_rgba(155,140,255,0.35),0_10px_30px_-10px_rgba(109,93,211,0.8)] " +
    "hover:bg-brand-strong hover:shadow-[0_0_0_1px_rgba(155,140,255,0.55),0_16px_40px_-12px_rgba(109,93,211,1)]",
  secondary:
    "bg-paper/[0.04] text-fg border border-line-strong backdrop-blur-sm hover:bg-paper/[0.09] hover:border-paper/30",
  ghost: "text-fg-muted hover:text-fg",
  light: "bg-paper text-ink hover:bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]",
};

const sizes: Record<Size, string> = {
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-4",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className = "",
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

/** Flèche qui glisse au survol du bouton parent. */
export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex w-4 h-4 overflow-hidden ${className}`} aria-hidden="true">
      <svg
        className="absolute inset-0 w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.25}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
      </svg>
      <svg
        className="absolute inset-0 w-4 h-4 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.25}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
      </svg>
    </span>
  );
}

/** Lien stylé en bouton, avec effet magnétique optionnel (desktop uniquement). */
export default function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  magnetic = false,
  fullOnMobile = false,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  magnetic?: boolean;
  /** Pleine largeur sur mobile, largeur naturelle à partir de 640px. */
  fullOnMobile?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const width = fullOnMobile ? "w-full sm:w-auto" : "";
  const link = (
    <Link href={href} onClick={onClick} className={buttonClasses({ variant, size, className: `${width} ${className}` })}>
      <span>{children}</span>
      {arrow && <ArrowIcon />}
    </Link>
  );

  return magnetic ? (
    <Magnetic className={fullOnMobile ? "block sm:inline-block" : "inline-block"}>{link}</Magnetic>
  ) : (
    link
  );
}
