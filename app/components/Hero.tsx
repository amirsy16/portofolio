'use client';

import { personalInfo } from '@/app/data/portfolio';
import { type Experience } from '@/app/lib/types';
import SocialLinks from '@/app/components/ui/SocialLinks';
import { MapPin, Mail, Calendar, GraduationCap, ArrowDown, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

function useTypewriter(text: string, typingSpeed = 90, deletingSpeed = 50, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayed.length < text.length) {
        timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 0);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length - 1)), deletingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('typing'), 400);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, text, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

export default function Hero() {
  const typedName = useTypewriter(personalInfo.name);
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
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
    <section
      id="hero"
      className="min-h-screen flex items-start justify-center relative px-4 sm:px-6 lg:px-8 pt-8 lg:pt-32 pb-16 bg-white dark:bg-slate-950"
    >
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* Left Column: Content */}
        <motion.div 
          className="lg:col-span-7 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── Header: Avatar + Name ── */}
          <motion.div variants={itemVariants} className="flex items-center gap-5">
            {/* Small Avatar (Mobile Only) */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 lg:hidden transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-1">
                <div className="w-full h-full rounded-md overflow-hidden relative">
                  <Image
                    src="/profil.jpg"
                    alt={personalInfo.name}
                    fill
                    sizes="(max-width: 640px) 64px, 80px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5">Hello, I&apos;m</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                {typedName}
                <span className="inline-block w-0.5 h-[1em] align-middle ml-0.5 bg-slate-900 dark:bg-white animate-pulse" />
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                  <Mail className="w-3.5 h-3.5" />{personalInfo.email}
                </a>
              </div>
            </div>
          </motion.div>

        {/* ── About ── */}
        <motion.div variants={itemVariants} className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">About</h2>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
            {personalInfo.description.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </motion.div>

        {/* ── Experience ── */}
        {personalInfo.experience && personalInfo.experience.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Experience</h2>
            <div className="space-y-3">
              {personalInfo.experience.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => openExp(exp)}
                  className="w-full text-left flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                >
                  {/* Company Logo */}
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                    {exp.company.includes('Insan Madani') && (
                      <Image src="/LOGOIM.png" alt="LAZ Insan Madani" width={36} height={36} className="object-contain p-0.5" />
                    )}
                    {exp.company.includes('Polda Jambi') && (
                      <Image src="/poljam.png" alt="Polda Jambi" width={36} height={36} className="object-contain" />
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{exp.title}</p>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{exp.company}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{exp.period}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Education ── */}
        {personalInfo.education && personalInfo.education.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Education</h2>
            <div className="space-y-3">
              {personalInfo.education.map((edu) => (
                <div key={edu.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                    {edu.logo ? (
                      <Image src={edu.logo} alt={edu.institution} width={36} height={36} className="object-contain" />
                    ) : (
                      <GraduationCap className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{edu.institution}</p>
                      <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap flex-shrink-0">{edu.period}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{edu.degree} of {edu.major}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Social + CTA ── */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <SocialLinks socials={personalInfo.socials} />
          <button
            onClick={() => scrollToSection('projects')}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition-all duration-200 hover:scale-105"
          >
            View My Work
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
        </motion.div>

        {/* Right Column: Creative Avatar (Desktop Only) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end items-start pt-2"
        >
          <div className="relative group">
            {/* Background Glow */}
            <div className="absolute -inset-6 bg-slate-200 dark:bg-slate-800 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            {/* Polaroid Container */}
            <div className="relative transform rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out">
              
              {/* Masking Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/60 dark:bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm rotate-[-4deg] z-20"></div>
              
              {/* Polaroid Frame */}
              <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 shadow-xl rounded-sm border border-slate-200 dark:border-slate-700 relative z-10">
                
                {/* Image Container */}
                <div className="relative w-56 h-56 xl:w-72 xl:h-72 overflow-hidden bg-slate-200 dark:bg-slate-700">
                  <Image
                    src="/profil.jpg"
                    alt={personalInfo.name}
                    fill
                    sizes="(max-width: 1280px) 224px, 288px"
                    className="object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeExp}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 space-y-5">
                {/* Header */}
                <div className="flex items-start gap-4 pr-8">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                    {selectedExp.company.includes('Insan Madani') && (
                      <Image src="/LOGOIM.png" alt="LAZ Insan Madani" width={44} height={44} className="object-contain p-0.5" />
                    )}
                    {selectedExp.company.includes('Polda Jambi') && (
                      <Image src="/poljam.png" alt="Polda Jambi" width={44} height={44} className="object-contain" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{selectedExp.title}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{selectedExp.company}</p>
                    {selectedExp.role && (
                      <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium mt-1">{selectedExp.role}</p>
                    )}
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />{selectedExp.period}
                      {selectedExp.current && (
                        <span className="ml-1 px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">Current</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Story */}
                {selectedExp.story && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Story</h3>
                    <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
                      {selectedExp.story.split('\n\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Tags */}
                {selectedExp.tags && selectedExp.tags.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Tech Stack</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedExp.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {selectedExp.gallery && selectedExp.gallery.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Gallery <span className="normal-case font-normal text-slate-400">({galleryIndex + 1}/{selectedExp.gallery.length})</span>
                    </h3>
                    <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-video">
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
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={nextImg}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
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
                          className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                            i === galleryIndex ? 'border-indigo-500' : 'border-transparent opacity-60 hover:opacity-100'
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


