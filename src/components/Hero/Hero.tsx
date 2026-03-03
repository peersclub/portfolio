'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatusBar from '@/components/StatusBar/StatusBar';
import { motion } from 'framer-motion';
import { Typewriter } from '@/components/Typewriter/Typewriter';
import { QUOTES } from '@/lib/quotes';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax effect on background grid
  useEffect(() => {
    if (!mounted || !gridRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(gridRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  // Random quote
  const [quote, setQuote] = useState(QUOTES[0]);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    setQuote(QUOTES[randomIndex]);
  }, []);

  if (!mounted) return null;

  const firstName = "Suresh".split("");
  const lastName = "Victor".split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.02 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 150,
        mass: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 150,
      },
    },
  };

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      {/* Blueprint Grid */}
      <div className="blueprint-grid" ref={gridRef} />

      {/* Gradient Overlay for Depth */}
      <div className="hero-gradient-overlay" />

      <div className="hero-content">
        {/* Main Name */}
        <div className="name-block">
          <motion.div
            className="first-name-wrapper"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {firstName.map((letter, index) => (
              <motion.span variants={child} key={index} className="first-name-char">
                {letter}
              </motion.span>
            ))}
          </motion.div>
          <motion.div
            className="last-name-wrapper"
            variants={container}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            {lastName.map((letter, index) => (
              <motion.span variants={child} key={index} className="last-name-char">
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Tagline - Moved before status for better hierarchy */}
        <motion.div
          className="tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <p className="role">
            <Typewriter
              words={[
                'Product Leader',
                'Co-Founder',
                'System Architect',
                'AI Enthusiast',
                '10+ Years Building'
              ]}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2500}
            />
          </p>
          <p className="mission">
            {quote.text} <span className="mission-highlight">{quote.highlight}</span>
          </p>
        </motion.div>

        {/* Status Bar - Positioned after tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="status-wrapper"
        >
          <StatusBar />
        </motion.div>

        {/* Social Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.19, 1, 0.22, 1] }}
          className="social-buttons"
        >
          <a
            href="https://www.linkedin.com/in/sureshvictor/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn linkedin-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <div className="social-btn-text">
              <span className="social-btn-name">LinkedIn</span>
              <span className="social-btn-handle">sureshvictor</span>
            </div>
          </a>
          <a
            href="https://sureshvictor.medium.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn medium-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
            </svg>
            <div className="social-btn-text">
              <span className="social-btn-name">Medium</span>
              <span className="social-btn-handle">Writing weekly</span>
            </div>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <span className="scroll-text">Scroll to explore</span>
          <div className="scroll-line">
            <div className="scroll-dot" />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--space-xl);
          padding-top: 15vh; /* Push content down significantly */
          overflow: hidden;
        }

        .blueprint-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.25;
          background-image:
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
          background-size: calc(100% / 12) 80px;
          z-index: 1;
        }

        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            ellipse 80% 50% at 50% 40%,
            transparent 0%,
            var(--accent-subtle) 50%,
            transparent 100%
          );
          z-index: 2;
        }

        .hero-avatar {
          position: absolute;
          top: 120px;
          right: 5%;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .avatar-hint {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-secondary);
          opacity: 0.7;
          animation: float-hint 2s ease-in-out infinite;
        }

        @keyframes float-hint {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @media (max-width: 768px) {
          .hero-avatar {
            top: 80px;
            right: 10px;
          }
          .hero-avatar :global(.rive-avatar-container) {
            width: 100px !important;
            height: 100px !important;
          }
          .avatar-hint {
            display: none;
          }
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }

        .name-block {
          margin-bottom: var(--space-4xl);
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .name-block :global(.first-name),
        .name-block :global(.last-name) {
          font-family: var(--font-heading);
          font-size: clamp(4rem, 15vw, 10rem);
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          line-height: 0.9;
        }

        .name-block :global(.first-name) {
          color: var(--text-primary);
        }

        .name-block :global(.last-name) {
          color: var(--accent);
          text-shadow: 0 0 80px var(--glow-color);
        }

        .tagline {
          margin-bottom: var(--space-3xl);
        }

        .status-wrapper {
          margin-bottom: var(--space-xl);
        }

        /* Styles moved to globals.css to fix motion component scoping */

        .social-buttons {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: var(--space-xl);
          flex-wrap: wrap;
        }

        .social-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1.1rem;
          border: 1px solid var(--glass-border);
          background: var(--bg-glass);
          backdrop-filter: blur(12px);
          text-decoration: none;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
        }

        .social-btn:hover {
          transform: translateY(-2px);
        }

        .linkedin-btn {
          color: #0A66C2;
          border-color: rgba(10, 102, 194, 0.3);
        }

        .linkedin-btn:hover {
          border-color: #0A66C2;
          background: rgba(10, 102, 194, 0.08);
        }

        .medium-btn {
          color: var(--text-primary);
          border-color: var(--glass-border);
        }

        .medium-btn:hover {
          border-color: var(--accent);
          background: var(--accent-light);
          color: var(--accent);
        }

        .social-btn-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .social-btn-name {
          font-size: 0.8rem;
          font-weight: 600;
          line-height: 1;
        }

        .social-btn-handle {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          opacity: 0.65;
          line-height: 1;
        }

        .role {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 700;
          color: var(--accent);
          text-shadow: 0 0 60px var(--glow-color), 0 0 20px var(--accent-light);
          letter-spacing: -0.02em;
          margin-bottom: var(--space-lg);
          line-height: 1.2;
        }

        .mission {
          font-size: clamp(1.25rem, 3vw, 1.875rem);
          font-weight: 500;
          color: var(--text-primary);
          max-width: 550px;
          line-height: 1.5;
          letter-spacing: -0.01em;
        }

        .mission-highlight {
          color: var(--accent);
          font-weight: 700;
          text-shadow: 0 0 30px var(--glow-color);
        }

        .scroll-hint {
          position: absolute;
          bottom: var(--space-2xl);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
        }

        .scroll-text {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .scroll-line {
          width: 1px;
          height: 60px;
          background: var(--glass-border);
          position: relative;
        }

        .scroll-dot {
          position: absolute;
          top: 0;
          left: -2px;
          width: 5px;
          height: 5px;
          background: var(--accent);
          border-radius: 50%;
          animation: scrollDown 2s ease-in-out infinite;
        }

        @keyframes scrollDown {
          0%, 100% {
            top: 0;
            opacity: 1;
          }
          80% {
            top: 55px;
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: var(--space-lg) var(--space-md);
            min-height: 100svh;
          }

          .hero-content {
            max-width: 100%;
          }

          .name-block {
            margin-bottom: var(--space-3xl);
          }

          .tagline {
            margin-bottom: var(--space-2xl);
          }

          .status-wrapper {
            margin-bottom: var(--space-xl);
          }

          .role {
            margin-bottom: var(--space-md);
          }

          .mission {
            max-width: 100%;
          }

          .scroll-hint {
            left: 50%;
            transform: translateX(-50%);
            bottom: var(--space-xl);
          }
        }

        @media (max-width: 480px) {
          .hero {
            padding: var(--space-md);
            padding-top: 10vh;
          }

          .name-block {
            margin-bottom: var(--space-2xl);
          }

          .tagline {
            margin-bottom: var(--space-xl);
          }

          .status-wrapper {
            margin-bottom: var(--space-lg);
          }

          .social-buttons {
            gap: 0.5rem;
            margin-bottom: var(--space-lg);
          }

          .social-btn {
            padding: 0.5rem 0.85rem;
          }

          .scroll-hint {
            bottom: var(--space-lg);
          }

          .role {
            font-size: clamp(1.5rem, 5vw, 2rem);
          }

          .mission {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
