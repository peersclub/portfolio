'use client';

import { useEffect, useState } from 'react';

export default function StatusBar() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="status-bar">
      <div className="status-item">
        <span className="status-label">Location:</span>
        <span className="status-value">Bangalore, IN</span>
      </div>

      <div className="status-divider" />

      <div className="status-item">
        <span className="status-label">Local Time:</span>
        <span className="status-value time">{time} IST</span>
      </div>

      <div className="status-divider" />

      <div className="status-item">
        <span className="status-label">Status:</span>
        <span className="status-value available">
          <span className="status-dot" />
          Available
        </span>
      </div>

      <style jsx>{`
        .status-bar {
          display: inline-flex;
          align-items: center;
          gap: var(--space-lg);
          padding: var(--space-md) var(--space-xl);
          border: 1px solid var(--glass-border);
          background: var(--bg-glass);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          width: fit-content;
          transition: all 0.4s var(--ease-out-expo);
          position: relative;
        }



        .status-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          background: linear-gradient(135deg, var(--accent), transparent) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s var(--ease-out-expo);
        }

        .status-bar:hover {
          border-color: rgba(232, 197, 71, 0.3);
          background: rgba(232, 197, 71, 0.03);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232, 197, 71, 0.1);
        }

        .status-bar:hover::before {
          opacity: 1;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .status-label {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .status-value {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          font-weight: 500;
        }

        .status-value.time {
          font-variant-numeric: tabular-nums;
        }

        .status-value.available {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          color: #10B981;
          filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.3));
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #10B981;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }

        .status-divider {
          width: 1px;
          height: 32px;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--glass-border) 20%,
            var(--glass-border) 80%,
            transparent
          );
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 640px) {
          .status-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-md);
            padding: var(--space-md);
          }

          .status-bar:hover {
            transform: none;
          }

          .status-divider {
            display: none;
          }

          .status-item {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
