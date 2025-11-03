"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Locale = "fr" | "en";

type NavKey = "accueil" | "historique" | "apropos" | "contact";

type NavItem = {
  key: NavKey;
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const buildNav = (l: Locale): NavItem[] => [
  { key: "accueil", label: l === "fr" ? "ACCUEIL" : "HOME", href: `/${l}` },
  { key: "historique", label: l === "fr" ? "HISTORIQUE" : "HISTORY", href: `/${l}/historique` },
  { key: "apropos", label: l === "fr" ? "À PROPOS" : "ABOUT", href: `/${l}/a-propos` },
  { key: "contact", label: l === "fr" ? "CONTACT" : "CONTACT", href: `/${l}/contact` },
];

export default function MainNav({ locale }: { locale: Locale }) {
  const nav = buildNav(locale);
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeKey, setActiveKey] = useState<NavKey | null>(null);

  // Active key follows the current route
  useEffect(() => {
    if (!pathname) return;
    const match = nav.find((item) => {
      if (item.href) {
        // Correspondance exacte pour l'accueil
        if (item.key === "accueil") {
          return pathname === item.href;
        }
        // Pour les autres pages, vérifier que le pathname commence par l'href
        return pathname.startsWith(item.href);
      }
      return item.children?.some((c) => pathname.startsWith(c.href));
    });
    setActiveKey(match?.key ?? null);
  }, [pathname, nav]);

  // Affiche tous les menus; pas de regroupement "PLUS"

  return (
    <nav className="container mx-auto px-4 bg-[#BE2722]">
      <ul className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16 text-white text-sm md:text-base font-medium">
        {nav.map((item) => {
          const isRouteActive = item.href ? (
            item.key === "accueil" 
              ? pathname === item.href 
              : pathname?.startsWith(item.href)
          ) : false;
          const isActive = isRouteActive;

          return (
            <li key={item.key} className="relative">
              <Link
                href={item.href!}
                className={`block px-4 py-4 transition-all duration-200 ease-out hover:text-black ${
                  isActive 
                    ? "text-black font-bold" 
                    : "text-white hover:scale-105"
                }`}
                onClick={() => setActiveKey(item.key)}
              >
                {item.label}
              </Link>
              {/* Indicateur actif */}
              <span
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[3px] bg-black transition-all duration-300 ease-out ${
                  isActive ? "w-full opacity-100" : "w-0 opacity-0"
                }`}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
