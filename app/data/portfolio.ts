import { PersonalInfo, SkillCategory, Skill, Project, Education } from '@/app/lib/types';

export const personalInfo: PersonalInfo = {
  name: 'Amir Syofian',
  role: 'Full Stack Developer',
  tagline: '',
  description:
    `I'm a Fullstack Web Developer focused on building reliable, scalable web applications that support real business operations.\n\nI specialize in financial management systems and clean, maintainable code, delivering solutions that are secure, efficient, and built to scale.`,
  email: 'Amirsyofian2@gmail.com',
  location: 'Jambi, Indonesia',
  avatar: '/profil.jpg',
  education: [
    {
      id: '1',
      degree: "Bachelor's Degree",
      major: 'Information Systems',
      institution: 'Universitas Jambi',
      period: '2022 - 2026',
      logo: '/unja.png',
    },
  ] as Education[],
  socials: [
    { name: 'GitHub', url: 'https://github.com/amirsy16', icon: 'Github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/amirsyofian', icon: 'Linkedin' },
    { name: 'Email', url: 'mailto:Amirsyofian2@gmail.com', icon: 'Mail' },
    { name: 'Instagram', url: 'https://www.instagram.com/amirsyfn', icon: 'Instagram' },
  ],
  experience: [
    {
      id: '1',
      title: 'Full Stack Developer',
      company: 'Lembaga Amil Zakat Insan Madani Jambi',
      period: 'March 2025 - Present',
      description: 'Developing and maintaining internal financial management system for zakat and donation operations, streamlining administrative workflows and financial reporting processes.',
      current: true,
      role: 'Project Manager · Full Stack Developer · Solo Maintainer',
      story: `Proyek ini bermula dari mata kuliah Proyek Pembangunan Sistem Informasi (PPSI), di mana kelompok kami mendapatkan mitra nyata: Lembaga Amil Zakat Insan Madani Jambi.\n\nSaya dipercaya sebagai Project Manager sekaligus satu-satunya Full Stack Developer di kelompok. Saya merancang arsitektur sistem, membangun seluruh fitur dari nol, dan menjadi satu-satunya yang bertanggung jawab atas maintenance website hingga saat ini.\n\nSistem yang dibangun mencakup manajemen transaksi zakat & donasi, laporan keuangan otomatis, manajemen donatur, dan alur administrasi internal lembaga semuanya dibangun agar aman, efisien, dan mudah dioperasikan oleh staf lembaga.`,
      tags: ['Laravel', 'Filament', 'MySQL', 'PHP', 'Tailwind CSS', 'Livewire'],
      gallery: [
        '/madani/WhatsApp%20Image%202026-03-05%20at%2012.26.32%20AM.jpeg',
        '/madani/WhatsApp%20Image%202026-03-05%20at%2012.26.32%20AM%20(1).jpeg',
        '/madani/WhatsApp%20Image%202026-03-05%20at%2012.26.32%20AM%20(2).jpeg',
        '/madani/WhatsApp%20Image%202026-03-05%20at%2012.26.33%20AM.jpeg',
        '/madani/WhatsApp%20Image%202026-03-05%20at%2012.26.33%20AM%20(1).jpeg',
        '/madani/WhatsApp%20Image%202026-03-05%20at%2012.26.33%20AM%20(2).jpeg',
        '/madani/WhatsApp%20Image%202026-03-05%20at%2012.26.33%20AM%20(3).jpeg',
      ],
    },
    {
      id: '2',
      title: 'Full Stack Developer Intern',
      company: 'Polda Jambi - TIK Division',
      period: 'August 2025 - October 2025',
      description: 'Developed prototype website for managing communication equipment inventory and network infrastructure, improving asset tracking and operational efficiency.',
      current: false,
    },
  ],
};

export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'JavaScript',
      'HTML/CSS',
      'Redux',
      'React Query',
    ],
  },
  {
    category: 'Backend',
    skills: [
      'Node.js',
      'Express',
      'PostgreSQL',
      'MongoDB',
      'Prisma',
      'REST API',
      'GraphQL',
      'Auth (JWT)',
    ],
  },
  {
    category: 'Tools & Others',
    skills: [
      'Git & GitHub',
      'Docker',
      'VS Code',
      'Figma',
      'Vercel',
      'AWS',
      'Linux',
      'Agile/Scrum',
    ],
  },
];

