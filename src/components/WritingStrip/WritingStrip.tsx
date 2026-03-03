'use client';

import { ExternalLink } from 'lucide-react';

const MEDIUM_ARTICLES = [
  {
    title: "Story about AI by an AI — Written in 3.2 Sec",
    url: "https://sureshvictor.medium.com/story-about-ai-by-an-ai-written-in-3-2-sec-28b3e8d72e8f",
    date: "Jan 2023",
    tag: "AI",
  },
  {
    title: "I tried to 'Connect the dots backwards' — Crazy story of my life!",
    url: "https://sureshvictor.medium.com/life-as-a-product-manager-1d2d456af8da",
    date: "Jul 2016",
    tag: "Product",
  },
  {
    title: "Human CO-volution with the virus",
    url: "https://sureshvictor.medium.com/human-co-volution-with-the-virus-20990e1b737f",
    date: "Mar 2021",
    tag: "Future",
  },
  {
    title: "Taking care of apps on phone can help you live a meaningful life",
    url: "https://sureshvictor.medium.com/taking-care-of-apps-on-phone-can-help-you-live-a-meaningful-life-b0ac462c77b1",
    date: "May 2020",
    tag: "Life",
  },
];

export default function WritingStrip() {
  return (
    <section className="writing-strip">
      <div className="strip-inner">
        <div className="strip-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="medium-icon">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
          </svg>
          <span>Latest Writing</span>
        </div>

        <div className="articles-row">
          {MEDIUM_ARTICLES.map((article, idx) => (
            <a
              key={idx}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-card"
            >
              <span className="article-tag">{article.tag}</span>
              <span className="article-title">{article.title}</span>
              <span className="article-meta">
                {article.date}
                <ExternalLink size={10} />
              </span>
            </a>
          ))}
        </div>

        <a
          href="https://sureshvictor.medium.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="view-all"
        >
          View all articles
          <ExternalLink size={12} />
        </a>
      </div>

      <style jsx>{`
        .writing-strip {
          border-top: 1px solid var(--glass-border);
          border-bottom: 1px solid var(--glass-border);
          background: var(--bg-secondary);
          padding: 2rem var(--space-xl);
        }

        .strip-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .strip-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .medium-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .articles-row {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          scrollbar-width: none;
          flex: 1;
          min-width: 0;
        }

        .articles-row::-webkit-scrollbar {
          display: none;
        }

        .article-card {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          padding: 0.75rem 1rem;
          border: 1px solid var(--glass-border);
          background: var(--bg-primary);
          text-decoration: none;
          width: 200px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .article-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }

        .article-tag {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .article-title {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .article-meta {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--text-muted);
          margin-top: 0.1rem;
        }

        .view-all {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          text-decoration: none;
          white-space: nowrap;
          opacity: 0.8;
          transition: opacity 0.2s ease;
        }

        .view-all:hover {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .strip-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .articles-row {
            width: 100%;
          }

          .view-all {
            align-self: flex-end;
          }
        }
      `}</style>
    </section>
  );
}
