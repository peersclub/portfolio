'use client';

import Link from 'next/link';
import { Linkedin, Instagram, Twitter, BookOpen } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';
import ProofBar from '@/components/ProofBar/ProofBar';
import SelectedWork from '@/components/SelectedWork/SelectedWork';
import About from '@/components/About/About';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

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
        mainText="Product Architect. Co-Founder & CPO at AssetWorks AI. 13 years shipping products used by millions — across AI, fintech, and supply chain."
        ctaText="Let's talk"
        ctaHref="/contact"
        imageSrc="/images/victor-hero.png"
        imageAlt="Suresh Victor — Product Architect"
        overlayText={{
          part1: 'build',
          part2: 'ship.',
        }}
        socialLinks={socialLinks}
        locationText="Bangalore, India"
      />
      <ProofBar />
      <SelectedWork />
      <About />
      <section className="how-i-work section" aria-label="How I work">
        <div className="container">
          <p className="hiw-line">
            I work in written docs over meetings, measure outcomes over output, and treat
            engineers as product partners — not ticket takers.
          </p>
          <Link href="/about" className="hiw-link">
            How I work →
          </Link>
        </div>
        <style jsx>{`
          .how-i-work {
            padding: var(--space-3xl) 0;
            border-top: 1px solid var(--glass-border);
          }
          .hiw-line {
            max-width: 640px;
            font-size: 1.35rem;
            line-height: 1.6;
            color: var(--text-secondary);
          }
          .how-i-work :global(.hiw-link) {
            display: inline-block;
            margin-top: var(--space-md);
            font-family: var(--font-mono);
            font-size: 0.85rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--accent);
            text-decoration: none;
          }
        `}</style>
      </section>
      <Contact />
      <Footer />
    </main>
  );
}
