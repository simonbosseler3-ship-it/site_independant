import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/60 bg-white/30 backdrop-blur-md mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-lg font-extrabold text-slate-900">Simon Bosseler</h4>
            <div className="text-slate-600 text-sm space-y-2 font-medium">
              <p>
                <a href="mailto:contact@tonsite.be" className="hover:text-violet-600 transition-colors">
                  simonbosseler3@gmail.be
                </a>
              </p>
              <p>
                <a href="tel:+32400000000" className="hover:text-violet-600 transition-colors">
                  +32 499 62 54 20
                </a>
              </p>
              <p>Belgique</p>
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left md:ml-auto">
            <h4 className="text-lg font-extrabold text-slate-900">Navigation</h4>
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-600">
              <Link href="/devis" className="hover:text-violet-600 transition-colors">Demander un devis</Link>
              <Link href="/contact" className="hover:text-violet-600 transition-colors">Contact</Link>
              <Link href="/mentions-legales" className="hover:text-violet-600 transition-colors">Mentions légales</Link>
            </nav>
          </div>

          {/* Colonne 3 : Réseaux Sociaux */}
          <div className="space-y-4 text-center md:text-right">
            <h4 className="text-lg font-extrabold text-slate-900">Me retrouver</h4>
            <div className="flex justify-center md:justify-end gap-4">
              
              {/* Icône Facebook */}
              <a 
                href="https://www.facebook.com/profile.php?id=100077993768306" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group p-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-violet-50 hover:border-violet-200 hover:scale-110 hover:-translate-y-1 transition-all duration-300 ease-out"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-slate-500 group-hover:text-violet-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>

              {/* Icône Instagram */}
              <a 
                href="https://www.instagram.com/simon_bosseler/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group p-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-violet-50 hover:border-violet-200 hover:scale-110 hover:-translate-y-1 transition-all duration-300 ease-out"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-slate-500 group-hover:text-violet-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              
            </div>
          </div>

        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-slate-200/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm">
            © {currentYear} Simon Bosseler. Tous droits réservés.
          </div>
          
          {/* Petit clin d'oeil au dev */}
          <div className="text-slate-500 text-sm">
            Développé avec passion
          </div>
        </div>
        
      </div>
    </footer>
  );
}