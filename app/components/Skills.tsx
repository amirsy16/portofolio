'use client';

import { skills, techStack } from '@/app/data/portfolio';
import { motion } from 'motion/react';
import { fadeUp, VIEWPORT_ONCE } from '@/lib/motion';

export default function Skills() {
  const marquee = [...techStack, ...techStack];

  return (
    <section id="skills" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <p className="font-ledger text-[11px] uppercase tracking-[0.3em] text-[var(--emerald)]">02 · Stack — proven in production</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display max-w-xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
              Tools I trust with real money and real ops.
            </h2>
            <p className="font-ledger max-w-xs text-[11px] leading-relaxed text-[var(--muted-ink)]">
              Grouped by where each tool earns its keep: interface, system, and delivery.
            </p>
          </div>
        </motion.div>

        {/* Marquee strip */}
        <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] py-3">
          <div className="animate-ledger-marquee flex w-max items-center gap-3 pr-3">
            {marquee.map((tech, i) => (
              <span
                key={`${tech.name}-${i}`}
                className="font-ledger flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--line)] bg-[var(--paper)] px-4 py-1.5 text-xs text-[var(--ink)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Ledger table */}
        <div className="grid gap-4 md:grid-cols-3">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              transition={{ delay: gi * 0.08 }}
              className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--secondary)] px-5 py-3">
                <h3 className="text-sm font-bold text-[var(--ink)]">{group.category}</h3>
                <span className="font-ledger text-[11px] text-[var(--gold)]">{String(gi + 1).padStart(2, '0')}</span>
              </div>
              <ul className="divide-y divide-[var(--line)]">
                {group.skills.map((skill) => (
                  <li key={skill} className="font-ledger flex items-center justify-between px-5 py-2.5 text-xs text-[var(--ink)]">
                    <span>{skill}</span>
                    <span className="text-[var(--emerald)]">✓</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center pt-2"
        >
          <div className="font-ledger inline-flex items-center gap-2 rounded-full border border-[var(--emerald)]/40 bg-[var(--emerald)]/10 px-4 py-2 text-xs text-[var(--ink)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--emerald)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--emerald)]" />
            </span>
            Open to full-time & freelance ledger work
          </div>
        </motion.div>
      </div>
    </section>
  );
}
