'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero/Hero';
import WritingStrip from '@/components/WritingStrip/WritingStrip';
import LogoMarquee from '@/components/LogoMarquee/LogoMarquee';
import About from '@/components/About/About';
import Impact from '@/components/Impact/Impact';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

const HorizontalProjects = dynamic(
  () => import('@/components/HorizontalProjects/HorizontalProjects'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="home-main">
      <Hero />
      <WritingStrip />
      <LogoMarquee />
      <About />
      <Impact />
      <HorizontalProjects />
      <Contact />
      <Footer />
    </main>
  );
}
