'use client';

import Hero from '@/components/Hero/Hero';
import LogoMarquee from '@/components/LogoMarquee/LogoMarquee';
import About from '@/components/About/About';
import Impact from '@/components/Impact/Impact';
import HorizontalProjects from '@/components/HorizontalProjects/HorizontalProjects';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoMarquee />
      <About />
      <Impact />
      <HorizontalProjects />
      <Contact />
      <Footer />

      <style jsx>{`
        main {
          min-height: 100vh;
        }
      `}</style>
    </main>
  );
}
