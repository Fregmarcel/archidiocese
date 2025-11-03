"use client";
import Link from "next/link";
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
};

const buildMobileNav = (l: L): NavItem[] => [
  { label: l === "fr" ? "ACCUEIL" : "HOME", href: `/${l}` },
  { label: l === "fr" ? "HISTORIQUE" : "HISTORY", href: `/${l}/historique` },
  { label: l === "fr" ? "À PROPOS" : "ABOUT", href: `/${l}/a-propos` },
  { label: l === "fr" ? "CONTACT" : "CONTACT", href: `/${l}/contact` },
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
              <div className="w-12 h-12 bg-red-700 rounded" aria-hidden />
              <span className="sr-only">Logo</span>
              <span className="text-xl font-semibold text-neutral-900">Archidiocèse de Yaoundé</span>
            </Link>
          </div>
          {/* Center mini-icon quick links */}
          <div className="hidden md:flex col-span-12 md:col-span-6 justify-center gap-8 text-sm text-gray-600 flex-wrap">
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

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-xs uppercase tracking-wide text-neutral-500">Menu</span>
              <button aria-label="Fermer" onClick={() => setOpen(false)} className="w-8 h-8 grid place-items-center rounded border border-neutral-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-3">
              <ul className="space-y-1">
                {mobileNav.map((item, idx) => (
                  <li key={idx}>
                    {item.children ? (
                      <details open={openIdx === idx} onToggle={(e) => setOpenIdx((e.target as HTMLDetailsElement).open ? idx : null)}>
                        <summary className="flex items-center justify-between px-2 py-2 rounded hover:bg-neutral-100 cursor-pointer">
                          <span className="text-neutral-800 font-medium text-sm">{item.label}</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                        </summary>
                        <ul className="pl-4 py-1 space-y-1">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link href={c.href} onClick={() => setOpen(false)} className="block px-2 py-2 text-sm rounded hover:bg-neutral-100 text-neutral-700">
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <Link href={item.href!} onClick={() => setOpen(false)} className="block px-2 py-2 rounded hover:bg-neutral-100 text-neutral-800 text-sm">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Quick links */}
              <div className="mt-4 border-t pt-3">
                {isAdmin && (
                  <Link href={`/${l}/admin`} onClick={() => setOpen(false)} className="block text-center rounded px-3 py-2 text-sm bg-green-600 text-white hover:bg-green-700 mb-2">
                    Admin
                  </Link>
                )}
                <SignedOut>
                  <div className="grid grid-cols-2 gap-2">
                    <SignInButton mode="modal" forceRedirectUrl={currentUrl} fallbackRedirectUrl={currentUrl}>
                      <button
                        onClick={() => setOpen(false)}
                        className="text-center rounded px-3 py-2 text-sm bg-red-600 text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 w-full"
                      >
                        {l === "fr" ? "Se connecter" : "Login"}
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal" forceRedirectUrl={currentUrl} signInForceRedirectUrl={currentUrl} fallbackRedirectUrl={currentUrl}>
                      <button
                        onClick={() => setOpen(false)}
                        className="text-center rounded px-3 py-2 text-sm bg-red-600 text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 w-full"
                      >
                        {l === "fr" ? "S’inscrire" : "Register"}
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center justify-center py-2">
                    <UserButton afterSignOutUrl={currentUrl || `/${l}`} showName />
                  </div>
                </SignedIn>
                
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <Link
                    href={`/${l}/dons`}
                    onClick={() => setOpen(false)}
                    className="text-center rounded px-3 py-2 text-sm bg-red-600 text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Dons
                  </Link>
                  <Link
                    href={`/${l}/webmail`}
                    onClick={() => setOpen(false)}
                    className="text-center rounded px-3 py-2 text-sm bg-red-600 text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Webmail
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setIsNewsletterModalOpen(true);
                    }}
                    className="text-center rounded px-3 py-2 text-sm bg-red-600 text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Newsletter
                  </button>
                </div>
              </div>

              {/* Search + Language */}
              <div className="mt-4 grid grid-cols-[1fr_auto] gap-2 items-stretch">
                <form action={`/${l}/recherche`} className="flex items-stretch border border-neutral-300 rounded">
                  <input className="bg-white text-black placeholder-neutral-500 px-2 py-2 text-sm flex-1" name="q" placeholder={l === "fr" ? "Rechercher" : "Search"} />
                  <button type="submit" className="px-3 text-sm">🔍</button>
                </form>
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
