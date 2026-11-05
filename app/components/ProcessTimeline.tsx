"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { MessageCircle, Palette, Code2, Rocket, type LucideIcon } from "lucide-react";

type Step = {
  step_number: string;
  title: string;
  description: string;
};

const stepIcons: Record<string, LucideIcon> = {
  "01": MessageCircle,
  "02": Palette,
  "03": Code2,
  "04": Rocket,
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Frise verticale : la ligne se remplit au rythme du scroll et chaque étape
 * « s'allume » quand la progression l'atteint.
 */
export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  if (!steps || steps.length === 0) return null;

  return (
    <ol ref={listRef} className="relative">
      {/* Rail de fond + remplissage piloté par le scroll */}
      <span
        className="absolute left-[27px] top-2 bottom-2 w-px bg-line-strong"
        aria-hidden="true"
      />
      <m.span
        className="absolute left-[27px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-brand-glow via-brand to-brand-glow shadow-[0_0_12px_rgba(155,140,255,0.8)]"
        style={{ scaleY: progress }}
        aria-hidden="true"
      />

      {steps.map((step, index) => {
        const Icon = stepIcons[step.step_number] ?? MessageCircle;
        const isLast = index === steps.length - 1;

        return (
          <li
            key={step.step_number || index}
            className={`relative grid grid-cols-[56px_1fr] gap-5 sm:gap-8 ${isLast ? "" : "pb-12 sm:pb-16"}`}
          >
            <m.div
              className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border bg-ink"
              initial={{ borderColor: "rgba(245,244,240,0.18)", color: "#8c88a0", backgroundColor: "#0d0b14" }}
              whileInView={{ borderColor: "#9b8cff", color: "#ffffff", backgroundColor: "#6d5dd3" }}
              viewport={{ once: true, margin: "0px 0px -45% 0px" }}
              transition={{ duration: 0.6, ease }}
              aria-hidden="true"
            >
              <Icon className="h-6 w-6" strokeWidth={1.8} />
            </m.div>

            <m.div
              className="pt-1"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="font-mono-jb text-xs tracking-widest text-brand-glow">{step.step_number}</span>
              <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-fg">{step.title}</h3>
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-fg-muted">{step.description}</p>
            </m.div>
          </li>
        );
      })}
    </ol>
  );
}
