'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

type Props = {
  locale: string;
};

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function BannerOverlay({ locale }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* backdrop for readability */}
      <div className="absolute inset-x-4 md:inset-x-12 lg:inset-x-24 mx-auto max-w-6xl rounded bg-black/45 backdrop-blur-[1px] px-4 md:px-8 py-6 md:py-10" />

      <div className="relative z-10 mx-4 md:mx-12 lg:mx-24 max-w-6xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } }}
          className="text-white text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-wide"
        >
          <span className="underline decoration-[3px] md:decoration-[6px] underline-offset-8 md:underline-offset-8 decoration-[#2E9B51]">
            Bienvenu
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08, ease: easing } }}
          className="mt-3 md:mt-6 text-white/95 text-sm sm:text-lg md:text-3xl font-semibold uppercase"
        >
          J’aime le Christ et je bâtis son Église.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.45, delay: 0.2, ease: easing } }}
          className="mt-5 md:mt-8 flex items-center justify-center gap-3 md:gap-6 pointer-events-auto"
        >
          <Link
            href={`/${locale}/inscription`}
            className="inline-flex items-center justify-center rounded px-4 md:px-6 py-2.5 md:py-3 text-white text-sm md:text-base font-bold bg-[#2E9B51] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 transition"
          >
            INSCRIPTION
          </Link>
          <Link
            href={`/${locale}/actualites`}
            className="inline-flex items-center justify-center rounded px-4 md:px-6 py-2.5 md:py-3 text-white text-sm md:text-base font-bold bg-[#BE2722] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 transition"
          >
            TOUTE L’ACTUALITÉ
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
