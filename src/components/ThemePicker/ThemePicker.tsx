'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { THEME_PRESETS } from '@/lib/theme/presets';

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <button
        className="fixed bottom-8 right-8 flex items-center gap-2 px-4 py-2 bg-[var(--bg-glass)] backdrop-blur-xl border border-[var(--glass-border)] rounded-full cursor-pointer z-[200] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-glow)]"
        onClick={() => setIsOpen(true)}
        aria-label="Choose theme"
      >
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
        <span className="text-sm font-medium text-[var(--text-secondary)]">Theme</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[300] animate-[fadeIn_0.2s_ease-out] p-8"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-2xl p-6 max-w-md w-full animate-[slideUp_0.3s_var(--ease-out-expo)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">Choose a Theme</h3>
              <button
                className="flex items-center justify-center w-8 h-8 bg-[var(--bg-glass)] border border-[var(--glass-border)] rounded-full text-[var(--text-secondary)] cursor-pointer transition-all hover:bg-[var(--accent-light)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setTheme(preset.id);
                    setIsOpen(false);
                  }}
                  className={`relative flex flex-col gap-2 p-3 rounded-lg border transition-all ${
                    theme === preset.id
                      ? 'border-[var(--accent)] bg-[var(--bg-tertiary)]'
                      : 'border-[var(--glass-border)] bg-transparent hover:border-[var(--accent)] hover:bg-[var(--bg-tertiary)]'
                  }`}
                  title={preset.description}
                >
                  {/* Theme preview swatch - inline styles for actual theme colors */}
                  <div
                    className="w-full h-10 rounded-md flex items-center gap-2 px-3"
                    style={{ backgroundColor: preset.bgColor }}
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: preset.accentColor }}
                    />
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="h-1 w-full rounded-full opacity-40" style={{ backgroundColor: preset.accentColor }} />
                      <div className="h-1 w-2/3 rounded-full opacity-20" style={{ backgroundColor: preset.accentColor }} />
                    </div>
                  </div>

                  {/* Theme name */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[var(--text-primary)]">{preset.name}</span>
                    {theme === preset.id && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
