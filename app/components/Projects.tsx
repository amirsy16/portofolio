'use client';

import { projects } from '@/app/data/portfolio';
import ProjectCard from '@/app/components/ui/ProjectCard';
import { motion } from 'motion/react';
import { VIEWPORT_ONCE } from '@/lib/motion';

export default function Projects() {
  const ordered = [...projects].sort((a, b) => Number(a.id) - Number(b.id));

  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <p className="font-ledger text-[11px] uppercase tracking-[0.3em] text-[var(--emerald)]">03 · Cases — evidence over claims</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display max-w-xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
              Four entries, each one still accountable to users.
            </h2>
            <p className="font-ledger max-w-xs text-[11px] leading-relaxed text-[var(--muted-ink)]">
              Compact exhibit grid — scan the evidence at a glance.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {ordered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
