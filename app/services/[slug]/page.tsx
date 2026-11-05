import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Link from "next/link";
import { serviceGraphicsAmbient, serviceTints } from "@/app/components/ServiceGraphics";
import ServiceBackgroundSetter from "@/app/components/ServiceBackgroundSetter";
import ScrollReveal from "@/app/components/ScrollReveal";
import ButtonLink from "@/app/components/ui/Button";
import { formatServicePrice } from "@/lib/formatPrice";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: service } = await supabase
    .from("services")
    .select("slug, title, full_description, points, starting_price, price_period, note")
    .eq("slug", slug)
    .single();

  if (!service) notFound();

  const ambient = serviceGraphicsAmbient[service.slug] ?? {
    glow: "from-violet-500/25 via-purple-500/10 to-transparent",
    icon: null,
  };
  const tint = serviceTints[service.slug] ?? "155,140,255";

  const priceLabel = formatServicePrice(service.starting_price, service.price_period, "long");

  const ctaCard = (
    <div className="relative overflow-hidden rounded-3xl border border-paper/[0.16] bg-ink-2/85 backdrop-blur-xl p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_60px_-28px_rgba(0,0,0,0.95)]">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full"
        style={{ background: `radial-gradient(closest-side, rgba(${tint},0.35), rgba(${tint},0) 75%)` }}
        aria-hidden="true"
      />
      {priceLabel && (
        <p className="relative font-mono-jb text-2xl sm:text-3xl font-medium text-fg">{priceLabel}</p>
      )}
      <ButtonLink
        href={`/devis?type=${service.slug}`}
        size="lg"
        arrow
        className="relative mt-6 w-full whitespace-normal! text-center"
      >
        Demander un devis pour ce service
      </ButtonLink>
    </div>
  );

  return (
    <main className="relative overflow-x-clip">
      <ServiceBackgroundSetter slug={service.slug} />

      {/* Halo d'ambiance à la teinte du service */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] max-w-[160vw] h-[600px] bg-gradient-to-br ${ambient.glow} blur-3xl -z-20 pointer-events-none`}
        aria-hidden="true"
      />
      {/* Illustration flottante */}
      <div
        className="absolute right-[-60px] sm:right-8 top-28 w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] -z-10 pointer-events-none animate-float-slow motion-reduce:animate-none"
        style={{ color: `rgba(${tint},0.16)` }}
        aria-hidden="true"
      >
        {ambient.icon}
      </div>

      <div className="container-site pt-32 sm:pt-40 pb-8">
        <Link
          href="/services"
          className="animate-rise group inline-flex items-center gap-2 text-sm font-semibold text-fg-muted hover:text-fg transition-colors"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">←</span>
          <span>Tous les services</span>
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Contenu */}
          <div className="lg:col-span-7">
            <h1
              className="animate-rise font-display text-display-lg font-semibold text-fg"
              style={{ animationDelay: "60ms" }}
            >
              {service.title}
            </h1>

            {priceLabel && (
              <span
                className="animate-rise mt-6 inline-block font-mono-jb text-sm font-medium text-brand-glow border border-brand-glow/30 bg-brand/15 px-4 py-2 rounded-full whitespace-nowrap lg:hidden"
                style={{ animationDelay: "120ms" }}
              >
                {priceLabel}
              </span>
            )}

            <p
              className="animate-rise mt-8 text-lg sm:text-xl leading-relaxed text-fg-muted max-w-2xl"
              style={{ animationDelay: "180ms" }}
            >
              {service.full_description}
            </p>

            {service.points && service.points.length > 0 && (
              <ScrollReveal className="mt-14">
                <div className="rounded-3xl border border-paper/[0.14] bg-ink-2/80 backdrop-blur-xl p-7 sm:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <h2 className="font-mono-jb text-xs font-medium uppercase tracking-[0.18em] text-brand-glow mb-7">
                    Ce qui est inclus
                  </h2>
                  <ul className="divide-y divide-line">
                    {service.points.map((point: string, i: number) => (
                      <ScrollReveal
                        as="li"
                        key={i}
                        delay={i * 70}
                        y={14}
                        className="flex items-start gap-4 py-4 first:pt-0 last:pb-0 text-fg"
                      >
                        <span
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-glow"
                          aria-hidden="true"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="leading-relaxed">{point}</span>
                      </ScrollReveal>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}

            {service.note && (
              <ScrollReveal className="mt-6">
                <div className="flex items-start gap-4 rounded-2xl border border-amber-300/25 bg-amber-950/60 backdrop-blur-xl p-6">
                  <svg className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <p className="text-sm leading-relaxed text-amber-100/90 whitespace-pre-line">{service.note}</p>
                </div>
              </ScrollReveal>
            )}

            {/* CTA mobile / tablette (sur desktop : carte collante à droite) */}
            <div className="mt-10 lg:hidden">{ctaCard}</div>
          </div>

          {/* Carte prix + devis, collante sur desktop */}
          <aside className="hidden lg:block lg:col-span-5">
            <div className="sticky top-32 animate-rise" style={{ animationDelay: "240ms" }}>
              {ctaCard}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
