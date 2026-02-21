'use client';

import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { Social } from '@/app/lib/types';

const iconMap = {
  Github,
  Linkedin,
  Mail,
  Instagram,
};

interface SocialLinksProps {
  socials: Social[];
}

export default function SocialLinks({ socials }: SocialLinksProps) {
  // Color mapping for social media icons based on their brand colors
  const colorMap: Record<string, string> = {
    Github: 'text-[#181717] dark:text-white hover:text-[#181717] dark:hover:text-white',
    Linkedin: 'text-[#0A66C2] dark:text-[#0A66C2] hover:text-[#0A66C2] dark:hover:text-[#0A66C2]',
    Mail: 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100',
    Instagram: 'text-[#E4405F] dark:text-[#E4405F] hover:text-[#E4405F] dark:hover:text-[#E4405F]',
  };

  return (
    <div className="flex gap-3 sm:gap-4">
      {socials.map((social) => {
        const Icon = iconMap[social.icon];
        const colorClass = colorMap[social.icon] || 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100';
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-2.5 sm:p-3 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg shadow-sm"
            aria-label={social.name}
          >
            <Icon className={`w-5 h-5 ${colorClass} transition-all duration-300 group-hover:rotate-12 relative z-10`} />
          </a>
        );
      })}
    </div>
  );
}
