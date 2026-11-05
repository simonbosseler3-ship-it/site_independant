import BackgroundTrigger from "@/app/components/BackgroundTrigger";
import ButtonLink from "@/app/components/ui/Button";
import ScrollReveal from "@/app/components/ScrollReveal";
import HeroScroll from "@/app/components/home/HeroScroll";

const pillars = [
  {
    title: "Proximité & Écoute",
    text: "Un interlocuteur unique de la première idée jusqu'à la mise en ligne.",
  },
  {
    title: "100% Sur-Mesure",
    text: "Zéro template générique. Des interfaces uniques adaptées à vos besoins.",
  },
  {
    title: "Rigueur & Performance",
    text: "Un code propre et optimisé pour garantir rapidité et sécurité.",
  },
];

/** Une ligne de titre révélée de bas en haut (CSS pur, visible dès le HTML serveur). */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <span className="block animate-rise" style={{ animationDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <div className="relative">
      <BackgroundTrigger id="hero" />
      <HeroScroll className="relative">
        <section className="container-site relative flex min-h-[100svh] flex-col justify-end pt-32 pb-10 sm:pb-14">
          {/* Lueur animée derrière le titre */}
          <div
            className="pointer-events-none absolute left-[-10%] top-[18%] h-[60vmin] w-[80vmin] rounded-full opacity-70 animate-float-slow motion-reduce:animate-none"
            style={{
              background: "radial-gradient(closest-side, rgba(109,93,211,0.45), rgba(109,93,211,0) 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative">
            <p
              className="animate-rise mb-6 sm:mb-8 inline-flex items-center gap-3 font-label tabular-nums text-[0.7rem] sm:text-xs uppercase tracking-[0.2em] text-fg-muted"
              style={{ animationDelay: "0ms" }}
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-glow opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-glow" />
              </span>
              Développement / Modernisation Site Web
            </p>

            <h1 className="font-display text-display-xl font-semibold text-fg max-w-[14ch] sm:max-w-[16ch]">
              <Line delay={80}>Développez votre activité grâce à une</Line>{" "}
              <Line delay={200}>
                <span className="accent-serif text-gradient-brand pr-[0.06em]">
                  présence en ligne professionnelle
                </span>
                .
              </Line>
            </h1>
          </div>

          <div className="relative mt-10 sm:mt-14 grid gap-8 xl:grid-cols-12 xl:items-end">
            <p
              className="animate-rise xl:col-span-7 max-w-2xl text-base sm:text-lg leading-relaxed text-fg-muted"
              style={{ animationDelay: "360ms" }}
            >
              Plus qu&apos;un simple prestataire, je me positionne comme votre partenaire technique. En tant que
              développeur indépendant, je mets un point d&apos;honneur à concevoir des solutions web performantes
              qui reflètent votre identité, avec une approche rigoureuse issue de mon parcours en ingénierie
              logicielle.
            </p>

            <div
              className="animate-rise xl:col-span-5 flex flex-col sm:flex-row xl:justify-end gap-3"
              style={{ animationDelay: "460ms" }}
            >
              <ButtonLink href="/devis" size="lg" arrow magnetic fullOnMobile>
                Lancer mon devis gratuit
              </ButtonLink>
              <ButtonLink href="#services" size="lg" variant="secondary" fullOnMobile>
                Découvrir mes services
              </ButtonLink>
            </div>
          </div>

          {/* Les 3 piliers, en bandeau */}
          <ul className="relative mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 border-t border-line">
            {pillars.map((p, i) => (
              <ScrollReveal
                as="li"
                key={p.title}
                delay={550 + i * 90}
                y={16}
                className={`group py-6 sm:py-7 sm:px-6 first:sm:pl-0 ${
                  i > 0 ? "border-t sm:border-t-0 sm:border-l border-line" : ""
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-label tabular-nums text-xs text-brand-glow" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-base sm:text-lg font-semibold text-fg">{p.title}</h2>
                </div>
                <p className="mt-2 pl-7 text-sm leading-relaxed text-fg-subtle group-hover:text-fg-muted transition-colors duration-500">
                  {p.text}
                </p>
              </ScrollReveal>
            ))}
          </ul>
        </section>
      </HeroScroll>
    </div>
  );
}
