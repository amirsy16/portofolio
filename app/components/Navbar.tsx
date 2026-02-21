'use client';

import { useState, useEffect } from 'react';
import { Home, Code2, Briefcase, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ThemeToggle from '@/app/components/ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { name: 'Home', href: '#hero', icon: Home },
    { name: 'Skills', href: '#skills', icon: Code2 },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = ['hero', 'skills', 'projects', 'contact'];
      
      // Check contact section first with priority
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        const contactRect = contactElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // If contact section top is in viewport (even partially visible), activate it
        if (contactRect.top < viewportHeight * 0.7 && contactRect.bottom > viewportHeight * 0.3) {
          setActiveSection('contact');
          return;
        }
      }
      
      // Check if we're near the bottom of the page
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      
      if (pageHeight - scrollPosition < 100) {
        setActiveSection('contact');
        return;
      }
      
      // Check other sections normally
      for (const section of sections) {
        if (section === 'contact') continue; // Already checked above
        
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            return;
          }
        }
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Name */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="relative w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                {/* Light mode logo */}
                <Image
                  src="/mylogo.png"
                  alt="Logo"
                  fill
                  sizes="48px"
                  className="object-contain dark:hidden"
                  priority
                />
                {/* Dark mode logo */}
                <Image
                  src="/mylogodark.png"
                  alt="Logo"
                  fill
                  sizes="48px"
                  className="object-contain hidden dark:block"
                  priority
                />
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(sectionId)}
                    className="relative text-sm font-medium transition-colors duration-300 px-3 py-2"
                  >
                    <span className={`relative z-10 ${
                      isActive
                        ? 'text-slate-900 dark:text-slate-900'
                        : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white'
                    }`}>
                      {item.name}
                    </span>
                    
                    {/* Spotlight Background - Bergerak Smooth */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-spotlight"
                        className="absolute inset-0 bg-slate-200 dark:bg-slate-100 rounded-lg"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30
                        }}
                      />
                    )}
                  </button>
                );
              })}
              <ThemeToggle />
            </div>

            {/* Mobile - Only Theme Toggle and Logo */}
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      {/* Bottom Navigation Bar - Mobile Only (Instagram Style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            const Icon = item.icon;
            
            return (
              <button
                key={item.name}
                onClick={() => scrollToSection(sectionId)}
                className="relative flex flex-col items-center justify-center gap-1 px-4 py-2 min-w-[60px]"
              >
                {/* Spotlight Background Mobile Bottom Bar */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-bottom-spotlight"
                    className="absolute inset-0 bg-slate-200 dark:bg-slate-100 rounded-xl"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30
                    }}
                  />
                )}
                
                <Icon className={`w-6 h-6 relative z-10 transition-colors ${
                  isActive
                    ? 'text-slate-900 dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400'
                }`} />
                
                <span className={`text-[10px] font-medium relative z-10 transition-colors ${
                  isActive
                    ? 'text-slate-900 dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Spacer for Mobile */}
      <div className="md:hidden h-20" />
    </>
  );
}
