"use client";


import { StickySubNav } from "@/components/StickySubNav";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CompatibilityModule } from "@/components/RightFit/CompatibilityModule";
import { KernelModule } from "@/components/RightFit/KernelModule";
import styles from "@/components/RightFit/RightFit.module.css";
import Footer from "@/components/Footer/Footer";

const SECTIONS = [
    { id: "protocol", label: "Core Protocol" },
    { id: "diagnostics", label: "Diagnostics" },
    { id: "interface", label: "Interface" },
];

const KERNEL_VALUES = [
    { label: "SYS.KERNEL.01", title: "Empathy & Logic", description: "Great products reside at the intersection of deep human empathy and rigorous system logic. One cannot exist without the other." },
    { label: "SYS.KERNEL.02", title: "Outcome > Output", description: "I measure success by user impact and business value, not by the number of features shipped or ticket velocity." },
    { label: "SYS.KERNEL.03", title: "Simplicity", description: "Complexity is the enemy of scale. I strive to simplify systems, processes, and interfaces relentlessly." },
];

const GREEN_FLAGS = [
    { text: "Your team values autonomous decision making over top-down directives." },
    { text: "You prefer written documentation (Async) over endless meetings (Sync)." },
    { text: "Feedback is radical, candid, and viewed as a mechanism for system improvement." },
    { text: "You define 'Done' as 'Verified in Production', not 'Merged to Master'." },
];

const RED_FLAGS = [
    { text: "Decisions are made based on HIPPO (Highest Paid Person's Opinion) rather than data." },
    { text: "Engineers are treated as 'Ticket Moabers' rather than product partners." },
    { text: "Failure is punished rather than analyzed for root cause." },
    { text: "Process is valued more than the actual product outcome." },
];

export default function TheRightFitPage() {
    const containerRef = useRef(null);

    return (
        <>
            <div ref={containerRef} className="min-h-screen bg-[var(--bg-primary)]">
                {/* Hero System Status */}
                <section className="relative flex min-h-[50vh] sm:min-h-[60vh] flex-col justify-center px-4 sm:px-6 overflow-hidden">
                    <div className="blueprint-grid opacity-30" />
                    <div className="container mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles.systemStatus}
                        >
                            <div className={styles.blink} />
                            <span className={styles.statusText}>System Compatibility Check Running...</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-[var(--text-primary)]"
                        >
                            Are we <span className="text-[var(--accent)]">compatible?</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6 sm:mt-8 max-w-2xl text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed"
                        >
                            Running diagnostic on operating principles. I thrive in environments that prioritize clarity, autonomy, and psychological safety.
                        </motion.p>
                    </div>
                </section>

                <StickySubNav sections={SECTIONS} />

                <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20">

                    {/* Protocol Section (Values) */}
                    <section id="protocol" className="mb-40 scroll-mt-32 pt-12">
                        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--accent)] opacity-30">01</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-[var(--glass-border)] to-transparent opacity-50" />
                            <span className="font-mono text-[var(--text-muted)] tracking-widest text-sm uppercase">Kernel Protocols</span>
                        </div>

                        <div className={styles.kernelGrid}>
                            {KERNEL_VALUES.map((val, idx) => (
                                <KernelModule key={idx} index={idx} label={val.label} title={val.title} description={val.description} />
                            ))}
                        </div>
                    </section>

                    {/* Diagnostics Section (Green/Red Flags) */}
                    <section id="diagnostics" className="mb-40 scroll-mt-32">
                        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--accent)] opacity-30">02</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-[var(--glass-border)] to-transparent opacity-50" />
                            <span className="font-mono text-[var(--text-muted)] tracking-widest text-sm uppercase">Compatibility Check</span>
                        </div>

                        <div className={styles.flagContainer}>
                            <CompatibilityModule
                                type="success"
                                title="System Optimized (Green Flags)"
                                items={GREEN_FLAGS}
                                delay={0.1}
                            />
                            <CompatibilityModule
                                type="danger"
                                title="Critical Error (Red Flags)"
                                items={RED_FLAGS}
                                delay={0.2}
                            />
                        </div>
                    </section>

                    {/* Interface Section (Collaboration) */}
                    <section id="interface" className="mb-40 scroll-mt-32">
                        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--accent)] opacity-30">03</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-[var(--glass-border)] to-transparent opacity-50" />
                            <span className="font-mono text-[var(--text-muted)] tracking-widest text-sm uppercase">Interface Protocols</span>
                        </div>

                        <div className="grid gap-6 sm:gap-8 border border-[var(--glass-border)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12">
                            <div className="prose prose-invert max-w-none">
                                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Collaborating with the System</h3>
                                <ul className="space-y-4 text-lg text-[var(--text-secondary)] list-none pl-0">
                                    <li className="flex gap-4">
                                        <span className="text-[var(--accent)] font-mono">01_</span>
                                        <span>I interface best with <strong>Engineers</strong> who care about the 'Why', not just the 'How'. We partner to solve problems, not just close tickets.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-[var(--accent)] font-mono">02_</span>
                                        <span>I sync with <strong>Designers</strong> to ensure feasibility without compromising the vision. Pixel perfection is a shared standard.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-[var(--accent)] font-mono">03_</span>
                                        <span>I align with <strong>Stakeholders</strong> by translating technical constraints into business value and vice versa.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
