'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

type Action = {
  label: string;
  href: string;
  color: string;
  icon: ReactNode;
};

export default function FloatingActions({ locale }: { locale: string }) {
  const size = 42; // px circle size
  const actions: Action[] = [
    {
      label: 'Dons',
      href: `/${locale}/dons`,
      color: '#EAB308',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 21s-6-4.35-6-9a6 6 0 0 1 12 0c0 4.65-6 9-6 9z" />
        </svg>
      ),
    },
    {
      label: 'Webmail',
      href: `/${locale}/webmail`,
      color: '#0284C7',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 4h16v16H4z" />
          <path d="m22 6-10 7L2 6" />
        </svg>
      ),
    },
    {
      label: 'Newsletter',
      href: `/${locale}/newsletter`,
      color: '#16A34A',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 11V7a2 2 0 0 1 2-2h11" />
          <path d="M3 15a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V8l-6-5H7a4 4 0 0 0-4 4" />
          <path d="M8 10h8M8 14h6" />
        </svg>
      ),
    },
    {
      label: 'Espace Fidèle',
      href: `/${locale}/espace`,
      color: '#BE2722',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="8" r="4" />
          <path d="M6 20a6 6 0 0 1 12 0" />
        </svg>
      ),
    },
    {
      label: 'Contact',
      href: `/${locale}/contact`,
      color: '#9333EA',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2 4.18 2 2 0 0 1 4 2h4.09a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L9 9a16 16 0 0 0 6 6l.81-1.18a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed right-2 sm:right-3 bottom-24 sm:bottom-28 z-[60] flex flex-col gap-2">
      {actions.map((a, i) => (
        <Link
          key={i}
          href={a.href}
          className="group relative isolate focus:outline-none"
          aria-label={a.label}
        >
          {/* Label animé */}
          <span
            style={{ backgroundColor: a.color }}
            className="pointer-events-none absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-white text-xs font-semibold opacity-0 translate-x-1 transition-all duration-200 will-change-transform shadow-md group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
          >
            {a.label}
          </span>

          {/* Icône circulaire */}
          <div
            style={{ backgroundColor: a.color, width: size, height: size }}
            className="grid place-items-center text-white rounded-full shadow-md hover:shadow-lg transition-transform duration-200 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
          >
            {a.icon}
          </div>
        </Link>
      ))}
    </div>
  );
}
