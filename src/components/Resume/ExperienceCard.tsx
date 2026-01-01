"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Role {
    title: string;
    period: string;
    details: string[];
}

interface ExperienceCardProps {
    company: string;
    logo?: string; // Optional logo/icon
    roles: Role[];
}

export const ExperienceCard = ({ company, roles }: ExperienceCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            className="group relative overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-6 transition-colors hover:border-[var(--accent-light)]"
        >
            <div className="flex cursor-pointer items-start justify-between" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{company}</h3>
                    <div className="mt-2 flex flex-col gap-1">
                        {roles.map((role, idx) => (
                            <div key={idx} className="flex flex-wrap items-baseline gap-2 text-sm text-[var(--text-secondary)]">
                                <span className="font-medium">{role.title}</span>
                                <span className="text-[var(--text-muted)]">• {role.period}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-[var(--glass-border)] transition-all group-hover:border-[var(--accent)] ${isOpen ? "bg-[var(--accent)] text-[var(--bg-primary)]" : "text-[var(--text-muted)]"
                        }`}
                >
                    <motion.svg
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </motion.svg>
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="mt-6 space-y-6 border-t border-[var(--glass-border)] pt-6">
                            {roles.map((role, idx) => (
                                <div key={idx} className="space-y-3">
                                    {roles.length > 1 && (
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
                                            {role.title}
                                        </h4>
                                    )}
                                    <ul className="space-y-2">
                                        {role.details.map((detail, dIdx) => (
                                            <li key={dIdx} className="flex items-start gap-3 text-[var(--text-secondary)]">
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />
                                                <span className="leading-relaxed">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
