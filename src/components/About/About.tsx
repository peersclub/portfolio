'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-header"
            initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          >
            <span className="label">About</span>
            <h2>
              Product leader with 10+<br />
              years of building<br />
              <span className="golden-text">what matters</span>
            </h2>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
          >
            <p className="lead">
              I'm driven by a simple mission: build high quality,
              scalable products that people genuinely love to use.
            </p>
            <p>
              From scaling India's largest crypto exchange to pioneering
              AI-powered financial tools, I specialize in turning complex
              ideas into intuitive experiences that serve millions.
            </p>
            <p>
              Currently co-founding Assetworks AI, where we're making
              sophisticated financial analysis accessible through
              natural language.
            </p>
          </motion.div>

          <motion.div
            className="about-details"
            initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
          >
            <div className="detail-item">
              <span className="detail-label">Based in</span>
              <span className="detail-value">Bangalore, India</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Education</span>
              <span className="detail-value">B.Tech, NIT Karnataka</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Focus</span>
              <span className="detail-value">Product Strategy, AI, Fintech</span>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .about {
          background: var(--bg-primary);
          min-height: auto;
          padding: var(--space-5xl) 0;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4xl);
        }

        .about-header {
          grid-column: 1 / -1;
        }

        .label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          display: block;
          margin-bottom: var(--space-md);
        }

        h2 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          line-height: 1.15;
        }

        .lead {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: var(--space-xl);
          line-height: 1.6;
        }

        .about-content p {
          margin-bottom: var(--space-md);
          line-height: 1.8;
        }

        .about-details {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          padding-left: var(--space-2xl);
          border-left: 1px solid var(--glass-border);
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .detail-label {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .detail-value {
          font-size: 1rem;
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
          }

          .about-details {
            padding-left: 0;
            border-left: none;
            padding-top: var(--space-xl);
            border-top: 1px solid var(--glass-border);
          }
        }
      `}</style>
    </section>
  );
}
