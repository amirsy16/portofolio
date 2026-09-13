'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface TypewriterNameProps {
  text: string;
  className?: string;
  /** ms per karakter saat mengetik */
  typeSpeed?: number;
  /** ms per karakter saat menghapus */
  deleteSpeed?: number;
  /** jeda setelah nama lengkap terketik */
  holdMs?: number;
  /** jeda sebelum mulai mengetik lagi */
  gapMs?: number;
  /** jeda sebelum mengetik pertama kali */
  startDelayMs?: number;
}

type Phase = 'delay' | 'typing' | 'holding' | 'deleting' | 'waiting';

export default function TypewriterName({
  text,
  className,
  typeSpeed = 130,
  deleteSpeed = 65,
  holdMs = 2400,
  gapMs = 500,
  startDelayMs = 600,
}: TypewriterNameProps) {
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('delay');

  useEffect(() => {
    if (reducedMotion) return;
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'delay') {
      timer = setTimeout(() => setPhase('typing'), startDelayMs);
    } else if (phase === 'typing') {
      if (count < text.length) {
        timer = setTimeout(() => setCount((c) => c + 1), typeSpeed);
      } else {
        setPhase('holding');
      }
    } else if (phase === 'holding') {
      timer = setTimeout(() => setPhase('deleting'), holdMs);
    } else if (phase === 'deleting') {
      if (count > 0) {
        timer = setTimeout(() => setCount((c) => c - 1), deleteSpeed);
      } else {
        setPhase('waiting');
      }
    } else {
      timer = setTimeout(() => setPhase('typing'), gapMs);
    }

    return () => clearTimeout(timer);
  }, [phase, count, reducedMotion, text, typeSpeed, deleteSpeed, holdMs, gapMs, startDelayMs]);

  // Hormati prefers-reduced-motion: tampilkan nama utuh tanpa animasi
  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`relative inline-block ${className ?? ''}`} aria-label={text}>
      {/* Teks tak terlihat sebagai penjaga ukuran + terbaca screen reader */}
      <span className="opacity-0" aria-hidden={false}>
        {text}
      </span>
      {/* Teks hasil ketikan */}
      <span className="absolute inset-0" aria-hidden="true">
        {text.slice(0, count)}
        <span
          className="type-caret ml-[0.05em] inline-block h-[0.8em] w-[0.06em] min-w-[2px] translate-y-[0.06em] rounded-sm bg-[var(--gold)] align-baseline"
        />
      </span>
    </span>
  );
}
