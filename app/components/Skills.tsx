'use client';

import { techStack } from '@/app/data/portfolio';
import * as SimpleIcons from 'react-icons/si';
import { IconType } from 'react-icons';

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950"
    >
      <div className="max-w-5xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 section-header">
          <p className="text-slate-700 dark:text-slate-300 font-medium flex items-center justify-center gap-2 text-sm">
            <span className="w-8 h-0.5 bg-slate-400 dark:bg-slate-400 rounded-full"></span>
            Tech Stack
            <span className="w-8 h-0.5 bg-slate-400 dark:bg-slate-400 rounded-full"></span>
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
        </div>

        {/* Skills Grid - More Compact */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4">
          {techStack.map((tech) => {
            const Icon = SimpleIcons[tech.icon as keyof typeof SimpleIcons] as IconType | undefined;
            
            return (
              <div
                key={tech.name}
                className="group relative overflow-hidden"
              >
                <div className="relative p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors duration-300 h-full flex flex-col items-center justify-center gap-2">
                  {/* Icon */}
                  {Icon && (
                    <div 
                      style={{ 
                        color: tech.color,
                      }}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                  )}
                  
                  {/* Name */}
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white text-center leading-tight">
                    {tech.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA - Compact */}
        <div className="text-center pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 shadow-sm text-xs sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Open to new opportunities
          </div>
        </div>
      </div>
    </section>
  );
}
