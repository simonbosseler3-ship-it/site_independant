import Link from "next/link";

const linkClass =
  "group/link relative inline-flex w-fit text-fg-muted hover:text-fg transition-colors duration-300 " +
  "after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-brand-glow " +
  "after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:origin-left hover:after:scale-x-100";

const socialClass =
  "group flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-paper/[0.03] text-fg-muted " +
  "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-glow/60 hover:bg-brand hover:text-white hover:shadow-[0_10px_30px_-10px_rgba(109,93,211,0.9)]";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 sm:mt-16 border-t border-line bg-ink/80 backdrop-blur-md overflow-hidden">
      {/* Liseré lumineux en haut du footer */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-glow/60 to-transparent"
        aria-hidden="true"
      />

      <div className="container-site pt-16 sm:pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="space-y-5 lg:col-span-5">
            <h4 className="font-display text-xl font-semibold text-fg">Simon Bosseler</h4>
            <div className="text-sm space-y-2.5 font-medium flex flex-col">
              <a href="mailto:simonbosseler3@gmail.com" className={linkClass}>
                simonbosseler3@gmail.com
              </a>
              <a href="tel:+32499625420" className={`${linkClass} font-mono-jb`}>
                +32 499 62 54 20
              </a>
              <p className="text-fg-subtle">Belgique</p>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-4">
            <h4 className="font-display text-xl font-semibold text-fg">Navigation</h4>
            <nav aria-label="Navigation du pied de page" className="flex flex-col gap-2.5 text-sm font-medium">
              <Link href="/devis" className={linkClass}>Demander un devis</Link>
              <Link href="/contact" className={linkClass}>Contact</Link>
              <Link href="/mentions-legales" className={linkClass}>Mentions légales</Link>
            </nav>
          </div>

          <div className="space-y-5 lg:col-span-3 lg:justify-self-end">
            <h4 className="font-display text-xl font-semibold text-fg">Me retrouver</h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100077993768306"
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/simon_bosseler/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Signature typographique géante (décorative) */}
        <div
          className="mt-16 sm:mt-24 select-none font-display font-bold leading-[0.8] tracking-[-0.05em] text-[clamp(2.5rem,10.5vw,8.5rem)] text-transparent bg-clip-text bg-gradient-to-b from-paper/[0.14] to-paper/0 whitespace-nowrap overflow-hidden"
          aria-hidden="true"
        >
          SIMON BOSSELER
        </div>

        <div className="mt-6 border-t border-line pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-fg-subtle">
          <div>© {currentYear} Simon Bosseler. Tous droits réservés.</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-glow animate-pulse motion-reduce:animate-none" aria-hidden="true" />
            Développé avec passion
          </div>
        </div>
      </div>
    </footer>
  );
}
