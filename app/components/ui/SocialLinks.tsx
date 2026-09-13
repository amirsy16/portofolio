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
  return (
    <div className="flex gap-2.5">
      {socials.map((social) => {
        const Icon = iconMap[social.icon];
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2.5 text-[var(--muted-ink)] hover:-translate-y-0.5 hover:border-[var(--emerald)] hover:text-[var(--emerald)] sm:p-3"
            aria-label={social.name}
          >
            <Icon className="relative z-10 h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
