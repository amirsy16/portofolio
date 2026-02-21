import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import Skills from '@/app/components/Skills';
import Projects from '@/app/components/Projects';
import Contact from '@/app/components/Contact';
import Footer from '@/app/components/Footer';
import PageTransition from '@/app/components/ui/PageTransition';

export default function Home() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative">
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </PageTransition>
    </>
  );
}
