import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ['selector', '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                background: "var(--bg-primary)",

                // Background colors - use as bg-primary, bg-secondary, bg-tertiary
                primary: "var(--bg-primary)",
                secondary: "var(--bg-secondary)",
                tertiary: "var(--bg-tertiary)",

                // Text colors - use as text-foreground, text-muted, text-secondary-foreground
                foreground: "var(--text-primary)",
                "secondary-foreground": "var(--text-secondary)",
                muted: "var(--text-muted)",

                // Accent colors
                accent: {
                    DEFAULT: "var(--accent)",
                    dim: "var(--accent-dim)",
                    light: "var(--accent-light)",
                },

                // Semantic colors
                success: "var(--color-success)",
                warning: "var(--color-warning)",
                error: "var(--color-error)",
                info: "var(--color-info)",

                // Extended palette
                cyan: "var(--color-cyan)",
                magenta: "var(--color-magenta)",

                // Glass effect
                glass: "var(--glass-border)",
            },
            fontFamily: {
                sans: ["var(--font-body)", "sans-serif"],
                heading: ["var(--font-heading)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
        },
    },
    plugins: [],
};
export default config;
