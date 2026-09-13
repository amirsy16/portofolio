'use client';

import { useRef } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/app/lib/types';
import { motion } from 'motion/react';
import { VIEWPORT_ONCE } from '@/lib/motion';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  // Spotlight halus mengikuti kursor
  const handleSpotlight = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  const shownTech = project.techStack.slice(0, 3);
  const extraTech = project.techStack.length - shownTech.length;

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleSpotlight}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.15) }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] transition-shadow duration-200 hover:shadow-lg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(300px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--gold) 12%, transparent), transparent 65%)',
        }}
      />

      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--line)] bg-[var(--secondary)]">
        {project.video ? (
          <video src={project.video} autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
            className={`transition-transform duration-300 group-hover:scale-[1.02] ${project.image === '/mylogo.png' ? 'object-contain p-8' : 'object-cover'}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-4xl text-[var(--muted-ink)]/40">§</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display line-clamp-2 text-sm font-semibold leading-snug text-[var(--ink)]">
            {project.title}
          </h3>
          <span className="font-ledger flex-shrink-0 text-[11px] font-semibold text-[var(--gold)]">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-[var(--muted-ink)]">
          {project.description}
        </p>

        <div className="font-ledger flex flex-wrap items-center gap-1">
          {shownTech.map((tech) => (
            <span
              key={tech}
              className="whitespace-nowrap rounded-full border border-[var(--line)] bg-[var(--paper)] px-2 py-0.5 text-[10px] text-[var(--muted-ink)]"
            >
              {tech}
            </span>
          ))}
          {extraTech > 0 && (
            <span className="font-ledger text-[10px] text-[var(--gold)]">+{extraTech}</span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-1.5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ledger flex items-center gap-1 rounded-lg bg-[var(--emerald)] px-2.5 py-1.5 text-[11px] font-semibold text-[var(--paper)] hover:bg-[var(--emerald-deep)]"
            >
              <ArrowUpRight className="h-3 w-3" /> Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ledger flex items-center gap-1 rounded-lg border border-[var(--line)] px-2.5 py-1.5 text-[11px] font-semibold text-[var(--ink)] hover:border-[var(--emerald)]"
            >
              <Github className="h-3 w-3" /> Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
