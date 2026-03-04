'use client';

import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/app/lib/types';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500 hover:shadow-lg shadow-sm"
      >
        {/* Top accent bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400" />

        {/* Project Image */}
        <div className={`relative h-52 overflow-hidden ${project.image === '/mylogo.png' ? 'bg-slate-50 dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-800'}`}>
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`transition-transform duration-500 group-hover:scale-105 ${project.image === '/mylogo.png' ? 'object-contain p-10' : 'object-cover'}`}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30">
              <div className="text-5xl opacity-30">🚀</div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Header */}
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-slate-800 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 dark:bg-slate-800" />

          {/* Tech Stack */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-2 mt-auto pt-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200"
              >
                <Github className="w-3.5 h-3.5" />
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-all duration-200 shadow-sm"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Regular Project Card
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all duration-500 hover:shadow-md hover:-translate-y-1 shadow-sm"
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400" />

      {/* Image */}
      <div className={`relative h-36 overflow-hidden ${project.image === '/mylogo.png' ? 'bg-slate-50 dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-800'}`}>
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`transition-transform duration-500 group-hover:scale-105 ${project.image === '/mylogo.png' ? 'object-contain p-8' : 'object-cover'}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30">
            <div className="text-4xl opacity-30">🚀</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent opacity-70" />

        {/* Index badge */}
        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title & description */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 dark:bg-slate-800" />

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all duration-200"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-all duration-200 shadow-sm"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              Demo
            </a>
          )}
          <a
            href={project.liveUrl || project.githubUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-950/50 text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-all duration-200"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
