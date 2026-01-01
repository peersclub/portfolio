'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const THEME_OPTIONS = [
  {
    id: 'light',
    name: 'Light',
    icon: Sun,
    colors: {
      bgPrimary: '#F2F2F4',
      accent: '#CFA62E',
      accentGradient: 'linear-gradient(135deg, #CFA62E 0%, #B89222 50%, #A37F1B 100%)'
    }
  },
  {
    id: 'dark',
    name: 'Dark',
    icon: Moon,
    colors: {
      bgPrimary: '#0A0A0B',
      accent: '#E8C547',
      accentGradient: 'linear-gradient(135deg, #E8C547 0%, #D4A745 50%, #C19A3E 100%)'
    }
  }
];

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useState(() => {
    setMounted(true);
  });

  if (!mounted) return null;

  const currentTheme = THEME_OPTIONS.find(t => t.id === theme) || THEME_OPTIONS[1];

  return (
    <>
      <button
        className="theme-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Choose theme"
      >
        <currentTheme.icon className="theme-icon" size={18} />
        <span className="theme-label">Theme</span>
      </button>

      {isOpen && (
        <div className="theme-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="theme-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Choose a Theme</h3>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="theme-grid">
              {THEME_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  className={`theme-option ${currentTheme.id === t.id ? 'active' : ''}`}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                >
                  <div
                    className="theme-preview"
                    style={{
                      background: t.colors.bgPrimary,
                      borderColor: currentTheme.id === t.id ? t.colors.accent : 'transparent',
                    }}
                  >
                    <div
                      className="preview-accent"
                      style={{ background: t.colors.accentGradient }}
                    />
                  </div>
                  <span className="theme-name">
                    <t.icon size={14} /> {t.name}
                  </span>
                  {currentTheme.id === t.id && (
                    <span className="active-badge">Active</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .theme-trigger {
          position: fixed;
          bottom: var(--space-xl);
          right: var(--space-xl);
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          background: var(--bg-glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          cursor: pointer;
          z-index: var(--z-fixed);
          transition: all 0.3s var(--ease-out-expo);
        }

        .theme-trigger:hover {
          transform: translateY(-2px);
          border-color: var(--accent);
          box-shadow: var(--shadow-glow);
        }

        .theme-icon {
          color: var(--accent);
        }

        .theme-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .theme-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: var(--z-modal);
          animation: fadeIn 0.2s ease-out;
          padding: var(--space-xl);
        }

        .theme-modal {
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: var(--space-xl);
          max-width: 500px;
          width: 100%;
          animation: slideUp 0.3s var(--ease-out-expo);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-xl);
        }

        .modal-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: var(--bg-glass);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: var(--accent-light);
          border-color: var(--accent);
          color: var(--text-primary);
        }

        .theme-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-md);
        }

        .theme-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-md);
          background: var(--bg-glass);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.2s var(--ease-out-expo);
        }

        .theme-option:hover {
          background: var(--bg-tertiary);
          transform: translateY(-2px);
        }

        .theme-option.active {
          border-color: var(--accent);
          background: var(--accent-light);
        }

        .theme-preview {
          width: 60px;
          height: 40px;
          border-radius: var(--radius-md);
          border: 2px solid transparent;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: var(--space-xs);
        }

        .preview-accent {
          width: 100%;
          height: 8px;
          border-radius: var(--radius-sm);
        }

        .theme-name {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .active-badge {
          font-size: 0.6875rem;
          padding: 2px 8px;
          background: var(--accent);
          border-radius: var(--radius-full);
          color: white;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .theme-trigger {
            bottom: var(--space-md);
            right: var(--space-md);
          }

          .theme-label {
            display: none;
          }

          .theme-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
