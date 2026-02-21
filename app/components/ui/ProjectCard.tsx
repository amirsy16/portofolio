'use client';

import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/app/lib/types';

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  if (featured) {
    // Featured Project - Horizontal Layout
    return (
      <div
        className="group relative rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 project-card shadow-sm"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Project Image/Video */}
          <div className={`relative h-52 md:h-auto overflow-hidden ${project.image === '/mylogo.png' ? 'bg-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
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
                className={`object-contain ${project.image === '/mylogo.png' ? 'p-8' : 'object-cover'}`}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-7xl opacity-20">🚀</div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200 dark:from-slate-900 via-transparent to-transparent opacity-80 md:opacity-60"></div>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-7 flex flex-col justify-center space-y-4">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-1">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 dark:bg-slate-100 dark:hover:bg-white border-2 border-slate-900 dark:border-slate-100 text-slate-900 dark:text-slate-900 text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular Project Card - Vertical Layout
  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl project-card shadow-sm"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Project Image/Video */}
      <div className={`relative h-40 overflow-hidden ${project.image === '/mylogo.png' ? 'bg-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
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
            className={`object-contain ${project.image === '/mylogo.png' ? 'p-8' : 'object-cover'}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl opacity-20">🚀</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-200 dark:from-slate-900 via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1.5 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 font-medium"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 text-xs rounded bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 font-medium">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-2.5 pt-1">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm transition-all duration-300 hover:scale-105"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 dark:bg-slate-100 dark:hover:bg-white border-2 border-slate-900 dark:border-slate-100 text-slate-900 dark:text-slate-900 text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
