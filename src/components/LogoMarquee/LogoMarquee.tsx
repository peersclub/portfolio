'use client';

import { useState } from 'react';

const companies = [
  'Assetworks AI',
  'CoinDCX',
  'CaptainFresh',
  'Cox & Kings',
  'Babychakra',
  'Hopscotch',
  'Kleverkid',
];

export default function LogoMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="marquee-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="marquee-label">Worked With</div>

      {/* Row 1 - Left to Right */}
      <div className="marquee-track">
        <div className={`marquee-content ${isPaused ? 'paused' : ''}`}>
          {[...companies, ...companies].map((company, index) => (
            <span key={index} className="company-name">
              {company}
              <span className="separator">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="marquee-track reverse">
        <div className={`marquee-content reverse ${isPaused ? 'paused' : ''}`}>
          {[...companies, ...companies].reverse().map((company, index) => (
            <span key={index} className="company-name">
              {company}
              <span className="separator">•</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          width: 100%;
          overflow: hidden;
          border-top: 1px solid var(--glass-border);
          border-bottom: 1px solid var(--glass-border);
          padding: var(--space-lg) 0;
          cursor: default;
        }

        .marquee-label {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: var(--space-md);
        }

        .marquee-track {
          display: flex;
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          margin-bottom: var(--space-sm);
        }
        
        .marquee-track:last-of-type {
          margin-bottom: 0;
        }

        .marquee-content {
          display: flex;
          animation: marquee 25s linear infinite;
          white-space: nowrap;
          will-change: transform;
        }
        
        .marquee-content.reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        
        .marquee-content.paused {
          animation-play-state: paused;
        }

        .company-name {
          font-family: var(--font-heading);
          font-size: clamp(1.25rem, 3vw, 2rem);
          font-weight: 500;
          color: var(--text-secondary);
          padding: 0 var(--space-xl);
          transition: all 0.3s ease;
          position: relative;
        }

        .company-name:hover {
          color: var(--accent);
          text-shadow: 0 0 30px var(--glow-color);
        }

        .separator {
          color: var(--text-muted);
          margin-left: var(--space-xl);
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
