"use client";

import { motion } from "framer-motion";

interface Step {
    number: string;
    title: string;
    description: string;
}

interface ProcessGridProps {
    steps: Step[];
}

export const ProcessGrid = ({ steps }: ProcessGridProps) => {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-8 transition-all hover:border-[var(--accent)] hover:bg-[var(--bg-glass)]"
                >
                    <div>
                        <span className="font-mono text-4xl font-bold text-[var(--glass-border)] transition-colors group-hover:text-[var(--accent)]/20">
                            {step.number}
                        </span>
                        <h3 className="mt-4 text-xl font-bold text-[var(--text-primary)]">
                            {step.title}
                        </h3>
                        <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                            {step.description}
                        </p>
                    </div>
                    <div className="mt-8 h-1 w-12 bg-[var(--glass-border)] transition-all group-hover:w-full group-hover:bg-[var(--accent)]" />
                </motion.div>
            ))}
        </div>
    );
};
