"use client";

import { useEffect, useState, useRef } from "react";
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

export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  if (!steps || steps.length === 0) return null;

  return (
    <div ref={containerRef} className="relative py-4">
      {/* Ligne verticale de fond (grise) */}
      <div className="absolute left-[27px] sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 sm:-translate-x-1/2 z-0" />

      {/* Ligne verticale animée (dégradé violet) */}
      <div
        className={`absolute left-[27px] sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-600 to-indigo-600 sm:-translate-x-1/2 origin-top transition-transform duration-1000 ease-out z-0 ${
          isVisible ? "scale-y-100" : "scale-y-0"
        }`}
      />

      <div className="space-y-8 sm:space-y-12 relative z-10">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          const Icon = stepIcons[step.step_number] ?? MessageCircle;

          return (
            <div
              key={step.step_number || index}
              className="relative flex flex-col sm:grid sm:grid-cols-2 sm:gap-12 items-center"
            >
              {/* Icône sur la ligne centrale */}
              <div
                style={{ transitionDelay: `${150 + index * 100}ms` }}
                className={`absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-0 sm:top-1/2 sm:-translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white border-2 border-violet-600 flex items-center justify-center text-violet-600 shadow-sm transition-all duration-500 ease-out ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              >
                <Icon className="w-6 h-6" strokeWidth={2.2} />
              </div>

              {/* Conteneur de la carte avec l'animation de slide */}
              <div
                style={{ transitionDelay: `${100 + index * 100}ms` }}
                className={`pl-20 sm:pl-0 w-full transition-all duration-500 ease-out ${
                  isEven ? "sm:col-start-1" : "sm:col-start-2"
                } ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : isEven
                    ? "opacity-0 -translate-x-8"
                    : "opacity-0 translate-x-8"
                }`}
              >
                {/* NOUVEAU STYLE DE CARTE ICI 
                  - "group" et "relative overflow-hidden" pour le halo
                  - "bg-gradient-to-br" pour le fond coloré
                  - Hover states sur la bordure et l'ombre
                */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-white via-slate-50/80 to-violet-50/30 border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-300">
                  
                  {/* Halo lumineux au survol en arrière-plan de la carte */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-violet-400/10 rounded-full blur-xl group-hover:bg-violet-500/20 transition-all pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}