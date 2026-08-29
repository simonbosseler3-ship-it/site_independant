import BackgroundTrigger from "@/app/components/BackgroundTrigger";
import ScrollReveal from "@/app/components/ScrollReveal";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="relative max-w-3xl mx-auto px-6 py-16 sm:py-24">
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-violet-600/20 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute top-[30%] -right-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-600/15 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute -bottom-32 left-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/20 rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      <BackgroundTrigger id="contact" />

      {/* EN-TÊTE */}
      <section className="flex flex-col items-center text-center mb-16">
        <ScrollReveal delay={100}>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Contact{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Direct
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-6 max-w-xl mx-auto relative">
            <div className="absolute inset-0 bg-white/70 blur-xl rounded-2xl -z-10" />
            <p className="text-slate-700 text-lg font-medium leading-relaxed px-4 py-2">
              Une question, un conseil ou un problème technique ? N&apos;hésitez pas à me joindre directement par le moyen qui vous convient le mieux.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* GRILLE DE CONTACT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <ScrollReveal delay={300}>
          <a
            href="mailto:hello@votre-domaine.fr"
            className="group flex flex-col items-center text-center bg-white/70 border border-slate-200/80 rounded-3xl p-8 hover:bg-white hover:border-violet-300 transition-all duration-300 shadow-sm hover:shadow-md h-full"
          >
            <div className="w-14 h-14 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Par Email</h2>
            <p className="text-slate-600 text-sm mb-4 flex-grow">
              Pour des questions détaillées ou m&apos;envoyer des documents.
            </p>
            <span className="text-violet-600 font-medium">simonbosseler3@gmail.com</span>
          </a>
        </ScrollReveal>

        {/* Téléphone */}
        <ScrollReveal delay={400}>
          <a
            href="tel:+33600000000"
            className="group flex flex-col items-center text-center bg-white/70 border border-slate-200/80 rounded-3xl p-8 hover:bg-white hover:border-violet-300 transition-all duration-300 shadow-sm hover:shadow-md h-full"
          >
            <div className="w-14 h-14 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Par Téléphone</h2>
            <p className="text-slate-600 text-sm mb-4 flex-grow">
              Pour une urgence ou discuter de vive voix de votre idée.
            </p>
            <span className="text-violet-600 font-medium">+32 499 62 54 20</span>
          </a>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={600}>
        <div className="mt-12 text-center">
          <p className="text-slate-600 text-sm mb-4">
            Vous avez déjà une idée précise et souhaitez une estimation ?
          </p>
          <Link
            href="/devis"
            className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 hover:border-violet-300 text-sm font-semibold rounded-full text-slate-700 hover:text-violet-700 bg-white hover:bg-violet-50 transition-all shadow-sm"
          >
            Faire une demande de devis
          </Link>
        </div>
      </ScrollReveal>
    </main>
  );
}