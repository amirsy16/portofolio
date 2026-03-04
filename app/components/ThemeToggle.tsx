'use client';

import { useState, useEffect, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setHasMounted(true);
    const theme = localStorage.getItem('theme');
    const shouldBeDark = theme === 'dark';
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark, hasMounted]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    const btn = buttonRef.current;

    if (!btn) {
      setIsDark(newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return;
    }

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Max distance from button to farthest corner
    const maxR = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      background: ${newTheme ? '#0f172a' : '#ffffff'};
      clip-path: circle(0px at ${x}px ${y}px);
      transition: clip-path 0.55s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(overlay);

    // Trigger expand
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.clipPath = `circle(${maxR}px at ${x}px ${y}px)`;
      });
    });

    // Switch theme at midpoint
    const switchAt = 220;
    setTimeout(() => {
      setIsDark(newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    }, switchAt);

    // Remove overlay after animation
    setTimeout(() => {
      overlay.style.transition = 'opacity 0.18s ease';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 200);
    }, 520);
  };

  if (!hasMounted) {
    return <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />;
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="group relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-slate-300 group-hover:text-slate-100 group-hover:rotate-12 transition-all duration-500" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500 group-hover:text-amber-400 group-hover:rotate-90 transition-all duration-500" />
      )}
    </button>
  );
}
