export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  description: string;
  email: string;
  location: string;
  avatar: string;
  socials: Social[];
  experience?: Experience[];
  education?: Education[];
}

export interface Education {
  id: string;
  degree: string;
  major: string;
  institution: string;
  period: string;
  logo?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  current: boolean;
}

export interface Social {
  name: string;
  url: string;
  icon: 'Github' | 'Linkedin' | 'Mail' | 'Instagram';
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Skill {
  name: string;
  icon: string;
  color: string;
  subSkills?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  video?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}
