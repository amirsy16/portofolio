<div align="center">

# ✦ Amir Syofian — Portfolio

**Full Stack Developer** · Jambi, Indonesia

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)

A modern, minimal portfolio site built to showcase my work, skills, and experiences as a Fullstack Web Developer.

[🌐 Live Demo](https://syraxel.vercel.app) · [📧 Contact](mailto:Amirsyofian2@gmail.com) · [💼 LinkedIn](https://linkedin.com/in/amirsyofian)

</div>

---

## ✨ Features

- **Floating Pill Navbar** — Glassmorphism pill navigation, desktop top-center & mobile bottom-center
- **Animated Contact Popup** — Social links revealed with spring animation on desktop
- **Typewriter Animation** — Continuous type/pause/delete loop on hero name
- **Theme Toggle with Transition** — Ripple circle reveal animation when switching light/dark mode
- **Dark Mode** — Full dark mode support via `next-themes`
- **Page Transitions** — Smooth section transitions powered by Framer Motion
- **Project Cards** — Aesthetic cards with gradient accent bars, pill tech badges, and media preview (image/video)
- **Fully Responsive** — Optimized for all screen sizes

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion, Animate UI |
| **Icons** | Lucide React, React Icons |
| **Theming** | next-themes |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
app/
├── components/
│   ├── ui/               # Reusable UI primitives
│   ├── Hero.tsx          # Landing section with typewriter effect
│   ├── Navbar.tsx        # Floating pill navbar with contact popup
│   ├── Projects.tsx      # Projects grid (2-column)
│   ├── Skills.tsx        # Skills & tech stack
│   └── Contact.tsx       # Contact section
├── data/
│   └── portfolio.ts      # All personal info, projects & skills
├── lib/
│   └── types.ts          # TypeScript interfaces
└── globals.css
components/
└── animate-ui/           # Animate UI component library
```

---

## 🚀 Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/amirsy16/portofolio.git
cd portofolio
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Customization

All personal data is centralized in [`app/data/portfolio.ts`](app/data/portfolio.ts):

- **`personalInfo`** — Name, role, bio, location, education, social links, work experience
- **`skills`** — Skill categories (Frontend, Backend, Tools)
- **`techStack`** — Icon-based tech stack display
- **`projects`** — Project list with image/video, tech stack, links, and featured flag

Swap out `public/profil.jpg`, `public/mylogo.png`, and `public/mylogodark.png` with your own assets.

---

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

Deploy instantly on [Vercel](https://vercel.com) — just connect your GitHub repo and push.

---

<div align="center">

Made by **Amir Syofian** · [GitHub](https://github.com/amirsy16) · [Instagram](https://www.instagram.com/amirsyfn)

</div>
