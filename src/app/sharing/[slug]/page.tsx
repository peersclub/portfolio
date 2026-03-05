'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, Mail, ArrowUpRight, Sparkles, Package, Zap, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import { getResource } from '@/data/sharing';

const email = 'sureshthejosephite@gmail.com';

export default function ResourceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const resource = getResource(slug);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!resource) return;
    await navigator.clipboard.writeText(resource.promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!resource) {
    return (
      <div className="not-found">
        <p>Resource not found.</p>
        <Link href="/sharing" className="back-link">
          <ArrowLeft size={15} /> Back to Sharing
        </Link>
        <style jsx>{`
          .not-found {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--space-lg);
            color: var(--text-muted);
          }
          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: var(--accent);
            text-decoration: none;
            font-size: 0.9rem;
          }
        `}</style>
      </div>
    );
  }

  // Render insight with the highlighted code word wrapped
  const renderInsight = () => {
    if (!resource.insightHighlight) return resource.insight;
    const parts = resource.insight.split(resource.insightHighlight);
    return parts.map((part, i) =>
      i < parts.length - 1 ? (
        <span key={i}>
          {part}
          <code className="insight-code">{resource.insightHighlight}</code>
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <>
      <div className="detail-page">
        <div className="container">

          {/* ── Back nav ── */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <Link href="/sharing" className="back-link">
              <ArrowLeft size={14} />
              All Resources
            </Link>
          </motion.div>

          {/* ── Detail Card ── */}
          <motion.div
            className="detail-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Card Top */}
            <div className="card-top">
              <div className="card-meta">
                <span className="resource-tag">
                  <Sparkles size={11} />
                  {resource.tag}
                </span>
                <span className="resource-number">{resource.number}</span>
              </div>

              <h1 className="resource-title">
                {resource.titleLine1}
                <br />
                <span className="golden-text">{resource.titleLine2}</span>
              </h1>
              <p className="resource-description">{resource.description}</p>

              <div className="features-list">
                {resource.features.map((f) => (
                  <span key={f} className="feature-pill">
                    <span className="pill-check">✓</span> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Terminal Preview */}
            <div className="terminal-card">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="terminal-title">
                  <Terminal size={12} />
                  {resource.slug}.md
                </span>
                <Package size={13} className="terminal-icon-right" />
              </div>
              <pre className="terminal-body">
                <code>{resource.terminalPreview}</code>
              </pre>
            </div>

            {/* How it works */}
            <div className="hiw-section">
              <div className="section-header">
                <Zap size={13} className="icon-accent" />
                <span className="section-label">How it works</span>
              </div>
              <div className="steps-list">
                {resource.howItWorks.map((step, i) => (
                  <div className="step-row" key={i}>
                    <span className="step-num">{i + 1}</span>
                    <div className="step-content">
                      <strong className="step-title">{step.title}</strong>
                      <span className="step-desc">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety rails */}
            <div className="rails-section">
              <div className="section-header">
                <Shield size={13} className="icon-green" />
                <span className="section-label">Built-in safety rails</span>
              </div>
              <div className="rails-grid">
                {resource.safetyRails.map((r) => (
                  <div className="rail-item" key={r.label}>
                    <code className="rail-label">{r.label}</code>
                    <span className="rail-desc">{r.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insight callout */}
            <div className="insight-callout">
              <span className="insight-marker">★ {resource.insightTitle}</span>
              <p>{renderInsight()}</p>
            </div>

            {/* Actions */}
            <div className="card-actions">
              <motion.button
                className={`btn-copy ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
                whileTap={{ scale: 0.97 }}
              >
                {copied
                  ? <><Check size={16} strokeWidth={2.5} /> Copied to clipboard!</>
                  : <><Copy size={16} /> Copy Full Prompt</>}
              </motion.button>

              <a
                href={`mailto:${email}?subject=${resource.emailSubject}`}
                className="btn-write"
              >
                <Mail size={15} />
                Write to me
                <ArrowUpRight size={13} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      <Footer />

      <style jsx>{`
        .detail-page {
          padding-top: 100px;
          padding-bottom: var(--space-5xl);
          min-height: 100vh;
        }

        .container {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 var(--space-xl);
        }

        /* ── Back link ── */
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.83rem;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          margin-bottom: var(--space-2xl);
          transition: color 0.2s ease, gap 0.2s ease;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }

        .back-link:hover {
          color: var(--accent);
          gap: 10px;
        }

        /* ── Detail Card ── */
        .detail-card {
          background: var(--surface-elevated);
          border: 1px solid var(--line-default);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.4);
        }

        .card-top {
          padding: var(--space-2xl);
          border-bottom: 1px solid var(--line-subtle);
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
          font-size: 0.68rem;
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
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          line-height: 1.12;
          margin-bottom: var(--space-md);
        }

        .resource-description {
          color: var(--text-secondary);
          line-height: 1.75;
          font-size: 0.95rem;
          margin-bottom: var(--space-xl);
          max-width: 640px;
        }

        .features-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .feature-pill {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          background: var(--surface-intense);
          border: 1px solid var(--line-subtle);
          padding: 5px 12px;
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .pill-check {
          color: var(--accent);
          font-size: 0.65rem;
        }

        /* ── Terminal ── */
        .terminal-card {
          background: #0d1117;
          border-top: 1px solid #21262d;
          border-bottom: 1px solid #21262d;
        }

        .terminal-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: #161b22;
          border-bottom: 1px solid #21262d;
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dot.red    { background: #ff5f57; }
        .dot.yellow { background: #febc2e; }
        .dot.green  { background: #28c840; }

        .terminal-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #8b949e;
          margin-left: 4px;
          flex: 1;
        }

        .terminal-icon-right {
          color: #3d444d;
          margin-left: auto;
        }

        .terminal-body {
          padding: var(--space-xl) var(--space-2xl);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          line-height: 1.75;
          color: #c9d1d9;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-word;
          margin: 0;
        }

        /* ── Shared section styles ── */
        .section-header {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: var(--space-lg);
        }

        .section-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .icon-accent { color: var(--accent); }
        .icon-green  { color: #22c55e; }

        /* ── How It Works ── */
        .hiw-section {
          padding: var(--space-2xl);
          border-bottom: 1px solid var(--line-subtle);
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .step-row {
          display: flex;
          gap: var(--space-lg);
          align-items: flex-start;
        }

        .step-num {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--accent-subtle);
          border: 1px solid var(--accent-border);
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
        }

        .step-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .step-title {
          font-size: 0.92rem;
          color: var(--text-primary);
          font-weight: 600;
        }

        .step-desc {
          font-size: 0.84rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        /* ── Safety Rails ── */
        .rails-section {
          padding: var(--space-2xl);
          border-bottom: 1px solid var(--line-subtle);
          background: color-mix(in srgb, #22c55e 4%, transparent);
        }

        .rails-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md) var(--space-xl);
        }

        .rail-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .rail-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          padding: 2px 8px;
          border-radius: 4px;
          width: fit-content;
        }

        .rail-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.5;
          padding-left: 2px;
        }

        /* ── Insight Callout ── */
        .insight-callout {
          padding: var(--space-xl) var(--space-2xl);
          border-bottom: 1px solid var(--line-subtle);
          border-left: 3px solid var(--accent);
          background: var(--accent-subtle);
        }

        .insight-marker {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          display: block;
          margin-bottom: var(--space-sm);
        }

        .insight-callout p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.78;
          margin: 0;
        }

        /* insight-code is a global class used in renderInsight() */
        :global(.insight-code) {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--accent);
          background: var(--accent-subtle);
          border: 1px solid var(--accent-border);
          padding: 1px 6px;
          border-radius: 4px;
        }

        /* ── Actions ── */
        .card-actions {
          padding: var(--space-xl) var(--space-2xl);
          display: flex;
          align-items: center;
          gap: var(--space-md);
          flex-wrap: wrap;
        }

        .btn-copy {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          background: var(--accent-gradient);
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.25s var(--ease-out-expo);
          box-shadow: 0 2px 12px var(--accent-subtle);
        }

        .btn-copy:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 28px var(--accent-border);
        }

        .btn-copy.copied {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
        }

        .btn-write {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 13px 22px;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          background: transparent;
          border: 1px solid var(--line-subtle);
          text-decoration: none;
          transition: all 0.25s var(--ease-out-expo);
        }

        .btn-write:hover {
          border-color: var(--accent-border);
          background: var(--accent-subtle);
          color: var(--accent);
          transform: translateY(-2px);
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .card-top,
          .hiw-section,
          .rails-section,
          .insight-callout,
          .card-actions {
            padding: var(--space-lg);
          }

          .rails-grid {
            grid-template-columns: 1fr;
          }

          .card-actions {
            flex-direction: column;
          }

          .btn-copy,
          .btn-write {
            width: 100%;
            justify-content: center;
          }

          .terminal-body {
            padding: var(--space-md) var(--space-lg);
            font-size: 0.72rem;
          }
        }
      `}</style>
    </>
  );
}
