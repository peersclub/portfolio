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
                background: "var(--bg-primary)", // Mapping default background
                primary: "var(--bg-primary)",
                secondary: "var(--bg-secondary)",
                tertiary: "var(--bg-tertiary)",

                text: {
                    primary: "var(--text-primary)",
                    secondary: "var(--text-secondary)",
                    muted: "var(--text-muted)",
                },

                accent: {
                    DEFAULT: "var(--accent)",
                    dim: "var(--accent-dim)",
                    light: "var(--accent-light)",
                },

                semantic: {
                    success: "var(--color-success)",
                    warning: "var(--color-warning)",
                    error: "var(--color-error)",
                    info: "var(--color-info)",
                },

                glass: {
                    border: "var(--glass-border)",
                },
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
