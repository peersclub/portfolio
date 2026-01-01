"use client";

import { ProcessModule, ProcessStep } from "@/components/Playbook/ProcessModule";
import { StickySubNav } from "@/components/StickySubNav";
import { motion } from "framer-motion";
import styles from "@/components/Playbook/Playbook.module.css";
import { useState, useEffect } from "react";
import { QUOTES } from "@/lib/quotes";
import Footer from "@/components/Footer/Footer";

const SECTIONS = [
    { id: "approach", label: "My Approach" },
    { id: "discovery", label: "Discovery" },
    { id: "definition", label: "Definition" },
    { id: "development", label: "Development" },
];

const DISCOVERY_STEPS: ProcessStep[] = [
    {
        number: "01",
        title: "Stakeholder Alignment",
        description: "Deconstructing business goals to find the 'True North'. We don't just take requirements; we interrogate the problem space.",
        methodology: "Strategic Interrogation",
        tools: ["Miro", "Notion", "Gong"]
    },
    {
        number: "02",
        title: "User Research",
        description: "Qualitative deep-dives and quantitative verification. Uncovering latent needs that users can't articulate themselves.",
        methodology: "Jobs To Be Done (JTBD)",
        tools: ["Dovetail", "UserTesting", "Typeform"] // Removed Mixpanel as it's more analytics
    },
    {
        number: "03",
        title: "Market Intelligence",
        description: "Identifying white space in the competitive landscape. We look for what competitors are ignoring.",
        methodology: "Blue Ocean Canvas",
        tools: ["Crunchbase", "SimilarWeb"]
    },
];

const DEFINITION_STEPS: ProcessStep[] = [
    {
        number: "04",
        title: "First Principles Framing",
        description: "Boiling the problem down to its fundamental truths and building up from there. No 'copy-paste' solutions.",
        methodology: "First Principles Thinking",
        tools: ["FigJam", "Whiteboard"]
    },
    {
        number: "05",
        title: "System Architecture",
        description: "Mapping object relationships, data flows, and state logic before a single pixel is drawn.",
        methodology: "Object-Oriented UX (OOUX)",
        tools: ["LucidChart", "Mermaid.js"]
    },
    {
        number: "06",
        title: "Rapid Prototyping",
        description: "Low-fidelity validation loops to fail fast and cheap. Testing core mechanics, not just UI.",
        methodology: "Lean UX",
        tools: ["Figma", "Rive", "Protopie"]
    },
];

const DEV_STEPS: ProcessStep[] = [
    {
        number: "07",
        title: "Agile Development",
        description: "Iterative sprints with strict acceptance criteria. Shipping value in vertical slices, not horizontal layers.",
        methodology: "Scrum / Kanban",
        tools: ["Linear", "Jira", "GitHub"]
    },
    {
        number: "08",
        title: "Quality Engineering",
        description: "Rigorous automated testing and manual polish. 'Works on my machine' is not an acceptable status.",
        methodology: "TDD / E2E Testing",
        tools: ["Playwright", "Storybook"]
    },
    {
        number: "09",
        title: "Launch & Telemetry",
        description: "Controlled rollout with real-time impact monitoring. We ignore vanity metrics and focus on retention.",
        methodology: "A/B Testing",
        tools: ["PostHog", "DataDog", "LaunchDarkly"]
    },
];

export default function PlaybookPage() {
    const [quote, setQuote] = useState(QUOTES[0]);

    useEffect(() => {
        // Pick a random quote on mount
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        setQuote(QUOTES[randomIndex]);
    }, []);

    return (
        <>
            <div className="min-h-screen bg-[var(--bg-primary)]">
                <section className="relative flex min-h-[50vh] sm:min-h-[60vh] flex-col justify-center px-4 sm:px-6 overflow-hidden">
                    {/* Background Tech Grid */}
                    <div className="blueprint-grid opacity-30" />

                    <div className="container mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-4 inline-block rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 px-4 py-1 text-sm font-bold text-[var(--accent)] uppercase tracking-wider"
                        >
                            System Blueprint v2.0
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)]"
                        >
                            The <span className="text-[var(--accent)]">Playbook</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 sm:mt-6 max-w-2xl text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed"
                        >
                            From chaos to clarity. A battle-tested system for building products that scale to millions.
                            <span className="block mt-2 text-[var(--text-muted)] text-base font-mono">// Execute. Measure. Learn.</span>
                        </motion.p>
                    </div>
                </section>

                <StickySubNav sections={SECTIONS} />

                <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
                    {/* Approach Section */}
                    <section id="approach" className="mb-40 scroll-mt-32 pt-12 text-center">
                        <div className="flex items-center justify-center gap-4 mb-10">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--accent)] opacity-30" />
                            <span className="text-5xl font-bold text-[var(--accent)] opacity-30">★</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--accent)] opacity-30" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-light text-[var(--text-primary)] md:text-5xl">
                            "{quote.text} <span className="text-[var(--accent)]">{quote.highlight}</span>."
                        </h2>
                        <p className="mt-4 text-[var(--text-muted)] font-mono text-sm uppercase tracking-widest">
                            Systematic Execution Protocol
                        </p>
                    </section>

                    {/* Discovery Section */}
                    <section id="discovery" className="mb-40 scroll-mt-32">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="flex flex-col">
                                <span className="text-6xl sm:text-7xl md:text-8xl font-bold text-[var(--glass-border)] opacity-20 -mb-4 sm:-mb-6 leading-none select-none">01</span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Discovery</h2>
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-[var(--glass-border)] to-transparent opacity-50" />
                        </div>

                        <div className={styles.moduleGrid}>
                            {DISCOVERY_STEPS.map((step, idx) => (
                                <ProcessModule key={idx} step={step} index={idx} />
                            ))}
                        </div>
                    </section>

                    {/* Definition Section */}
                    <section id="definition" className="mb-40 scroll-mt-32">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="flex flex-col">
                                <span className="text-6xl sm:text-7xl md:text-8xl font-bold text-[var(--glass-border)] opacity-20 -mb-4 sm:-mb-6 leading-none select-none">02</span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Definition</h2>
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-[var(--glass-border)] to-transparent opacity-50" />
                        </div>

                        <div className={styles.moduleGrid}>
                            {DEFINITION_STEPS.map((step, idx) => (
                                <ProcessModule key={idx} step={step} index={idx} />
                            ))}
                        </div>
                    </section>

                    {/* Development Section */}
                    <section id="development" className="mb-40 scroll-mt-32">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="flex flex-col">
                                <span className="text-6xl sm:text-7xl md:text-8xl font-bold text-[var(--glass-border)] opacity-20 -mb-4 sm:-mb-6 leading-none select-none">03</span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Delivery</h2>
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-[var(--glass-border)] to-transparent opacity-50" />
                        </div>

                        <div className={styles.moduleGrid}>
                            {DEV_STEPS.map((step, idx) => (
                                <ProcessModule key={idx} step={step} index={idx} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
