'use client';

import dynamic from 'next/dynamic';
import { Linkedin, Instagram, Twitter, BookOpen } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';
import WritingStrip from '@/components/WritingStrip/WritingStrip';
import LogoMarquee from '@/components/LogoMarquee/LogoMarquee';
import About from '@/components/About/About';
import Impact from '@/components/Impact/Impact';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import { HERO_NAV_LINKS as navLinks } from '@/data/navigation';

const HorizontalProjects = dynamic(
  () => import('@/components/HorizontalProjects/HorizontalProjects'),
  { ssr: false }
);

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sureshvictor/' },
  { icon: Instagram, href: 'https://www.instagram.com/sureshvictor089/' },
  { icon: Twitter, href: 'https://x.com/suresh_089' },
  { icon: BookOpen, href: 'https://sureshvictor.medium.com/' },
];

export default function Home() {
  return (
    <main className="home-main">
      <MinimalistHero
        logoText="suresh."
        navLinks={navLinks}
        mainText="Product Leader & Co-Founder with 10+ years building products that scale to millions. Focused on Product Strategy, AI, and Fintech."
        readMoreLink="/resume"
        imageSrc="/images/victor-hero.png"
        imageAlt="Suresh Victor — Product Architect"
        overlayText={{
          part1: 'build',
          part2: 'ship.',
        }}
        socialLinks={socialLinks}
        locationText="Bangalore, India"
      />
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
