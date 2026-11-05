"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import Logo from "@/app/components/Logo";
import MobileMenu from "@/app/components/MobileMenu";
import ButtonLink from "@/app/components/ui/Button";

type NavLink = { label: string; href: string };

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function NavbarClient({
  navLinks,
  isLoggedIn,
  logoutAction,
}: {
  navLinks: NavLink[];
  isLoggedIn: boolean;
  logoutAction: () => Promise<void>;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const highlighted = hovered ?? navLinks.find((l) => isActive(pathname, l.href))?.href ?? null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div
        className={`container-site transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "pt-3" : "pt-4 sm:pt-6"
        }`}
      >
        <div
          className={`pointer-events-auto flex items-center justify-between gap-3 rounded-full border pl-3 pr-2 sm:pl-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "h-14 sm:h-16 border-line bg-ink/70 backdrop-blur-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
              : "h-16 sm:h-[4.5rem] border-transparent bg-transparent"
          }`}
        >
          <Logo />

          {/* Navigation desktop : pastille animée qui suit le survol / la page active */}
          <nav aria-label="Navigation principale" className="hidden md:block">
            <ul className="flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onMouseEnter={() => setHovered(link.href)}
                      onFocus={() => setHovered(link.href)}
                      onBlur={() => setHovered(null)}
                      className={`relative block px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                        active || hovered === link.href ? "text-fg" : "text-fg-muted"
                      }`}
                    >
                      {highlighted === link.href && (
                        <m.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-paper/[0.08] border border-line"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative">{link.label}</span>
                      {active && (
                        <span
                          className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-glow"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn && (
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-sm font-medium text-fg-muted hover:text-fg px-4 py-2.5 rounded-full border border-line hover:border-line-strong transition-colors"
                >
                  Déconnexion
                </button>
              </form>
            )}
            <ButtonLink href="/devis" arrow magnetic>
              Faire un devis
            </ButtonLink>
          </div>

          <MobileMenu navLinks={navLinks} isLoggedIn={isLoggedIn} logoutAction={logoutAction} />
        </div>
      </div>
    </header>
  );
}
