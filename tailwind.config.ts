import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ['selector', '[data-theme="midnight"],[data-theme="ocean"],[data-theme="sunset"],[data-theme="forest"],[data-theme="lavender"],[data-theme="ember"],[data-theme="monochrome"],[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                // ---- Existing colors (kept for backward compat) ----
                background: "var(--bg-primary)",
                primary: "var(--bg-primary)",
                secondary: "var(--bg-secondary)",
                tertiary: "var(--bg-tertiary)",
                foreground: "var(--text-primary)",
                "secondary-foreground": "var(--text-secondary)",
                muted: "var(--text-muted)",
                accent: {
                    DEFAULT: "var(--accent)",
                    dim: "var(--accent-dim)",
                    light: "var(--accent-light)",
                },
                success: "var(--color-success)",
                warning: "var(--color-warning)",
                error: "var(--color-error)",
                info: "var(--color-info)",
                cyan: "var(--color-cyan)",
                magenta: "var(--color-magenta)",
                glass: "var(--glass-border)",

                // ---- New structured token utilities ----
                surface: {
                    root: "var(--surface-root)",
                    primary: "var(--surface-primary)",
                    elevated: "var(--surface-elevated)",
                    overlay: "var(--surface-overlay)",
                    spotlight: "var(--surface-spotlight)",
                    intense: "var(--surface-intense)",
                },
                content: {
                    primary: "var(--content-primary)",
                    secondary: "var(--content-secondary)",
                    tertiary: "var(--content-tertiary)",
                    muted: "var(--content-muted)",
                    inverse: "var(--content-inverse)",
                },
                line: {
                    subtle: "var(--line-subtle)",
                    DEFAULT: "var(--line-default)",
                    strong: "var(--line-strong)",
                },
                "accent-token": {
                    solid: "var(--accent-solid)",
                    hover: "var(--accent-hover)",
                    subtle: "var(--accent-subtle)",
                    text: "var(--accent-text)",
                    border: "var(--accent-border)",
                },
                severity: {
                    critical: "var(--severity-critical)",
                    "critical-bg": "var(--severity-critical-bg)",
                    "critical-border": "var(--severity-critical-border)",
                    warning: "var(--severity-warning)",
                    "warning-bg": "var(--severity-warning-bg)",
                    "warning-border": "var(--severity-warning-border)",
                    success: "var(--severity-success)",
                    "success-bg": "var(--severity-success-bg)",
                    "success-border": "var(--severity-success-border)",
                    info: "var(--severity-info)",
                    "info-bg": "var(--severity-info-bg)",
                    "info-border": "var(--severity-info-border)",
                },
            },
            fontFamily: {
                sans: ["var(--font-body)", "sans-serif"],
                heading: ["var(--font-heading)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
                serif: ["Playfair Display", "serif"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
