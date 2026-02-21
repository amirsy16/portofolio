'use client';

import { personalInfo } from '@/app/data/portfolio';
import SocialLinks from '@/app/components/ui/SocialLinks';
import { MapPin, Mail, Calendar, GraduationCap, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

export default function Hero() {
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
                {personalInfo.name}
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
                <div key={exp.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
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
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{exp.company}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{exp.period}
                    </p>
                  </div>
                </div>
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
  );
}


