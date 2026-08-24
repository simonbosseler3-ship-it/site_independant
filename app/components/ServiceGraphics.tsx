export const serviceGraphics: Record<string, React.ReactNode> = {
  vitrine: (
    <div className="absolute -right-6 -bottom-6 w-52 h-52 pointer-events-none transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-3 group-hover:-translate-x-2 group-hover:rotate-1">
      <svg className="w-full h-full text-violet-500/10 group-hover:text-violet-500/20 transition-colors duration-500" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="180" height="110" rx="12" stroke="currentColor" strokeWidth="6" fill="currentColor" fillOpacity="0.03" />
        <path d="M20 28h160M20 110h160" stroke="currentColor" strokeWidth="4" />
        <circle cx="30" cy="19" r="3" fill="currentColor" />
        <circle cx="40" cy="19" r="3" fill="currentColor" />
        <circle cx="50" cy="19" r="3" fill="currentColor" />
        <path d="M80 120h40l8 22H72l8-22z" fill="currentColor" />
        <rect x="60" y="142" width="80" height="8" rx="4" fill="currentColor" />
        <rect x="30" y="40" width="60" height="50" rx="6" fill="currentColor" fillOpacity="0.1" />
        <rect x="100" y="40" width="70" height="12" rx="3" fill="currentColor" fillOpacity="0.2" />
        <rect x="100" y="58" width="55" height="8" rx="2" fill="currentColor" fillOpacity="0.15" />
        <rect x="100" y="70" width="65" height="8" rx="2" fill="currentColor" fillOpacity="0.15" />
        <rect x="100" y="82" width="40" height="8" rx="2" fill="currentColor" fillOpacity="0.15" />
      </svg>
    </div>
  ),
  refonte: (
    <div className="absolute -right-6 -bottom-6 w-52 h-52 pointer-events-none transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-3 group-hover:rotate-3">
      <svg className="w-full h-full text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors duration-500" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="25" width="120" height="110" rx="10" stroke="currentColor" strokeWidth="5" strokeDasharray="6 6" fill="none" />
        <rect x="65" y="65" width="120" height="110" rx="10" stroke="currentColor" strokeWidth="6" fill="currentColor" fillOpacity="0.05" />
        <path d="M65 85h120" stroke="currentColor" strokeWidth="4" />
        <path d="M105 45l-18 35h22l-12 35 32-42h-22l18-28z" fill="currentColor" className="transition-transform duration-700 group-hover:scale-110 group-hover:translate-x-1" />
      </svg>
    </div>
  ),
  "sur-mesure": (
    <div className="absolute -right-6 -bottom-6 w-52 h-52 pointer-events-none transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-3 group-hover:-rotate-2">
      <svg className="w-full h-full text-purple-500/10 group-hover:text-purple-500/20 transition-colors duration-500" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="70" height="70" rx="10" stroke="currentColor" strokeWidth="5" fill="currentColor" fillOpacity="0.05" className="transition-transform duration-500 group-hover:-translate-y-1" />
        <rect x="110" y="20" width="70" height="70" rx="10" stroke="currentColor" strokeWidth="5" fill="currentColor" fillOpacity="0.08" />
        <rect x="20" y="110" width="70" height="70" rx="10" stroke="currentColor" strokeWidth="5" fill="currentColor" fillOpacity="0.08" />
        <rect x="110" y="110" width="70" height="70" rx="10" stroke="currentColor" strokeWidth="5" fill="currentColor" fillOpacity="0.05" className="transition-transform duration-500 group-hover:translate-y-1" />
        <path d="M95 55h10M55 95v10M145 95v10M95 145h10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  ),
  maintenance: (
    <div className="absolute -right-6 -bottom-6 w-52 h-52 pointer-events-none transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-3 group-hover:rotate-6">
      <svg className="w-full h-full text-fuchsia-500/10 group-hover:text-fuchsia-500/20 transition-colors duration-500" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="6" fill="currentColor" fillOpacity="0.04" />
        <path d="M100 45v20M100 135v20M155 100h-20M65 100H45M137 63l-14 14M77 123l-14 14M137 137l-14-14M77 77L63 63" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="transition-transform duration-700 origin-[100px_100px] group-hover:rotate-45" />
        <circle cx="100" cy="100" r="18" fill="currentColor" fillOpacity="0.15" />
      </svg>
    </div>
  ),
    "e_commerce": (
    <div className="absolute -right-6 -bottom-6 w-52 h-52 pointer-events-none transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-3 group-hover:translate-x-1 group-hover:-rotate-2">
      <svg className="w-full h-full text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors duration-500" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="165" r="10" fill="currentColor" />
        <circle cx="150" cy="165" r="10" fill="currentColor" />
        <path d="M20 30h25l20 105h110" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M55 65h130l-15 60H70z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="4" />
        <path d="M90 45v-15a20 20 0 0140 0v15" stroke="currentColor" strokeWidth="5" fill="none" className="transition-transform duration-500 origin-[110px_45px] group-hover:-translate-y-1" />
      </svg>
    </div>
  ),
  "landing_page": (
    <div className="absolute -right-6 -bottom-6 w-52 h-52 pointer-events-none transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-3 group-hover:rotate-2">
      <svg className="w-full h-full text-blue-500/10 group-hover:text-blue-500/20 transition-colors duration-500" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="160" height="160" rx="14" stroke="currentColor" strokeWidth="5" fill="currentColor" fillOpacity="0.04" />
        <rect x="40" y="45" width="90" height="14" rx="4" fill="currentColor" fillOpacity="0.3" />
        <rect x="40" y="70" width="120" height="8" rx="2" fill="currentColor" fillOpacity="0.15" />
        <rect x="40" y="85" width="100" height="8" rx="2" fill="currentColor" fillOpacity="0.15" />
        <rect x="40" y="110" width="55" height="24" rx="12" fill="currentColor" className="transition-transform duration-500 group-hover:scale-105" />
        <circle cx="150" cy="150" r="18" stroke="currentColor" strokeWidth="4" fill="none" className="transition-transform duration-700 origin-[150px_150px] group-hover:rotate-45" />
        <path d="M150 138v24M138 150h24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  ),
};

export const serviceGraphicsAmbient: Record<
  string,
  { glow: string; icon: React.ReactNode }
> = {
  vitrine: {
    glow: "from-violet-200/60 via-purple-100/30 to-transparent",
    icon: (
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 28h160M20 110h160" stroke="currentColor" strokeWidth="2" />
        <circle cx="30" cy="19" r="2" fill="currentColor" />
        <circle cx="40" cy="19" r="2" fill="currentColor" />
        <circle cx="50" cy="19" r="2" fill="currentColor" />
        <path d="M80 120h40l8 22H72l8-22z" fill="currentColor" />
        <rect x="60" y="142" width="80" height="8" rx="4" fill="currentColor" />
        <rect x="30" y="40" width="60" height="50" rx="6" fill="currentColor" fillOpacity="0.5" />
        <rect x="100" y="40" width="70" height="12" rx="3" fill="currentColor" fillOpacity="0.6" />
        <rect x="100" y="58" width="55" height="8" rx="2" fill="currentColor" fillOpacity="0.5" />
        <rect x="100" y="70" width="65" height="8" rx="2" fill="currentColor" fillOpacity="0.5" />
        <rect x="100" y="82" width="40" height="8" rx="2" fill="currentColor" fillOpacity="0.5" />
      </svg>
    ),
  },
  refonte: {
    glow: "from-indigo-200/60 via-blue-100/30 to-transparent",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="25" width="120" height="110" rx="10" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" fill="none" />
        <rect x="65" y="65" width="120" height="110" rx="10" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.15" />
        <path d="M65 85h120" stroke="currentColor" strokeWidth="2" />
        <path d="M105 45l-18 35h22l-12 35 32-42h-22l18-28z" fill="currentColor" fillOpacity="0.7" />
      </svg>
    ),
  },
  "sur-mesure": {
    glow: "from-purple-200/60 via-fuchsia-100/30 to-transparent",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="70" height="70" rx="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.35" />
        <rect x="110" y="20" width="70" height="70" rx="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.5" />
        <rect x="20" y="110" width="70" height="70" rx="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.5" />
        <rect x="110" y="110" width="70" height="70" rx="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.35" />
        <path d="M95 55h10M55 95v10M145 95v10M95 145h10" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  maintenance: {
    glow: "from-fuchsia-200/60 via-pink-100/30 to-transparent",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.2" />
        <path d="M100 45v20M100 135v20M155 100h-20M65 100H45M137 63l-14 14M77 123l-14 14M137 137l-14-14M77 77L63 63" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="100" cy="100" r="18" fill="currentColor" fillOpacity="0.5" />
      </svg>
    ),
  },
    "e_commerce": {
    glow: "from-emerald-200/60 via-teal-100/30 to-transparent",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="165" r="10" fill="currentColor" />
        <circle cx="150" cy="165" r="10" fill="currentColor" />
        <path d="M20 30h25l20 105h110" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M55 65h130l-15 60H70z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
        <path d="M90 45v-15a20 20 0 0140 0v15" stroke="currentColor" strokeWidth="2.5" fill="none" />
      </svg>
    ),
  },
  "landing_page": {
    glow: "from-blue-200/60 via-sky-100/30 to-transparent",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="160" height="160" rx="14" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
        <rect x="40" y="45" width="90" height="14" rx="4" fill="currentColor" fillOpacity="0.5" />
        <rect x="40" y="70" width="120" height="8" rx="2" fill="currentColor" fillOpacity="0.3" />
        <rect x="40" y="85" width="100" height="8" rx="2" fill="currentColor" fillOpacity="0.3" />
        <rect x="40" y="110" width="55" height="24" rx="12" fill="currentColor" fillOpacity="0.6" />
        <circle cx="150" cy="150" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M150 138v24M138 150h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
};
