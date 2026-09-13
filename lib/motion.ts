'use client';

import type { Variants } from 'motion/react';

// ── Editorial ledger motion tokens (single source) ──
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_SMOOTH = 'easeOut' as const;

export const DURATION = {
  instant: 0.15,
  fast: 0.25,
  base: 0.5,
  slow: 0.7,
  page: 0.6,
} as const;

export const SPRING_SOFT = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
} as const;

export const SPRING_POPUP = {
  type: 'spring',
  stiffness: 420,
  damping: 30,
} as const;

export const VIEWPORT_ONCE = { once: true, margin: '-80px' } as const;
export const VIEWPORT_TIGHT = { once: true, margin: '-40px' } as const;

// ── Varian reveal standar ──
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
};

export const fadeUpStaggerParent: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const fadeUpChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
};

// ── Orchestrated page load (single source) ──
export const pageLoadParent: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const pageLoadChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

// ── Hormati prefers-reduced-motion ──
// Gunakan `useReducedMotion()` dari motion/react di komponen,
// lalu set durasi ke 0 / y ke 0 bila true.
