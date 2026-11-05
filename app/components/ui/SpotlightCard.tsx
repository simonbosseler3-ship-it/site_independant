"use client";

import Link from "next/link";

/**
 * Carte « verre éclairé » : se détache nettement du fond photo grâce à
 * - une surface plus claire (dégradé blanc très léger sur fond ink),
 * - une bordure visible et un liseré lumineux sur l'arête supérieure,
 * - un halo coloré permanent dans un coin (teinte personnalisable via `tint`),
 * - au survol (souris uniquement) : halo qui suit le curseur, bordure violette, élévation.
 * Le suivi du curseur passe par des variables CSS : aucun re-rendu React.
 */
export default function SpotlightCard({
  href,
  children,
  className = "",
  tint = "155,140,255",
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  /** Couleur RGB du halo d'angle, ex. "52,211,153". */
  tint?: string;
}) {
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  const classes =
    "group relative isolate overflow-hidden rounded-3xl " +
    "bg-ink-2/80 bg-[linear-gradient(155deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.025)_42%,rgba(109,93,211,0.08)_100%)] " +
    "border border-paper/[0.16] backdrop-blur-xl " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_60px_-28px_rgba(0,0,0,0.95)] " +
    "transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] " +
    "hover:border-brand-glow/55 hover:-translate-y-1.5 " +
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_30px_70px_-25px_rgba(109,93,211,0.75)] " +
    className;

  const inner = (
    <>
      {/* Halo d'angle permanent, teinté selon la carte */}
      <span
        className="pointer-events-none absolute -top-24 -right-24 -z-10 h-64 w-64 rounded-full opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(closest-side, rgba(${tint},0.30), rgba(${tint},0) 75%)` }}
        aria-hidden="true"
      />
      {/* Liseré lumineux sur l'arête supérieure */}
      <span
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-paper/40 to-transparent transition-all duration-500 group-hover:inset-x-0 group-hover:via-brand-glow"
        aria-hidden="true"
      />
      {/* Halo qui suit le curseur */}
      <span
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(440px circle at var(--spot-x, 50%) var(--spot-y, 0%), rgba(155,140,255,0.2), transparent 60%)",
        }}
        aria-hidden="true"
      />
      {children}
    </>
  );

  return href ? (
    <Link href={href} onPointerMove={onMove} className={`block ${classes}`}>
      {inner}
    </Link>
  ) : (
    <div onPointerMove={onMove} className={classes}>
      {inner}
    </div>
  );
}
