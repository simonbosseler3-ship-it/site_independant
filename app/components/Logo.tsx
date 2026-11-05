import Link from "next/link";

/** Logo d'origine (écran + lignes de vitesse), adapté au thème sombre. */
export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
    >
      <div className="relative flex items-center justify-center p-2 rounded-xl bg-paper text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_0_24px_rgba(109,93,211,0.6)]">
        <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 6C7.58 6 4 9.58 4 14V48C4 52.42 7.58 56 12 56H88C92.42 56 96 52.42 96 48V14C96 9.58 92.42 6 88 6H12ZM10 12C8.9 12 8 12.9 8 14V48C8 49.1 8.9 50 10 50H90C91.1 50 92 49.1 92 48V14C92 12.9 91.1 12 90 12H10Z"
            fill="currentColor"
          />
          <path d="M42 56H58L62 66H38L42 56Z M32 66H68V71H32V66Z" fill="currentColor" />
          <g className="transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5">
            <path d="M18 48L90 31V37L26 48H18Z" fill="currentColor" className="transition-opacity duration-300 group-hover:opacity-70" />
            <path d="M32 41L90 19V25L42 41H32Z" fill="currentColor" />
            <path d="M50 30L90 12V14L62 30H50Z" fill="currentColor" className="transition-opacity duration-300 group-hover:opacity-70" />
          </g>
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="font-display text-base sm:text-lg font-bold tracking-[0.04em] text-fg leading-none whitespace-nowrap">
          SIMON <span className="text-brand-glow">BOSSELER</span>
        </span>
        <span className="font-label tabular-nums text-[7px] sm:text-[8.5px] tracking-[0.16em] text-fg-subtle uppercase mt-1.5">
          Développement / Modernisation Site Web
        </span>
      </div>
    </Link>
  );
}
