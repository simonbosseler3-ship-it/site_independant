import BackgroundTrigger from "@/app/components/BackgroundTrigger";
import ScrollReveal from "@/app/components/ScrollReveal";
import PageHeader from "@/app/components/ui/PageHeader";
import SpotlightCard from "@/app/components/ui/SpotlightCard";
import ButtonLink from "@/app/components/ui/Button";

const channels = [
  {
    href: "mailto:simonbosseler3@gmail.com",
    title: "Par Email",
    text: "Pour des questions détaillées ou m'envoyer des documents.",
    value: "simonbosseler3@gmail.com",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    href: "tel:+32499625420",
    title: "Par Téléphone",
    text: "Pour une urgence ou discuter de vive voix de votre idée.",
    value: "+32 499 62 54 20",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
  },
];

export default function ContactPage() {
  return (
    <main className="relative overflow-x-clip">
      <BackgroundTrigger id="contact" />

      <div className="container-site max-w-5xl">
        <PageHeader
          align="center"
          title={
            <>
              Contact <span className="accent-serif text-gradient-brand">Direct</span>
            </>
          }
          description={
            <p>
              Une question, un conseil ou un problème technique ? N&apos;hésitez pas à me joindre directement par le
              moyen qui vous convient le mieux.
            </p>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {channels.map((c, i) => (
            <ScrollReveal key={c.href} delay={150 + i * 100}>
              <SpotlightCard href={c.href} className="h-full p-8 sm:p-10 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-glow/30 bg-brand/15 text-brand-glow transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:bg-brand group-hover:border-brand group-hover:text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      {c.icon}
                    </svg>
                  </span>
                  <svg
                    className="w-5 h-5 text-fg-subtle transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-brand-glow group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </div>

                <h2 className="mt-8 font-display text-2xl font-semibold text-fg">{c.title}</h2>
                <p className="mt-2 flex-grow text-sm sm:text-base leading-relaxed text-fg-muted">{c.text}</p>
                <span className="mt-8 [overflow-wrap:anywhere] font-display text-xl sm:text-2xl font-medium text-brand-glow transition-colors group-hover:text-white">
                  {c.value}
                </span>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-16 sm:mt-20 flex flex-col items-center gap-5 text-center">
            <p className="text-fg-muted">Vous avez déjà une idée précise et souhaitez une estimation ?</p>
            <ButtonLink href="/devis" variant="secondary" arrow>
              Faire une demande de devis
            </ButtonLink>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
