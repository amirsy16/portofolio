'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  // Always start with false (light mode) to match server render
  const [isDark, setIsDark] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Initialize theme after mount
  useEffect(() => {
    // This is intentional for hydration fix - we need to wait for client mount
    // eslint-disable-next-line
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

  // Sync theme class with state changes
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
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Show placeholder until mounted to prevent hydration mismatch
  if (!hasMounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="w-5 h-5 text-slate-300 group-hover:text-slate-100 group-hover:rotate-12 transition-all duration-500 relative z-10" />
      ) : (
        <Sun className="w-5 h-5 text-amber-500 group-hover:text-amber-400 group-hover:rotate-90 transition-all duration-500 relative z-10" />
      )}
    </button>
  );
}
