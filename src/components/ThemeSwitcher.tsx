"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const currentTheme = theme === 'system' ? resolvedTheme : theme;
    const isDark = currentTheme === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    // Sun rays animation
    const rayVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (i: number) => ({
            scale: 1,
            opacity: 1,
            transition: {
                delay: i * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 20,
            },
        }),
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-8 right-8 z-[200] flex h-14 w-14 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--bg-glass)] backdrop-blur-md transition-all hover:border-[var(--accent)] hover:scale-110 active:scale-95"
            aria-label="Toggle Theme"
        >
            <div className="relative h-6 w-6">
                <AnimatePresence mode="wait">
                    {isDark ? (
                        // Moon
                        <motion.svg
                            key="moon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            initial={{ rotate: -90, scale: 0, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            exit={{ rotate: 90, scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="absolute inset-0"
                        >
                            <motion.path
                                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            />
                        </motion.svg>
                    ) : (
                        // Sun with animated rays
                        <motion.svg
                            key="sun"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ rotate: 90, scale: 0, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            exit={{ rotate: -90, scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="absolute inset-0"
                        >
                            {/* Sun circle */}
                            <motion.circle
                                cx="12"
                                cy="12"
                                r="5"
                                fill="currentColor"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                            />
                            {/* Sun rays */}
                            {[
                                { x1: 12, y1: 1, x2: 12, y2: 3 },
                                { x1: 12, y1: 21, x2: 12, y2: 23 },
                                { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 },
                                { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 },
                                { x1: 1, y1: 12, x2: 3, y2: 12 },
                                { x1: 21, y1: 12, x2: 23, y2: 12 },
                                { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 },
                                { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 },
                            ].map((ray, i) => (
                                <motion.line
                                    key={i}
                                    x1={ray.x1}
                                    y1={ray.y1}
                                    x2={ray.x2}
                                    y2={ray.y2}
                                    custom={i}
                                    variants={rayVariants}
                                    initial="hidden"
                                    animate="visible"
                                />
                            ))}
                        </motion.svg>
                    )}
                </AnimatePresence>
            </div>
        </button>
    );
};

