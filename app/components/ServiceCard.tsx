import Link from "next/link";
import { serviceGraphics } from "@/app/components/ServiceGraphics";

type Service = {
  slug: string;
  title: string;
  short_description: string;
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      // C'est ici que la magie opère : bg-white/75 par défaut, hover:bg-white/95 au survol
      className="group relative h-full p-8 sm:p-9 rounded-3xl bg-white/75 hover:bg-white/95 border border-white/60 hover:border-violet-300 transition-all duration-300 flex flex-col justify-between space-y-12 shadow-lg shadow-slate-200/20 hover:shadow-2xl hover:shadow-violet-200 hover:-translate-y-1.5 overflow-hidden"
    >
      {serviceGraphics[service.slug]}
      <div className="space-y-3 relative z-10">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
          {service.title}
        </h3>
        <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed">
          {service.short_description}
        </p>
      </div>
      <div className="relative z-10 flex items-center text-sm font-bold text-violet-600 group-hover:translate-x-1.5 transition-transform pt-2">
        En savoir plus
        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </Link>
  );
}