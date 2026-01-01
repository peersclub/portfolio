'use client';

import { motion } from 'framer-motion';
import InteractiveTimeline from '@/components/InteractiveTimeline/InteractiveTimeline';
import TechGantt from '@/components/TechGantt/TechGantt';
import Footer from '@/components/Footer/Footer';

export default function MyLifePage() {
  return (
    <>
      <main className="mylife-page">
        <div className="container">
          {/* Hero Section */}
          <motion.section
            className="mylife-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="page-title">My Life</h1>
            <p className="page-subtitle">
              A journey through milestones, achievements, and experiences
            </p>
          </motion.section>

          {/* Interactive Timeline */}
          <section className="timeline-section">
            <InteractiveTimeline />
          </section>

          {/* Tech Gantt Chart - Visual 2 */}
          <section className="gantt-section">
            <TechGantt />
          </section>

          {/* Personal Quote */}
          <motion.section
            className="quote-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <blockquote className="quote">
              "Life is about creating products that matter and experiences that last."
            </blockquote>
          </motion.section>
        </div>

        <style jsx>{`
          .mylife-page {
            min-height: 100vh;
            padding: calc(60px + var(--space-4xl)) 0 var(--space-5xl);
            background: var(--bg-primary);
          }

          .mylife-hero {
            text-align: center;
            margin-bottom: var(--space-5xl);
          }

          .page-title {
            font-size: clamp(3rem, 8vw, 5rem);
            font-weight: 800;
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: var(--space-lg);
          }

          .page-subtitle {
            font-size: clamp(1.125rem, 2vw, 1.5rem);
            color: var(--text-secondary);
            max-width: 600px;
            margin: 0 auto;
          }

          .timeline-section {
            margin-bottom: var(--space-5xl);
          }

          .quote-section {
            text-align: center;
            padding: var(--space-4xl) 0;
          }

          .quote {
            font-size: clamp(1.25rem, 3vw, 2rem);
            font-weight: 500;
            font-style: italic;
            color: var(--text-secondary);
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            padding: 0 var(--space-2xl);
          }

          .quote::before {
            content: '"';
            position: absolute;
            left: 0;
            top: -20px;
            font-size: 4rem;
            color: var(--accent);
            opacity: 0.3;
          }

          @media (max-width: 768px) {
            .mylife-page {
              padding: calc(60px + var(--space-2xl)) 0 var(--space-3xl);
            }

            .mylife-hero {
              margin-bottom: var(--space-3xl);
            }

            .timeline-section {
              margin-bottom: var(--space-3xl);
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
