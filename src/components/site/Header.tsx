"use client";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "@/components/site/LanguageSwitcher";
import MainNav from "@/components/site/MainNav";
import NewsletterModal from "@/components/modals/NewsletterModal";
import { useEffect, useState } from "react";
import { SignedOut, SignedIn, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { usePathname, useSearchParams } from "next/navigation";

type L = "fr" | "en";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
  icon?: React.ReactNode;
  color?: string;
};

const buildMobileNav = (l: L): NavItem[] => [
  { 
    label: l === "fr" ? "ACCUEIL" : "HOME", 
    href: `/${l}`,
    color: "#BE2722",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    )
  },
  { 
    label: l === "fr" ? "HISTORIQUE" : "HISTORY", 
    href: `/${l}/historique`,
    color: "#F59E0B",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
      </svg>
    )
  },
  { 
    label: l === "fr" ? "À PROPOS" : "ABOUT", 
    href: `/${l}/a-propos`,
    color: "#3B82F6",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    )
  },
  { 
    label: l === "fr" ? "CONTACT" : "CONTACT", 
    href: `/${l}/contact`,
    color: "#10B981",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    )
  },
  { 
    label: l === "fr" ? "ZONES PASTORALES" : "PASTORAL ZONES", 
    href: `/${l}/zones-pastorales`,
    color: "#8B5CF6",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    )
  },
  { 
    label: l === "fr" ? "PAROISSES" : "PARISHES", 
    href: `/${l}/paroisses`,
    color: "#EC4899",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 12.22V9l-5-2.5V5h2V3h-2V1h-2v2H9v2h2v1.5L6 9v3.22L2 14v8h8v-4h4v4h8v-8l-4-1.78zM12 13.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      </svg>
    )
  },
  { 
    label: l === "fr" ? "ACTUALITÉS" : "NEWS", 
    href: `/${l}/actualites`,
    color: "#EF4444",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    )
  },
  { 
    label: l === "fr" ? "AGENDA" : "EVENTS", 
    href: `/${l}/agenda`,
    color: "#06B6D4",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
      </svg>
    )
  },
  { 
    label: l === "fr" ? "MÉDIAS" : "MEDIA", 
    href: `/${l}/medias`,
    color: "#6366F1",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
      </svg>
    )
  },
];