export const techStack: Skill[] = [
  {
    name: 'PHP',
    icon: 'SiPhp',
    color: '#777BB4',
  },
  {
    name: 'Laravel',
    icon: 'SiLaravel',
    color: '#FF2D20',
  },
  {
    name: 'Filament',
    icon: 'SiLaravel',
    color: '#FDAE4B',
  },
  {
    name: 'MySQL',
    icon: 'SiMysql',
    color: '#4479A1',
  },
  {
    name: 'JavaScript',
    icon: 'SiJavascript',
    color: '#F7DF1E',
  },
  {
    name: 'Node.js',
    icon: 'SiNodedotjs',
    color: '#339933',
  },
  {
    name: 'React',
    icon: 'SiReact',
    color: '#61DAFB',
  },
  {
    name: 'Next.js',
    icon: 'SiNextdotjs',
    color: '#000000',
  },
  {
    name: 'TypeScript',
    icon: 'SiTypescript',
    color: '#3178C6',
  },
  {
    name: 'Tailwind CSS',
    icon: 'SiTailwindcss',
    color: '#06B6D4',
  },
  {
    name: 'Bootstrap',
    icon: 'SiBootstrap',
    color: '#7952B3',
  },
  {
    name: 'Git',
    icon: 'SiGit',
    color: '#F05032',
  },
  {
    name: 'GitHub',
    icon: 'SiGithub',
    color: '#181717',
  },
  {
    name: 'Supabase',
    icon: 'SiSupabase',
    color: '#3ECF8E',
  },
];

export const projects: Project[] = [
  {
    id: '0',
    title: 'Personal Portfolio Website',
    description:
      'My personal portfolio website featuring a modern, responsive design with dark mode support, built to showcase my projects and skills.',
    longDescription:
      'A personal portfolio website designed to professionally display my work, skills, and experience. Built with Next.js 14 and Tailwind CSS, it features a clean, modern interface with full dark mode support, smooth animations, and a responsive layout that looks great on all devices.',
    image: '/mylogo.png',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    featured: true,
  },
  {
    id: '1',
    title: 'Web Sistem Manajemen Pengelolaan Keuangan Zakat dan Donasi',
    description:
      'Financial management system for zakat and donation operations at Lembaga Amil Zakat Insan Madani Jambi',
    longDescription:
      'Comprehensive financial management system designed to streamline zakat and donation operations, featuring transaction tracking, financial reporting, donor management, and administrative workflows for efficient fund management and transparency.',
    video: '/IM.mp4',
    techStack: ['Laravel', 'Filament', 'MySQL', 'PHP', 'Tailwind CSS', 'Livewire'],
    featured: true,
  },
  {
    id: '2',
    title: 'Syraxel - Jasa Pembuatan Website',
    description:
      'Web development service platform focused on helping SMEs and companies grow digitally with affordable website solutions',
    longDescription:
      'A professional web development service platform offering affordable website creation for SMEs (UMKM) and companies. Designed to help businesses establish their digital presence, reach more customers, and grow efficiently through modern, high-quality web solutions.',
    image: '/webdev.png',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://syraxel.vercel.app',
    featured: true,
  },
  {
    id: '3',
    title: 'Go Kerinci - Portal Wisata',
    description:
      'Tourism portal for Kerinci featuring destination information, ticket prices, and visitor reviews (Currently in development)',
    longDescription:
      'A comprehensive tourism portal dedicated to showcasing the beauty of Kerinci. The platform provides detailed information about various tourist destinations, up-to-date ticket pricing, and authentic visitor reviews. This project is currently in active development and will continue to evolve with new features and content.',
    image: '/gokerinci.png',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Laravel', 'MySQL', 'Vercel'],
    liveUrl: 'https://gokerinci.vercel.app',
    featured: true,
  },
];

