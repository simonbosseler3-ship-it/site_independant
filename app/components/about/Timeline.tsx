"use client";

import { m } from "framer-motion";
import SpotlightCard from "@/app/components/ui/SpotlightCard";

type Step = { year: string; title: string; description: string };

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Frise du parcours :
 * - desktop : 3 colonnes reliées par une ligne horizontale qui se trace à l'entrée dans l'écran,
 * - mobile : frise verticale, la ligne se trace de haut en bas.
 * Chaque étape a un point lumineux posé sur la ligne.
 */
export default function Timeline({ steps }: { steps: Step[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <ol className="relative grid grid-cols-1 gap-6 pl-10 lg:grid-cols-none lg:grid-flow-col lg:auto-cols-fr lg:gap-5 lg:pl-0 lg:pt-12">
      {/* Ligne verticale (mobile/tablette) */}
      <m.span
        className="absolute left-[11px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-brand-glow via-brand to-brand-glow/20 lg:hidden"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.4, ease }}
        aria-hidden="true"
      />
      {/* Ligne horizontale (desktop) */}
      <m.span
        className="absolute left-0 right-0 top-[11px] hidden h-px origin-left bg-gradient-to-r from-brand-glow via-brand to-brand-glow/20 lg:block"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.4, ease }}
        aria-hidden="true"
      />

      {steps.map((step, i) => (
        <m.li
          key={step.title}
          className="relative"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.15 }}
        >
          {/* Point sur la ligne */}
          <span
            className="absolute -left-10 top-6 flex h-[23px] w-[23px] items-center justify-center rounded-full border border-brand-glow/50 bg-ink lg:left-0 lg:-top-12"
            aria-hidden="true"
          >
            <span className="h-2 w-2 rounded-full bg-brand-glow shadow-[0_0_10px_rgba(155,140,255,0.9)]" />
          </span>

          <SpotlightCard className="h-full p-7 sm:p-8">
            <span className="inline-block rounded-full border border-brand-glow/30 bg-brand/15 px-3 py-1 font-label tabular-nums text-xs uppercase tracking-[0.14em] text-brand-glow">
              {step.year}
            </span>
            <h3 className="mt-5 font-display text-xl sm:text-2xl font-semibold leading-tight text-fg">{step.title}</h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-fg-muted">{step.description}</p>
          </SpotlightCard>
        </m.li>
      ))}
    </ol>
  );
}
