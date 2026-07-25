// V2 theme palettes — one object drives BOTH the WebGL thread (material,
// lighting, bloom, sparkles) and the CSS custom properties in v2.css.
// The thread stays the identity; only its metal changes.

export type V2ThemeId = 'gold' | 'purple' | 'obsidian' | 'ink' | 'silver' | 'porcelain';

export interface V2Palette {
    id: V2ThemeId;
    label: string;
    /** UI swatch for the switcher dot */
    swatch: string;
    // — scene —
    thread: string;
    bg: string;
    sparkles: string;
    /** accent tint for one of the studio lightformers */
    rim: string;
    envIntensity: number;
    roughness: number;
    bloom: number;
    vignette: number;
    // — mylife gradient ramp: [craft, emergence, rise, frontier] + endpoints —
    rampStart: string;
    ramp: [string, string, string, string];
    rampEnd: string;
}

export const V2_THEMES: Record<V2ThemeId, V2Palette> = {
    gold: {
        id: 'gold',
        label: 'Gold',
        swatch: '#E8C547',
        thread: '#E8C547',
        bg: '#0a0a0a',
        sparkles: '#E8C547',
        rim: '#E8C547',
        envIntensity: 1.35,
        roughness: 0.18,
        bloom: 0.5,
        vignette: 0.72,
        rampStart: '#6B5410',
        ramp: ['#D9A514', '#E8C547', '#EFD06A', '#F6E27A'],
        rampEnd: '#F6E27A',
    },
    purple: {
        id: 'purple',
        label: 'Amethyst',
        swatch: '#8B5CF6',
        thread: '#8B5CF6',
        bg: '#0a0810',
        sparkles: '#A78BFA',
        rim: '#A78BFA',
        envIntensity: 1.5,
        roughness: 0.18,
        bloom: 0.55,
        vignette: 0.72,
        rampStart: '#3B2470',
        ramp: ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD'],
        rampEnd: '#C4B5FD',
    },
    obsidian: {
        id: 'obsidian',
        label: 'Obsidian',
        swatch: '#2a2a2e',
        thread: '#1a1a1e',
        bg: '#050506',
        sparkles: '#6b7280',
        rim: '#e5e7eb',
        envIntensity: 2.6,
        roughness: 0.12,
        bloom: 0.22,
        vignette: 0.8,
        rampStart: '#26262b',
        ramp: ['#3f3f46', '#52525b', '#71717a', '#a1a1aa'],
        rampEnd: '#d4d4d8',
    },
    ink: {
        id: 'ink',
        label: 'Ink on White',
        swatch: '#111111',
        thread: '#111113',
        bg: '#f4f2ee',
        sparkles: '#9ca3af',
        rim: '#ffffff',
        envIntensity: 1.7,
        roughness: 0.14,
        bloom: 0.12,
        vignette: 0.1,
        rampStart: '#52525b',
        ramp: ['#3f3f46', '#27272a', '#18181b', '#09090b'],
        rampEnd: '#09090b',
    },
    silver: {
        id: 'silver',
        label: 'Silver',
        swatch: '#C9CDD3',
        thread: '#C9CDD3',
        bg: '#0b0d10',
        sparkles: '#C9CDD3',
        rim: '#EDEFF2',
        envIntensity: 1.9,
        roughness: 0.1,
        bloom: 0.35,
        vignette: 0.72,
        rampStart: '#5d646d',
        ramp: ['#8E959E', '#AEB4BC', '#C9CDD3', '#EDEFF2'],
        rampEnd: '#EDEFF2',
    },
    porcelain: {
        id: 'porcelain',
        label: 'Porcelain',
        swatch: '#f5f2ec',
        thread: '#ffffff',
        bg: '#f2efe9',
        sparkles: '#c9c2b4',
        rim: '#ffffff',
        envIntensity: 1.15,
        roughness: 0.3,
        bloom: 0.18,
        vignette: 0.08,
        rampStart: '#b5ad9e',
        ramp: ['#a89f8e', '#948b79', '#7d7463', '#655c4c'],
        rampEnd: '#655c4c',
    },
};

export const V2_THEME_IDS = Object.keys(V2_THEMES) as V2ThemeId[];
