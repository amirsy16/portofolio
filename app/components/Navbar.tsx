'use client';

import { useState, useEffect, useRef } from 'react';
import { Home, Code2, Briefcase, Mail, Github, Linkedin, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler';
import { personalInfo } from '@/app/data/portfolio';

const iconMap: Record<string, React.ElementType> = { Github, Linkedin, Mail, Instagram };

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showContactPopup, setShowContactPopup] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', href: 'hero', icon: Home },
    { name: 'Skills', href: 'skills', icon: Code2 },
    { name: 'Projects', href: 'projects', icon: Briefcase },
  ];

  const socialItems = personalInfo.socials.map((s, i) => ({
    ...s,
    Icon: iconMap[s.icon] || Mail,
    delay: i * 0.06,
  }));

  useEffect(() => {
    const handleScroll = () => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const r = contactEl.getBoundingClientRect();
        const vh = window.innerHeight;
        if (r.top < vh * 0.7 && r.bottom > vh * 0.3) { setActiveSection('contact'); return; }
      }
      if (document.documentElement.scrollHeight - window.scrollY - window.innerHeight < 100) {
        setActiveSection('contact'); return;
      }
      for (const id of ['hero', 'skills', 'projects']) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 150 && r.bottom >= 150) { setActiveSection(id); return; }
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!contactRef.current?.contains(t)) {
        setShowContactPopup(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const ContactPopup = ({ arrowTop }: { arrowTop: boolean }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: arrowTop ? -6 : 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: arrowTop ? -6 : 6 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className="absolute z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-2.5"
      style={arrowTop
        ? { top: 'calc(100% + 10px)', right: 0 }
        : { bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)' }
      }
    >
      {/* Arrow */}
      <div className={`absolute w-2.5 h-2.5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700
        ${arrowTop
          ? 'border-l border-t -top-1.5 right-4 rotate-45'
          : 'border-r border-b -bottom-1.5 left-1/2 -translate-x-1/2 rotate-45'
        }`}
      />
      <div className="flex gap-1.5">
        {socialItems.map(({ name, url, Icon, delay }) => (
          <motion.a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            title={name}
            className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 min-w-[50px]"
          >
            <Icon className="w-4 h-4" />
            <span className="text-[10px] font-medium whitespace-nowrap">{name}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );

  return (
    <>
      {/* ── Desktop: Floating pill navbar ── */}
      <div className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-1 px-2 py-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-lg shadow-black/5"
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 mr-1"
          >
            <div className="relative w-7 h-7">
              <Image src="/mylogo.png" alt="Logo" fill sizes="28px" className="object-contain dark:hidden" priority />
              <Image src="/mylogodark.png" alt="Logo" fill sizes="28px" className="object-contain hidden dark:block" priority />
            </div>
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />

          {/* Nav items */}
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.name}
                onClick={() => { setShowContactPopup(false); scrollTo(item.href); }}
                className="relative px-3.5 py-1.5 text-sm font-medium rounded-xl transition-colors duration-200"
              >
                <span className={`relative z-10 ${
                  isActive ? 'text-slate-900 dark:text-slate-900' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}>{item.name}</span>
                {isActive && (
                  <motion.div layoutId="nav-pill" className="absolute inset-0 bg-slate-200 dark:bg-slate-100 rounded-xl" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
              </button>
            );
          })}

          {/* Divider */}
          <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />

          {/* Contact icon button */}
          <div className="relative" ref={contactRef}>
            <button
              onClick={() => setShowContactPopup((v) => !v)}
              className={`relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-200 ${
                showContactPopup
                  ? 'bg-slate-200 dark:bg-slate-100 text-slate-900 dark:text-slate-900'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
              title="Contact"
            >
              <Mail className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {showContactPopup && <ContactPopup arrowTop />}
            </AnimatePresence>
          </div>

          <ThemeTogglerButton modes={['light', 'dark']} variant="ghost" className="rounded-xl w-9 h-9 text-slate-600 dark:text-slate-300" />
        </motion.div>
      </div>

      {/* ── Mobile top-right: logo + theme toggle ── */}
      <div className="md:hidden fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4">
        <button onClick={() => scrollTo('hero')} className="relative w-10 h-10">
          <Image src="/mylogo.png" alt="Logo" fill sizes="40px" className="object-contain dark:hidden" priority />
          <Image src="/mylogodark.png" alt="Logo" fill sizes="40px" className="object-contain hidden dark:block" priority />
        </button>
        <ThemeTogglerButton modes={['light', 'dark']} variant="ghost" className="rounded-xl w-9 h-9 text-slate-600 dark:text-slate-300" />
      </div>

      {/* ── Mobile: Floating bottom pill navbar ── */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-1 px-2 py-2 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-lg shadow-black/10"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => { setShowContactPopup(false); scrollTo(item.href); }}
                className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl min-w-[56px] transition-colors duration-200"
              >
                {isActive && (
                  <motion.div layoutId="mobile-pill" className="absolute inset-0 bg-slate-200 dark:bg-slate-100 rounded-xl" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <Icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? 'text-slate-900 dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`} />
                <span className={`text-[10px] font-medium relative z-10 transition-colors ${isActive ? 'text-slate-900 dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`}>
                  {item.name}
                </span>
              </button>
            );
          })}

          {/* Divider */}
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-0.5" />

          {/* Contact icon button - scrolls to contact section */}
          <button
            onClick={() => scrollTo('contact')}
            className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl min-w-[56px] transition-colors duration-200"
          >
            {activeSection === 'contact' && (
              <motion.div layoutId="mobile-pill" className="absolute inset-0 bg-slate-200 dark:bg-slate-100 rounded-xl" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
            )}
            <Mail className={`w-5 h-5 relative z-10 transition-colors ${activeSection === 'contact' ? 'text-slate-900 dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`} />
            <span className={`text-[10px] font-medium relative z-10 transition-colors ${activeSection === 'contact' ? 'text-slate-900 dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`}>Contact</span>
          </button>
        </motion.div>
      </div>
    </>
  );
}