export default function Header({ locale }: { locale: L }) {
  const l = locale;
  const [open, setOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = (() => {
    const qs = searchParams?.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  })();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Charger l'état admin si connecté
  useEffect(() => {
    if (!isSignedIn || !user) {
      setIsAdmin(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/admin/auth/me');
        if (!res.ok) { if (!cancelled) setIsAdmin(false); return; }
        const json = await res.json();
        if (!cancelled) setIsAdmin(!!json.user?.isAdmin);
      } catch {
        if (!cancelled) setIsAdmin(false);
      }
    })();
    return () => { cancelled = true; };
  }, [isSignedIn, user, pathname]);

  // Fermer le menu mobile sur changement de route
  useEffect(() => {
    setOpen(false);
    setOpenIdx(null);
  }, [pathname]);

  const mobileNav = buildMobileNav(l);

  return (
    <header className="border-b bg-white">
      {/* top utility bar */}
  <div className="hidden md:block bg-green-700 text-white text-xs">
        <div className="container mx-auto px-4 h-9 grid grid-cols-3 items-center">
          {/* Left: social icons */}
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" title="Facebook" className="opacity-90 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-white">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H8.078V12h2.36V9.797c0-2.332 1.393-3.62 3.523-3.62 1.021 0 2.09.182 2.09.182v2.296h-1.178c-1.162 0-1.525.721-1.525 1.46V12h2.594l-.414 2.89h-2.18v6.988C18.343 21.128 22 16.99 22 12z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" title="LinkedIn" className="opacity-90 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-white">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
                <path d="M7 11v6" />
                <path d="M11 17v-4a2 2 0 0 1 4 0v4" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter (X)" title="Twitter (X)" className="opacity-90 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-white">
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" title="YouTube" className="opacity-90 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-white">
                <rect x="3" y="6" width="18" height="12" rx="3" />
                <path d="M11 9l5 3-5 3z" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
          {/* Center: support/donate | webmail | newsletter */}
          <div className="flex items-center justify-center gap-4">
            <Link href={`/${l}/dons`} className="tracking-wide hover:underline uppercase">{l === "fr" ? "Dons" : "Donate"}</Link>
            <span className="opacity-60">|</span>
            <Link href={`/${l}/webmail`} className="tracking-wide hover:underline uppercase">Webmail</Link>
            <span className="opacity-60">|</span>
            <button 
              onClick={() => setIsNewsletterModalOpen(true)}
              className="tracking-wide hover:underline uppercase"
            >
              Newsletter
            </button>
          </div>
          {/* Right: login | register */}
          <div className="flex items-center justify-end gap-4">
            {isAdmin && (
              <Link href={`/${l}/admin`} className="uppercase hover:underline">Admin</Link>
            )}
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl={currentUrl} fallbackRedirectUrl={currentUrl}>
                <button className="hover:underline uppercase">Login</button>
              </SignInButton>
              <span className="opacity-60">|</span>
              <SignUpButton mode="modal" forceRedirectUrl={currentUrl} signInForceRedirectUrl={currentUrl} fallbackRedirectUrl={currentUrl}>
                <button className="hover:underline uppercase">Register</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl={currentUrl || `/${l}`} />
            </SignedIn>
          </div>
        </div>
      </div>
      {/* brand + quick links row */}
      <div className="bg-white">
        <div className="container mx-auto px-2 md:px-3 py-3 md:py-4 grid grid-cols-12 items-center gap-2 md:gap-4">
          {/* Logo */}
          <div className="col-span-12 md:col-span-3 flex items-center gap-1.5">
            <Link href={`/${l}`} className="flex items-center gap-2">
              <Image src="/logo.jpeg" alt="Blason Archidiocèse" width={48} height={48} className="w-12 h-12 object-contain" />
              <span className="sr-only">Logo</span>
              <span className="text-xl font-semibold text-neutral-900 border-2 border-[#BE2722] px-3 py-1 rounded">Archidiocèse de Yaoundé</span>
            </Link>
          </div>
          {/* Center mini-icon quick links */}
          <div className="hidden md:flex col-span-12 md:col-span-6 justify-center gap-8 text-sm text-gray-600 flex-wrap">
            {/* Menu Service avec sous-menu */}
            <div className="relative group">
              <div className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <div className="leading-tight">
                  <div className="uppercase text-[10px] tracking-wide opacity-70">Service</div>
                  <div>Services</div>
                </div>
              </div>
              {/* Sous-menu */}
              <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-lg py-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href={`/${l}/services-diocesains`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#BE2722]">
                  Conseil presbytérial
                </Link>
                <Link href={`/${l}/services-diocesains`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#BE2722]">
                  Conseil pour les affaires économiques
                </Link>
              </div>
            </div>
            <Link href={`/${l}/radios`} className="flex items-center gap-2 hover:text-gray-900">
              {/* Radio icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 7l14-5" />
                <rect x="2" y="7" width="20" height="12" rx="2" />
                <circle cx="8" cy="13" r="2" />
                <path d="M14 13h6M14 17h6" />
              </svg>
              <div className="leading-tight">
                <div className="uppercase text-[10px] tracking-wide opacity-70">Radios</div>
                <div>Radios Diocésaine</div>
              </div>
            </Link>
            <Link href={`/${l}/television`} className="flex items-center gap-2 hover:text-gray-900">
              {/* Television icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="7" width="18" height="12" rx="2" />
                <path d="M8 7l4-4 4 4" />
                <path d="M12 11h6M12 15h6" />
              </svg>
              <div className="leading-tight">
                <div className="uppercase text-[10px] tracking-wide opacity-70">Télévision</div>
                <div>Télévision Diocésaine</div>
              </div>
            </Link>
          </div>
          {/* Right search + language */}
          <div className="hidden md:flex col-span-12 md:col-span-3 items-center justify-end gap-2 min-w-0">
            <form action={`/${l}/recherche`} className="flex items-stretch border border-neutral-400 rounded shadow-sm max-w-[190px] sm:max-w-[220px] w-full">
              <input
                className="bg-white text-black placeholder-neutral-500 px-2 py-1.5 text-sm w-[120px] sm:w-[160px] md:w-[180px]"
                placeholder={l === "fr" ? "Rechercher" : "Search"}
                aria-label={l === "fr" ? "Recherche" : "Search"}
                name="q"
              />
              <button type="submit" className="px-2 sm:px-3 py-1.5 text-sm text-neutral-700 hover:text-green-800" aria-label={l === "fr" ? "Rechercher" : "Search"}>
                🔍
              </button>
            </form>
            <LanguageSwitcher locale={l} />
          </div>
          {/* Mobile bar actions: burger */}
          <div className="md:hidden col-span-12 flex items-center justify-end gap-2">
            <button
              aria-label={open ? (l === "fr" ? "Fermer le menu" : "Close menu") : (l === "fr" ? "Ouvrir le menu" : "Open menu")}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center w-10 h-10 rounded border border-neutral-200 text-neutral-800"
            >
              {!open ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
              )}
            </button>
          </div>
        </div>
      </div>
  {/* main nav bar desktop only to avoid heavy band on mobile */}
  <div className="bg-[#BE2722] hidden md:block">
        <MainNav locale={l} />
      </div>

      {/* Mobile drawer - styled like UCAC */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-[#1a1a1a] shadow-2xl flex flex-col">
            {/* Header du menu mobile */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <span className="text-sm uppercase tracking-wide text-gray-400">Menu</span>
              <button aria-label="Fermer" onClick={() => setOpen(false)} className="w-8 h-8 grid place-items-center rounded bg-gray-800 text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto">
              <ul className="divide-y divide-gray-800">
                {mobileNav.map((item, idx) => {
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                  return (
                    <li key={idx}>
                      {item.children ? (
                        <details open={openIdx === idx} onToggle={(e) => setOpenIdx((e.target as HTMLDetailsElement).open ? idx : null)}>
                          <summary className={`flex items-center justify-between px-4 py-4 cursor-pointer transition-colors ${isActive ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
                            <div className="flex items-center gap-3">
                              {item.icon && (
                                <span style={{ color: item.color }} className="flex-shrink-0">
                                  {item.icon}
                                </span>
                              )}
                              <span className="text-white font-medium text-sm tracking-wide">{item.label}</span>
                            </div>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M6 9l6 6 6-6"/></svg>
                          </summary>
                          <ul className="bg-gray-900">
                            {item.children.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} onClick={() => setOpen(false)} className="block px-12 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ) : (
                        <Link 
                          href={item.href!} 
                          onClick={() => setOpen(false)} 
                          className={`flex items-center justify-between px-4 py-4 transition-colors ${isActive ? 'bg-[#BE2722]' : 'hover:bg-gray-800'}`}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon && (
                              <span style={{ color: isActive ? 'white' : item.color }} className="flex-shrink-0">
                                {item.icon}
                              </span>
                            )}
                            <span className={`font-medium text-sm tracking-wide ${isActive ? 'text-white' : 'text-gray-200'}`}>{item.label}</span>
                          </div>
                          {/* Icônes carrées colorées à droite comme UCAC */}
                          {item.icon && (
                            <span 
                              style={{ backgroundColor: item.color }} 
                              className="w-10 h-10 rounded flex items-center justify-center text-white flex-shrink-0"
                            >
                              {item.icon}
                            </span>
                          )}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Search bar like UCAC */}
              <div className="p-4 border-t border-gray-800">
                <form action={`/${l}/recherche`} className="flex items-stretch bg-gray-800 rounded overflow-hidden">
                  <input 
                    className="bg-transparent text-white placeholder-gray-500 px-4 py-3 text-sm flex-1 focus:outline-none" 
                    name="q" 
                    placeholder={l === "fr" ? "Rechercher" : "Search"} 
                  />
                  <button type="submit" className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                  </button>
                </form>
              </div>

              {/* Quick links */}
              <div className="p-4 border-t border-gray-800 space-y-3">
                {isAdmin && (
                  <Link href={`/${l}/admin`} onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded px-4 py-3 text-sm bg-green-600 text-white hover:bg-green-700 font-medium">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Admin
                  </Link>
                )}
                <SignedOut>
                  <div className="grid grid-cols-2 gap-3">
                    <SignInButton mode="modal" forceRedirectUrl={currentUrl} fallbackRedirectUrl={currentUrl}>
                      <button
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 rounded px-4 py-3 text-sm bg-[#BE2722] text-white hover:bg-[#a51f1a] font-medium w-full"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        {l === "fr" ? "Connexion" : "Login"}
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal" forceRedirectUrl={currentUrl} signInForceRedirectUrl={currentUrl} fallbackRedirectUrl={currentUrl}>
                      <button
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 rounded px-4 py-3 text-sm bg-gray-700 text-white hover:bg-gray-600 font-medium w-full"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        {l === "fr" ? "Inscription" : "Register"}
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center justify-center py-2">
                    <UserButton afterSignOutUrl={currentUrl || `/${l}`} showName />
                  </div>
                </SignedIn>
                
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    href={`/${l}/dons`}
                    onClick={() => setOpen(false)}
                    className="flex flex-col items-center justify-center gap-1 rounded px-3 py-3 text-xs bg-[#BE2722] text-white hover:bg-[#a51f1a] font-medium"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    Dons
                  </Link>
                  <Link
                    href={`/${l}/webmail`}
                    onClick={() => setOpen(false)}
                    className="flex flex-col items-center justify-center gap-1 rounded px-3 py-3 text-xs bg-[#6366F1] text-white hover:bg-[#4f46e5] font-medium"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    Webmail
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setIsNewsletterModalOpen(true);
                    }}
                    className="flex flex-col items-center justify-center gap-1 rounded px-3 py-3 text-xs bg-[#10B981] text-white hover:bg-[#059669] font-medium"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                    Newsletter
                  </button>
                </div>
              </div>

              {/* Language switcher */}
              <div className="p-4 border-t border-gray-800">
                <LanguageSwitcher locale={l} />
              </div>
            </nav>
          </div>
        </div>
      )}
      
      {/* Newsletter Modal */}
      <NewsletterModal 
        isOpen={isNewsletterModalOpen} 
        onClose={() => setIsNewsletterModalOpen(false)} 
      />
    </header>
  );
}
