'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer/Footer';
import { sharingResources } from '@/data/sharing';

const email = 'sureshthejosephite@gmail.com';

export default function SharingPage() {
  return (
    <>
      <div className="sharing-page">
        <div className="container">

          {/* ── Header ── */}
          <motion.div
            className="page-header"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="mono-label">Open Source</span>
            <h1>Things I&apos;m <span className="golden-text">Sharing</span></h1>
            <p className="subtitle">
              Resources, tools, and ideas — free for anyone who finds them useful.
              More dropping as I build them.
            </p>
          </motion.div>

          {/* ── Resource Cards ── */}
          <div className="cards-list">
            {sharingResources.map((resource, i) => (
              <motion.div
                key={resource.slug}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: i * 0.1 + 0.2, ease: [0.19, 1, 0.22, 1] }}
              >
                <Link href={`/sharing/${resource.slug}`} className="resource-card">
                  <div className="card-inner">
                    {/* Top row */}
                    <div className="card-meta">
                      <span className="resource-tag">
                        <Sparkles size={10} />
                        {resource.tag}
                      </span>
                      <span className="resource-number">{resource.number}</span>
                    </div>

                    {/* Title + description */}
                    <h2 className="resource-title">{resource.shortTitle}</h2>
                    <p className="resource-description">{resource.description}</p>

                    {/* Feature pills */}
                    <div className="features-list">
                      {resource.features.map((f) => (
                        <span key={f} className="feature-pill">
                          <span className="pill-check">✓</span> {f}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="card-cta">
                      <span className="cta-text">
                        View resource
                        <ChevronRight size={15} className="cta-arrow" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* ── More coming placeholder ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="more-card">
                <span className="mono-label">More Coming</span>
                <p>Ideas, templates, playbooks, and prompts — dropping as I build them.</p>
                <a
                  href={`mailto:${email}?subject=Sharing%20Page%20%E2%80%94%20Request`}
                  className="more-link"
                >
                  Got a request? Write to me
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <Footer />

      <style jsx>{`
        .sharing-page {
          padding-top: 120px;
          padding-bottom: var(--space-5xl);
          min-height: 100vh;
        }

        .container {
          max-width: 820px;
          margin: 0 auto;
          padding: 0 var(--space-xl);
        }

        /* ── Header ── */
        .page-header {
          text-align: center;
          margin-bottom: var(--space-5xl);
        }

        .mono-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          display: block;
          margin-bottom: var(--space-md);
        }

        h1 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          line-height: 1.1;
          margin-bottom: var(--space-md);
        }

        .subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 440px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Cards List ── */
        .cards-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        /* ── Resource Card (link) ── */
        .resource-card {
          display: block;
          text-decoration: none;
          background: var(--surface-elevated);
          border: 1px solid var(--line-default);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 2px 24px rgba(0, 0, 0, 0.4);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          color: inherit;
        }

        .resource-card:hover {
          border-color: var(--accent-border);
          box-shadow: 0 8px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--accent-border);
          transform: translateY(-3px);
        }

        .card-inner {
          padding: var(--space-2xl);
        }

        .card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-lg);
        }

        .resource-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.67rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-subtle);
          border: 1px solid var(--accent-border);
          padding: 4px 12px;
          border-radius: var(--radius-full);
        }

        .resource-number {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--line-subtle);
          letter-spacing: 0.1em;
        }

        .resource-title {
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          line-height: 1.2;
          margin-bottom: var(--space-md);
          color: var(--text-primary);
          transition: color 0.2s ease;
        }

        .resource-card:hover .resource-title {
          color: var(--accent);
        }

        .resource-description {
          color: var(--text-secondary);
          line-height: 1.75;
          font-size: 0.93rem;
          margin-bottom: var(--space-xl);
          max-width: 620px;
        }

        .features-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: var(--space-xl);
        }

        .feature-pill {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-muted);
          background: var(--surface-intense);
          border: 1px solid var(--line-subtle);
          padding: 4px 11px;
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .pill-check {
          color: var(--accent);
          font-size: 0.62rem;
        }

        /* ── CTA row ── */
        .card-cta {
          border-top: 1px solid var(--line-subtle);
          padding-top: var(--space-lg);
          display: flex;
          justify-content: flex-end;
        }

        .cta-text {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent);
          transition: gap 0.2s ease;
        }

        .resource-card:hover .cta-text {
          gap: 9px;
        }

        .cta-arrow {
          transition: transform 0.2s ease;
        }

        .resource-card:hover .cta-arrow {
          transform: translateX(3px);
        }

        /* ── More Card ── */
        .more-card {
          text-align: center;
          padding: var(--space-3xl) var(--space-2xl);
          border: 1px dashed var(--line-default);
          border-radius: var(--radius-xl);
          background: var(--surface-elevated);
          transition: border-color 0.3s ease;
        }

        .more-card:hover {
          border-color: var(--accent-border);
        }

        .more-card p {
          color: var(--text-secondary);
          font-size: 0.93rem;
          margin: var(--space-sm) 0 var(--space-lg);
          line-height: 1.6;
        }

        .more-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--accent);
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          transition: gap 0.2s ease, opacity 0.2s ease;
        }

        .more-link:hover {
          gap: 9px;
          opacity: 0.8;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .card-inner {
            padding: var(--space-lg);
          }
        }
      `}</style>
    </>
  );
}
