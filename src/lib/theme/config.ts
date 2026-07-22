// =====================================================
// THEME CONFIG — SINGLE SOURCE OF TRUTH (logic side)
// =====================================================
// The CSS side lives in tokens.css. Everything else —
// the picker UI, the anti-FOUC boot script, persistence —
// derives from this file. Add a mode or accent HERE and
// in tokens.css; nothing else needs touching.

export type Mode = 'dark' | 'light';
export type Accent = 'gold' | 'emerald' | 'coral' | 'violet';

export const MODES: { id: Mode; name: string }[] = [
    { id: 'dark', name: 'Dark' },
    { id: 'light', name: 'Light' },
];

export const ACCENTS: { id: Accent; name: string; swatch: string }[] = [
    { id: 'gold', name: 'Gold', swatch: '#E8C547' },
    { id: 'emerald', name: 'Emerald', swatch: '#10B981' },
    { id: 'coral', name: 'Coral', swatch: '#FF6B6B' },
    { id: 'violet', name: 'Violet', swatch: '#7C3AED' },
];

export const DEFAULT_MODE: Mode = 'dark';
export const DEFAULT_ACCENT: Accent = 'gold';

export const MODE_STORAGE_KEY = 'theme';   // kept as 'theme' for next-themes compat
export const ACCENT_STORAGE_KEY = 'accent';

export function isMode(v: string | null): v is Mode {
    return v === 'dark' || v === 'light';
}

export function isAccent(v: string | null): v is Accent {
    return ACCENTS.some(a => a.id === v);
}

/** Map any legacy 8-theme value (midnight/ocean/…) onto the new model. */
export function migrateLegacyMode(v: string | null): Mode {
    if (isMode(v)) return v;
    if (v === 'light') return 'light';
    return DEFAULT_MODE;
}

export function applyAccent(accent: Accent) {
    document.documentElement.setAttribute('data-accent', accent);
    try {
        localStorage.setItem(ACCENT_STORAGE_KEY, accent);
    } catch {
        // private mode etc. — attribute still applies for this visit
    }
}
