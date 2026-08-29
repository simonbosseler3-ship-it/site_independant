"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

type NavLink = { label: string; href: string };

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function MobileMenu({
  navLinks,
  isLoggedIn,
  logoutAction,
}: {
  navLinks: NavLink[];
  isLoggedIn: boolean;
  logoutAction: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const mounted = useIsMounted();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const menuContent = (
    <>
      {/* Voile sombre derrière le panneau */}
      <div
        className={`fixed inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-500 z-[100] ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Panneau latéral — verre dépoli */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-white/70 backdrop-blur-xl border-l border-white/60 shadow-2xl z-[110] transition-all duration-500 ease-out pt-24 px-6 flex flex-col gap-1 ${
          open
            ? "translate-x-0 opacity-100"
            : "translate-x-8 opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-base font-semibold text-slate-800 hover:text-violet-600 hover:bg-white/60 rounded-xl px-4 py-3 transition-colors"
          >
            {link.label}
          </Link>
        ))}

        <div className="mt-4 pt-4 border-t border-slate-300/40 flex flex-col gap-3">
          {isLoggedIn && (
            <form action={logoutAction}>
              <button
                type="submit"
                className="w-full text-sm font-semibold text-slate-600 hover:text-violet-600 px-4 py-2.5 rounded-full border border-slate-300/60 hover:border-violet-300 transition-colors"
              >
                Déconnexion
              </button>
            </form>
          )}
          <Link
            href="/devis"
            onClick={() => setOpen(false)}
            className="text-center bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm px-6 py-3 rounded-full shadow-md shadow-violet-500/20"
          >
            Faire un devis
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        className="relative z-50 w-10 h-10 flex items-center justify-center rounded-full text-slate-700 hover:bg-violet-50 transition-colors"
      >
        <div className="w-5 flex flex-col gap-1.5">
          <span
            className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-current rounded-full transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </div>
      </button>

      {mounted && createPortal(menuContent, document.body)}
    </div>
  );
}