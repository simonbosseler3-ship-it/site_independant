import { supabase } from "@/lib/supabaseClient";
import { serviceGraphics, serviceTints } from "@/app/components/ServiceGraphics";
import ScrollReveal from "@/app/components/ScrollReveal";
import PageHeader from "@/app/components/ui/PageHeader";
import SpotlightCard from "@/app/components/ui/SpotlightCard";
import { formatServicePrice } from "@/lib/formatPrice";
import { STARTER_OFFER } from "@/lib/site";

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
    <main className="container-site">
      <PageHeader
        title={
          <>
            Tous mes <span className="accent-serif text-gradient-brand">services</span>
          </>
        }
        description={
          <>
            <p className="text-fg">Découvrez mes prestations en développement et modernisation web.</p>
            <p className="mt-3 text-sm sm:text-base text-fg-muted">
              Ces tarifs sont des prix de départ. Le montant final dépend des fonctionnalités demandées et est
              toujours confirmé via un devis gratuit et sans engagement.
            </p>
          </>
        }
      />

      {/* Offre jeunes indépendants */}
      <ScrollReveal className="mb-8 sm:mb-10">
        <div className="relative overflow-hidden flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 rounded-[2rem] border border-brand-glow/30 bg-brand/15 backdrop-blur-xl p-7 sm:p-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(155,140,255,0.35), transparent 75%)" }}
            aria-hidden="true"
          />
          <span
            className="relative shrink-0 font-display text-5xl sm:text-6xl font-semibold leading-none text-gradient-brand"
            aria-hidden="true"
          >
            -40 %
          </span>
          <div className="relative">
            <h2 className="font-display text-xl sm:text-2xl font-semibold leading-tight text-fg">
              {STARTER_OFFER.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-fg-muted">{STARTER_OFFER.text}</p>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {services?.map((service, index) => {
          const isLastAndOdd = services && index === services.length - 1 && services.length % 2 !== 0;
          const priceLabel = formatServicePrice(service.starting_price, service.price_period);

          return (
            <ScrollReveal
              key={service.slug}
              delay={(index % 2) * 90}
              className={isLastAndOdd ? "md:col-span-2 md:flex md:justify-center" : ""}
            >
              <SpotlightCard
                href={`/services/${service.slug}`}
                tint={serviceTints[service.slug]}
                className={`h-full w-full p-7 sm:p-9 min-h-[15rem] flex flex-col ${
                  isLastAndOdd ? "md:max-w-[calc(50%-0.625rem)]" : ""
                }`}
              >
                {serviceGraphics[service.slug]}
                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-2xl sm:text-[1.7rem] leading-tight font-semibold text-fg">
                      {service.title}
                    </h2>
                    {priceLabel && (
                      <span className="font-label tabular-nums shrink-0 rounded-full border border-brand-glow/30 bg-brand/15 px-3 py-1.5 text-xs font-medium text-brand-glow whitespace-nowrap">
                        {priceLabel}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-fg-muted">
                    {service.short_description}
                  </p>
                  <span
                    className="mt-auto pt-8 flex h-auto items-center text-brand-glow"
                    aria-hidden="true"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-glow/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-brand group-hover:border-brand group-hover:text-white group-hover:translate-x-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                      </svg>
                    </span>
                  </span>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          );
        })}
      </div>

      {hasRemarksBlock && (
        <ScrollReveal className="mt-20 sm:mt-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-paper/[0.14] bg-ink-2/80 backdrop-blur-xl p-7 sm:p-12 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div
              className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(109,93,211,0.3), transparent 75%)" }}
              aria-hidden="true"
            />
            <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14">
              {(introTitle || introText) && (
                <div className={remarques.length > 0 ? "lg:col-span-5" : "lg:col-span-12"}>
                  {introTitle && (
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-xl border border-brand-glow/30 bg-brand/15 p-2.5 text-brand-glow">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-semibold leading-tight text-fg">
                        {introTitle}
                      </h2>
                    </div>
                  )}
                  {introText && (
                    <p className="mt-5 text-sm sm:text-base leading-relaxed text-fg-muted">{introText}</p>
                  )}
                </div>
              )}

              {remarques.length > 0 && (
                <div
                  className={`${introTitle || introText ? "lg:col-span-7 border-t border-line pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14" : "lg:col-span-12"}`}
                >
                  <h3 className="font-display text-lg font-semibold text-fg">À noter :</h3>
                  <ul className="mt-5 space-y-4">
                    {remarques.map((remarque, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <span className="mt-0.5 font-label tabular-nums text-xs text-brand-glow" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm sm:text-base leading-relaxed text-fg-muted">{remarque}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      )}
    </main>
  );
}
