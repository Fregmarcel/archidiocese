'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionReveal({ children, className = '' }: Props) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.section
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
