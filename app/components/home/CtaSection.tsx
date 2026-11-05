import BackgroundTrigger from "@/app/components/BackgroundTrigger";
import ScrollReveal from "@/app/components/ScrollReveal";
import ButtonLink from "@/app/components/ui/Button";
import CtaGlow from "@/app/components/home/CtaGlow";

export default function CtaSection() {
  return (
    <div className="relative">
      <BackgroundTrigger id="cta" />
      <section className="container-site py-12 sm:py-20">
        <ScrollReveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-line-strong bg-ink-2/80 backdrop-blur-xl px-6 py-14 sm:px-14 sm:py-20 lg:px-20 lg:py-24">
            <CtaGlow />

            {/* Trame de lignes de vitesse, rappel du logo */}
            <svg
              className="absolute -right-10 -bottom-10 -z-10 h-[340px] w-[340px] text-paper/[0.05]"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden="true"
            >
              <path d="M92 8 L30 92 M92 26 L48 92 M92 44 L66 92" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>

            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display text-display-lg font-semibold text-fg">
                  Prêt à concrétiser votre <span className="accent-serif text-gradient-brand">projet web</span> ?
                </h2>
                <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-fg-muted">
                  Obtenez une estimation personnalisée ou posez vos questions en quelques clics.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col xl:flex-row lg:items-end xl:justify-end gap-3">
                <ButtonLink href="/devis" variant="light" size="lg" arrow magnetic fullOnMobile>
                  Demander un devis
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" size="lg" fullOnMobile>
                  Me contacter
                </ButtonLink>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
