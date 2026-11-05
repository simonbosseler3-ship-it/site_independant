import BackgroundTrigger from "@/app/components/BackgroundTrigger";
import ScrollReveal from "@/app/components/ScrollReveal";
import ServiceCard from "@/app/components/ServiceCard";
import SectionHeading from "@/app/components/ui/SectionHeading";

type Service = { slug: string; title: string; short_description: string };

/**
 * Grille « bento » : conserve la disposition d'origine par groupes de 5
 * (3 cartes en haut, 2 cartes décalées en dessous) sur grand écran,
 * 2 colonnes sur tablette, 1 colonne sur mobile.
 */
function desktopPlacement(index: number) {
  const posInGroup = index % 5;
  const groupNumber = Math.floor(index / 5);
  const isTopRow = posInGroup < 3;
  const colStart = isTopRow ? posInGroup * 2 + 1 : (posInGroup - 3) * 2 + 2;
  const rowStart = groupNumber * 2 + (isTopRow ? 1 : 2);
  return { "--col": `${colStart} / span 2`, "--row": `${rowStart}` } as React.CSSProperties;
}

export default function ServicesSection({ services }: { services: Service[] | null }) {
  const list = services ?? [];
  const lastIsAlone = list.length % 2 === 1;

  return (
    <div className="relative">
      <BackgroundTrigger id="services" />
      <section id="services" className="container-site scroll-mt-28 py-24 sm:py-32">
        <SectionHeading
          index="01"
          title="Mes Prestations"
          description="Cliquez sur un service pour explorer tous les détails et fonctionnalités incluses."
        />

        <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
          {list.map((service, index) => (
            <ScrollReveal
              key={service.slug}
              delay={(index % 3) * 90}
              style={desktopPlacement(index)}
              className={`lg:[grid-column:var(--col)] lg:[grid-row:var(--row)] ${
                // En 2 colonnes, une carte seule en fin de liste prend toute la largeur
                // (en lg, la règle [grid-column:var(--col)] reprend la main).
                lastIsAlone && index === list.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <ServiceCard service={service} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
