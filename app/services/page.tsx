import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { serviceGraphics } from "@/app/components/ServiceGraphics";
import ScrollReveal from "@/app/components/ScrollReveal";
import { formatServicePrice } from "@/lib/formatPrice";

export default async function ServicesPage() {
  const { data: services } = await supabase
    .from("services")
    .select("slug, title, short_description, starting_price, price_period")
    .order("display_order");

  const { data: generalRemarks, error: remarksError } = await supabase
    .from("general_remarks")
    .select("intro_title, intro_text, remarques")
    .maybeSingle();

  if (remarksError) {
    console.error("Erreur chargement general_remarks:", remarksError.message);
  }

  const introTitle = generalRemarks?.intro_title;
  const introText = generalRemarks?.intro_text;
  const remarques: string[] = generalRemarks?.remarques ?? [];

  const hasRemarksBlock = introTitle || introText || remarques.length > 0;

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
      <ScrollReveal>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          Tous mes services
        </h1>
        <p className="font-body mt-4 text-lg text-slate-600 max-w-xl">
          Découvre mes prestations en développement et modernisation web.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {services?.map((service, index) => {
          const isLastAndOdd = services && index === services.length - 1 && services.length % 2 !== 0;
          const priceLabel = formatServicePrice(service.starting_price, service.price_period);

          return (
            <ScrollReveal
              key={service.slug}
              delay={index * 100}
              className={isLastAndOdd ? "md:col-span-2 md:flex md:justify-center" : ""}
            >
              <Link
                href={`/services/${service.slug}`}
                className={`group relative overflow-hidden p-8 rounded-3xl bg-white/70 border border-slate-200/80 hover:bg-white hover:border-violet-300 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-violet-100 hover:-translate-y-1 block h-full w-full ${
                  isLastAndOdd ? "md:max-w-[calc(50%-0.75rem)]" : ""
                }`}
              >
                {serviceGraphics[service.slug]}
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                      {service.title}
                    </h3>
                    {priceLabel && (
                      <span className="font-mono-jb shrink-0 text-xs font-medium text-violet-700 bg-violet-100 px-3 py-1.5 rounded-full whitespace-nowrap">
                        {priceLabel}
                      </span>
                    )}
                  </div>
                  <p className="font-body mt-3 text-slate-600 text-sm leading-relaxed">
                    {service.short_description}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>

      {hasRemarksBlock && (
        <ScrollReveal delay={(services?.length ?? 0) * 100}>
          <div className="mt-16 bg-white/70 border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm space-y-8">
            {(introTitle || introText) && (
              <div className="space-y-3">
                {introTitle && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-violet-50 text-violet-600">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                      {introTitle}
                    </h2>
                  </div>
                )}
                {introText && (
                  <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed sm:pl-11">
                    {introText}
                  </p>
                )}
              </div>
            )}

            {remarques.length > 0 && (
              <div className={`space-y-4 ${introTitle || introText ? "pt-6 border-t border-slate-100 sm:pl-11" : ""}`}>
                <h3 className="font-display text-base font-bold text-slate-900">
                  À noter :
                </h3>
                <ul className="space-y-3">
                  {remarques.map((remarque, i) => (
                    <li key={i} className="font-body flex gap-3 items-start">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                      <p className="text-sm text-slate-700 leading-relaxed">{remarque}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollReveal>
      )}
    </main>
  );
}