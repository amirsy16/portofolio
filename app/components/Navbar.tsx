'use client';

import { useState, useEffect } from 'react';
import { Home, Code2, Briefcase, Mail } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import Image from 'next/image';
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  const navItems = [
    { index: '01', name: 'Manifesto', href: 'hero', icon: Home },
    { index: '02', name: 'Stack', href: 'skills', icon: Code2 },
    { index: '03', name: 'Cases', href: 'projects', icon: Briefcase },
    { index: '04', name: 'Contact', href: 'contact', icon: Mail },
  ];

  useEffect(() => {
    const ids = ['hero', 'skills', 'projects', 'contact'];
    const handleScroll = () => {
      if (document.documentElement.scrollHeight - window.scrollY - window.innerHeight < 100) {
        setActiveSection('contact');
        return;
      }
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 160 && r.bottom >= 160) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Desktop: editorial ledger bar ── */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center px-6 pt-4">
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur-xl shadow-lg"
        >
          <div className="flex items-center gap-2 px-3 py-2">
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 hover:bg-[var(--secondary)]"
            >
              <span className="relative block h-8 w-8 overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface)]">
                <Image src="/mylogo.png" alt="Logo" fill sizes="32px" className="object-contain p-1 dark:hidden" priority />
                <Image src="/mylogodark.png" alt="Logo" fill sizes="32px" className="hidden object-contain p-1 dark:block" priority />
              </span>
              <span className="text-left leading-tight">
                <span className="font-ledger block text-[10px] uppercase tracking-[0.2em] text-[var(--muted-ink)]">Ledger · 2026</span>
                <span className="block text-sm font-semibold text-[var(--ink)]">Amir Syofian</span>
              </span>
            </button>

            <div className="mx-1 h-8 w-px bg-[var(--line)]" />

            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium ${
                    isActive ? 'text-[var(--paper)]' : 'text-[var(--muted-ink)] hover:text-[var(--ink)]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="ledger-nav"
                      className="absolute inset-0 rounded-xl bg-[var(--emerald)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="font-ledger relative z-10 text-[10px] tracking-widest opacity-70">{item.index}</span>
                  <span className="relative z-10">{item.name}</span>
                </button>
              );
            })}

            <div className="ml-auto flex items-center gap-1">
              <span className="font-ledger mr-2 hidden text-[10px] uppercase tracking-[0.2em] text-[var(--muted-ink)] lg:block">
                {activeSection} / 04
              </span>
              <ThemeTogglerButton modes={['light', 'dark']} variant="ghost" className="h-9 w-9 rounded-xl" />
            </div>
          </div>
          <motion.div style={{ scaleX: progress }} className="h-0.5 origin-left bg-[var(--gold)]" />
        </motion.nav>
      </div>

      {/* ── Mobile top: logo + theme ── */}
      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-[var(--paper)]/90 px-4 py-3 backdrop-blur-xl md:hidden">
        <button onClick={() => scrollTo('hero')} className="relative h-9 w-9">
          <Image src="/mylogo.png" alt="Logo" fill sizes="36px" className="object-contain dark:hidden" priority />
          <Image src="/mylogodark.png" alt="Logo" fill sizes="36px" className="hidden object-contain dark:block" priority />
        </button>
        <span className="font-ledger text-[10px] uppercase tracking-[0.25em] text-[var(--muted-ink)]">Ledger · {activeSection}</span>
        <ThemeTogglerButton modes={['light', 'dark']} variant="ghost" className="h-9 w-9 rounded-xl" />
      </div>

      {/* ── Mobile: bottom ledger pill ── */}
      <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 md:hidden">
        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-1 rounded-2xl border border-[var(--line)] bg-[var(--paper)]/95 px-2 py-2 shadow-xl backdrop-blur-xl"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="relative flex min-w-[60px] flex-col items-center gap-1 rounded-xl px-3 py-2"
              >
                {isActive && (
                  <motion.span layoutId="ledger-mobile" className="absolute inset-0 rounded-xl bg-[var(--emerald)]" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <Icon className={`relative z-10 h-5 w-5 ${isActive ? 'text-[var(--paper)]' : 'text-[var(--muted-ink)]'}`} />
                <span className={`relative z-10 text-[10px] font-medium ${isActive ? 'text-[var(--paper)]' : 'text-[var(--muted-ink)]'}`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </motion.nav>
      </div>
    </>
  );
}
