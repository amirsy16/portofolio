'use client';

import { personalInfo } from '@/app/data/portfolio';
import SocialLinks from '@/app/components/ui/SocialLinks';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 pb-20 md:pb-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">
              {personalInfo.name}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Full Stack Developer
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-slate-900 dark:text-white font-bold">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Skills', 'Projects'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(item.toLowerCase());
                      if (item === 'Home') {
                        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 text-sm transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-slate-900 dark:text-white font-bold">Connect</h4>
            <SocialLinks socials={personalInfo.socials} />
            <p className="text-slate-600 dark:text-slate-400 text-xs mt-4">
              {personalInfo.email}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2">
            © {new Date().getFullYear()} {personalInfo.name}. Built with
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            using Next.js & Tailwind CSS
          </p>
          
          <button
            onClick={scrollToTop}
            className="group p-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  );
}
