import { serviceGraphics, serviceTints } from "@/app/components/ServiceGraphics";
import SpotlightCard from "@/app/components/ui/SpotlightCard";

type Service = {
  slug: string;
  title: string;
  short_description: string;
};

export default function ServiceCard({ service, index }: { service: Service; index?: number }) {
  return (
    <SpotlightCard
      href={`/services/${service.slug}`}
      tint={serviceTints[service.slug]}
      className="h-full min-h-[18rem] p-7 sm:p-9 flex flex-col justify-between gap-12"
    >
      {serviceGraphics[service.slug]}

      <div className="relative z-10 space-y-4">
        {index != null && (
          <span className="block font-mono-jb text-xs text-fg-subtle" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <h3 className="font-display text-2xl sm:text-[1.7rem] leading-tight font-semibold text-fg transition-colors duration-300 group-hover:text-white">
          {service.title}
        </h3>
        <p className="text-fg-muted text-sm sm:text-base leading-relaxed max-w-md">
          {service.short_description}
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-3 text-sm font-semibold text-brand-glow">
        <span className="relative">
          En savoir plus
          <span
            className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-brand-glow transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            aria-hidden="true"
          />
        </span>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-glow/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-brand group-hover:border-brand group-hover:text-white group-hover:translate-x-1"
          aria-hidden="true"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </span>
      </div>
    </SpotlightCard>
  );
}
