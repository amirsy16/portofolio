'use client';

interface SkillBadgeProps {
  skill: string;
  index?: number;
}

export default function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  return (
    <div
      className="group relative px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:scale-105 transition-all duration-300 cursor-default skill-badge overflow-hidden shadow-sm"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <span className="relative text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300">
        {skill}
      </span>
    </div>
  );
}
