"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface Role {
    title: string;
    period: string;
    details: string[];
}

interface ExperienceCardProps {
    company: string;
    logo?: string;
    url?: string;
    description?: string;
    roles: Role[];
}

export const ExperienceCard = ({ company, logo, url, description, roles }: ExperienceCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            className="group relative overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-6 transition-colors hover:border-[var(--accent-light)]"
        >
            <div className="flex cursor-pointer items-start justify-between" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-start gap-4">
                    {logo && (
                        <img
                            src={logo}
                            alt={company}
                            width={40}
                            height={40}
                            // white chip so any brand logo (colored SVG) stays legible on the dark card
                            className="rounded-lg border border-[var(--glass-border)] bg-white object-contain p-1.5"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    )}
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
                        {description && (
                            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{description}</p>
                        )}
                        {url && (
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="mt-2 inline-flex items-center gap-1.5 text-xs text-[var(--accent)] opacity-70 hover:opacity-100 transition-opacity"
                            >
                                <ExternalLink size={12} />
                                {url.replace(/^https?:\/\/(www\.)?/, '')}
                            </a>
                        )}
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
