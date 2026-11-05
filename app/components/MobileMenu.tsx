"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { getLenis } from "@/app/components/SmoothScroll";
import { buttonClasses, ArrowIcon } from "@/app/components/ui/Button";

type NavLink = { label: string; href: string };

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

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
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Fermeture automatique quand la page change
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Blocage du scroll de la page + Échap + piège de focus
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []
      );
    requestAnimationFrame(() => focusables()[0]?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  const menuContent = (
    <AnimatePresence>
      {open && (
        <m.div
          key="mobile-menu"
          ref={panelRef}
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[110] md:hidden flex flex-col bg-ink/95 backdrop-blur-xl"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease }}
        >
          {/* Halo décoratif */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(70% 50% at 100% 0%, rgba(109,93,211,0.35) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Bouton fermer, aligné avec le bouton d'ouverture */}
          <div className="relative container-site pt-4 flex justify-end h-20 items-center">
            <button
              onClick={close}
              aria-label="Fermer le menu"
              className="w-11 h-11 rounded-full border border-line-strong flex items-center justify-center text-fg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Navigation mobile" className="relative container-site flex-1 flex flex-col justify-center">
            <ul className="space-y-1">
              {navLinks.map((link, i) => {
                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <li key={link.href} className="overflow-hidden">
                    <m.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-baseline gap-4 py-2 font-display text-[2.6rem] leading-none font-semibold tracking-tight transition-colors ${
                          active ? "text-fg" : "text-fg-muted hover:text-fg"
                        }`}
                      >
                        <span className="font-mono-jb text-xs text-brand-glow tracking-widest" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {link.label}
                      </Link>
                    </m.div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <m.div
            className="relative container-site pb-10 pt-6 flex flex-col gap-3 border-t border-line"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
          >
            {isLoggedIn && (
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full text-sm font-medium text-fg-muted hover:text-fg px-4 py-3 rounded-full border border-line-strong transition-colors"
                >
                  Déconnexion
                </button>
              </form>
            )}
            <Link href="/devis" onClick={close} className={buttonClasses({ size: "lg", className: "w-full" })}>
              <span>Faire un devis</span>
              <ArrowIcon />
            </Link>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        aria-controls="menu-mobile"
        className="w-11 h-11 flex items-center justify-center rounded-full border border-line-strong text-fg bg-paper/[0.04]"
      >
        <span className="w-[18px] flex flex-col gap-[5px]" aria-hidden="true">
          <span className="h-[1.5px] w-full bg-current rounded-full" />
          <span className="h-[1.5px] w-2/3 ml-auto bg-current rounded-full" />
        </span>
      </button>

      {mounted && createPortal(menuContent, document.body)}
    </div>
  );
}
