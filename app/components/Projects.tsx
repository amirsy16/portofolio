'use client';

import { projects } from '@/app/data/portfolio';
import ProjectCard from '@/app/components/ui/ProjectCard';

export default function Projects() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950"
    >
      <div className="max-w-5xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2 section-header">
          <p className="text-slate-700 dark:text-slate-300 font-medium flex items-center justify-center gap-2 text-sm">
            <span className="w-8 h-0.5 bg-slate-400 dark:bg-slate-400 rounded-full"></span>
            Portfolio
            <span className="w-8 h-0.5 bg-slate-400 dark:bg-slate-400 rounded-full"></span>
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="gradient-text">My Projects</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl mx-auto">
            A selection of projects that showcase my skills and experience
          </p>
        </div>

        {/* Featured Projects - Larger Cards */}
        {featuredProjects.length > 0 && (
          <div className="space-y-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} featured />
            ))}
          </div>
        )}

        {/* Other Projects - Grid */}
        {otherProjects.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Other Projects</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index + featuredProjects.length} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
