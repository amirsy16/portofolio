'use client';

import { personalInfo } from '@/app/data/portfolio';
import { type Experience } from '@/app/lib/types';
import SocialLinks from '@/app/components/ui/SocialLinks';
import { MapPin, Mail, Calendar, GraduationCap, ArrowDown, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { fadeUpStaggerParent, fadeUpChild, SPRING_POPUP } from '@/lib/motion';
import Magnetic from '@/app/components/ui/Magnetic';
import TypewriterName from '@/app/components/ui/TypewriterName';

export default function Hero() {
  const metrics = [
    { label: 'Role', value: personalInfo.role },
    { label: 'Base', value: personalInfo.location },
  ];
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openExp = (exp: Experience) => {
    setSelectedExp(exp);
    setGalleryIndex(0);
  };
  const closeExp = () => setSelectedExp(null);

  const prevImg = useCallback(() => {
    if (!selectedExp?.gallery) return;
    setGalleryIndex((i) => (i - 1 + selectedExp.gallery!.length) % selectedExp.gallery!.length);
  }, [selectedExp]);

  const nextImg = useCallback(() => {
    if (!selectedExp?.gallery) return;
    setGalleryIndex((i) => (i + 1) % selectedExp.gallery!.length);
  }, [selectedExp]);

  // Close on Escape, arrow key navigation
  useEffect(() => {
    if (!selectedExp) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeExp();
      if (e.key === 'ArrowLeft') prevImg();
      if (e.key === 'ArrowRight') nextImg();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedExp, prevImg, nextImg]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // ── Tilt 3D + spotlight pada potret ──
  const reducedMotion = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 260, damping: 24, mass: 0.5 });
  const rotateY = useSpring(tiltY, { stiffness: 260, damping: 24, mass: 0.5 });
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const shine = useMotionTemplate`radial-gradient(360px circle at ${shineX}% ${shineY}%, color-mix(in srgb, var(--gold) 25%, transparent), transparent 70%)`;

  const onPortraitMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 10);
    tiltX.set(-py * 10);
    shineX.set((px + 0.5) * 100);
    shineY.set((py + 0.5) * 100);
  };

  const onPortraitLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    shineX.set(50);
    shineY.set(50);
  };

  return (
    <>
    <section
      id="hero"
      className="ledger-paper ledger-grain relative flex items-start justify-center px-4 pb-16 pt-24 sm:px-6 md:pt-32 lg:px-8 lg:pt-36"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left: manifesto */}
        <motion.div
          className="space-y-8 lg:col-span-7"
          variants={fadeUpStaggerParent}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUpChild} className="flex items-center gap-4">
            <span className="relative block h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--line)] sm:h-14 sm:w-14 lg:hidden">
              <Image src="/profil.jpg" alt={personalInfo.name} fill sizes="56px" className="object-cover" priority />
            </span>
            <div>
              <p className="font-ledger text-[11px] uppercase tracking-[0.3em] text-[var(--emerald)]">01 · Manifesto — {personalInfo.location}</p>
              <h1 className="font-display mt-2 text-4xl font-semibold leading-[1.02] text-[var(--ink)] sm:text-5xl lg:text-6xl">
                <TypewriterName text={personalInfo.name} />
              </h1>
              <p className="font-ledger mt-2 text-xs uppercase tracking-[0.2em] text-[var(--muted-ink)]">{personalInfo.role}</p>
            </div>
          </motion.div>
          {/* Manifesto statement */}
          <motion.p variants={fadeUpChild} className="font-display max-w-xl text-xl leading-snug text-[var(--ink)] sm:text-2xl">
            I build <span className="bg-[var(--gold)]/30 px-1">reliable financial systems</span> that survive real
            operations — secure, auditable, and maintainable solo.
          </motion.p>

          <motion.div variants={fadeUpChild} className="max-w-xl space-y-3 text-sm leading-relaxed text-[var(--muted-ink)] sm:text-base">
            {personalInfo.description.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </motion.div>

          {/* Metric strip */}
          <motion.dl variants={fadeUpChild} className="grid max-w-md grid-cols-2 divide-x divide-[var(--line)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
            {metrics.map((m) => (
              <div key={m.label} className="px-4 py-3">
                <dt className="font-ledger text-[10px] uppercase tracking-[0.2em] text-[var(--muted-ink)]">{m.label}</dt>
                <dd className="mt-1 text-xs font-semibold text-[var(--ink)] sm:text-sm">{m.value}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={fadeUpChild} className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted-ink)]">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{personalInfo.location}</span>
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 underline decoration-[var(--gold)] decoration-2 underline-offset-4 hover:text-[var(--ink)]">
              <Mail className="h-3.5 w-3.5" />{personalInfo.email}
            </a>
          </motion.div>

        {/* ── Experience ledger ── */}
        {personalInfo.experience && personalInfo.experience.length > 0 && (
          <motion.div variants={fadeUpChild} className="space-y-3">
            <h2 className="font-ledger text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--muted-ink)]">Experience · click for dossier</h2>
            <div className="divide-y divide-[var(--line)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
              {personalInfo.experience.map((exp, i) => (
                <button
                  key={exp.id}
                  onClick={() => openExp(exp)}
                  className="group flex w-full cursor-pointer items-start gap-4 p-4 text-left hover:bg-[var(--secondary)]"
                >
                  <span className="font-ledger mt-0.5 w-8 flex-shrink-0 text-xs text-[var(--gold)]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--paper)]">
                    {exp.company.includes('Insan Madani') && (
                      <Image src="/LOGOIM.png" alt="LAZ Insan Madani" width={36} height={36} className="object-contain p-0.5" />
                    )}
                    {exp.company.includes('Polda Jambi') && (
                      <Image src="/poljam.png" alt="Polda Jambi" width={36} height={36} className="object-contain" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold text-[var(--ink)]">{exp.title}</span>
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--muted-ink)] group-hover:text-[var(--emerald)]" />
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--muted-ink)]">{exp.company}</span>
                    <span className="font-ledger mt-1 flex items-center gap-1 text-[11px] text-[var(--muted-ink)]">
                      <Calendar className="h-3 w-3" />{exp.period}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Education ── */}
        {personalInfo.education && personalInfo.education.length > 0 && (
          <motion.div variants={fadeUpChild} className="space-y-3">
            <h2 className="font-ledger text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--muted-ink)]">Education</h2>
            <div className="divide-y divide-[var(--line)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
              {personalInfo.education.map((edu) => (
                <div key={edu.id} className="flex items-center gap-4 p-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--paper)]">
                    {edu.logo ? (
                      <Image src={edu.logo} alt={edu.institution} width={36} height={36} className="object-contain" />
                    ) : (
                      <GraduationCap className="h-5 w-5 text-[var(--muted-ink)]" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold text-[var(--ink)]">{edu.institution}</span>
                      <span className="font-ledger flex-shrink-0 whitespace-nowrap text-[11px] text-[var(--muted-ink)]">{edu.period}</span>
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--muted-ink)]">{edu.degree} of {edu.major}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Social + CTA ── */}
        <motion.div variants={fadeUpChild} className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <SocialLinks socials={personalInfo.socials} />
          <Magnetic strength={0.3}>
            <button
              onClick={() => scrollToSection('projects')}
              className="group flex items-center gap-2 rounded-xl bg-[var(--emerald)] px-5 py-2.5 text-sm font-semibold text-[var(--paper)] shadow-md hover:bg-[var(--emerald-deep)]"
            >
              View case studies
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </Magnetic>
        </motion.div>
        </motion.div>

        {/* Right: sticky ledger portrait */}
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
          className="hidden lg:col-span-5 lg:block"
        >
          <div className="sticky top-28 mx-auto max-w-sm space-y-4">
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 900 }}
              onMouseMove={onPortraitMove}
              onMouseLeave={onPortraitLeave}
              className="group"
            >
              <div className="ledger-grain relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-lg">
                <div className="font-ledger flex items-center justify-between px-1 pb-2 text-[10px] uppercase tracking-[0.25em] text-[var(--muted-ink)]">
                  <span>Fig. 01 — Maintainer</span>
                  <span className="text-[var(--gold)]">● live</span>
                </div>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[var(--secondary)]">
                  <Image src="/profil.jpg" alt={personalInfo.name} fill sizes="320px" className="object-cover" priority />
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: shine }}
                  />
                </div>
                <div className="flex items-center justify-between px-1 pt-3 text-xs">
                  <span className="font-semibold text-[var(--ink)]">{personalInfo.name}</span>
                  <span className="font-ledger text-[var(--muted-ink)]">Jambi · ID</span>
                </div>
              </div>
            </motion.div>
            <div className="rounded-2xl border border-[var(--emerald)]/30 bg-[var(--emerald)]/10 p-4 text-xs leading-relaxed text-[var(--ink)]">
              <span className="font-ledger text-[10px] uppercase tracking-[0.25em] text-[var(--emerald)]">Solo maintainer note</span>
              <p className="mt-1">One developer, full ownership: architecture, build, deploy, and daily ops for a live zakat finance system.</p>
            </div>
          </div>
        </motion.aside>

      </div>
    </section>

      {/* ── Experience Detail Modal ── */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={closeExp}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={SPRING_POPUP}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--paper)] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeExp}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--muted-ink)] hover:text-[var(--ink)]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-5 p-6">
                {/* Header */}
                <div className="flex items-start gap-4 pr-8">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]">
                    {selectedExp.company.includes('Insan Madani') && (
                      <Image src="/LOGOIM.png" alt="LAZ Insan Madani" width={44} height={44} className="object-contain p-0.5" />
                    )}
                    {selectedExp.company.includes('Polda Jambi') && (
                      <Image src="/poljam.png" alt="Polda Jambi" width={44} height={44} className="object-contain" />
                    )}
                  </div>
                  <div>
                    <p className="font-ledger text-[10px] uppercase tracking-[0.25em] text-[var(--emerald)]">Dossier</p>
                    <h2 className="font-display text-xl font-semibold leading-tight text-[var(--ink)]">{selectedExp.title}</h2>
                    <p className="mt-0.5 text-sm text-[var(--muted-ink)]">{selectedExp.company}</p>
                    {selectedExp.role && (
                      <p className="mt-1 text-xs font-medium text-[var(--emerald)]">{selectedExp.role}</p>
                    )}
                    <p className="font-ledger mt-1 flex items-center gap-1 text-[11px] text-[var(--muted-ink)]">
                      <Calendar className="h-3 w-3" />{selectedExp.period}
                      {selectedExp.current && (
                        <span className="ml-1 rounded-full bg-[var(--emerald)]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--emerald)]">Current</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Story */}
                {selectedExp.story && (
                  <div className="space-y-2">
                    <h3 className="font-ledger text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--muted-ink)]">Story</h3>
                    <div className="space-y-3 text-sm leading-relaxed text-[var(--ink)]/90">
                      {selectedExp.story.split('\n\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Tags */}
                {selectedExp.tags && selectedExp.tags.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-ledger text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--muted-ink)]">Tech Stack</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedExp.tags.map((tag) => (
                        <span key={tag} className="font-ledger rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-[11px] text-[var(--ink)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {selectedExp.gallery && selectedExp.gallery.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-ledger text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--muted-ink)]">
                      Evidence <span className="font-normal normal-case">({galleryIndex + 1}/{selectedExp.gallery.length})</span>
                    </h3>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--secondary)]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={galleryIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={selectedExp.gallery[galleryIndex]}
                            alt={`Gallery ${galleryIndex + 1}`}
                            fill
                            sizes="672px"
                            className="object-cover"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Nav arrows */}
                      {selectedExp.gallery.length > 1 && (
                        <>
                          <button
                            onClick={prevImg}
                            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            onClick={nextImg}
                            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail strip */}
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {selectedExp.gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setGalleryIndex(i)}
                          className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                            i === galleryIndex ? 'border-[var(--gold)]' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <Image src={img} alt={`Thumb ${i + 1}`} fill sizes="56px" className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


