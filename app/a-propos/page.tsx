import { supabase } from "@/lib/supabaseClient";
import BackgroundTrigger from "@/app/components/BackgroundTrigger";
import ScrollReveal from "@/app/components/ScrollReveal";
import PageHeader from "@/app/components/ui/PageHeader";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SpotlightCard from "@/app/components/ui/SpotlightCard";
import ButtonLink from "@/app/components/ui/Button";
import Timeline from "@/app/components/about/Timeline";

export default async function AproposPage() {
  const { data: timeline } = await supabase
    .from("about_timeline")
    .select("year, title, description")
    .order("display_order");

  const { data: skills } = await supabase
    .from("about_skills")
    .select("category, items")
    .order("display_order");

  return (
    <main className="relative overflow-x-clip">
      <BackgroundTrigger id="profile" />

      <div className="container-site">
        {/* Hero */}
        <PageHeader
          title={
            <>
              Simon Bosseler,{" "}
              <span className="accent-serif text-gradient-brand">développeur web indépendant</span>
            </>
          }
          description={
            <p>
              Étudiant en master à l&apos;UCLouvain, diplômé en informatique à la HE Leonard de Vinci, je conçois des
              sites web sur mesure pour des indépendants, commerces et associations — avec une exigence technique
              héritée de ma formation.
            </p>
          }
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <ButtonLink href="/devis" size="lg" arrow magnetic fullOnMobile>
              Discutons de votre projet
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary" fullOnMobile>
              Me contacter
            </ButtonLink>
          </div>
        </PageHeader>

        {/* Parcours */}
        <section className="py-20 sm:py-28">
          <SectionHeading eyebrow="Parcours" title="D'une formation solide à une activité indépendante" />
          <div className="mt-14">
            <Timeline steps={timeline ?? []} />
          </div>
        </section>

        {/* Compétences */}
        <section className="py-20 sm:py-28">
          <SectionHeading
            eyebrow="Compétences"
            title="Une base technique large, pas seulement du code"
            description="Mon master couvre bien plus que le développement web : cette rigueur se retrouve dans chaque projet que je livre."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {skills?.map((group, i) => (
              <ScrollReveal key={group.category} delay={i * 90}>
                <SpotlightCard className="h-full p-7 sm:p-8">
                  <span className="font-label tabular-nums text-xs text-fg-subtle" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-fg">{group.category}</h3>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {(group.items as string[]).map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-paper/[0.14] bg-paper/[0.05] px-3.5 py-1.5 text-sm text-fg transition-colors duration-300 hover:border-brand-glow/50 hover:bg-brand/20"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={200}>
            <div className="mt-5 flex items-start gap-4 rounded-2xl border border-paper/[0.14] bg-ink-2/80 backdrop-blur-xl p-5 sm:p-6 text-sm sm:text-base text-fg-muted">
              <span className="mt-0.5 shrink-0 rounded-lg bg-brand/20 p-1.5 text-brand-glow" aria-hidden="true">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                </svg>
              </span>
              <p>
                <span className="font-semibold text-brand-glow">À noter :</span> Je maîtrise également d’autres langages
                et technologies issus de ma formation en informatique, notamment Java, C et C++, qui me permettent
                d’avoir une compréhension plus large du développement logiciel.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Ma philosophie */}
        <section className="py-12 sm:py-20">
          <ScrollReveal>
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-strong via-[#4a3fa6] to-[#2b2670] px-7 py-14 sm:px-14 sm:py-20 shadow-[0_40px_100px_-40px_rgba(109,93,211,0.9)]">
              {/* Lignes de vitesse du logo, en filigrane */}
              <svg
                className="absolute -right-16 -top-10 -z-10 h-[420px] w-[420px] text-white/[0.08]"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden="true"
              >
                <path d="M92 8 L30 92 M92 26 L48 92 M92 44 L66 92" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 -z-10 grain opacity-[0.12] mix-blend-overlay" aria-hidden="true" />

              <p className="font-label tabular-nums text-xs uppercase tracking-[0.18em] text-violet-100">Ma philosophie</p>
              <h2 className="mt-6 max-w-4xl font-display text-display-md font-semibold text-white">
                Je ne me contente pas de livrer un site — je m&apos;assure qu&apos;il réponde{" "}
                <span className="accent-serif">vraiment à vos objectifs.</span>
              </h2>
              <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-violet-100">
                Étant étudiant, je garde une grande flexibilité dans mes disponibilités et un vrai souci du détail :
                chaque projet est l&apos;occasion de mettre en pratique une exigence technique construite au fil de ma
                formation, au service de clients qui méritent un travail sérieux, pas un site générique.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* CTA final */}
        <section className="py-20 sm:py-28 text-center">
          <SectionHeading
            align="center"
            title="Un projet en tête ? Parlons-en."
            description="Décrivez votre besoin en quelques minutes, je reviens vers vous rapidement avec une proposition claire."
          >
            <div className="mt-10 flex justify-center">
              <ButtonLink href="/devis" size="lg" arrow magnetic>
                Demander un devis
              </ButtonLink>
            </div>
          </SectionHeading>
        </section>
      </div>
    </main>
  );
}
