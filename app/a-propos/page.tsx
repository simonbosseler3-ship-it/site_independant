import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BackgroundTrigger from "@/app/components/BackgroundTrigger";
import ScrollReveal from "@/app/components/ScrollReveal";

export default async function AproposPage() {
  // Récupération dynamique depuis Supabase
  const { data: timeline } = await supabase
    .from("about_timeline")
    .select("year, title, description")
    .order("display_order");

  const { data: skills } = await supabase
    .from("about_skills")
    .select("category, items")
    .order("display_order");

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
      <BackgroundTrigger id="profile" />

      {/* Hero */}
      <section className="flex flex-col items-center text-center">
        <ScrollReveal delay={100}>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 max-w-2xl leading-[1.15]">
            Simon Bosseler,{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              développeur web indépendant
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-slate-600 text-lg sm:text-xl font-normal max-w-2xl leading-relaxed mt-8">
            Étudiant en master à l&apos;UCLouvain, diplômé en informatique, je conçois des sites web sur mesure pour des indépendants, commerces et associations — avec une exigence technique héritée de ma formation.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="pt-10 flex flex-wrap justify-center gap-4">
            <Link href="/devis" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base px-8 py-4 rounded-full transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5">
              Discutons de votre projet
            </Link>
            <Link href="/contact" className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-base px-8 py-4 rounded-full transition-all shadow-sm hover:border-slate-300">
              Me contacter
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Parcours */}
      <section className="mt-28 sm:mt-36">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-violet-600 tracking-wide uppercase mb-2">Parcours</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              D&apos;une formation solide à une activité indépendante
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {timeline?.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 100}>
              <div className="h-full bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm">
                <span className="inline-block text-xs font-bold text-violet-600 tracking-wide uppercase mb-3">
                  {step.year}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Compétences */}
      <section className="mt-28 sm:mt-36">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-violet-600 tracking-wide uppercase mb-2">Compétences</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Une base technique large, pas seulement du code
            </h2>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto">
              Mon master couvre bien plus que le développement web : cette rigueur se retrouve dans chaque projet que je livre.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {skills?.map((group, i) => (
            <ScrollReveal key={group.category} delay={i * 100}>
              <div className="h-full bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4">{group.category}</h3>
                <ul className="space-y-2.5">
                  {group.items.map((item: string) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Ambitions / Valeurs */}
      <section className="mt-28 sm:mt-36">
        <ScrollReveal>
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
            <p className="text-xs font-bold text-violet-100 tracking-wide uppercase mb-3">Ma philosophie</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold max-w-2xl leading-snug">
              Je ne me contente pas de livrer un site — je m&apos;assure qu&apos;il réponde vraiment à vos objectifs.
            </h2>
            <p className="mt-6 text-violet-100 max-w-2xl leading-relaxed">
              Étant étudiant, je garde une grande flexibilité dans mes disponibilités et un vrai souci du détail : chaque projet est l&apos;occasion de mettre en pratique une exigence technique construite au fil de ma formation, au service de clients qui méritent un travail sérieux, pas un site générique.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA final */}
      <section className="mt-28 sm:mt-36 text-center">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Un projet en tête ? Parlons-en.
          </h2>
          <p className="mt-4 text-slate-600 max-w-lg mx-auto">
            Décrivez votre besoin en quelques minutes, je reviens vers vous rapidement avec une proposition claire.
          </p>
          <div className="pt-8">
            <Link href="/devis" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base px-8 py-4 rounded-full transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5">
              Demander un devis
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}