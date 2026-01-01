"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // or a skeleton/placeholder to prevent hydration mismatch
    }

    // Use resolvedTheme to handle system preference if enabled
    const currentTheme = theme === 'system' ? resolvedTheme : theme;

    const toggleTheme = () => {
        setTheme(currentTheme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-8 right-8 z-[200] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--bg-glass)] backdrop-blur-md transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)]"
            aria-label="Toggle Theme"
        >
            <div className="relative h-5 w-5">
                <motion.div
                    initial={false}
                    animate={{
                        scale: currentTheme === "dark" ? 1 : 0,
                        opacity: currentTheme === "dark" ? 1 : 0,
                        rotate: currentTheme === "dark" ? 0 : 90,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {/* Moon Icon */}
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        scale: currentTheme === "light" ? 1 : 0,
                        opacity: currentTheme === "light" ? 1 : 0,
                        rotate: currentTheme === "light" ? 0 : -90,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {/* Sun Icon */}
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                </motion.div>
            </div>
        </button>
    );
};
