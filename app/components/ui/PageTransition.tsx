'use client';

import { motion, useReducedMotion } from 'motion/react';
import { pageLoadParent } from '@/lib/motion';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <>{children}</>;
  return (
    <motion.div variants={pageLoadParent} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}
