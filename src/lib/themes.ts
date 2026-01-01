// Theme definitions for Slack-style multi-theme system
export interface ThemeColors {
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    bgGlass: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accent: string;
    accentLight: string;
    accentGradient: string;
    glassBorder: string;
    cardBg: string;
    particleColor: string;
}

export interface Theme {
    id: string;
    name: string;
    iconName: string;
    isDark: boolean;
    colors: ThemeColors;
}

export const themes: Theme[] = [
    {
        id: 'midnight',
        name: 'Midnight',
        iconName: 'Moon',
        isDark: true,
        colors: {
            bgPrimary: '#0a0a0a',
            bgSecondary: '#111111',
            bgTertiary: '#1a1a1a',
            bgGlass: 'rgba(255, 255, 255, 0.03)',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            textMuted: 'rgba(255, 255, 255, 0.4)',
            accent: '#667eea',
            accentLight: 'rgba(102, 126, 234, 0.2)',
            accentGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            glassBorder: 'rgba(255, 255, 255, 0.08)',
            cardBg: 'rgba(255, 255, 255, 0.02)',
            particleColor: '#667eea',
        },
    },
    {
        id: 'ocean',
        name: 'Ocean',
        iconName: 'Waves',
        isDark: true,
        colors: {
            bgPrimary: '#0c1929',
            bgSecondary: '#132337',
            bgTertiary: '#1a3048',
            bgGlass: 'rgba(0, 212, 255, 0.03)',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            textMuted: 'rgba(255, 255, 255, 0.4)',
            accent: '#00d4ff',
            accentLight: 'rgba(0, 212, 255, 0.2)',
            accentGradient: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 50%, #006699 100%)',
            glassBorder: 'rgba(0, 212, 255, 0.15)',
            cardBg: 'rgba(0, 212, 255, 0.02)',
            particleColor: '#00d4ff',
        },
    },
    {
        id: 'sunset',
        name: 'Sunset',
        iconName: 'Sunset',
        isDark: true,
        colors: {
            bgPrimary: '#1a1016',
            bgSecondary: '#261820',
            bgTertiary: '#33202b',
            bgGlass: 'rgba(255, 119, 89, 0.03)',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            textMuted: 'rgba(255, 255, 255, 0.4)',
            accent: '#ff7759',
            accentLight: 'rgba(255, 119, 89, 0.2)',
            accentGradient: 'linear-gradient(135deg, #ff7759 0%, #ff5f6d 50%, #ffc371 100%)',
            glassBorder: 'rgba(255, 119, 89, 0.15)',
            cardBg: 'rgba(255, 119, 89, 0.02)',
            particleColor: '#ff7759',
        },
    },
    {
        id: 'forest',
        name: 'Forest',
        iconName: 'TreePine',
        isDark: true,
        colors: {
            bgPrimary: '#0a1a0f',
            bgSecondary: '#0f261a',
            bgTertiary: '#143324',
            bgGlass: 'rgba(46, 213, 115, 0.03)',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            textMuted: 'rgba(255, 255, 255, 0.4)',
            accent: '#2ed573',
            accentLight: 'rgba(46, 213, 115, 0.2)',
            accentGradient: 'linear-gradient(135deg, #2ed573 0%, #26de81 50%, #20bf6b 100%)',
            glassBorder: 'rgba(46, 213, 115, 0.15)',
            cardBg: 'rgba(46, 213, 115, 0.02)',
            particleColor: '#2ed573',
        },
    },
    {
        id: 'lavender',
        name: 'Lavender',
        iconName: 'Heart',
        isDark: true,
        colors: {
            bgPrimary: '#15121a',
            bgSecondary: '#1e1926',
            bgTertiary: '#272033',
            bgGlass: 'rgba(167, 139, 250, 0.03)',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            textMuted: 'rgba(255, 255, 255, 0.4)',
            accent: '#a78bfa',
            accentLight: 'rgba(167, 139, 250, 0.2)',
            accentGradient: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 50%, #e879f9 100%)',
            glassBorder: 'rgba(167, 139, 250, 0.15)',
            cardBg: 'rgba(167, 139, 250, 0.02)',
            particleColor: '#a78bfa',
        },
    },
    {
        id: 'ember',
        name: 'Ember',
        iconName: 'Flame',
        isDark: true,
        colors: {
            bgPrimary: '#1a0f0a',
            bgSecondary: '#261510',
            bgTertiary: '#331b16',
            bgGlass: 'rgba(251, 146, 60, 0.03)',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            textMuted: 'rgba(255, 255, 255, 0.4)',
            accent: '#fb923c',
            accentLight: 'rgba(251, 146, 60, 0.2)',
            accentGradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)',
            glassBorder: 'rgba(251, 146, 60, 0.15)',
            cardBg: 'rgba(251, 146, 60, 0.02)',
            particleColor: '#fb923c',
        },
    },
    {
        id: 'monochrome',
        name: 'Monochrome',
        iconName: 'Circle',
        isDark: true,
        colors: {
            bgPrimary: '#0f0f0f',
            bgSecondary: '#171717',
            bgTertiary: '#1f1f1f',
            bgGlass: 'rgba(255, 255, 255, 0.02)',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            textMuted: 'rgba(255, 255, 255, 0.4)',
            accent: '#ffffff',
            accentLight: 'rgba(255, 255, 255, 0.1)',
            accentGradient: 'linear-gradient(135deg, #e5e5e5 0%, #a3a3a3 50%, #737373 100%)',
            glassBorder: 'rgba(255, 255, 255, 0.08)',
            cardBg: 'rgba(255, 255, 255, 0.02)',
            particleColor: '#ffffff',
        },
    },
    {
        id: 'light',
        name: 'Light',
        iconName: 'Sun',
        isDark: false,
        colors: {
            bgPrimary: '#fafafa',
            bgSecondary: '#f5f5f5',
            bgTertiary: '#e5e5e5',
            bgGlass: 'rgba(0, 0, 0, 0.02)',
            textPrimary: '#171717',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            textMuted: 'rgba(0, 0, 0, 0.4)',
            accent: '#6366f1',
            accentLight: 'rgba(99, 102, 241, 0.1)',
            accentGradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
            glassBorder: 'rgba(0, 0, 0, 0.06)',
            cardBg: 'rgba(255, 255, 255, 0.8)',
            particleColor: '#6366f1',
        },
    },
];

export const defaultTheme = themes[0];

// Helper to convert camelCase to kebab-case
export function toKebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Apply theme to CSS variables
export function applyTheme(theme: Theme): void {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${toKebabCase(key)}`, value);
    });
    root.setAttribute('data-theme', theme.id);
}
