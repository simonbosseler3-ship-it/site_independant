import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-violet-200/60 bg-gradient-to-r from-violet-100/60 via-white/90 to-purple-100/60 backdrop-blur-md sticky top-0 z-50 shadow-sm shadow-violet-100/40">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo complet avec icône PC animée */}
        <Link href="/" className="flex items-center gap-3.5 group">
          
          <div className="relative flex items-center justify-center p-2.5 rounded-xl bg-slate-900 text-white transition-all duration-300 group-hover:bg-violet-600 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-violet-200">
            <svg
              className="w-7 h-7"
              viewBox="0 0 100 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6C7.58 6 4 9.58 4 14V48C4 52.42 7.58 56 12 56H88C92.42 56 96 52.42 96 48V14C96 9.58 92.42 6 88 6H12ZM10 12C8.9 12 8 12.9 8 14V48C8 49.1 8.9 50 10 50H90C91.1 50 92 49.1 92 48V14C92 12.9 91.1 12 90 12H10Z"
                fill="currentColor"
              />
              <path
                d="M42 56H58L62 66H38L42 56Z M32 66H68V71H32V66Z"
                fill="currentColor"
              />
              <g className="transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5">
                <path
                  d="M18 48L90 31V37L26 48H18Z"
                  fill="currentColor"
                  className="transition-colors duration-300 group-hover:text-violet-200"
                />
                <path
                  d="M32 41L90 19V25L42 41H32Z"
                  fill="currentColor"
                />
                <path
                  d="M50 30L90 12V14L62 30H50Z"
                  fill="currentColor"
                  className="transition-colors duration-300 group-hover:text-violet-200"
                />
              </g>
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-wide text-slate-900 leading-none">
              SIMON <span className="text-violet-600 group-hover:text-violet-700 transition-colors">BOSSELER</span>
            </span>
            <span className="text-[9px] tracking-widest text-slate-500 uppercase font-extrabold mt-1">
              Développement / Modernisation Site Web
            </span>
          </div>

        </Link>

        {/* Navigation : Capsule centrale avec pilules interactives */}
        <nav className="hidden md:flex items-center space-x-1 bg-white/70 backdrop-blur-sm p-1.5 rounded-full border border-violet-200/80 shadow-sm shadow-violet-100/50">
          <Link
            href="/"
            className="px-4 py-2 rounded-full text-sm font-bold text-slate-700 hover:text-violet-700 hover:bg-violet-100/80 transition-all duration-200"
          >
            Accueil
          </Link>
          <Link
            href="/services"
            className="px-4 py-2 rounded-full text-sm font-bold text-slate-700 hover:text-violet-700 hover:bg-violet-100/80 transition-all duration-200"
          >
            Services
          </Link>
          <Link
            href="/a-propos"
            className="px-4 py-2 rounded-full text-sm font-bold text-slate-700 hover:text-violet-700 hover:bg-violet-100/80 transition-all duration-200"
          >
            Mon Profil
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-full text-sm font-bold text-slate-700 hover:text-violet-700 hover:bg-violet-100/80 transition-all duration-200"
          >
            Contact
          </Link>
        </nav>

        {/* Bouton Devis */}
        <div>
          <Link
            href="/devis"
            className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            Faire un devis
          </Link>
        </div>

      </div>
    </header>
  );
}