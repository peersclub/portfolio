'use client';

// V2's bottom-right theme control — the same fixed slot v1's appearance
// picker occupies, but for the six thread metals. Rendered by the global
// ThemeSwitcher when the route is /v2/* so every edition has exactly one,
// edition-appropriate control in that corner.

import { useEffect, useRef, useState } from 'react';
import { V2_THEME_IDS, V2_THEMES } from './themes';
import { setV2Theme, useV2Theme } from './useV2Theme';
import { haptics } from '@/lib/haptics';

export default function V2ThemeDock() {
    const theme = useV2Theme();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onPointer = (e: PointerEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false);
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

    return (
        <div className="v2-dock" ref={ref}>
            {open && (
                <div className="v2-dock-panel" role="dialog" aria-label="Thread theme">
                    <span className="v2-dock-label">Thread</span>
                    {V2_THEME_IDS.map((id) => (
                        <button
                            key={id}
                            className={`v2-dock-item ${theme === id ? 'v2-dock-item--on' : ''}`}
                            onClick={() => {
                                haptics.select();
                                setV2Theme(id);
                                setOpen(false);
                            }}
                            aria-pressed={theme === id}
                        >
                            <span className="v2-dock-swatch" style={{ background: V2_THEMES[id].swatch }} />
                            {V2_THEMES[id].label}
                        </button>
                    ))}
                </div>
            )}
            <button
                className="v2-dock-btn"
                onClick={() => {
                    haptics.tap();
                    setOpen((o) => !o);
                }}
                aria-expanded={open}
                aria-label={`Thread theme: ${V2_THEMES[theme].label}`}
            >
                <span className="v2-dock-swatch v2-dock-swatch--lg" style={{ background: V2_THEMES[theme].swatch }} />
            </button>
        </div>
    );
}
