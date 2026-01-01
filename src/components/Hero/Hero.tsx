'use client';

import { useEffect, useState } from 'react';
import StatusBar from '@/components/StatusBar/StatusBar';
import { motion } from 'framer-motion';
import { Typewriter } from '@/components/Typewriter/Typewriter';
import { QUOTES } from '@/lib/quotes';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <section className="hero" id="hero">
      {/* Blueprint Grid */}
      <div className="blueprint-grid" />

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
            custom={2} // Delay sequence for last name
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
            rgba(232, 197, 71, 0.03) 50%,
            transparent 100%
          );
          z-index: 2;
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
        }

        .tagline {
          margin-bottom: var(--space-3xl);
        }

        .status-wrapper {
          margin-bottom: var(--space-4xl);
        }

        /* Styles moved to globals.css to fix motion component scoping */

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
            margin-bottom: var(--space-3xl);
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
            margin-bottom: var(--space-2xl);
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
