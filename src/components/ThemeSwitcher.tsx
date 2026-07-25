'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import V2ThemeDock from '@/app/v2/components/V2ThemeDock';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Moon, Sun, Check } from 'lucide-react';
import {
    ACCENTS,
    ACCENT_STORAGE_KEY,
    DEFAULT_ACCENT,
    applyAccent,
    isAccent,
    type Accent,
} from '@/lib/theme/config';

// The one bottom-right theme slot, edition-aware:
// v1 → mode/accent picker · /v2 → thread-metal dock · /v3 → none (fixed art).
export default function ThemeSwitcher() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [accent, setAccent] = useState<Accent>(DEFAULT_ACCENT);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        try {
            const stored = localStorage.getItem(ACCENT_STORAGE_KEY);
            if (isAccent(stored)) setAccent(stored);
        } catch { /* attribute already set by boot script */ }
    }, []);

    // Close on outside click / Escape
    useEffect(() => {
        if (!open) return;
        const onPointer = (e: PointerEvent) => {
            if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('pointerdown', onPointer);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('pointerdown', onPointer);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    if (!mounted) return null;
    if (pathname?.startsWith('/v3')) return null;
    if (pathname?.startsWith('/v2')) return <V2ThemeDock />;

    const pickAccent = (a: Accent) => {
        setAccent(a);
        applyAccent(a);
    };

    return (
        <div className="switcher" ref={panelRef}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="panel"
                        role="dialog"
                        aria-label="Appearance settings"
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                    >
                        <span className="panel-label">Mode</span>
                        <div className="mode-row" role="radiogroup" aria-label="Color mode">
                            <button
                                role="radio"
                                aria-checked={theme === 'dark'}
                                className={`mode-btn ${theme === 'dark' ? 'active' : ''}`}
                                onClick={() => setTheme('dark')}
                            >
                                <Moon size={14} /> Dark
                            </button>
                            <button
                                role="radio"
                                aria-checked={theme === 'light'}
                                className={`mode-btn ${theme === 'light' ? 'active' : ''}`}
                                onClick={() => setTheme('light')}
                            >
                                <Sun size={14} /> Light
                            </button>
                        </div>

                        <span className="panel-label">Accent</span>
                        <div className="accent-row" role="radiogroup" aria-label="Accent color">
                            {ACCENTS.map((a) => (
                                <button
                                    key={a.id}
                                    role="radio"
                                    aria-checked={accent === a.id}
                                    aria-label={`${a.name} accent`}
                                    title={a.name}
                                    className={`swatch ${accent === a.id ? 'active' : ''}`}
                                    style={{ background: a.swatch }}
                                    onClick={() => pickAccent(a.id)}
                                >
                                    {accent === a.id && <Check size={14} strokeWidth={3} />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                className="trigger"
                aria-label="Appearance settings"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                <Palette size={18} />
            </button>

            <style jsx>{`
                .switcher {
                    position: fixed;
                    bottom: var(--space-lg);
                    right: var(--space-lg);
                    z-index: var(--z-fixed);
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: var(--space-sm);
                }

                .trigger {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    border-radius: var(--radius-full);
                    border: 1px solid var(--line-default);
                    background: var(--surface-overlay);
                    color: var(--content-primary);
                    cursor: pointer;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
                    transition: all 0.25s var(--ease-out-expo);
                }

                .trigger:hover {
                    border-color: var(--accent);
                    color: var(--accent);
                    transform: translateY(-2px);
                }

                .switcher :global(.panel) {
                    width: 220px;
                    padding: var(--space-md);
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--line-default);
                    background: var(--surface-overlay);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
                }

                .panel-label {
                    display: block;
                    font-family: var(--font-mono);
                    font-size: 0.65rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: var(--content-muted);
                    margin: var(--space-sm) 0;
                }

                .mode-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--space-xs);
                }

                .mode-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 8px 0;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--line-default);
                    background: transparent;
                    color: var(--content-secondary);
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .mode-btn:hover {
                    color: var(--content-primary);
                }

                .mode-btn.active {
                    background: var(--accent-subtle);
                    border-color: var(--accent-border);
                    color: var(--accent-text);
                }

                .accent-row {
                    display: flex;
                    gap: var(--space-sm);
                }

                .swatch {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 34px;
                    height: 34px;
                    border-radius: var(--radius-full);
                    border: 2px solid transparent;
                    color: rgba(0, 0, 0, 0.75);
                    cursor: pointer;
                    transition: transform 0.2s var(--ease-out-expo), border-color 0.2s ease;
                }

                .swatch:hover {
                    transform: scale(1.12);
                }

                .swatch.active {
                    border-color: var(--content-primary);
                }
            `}</style>
        </div>
    );
}
