'use client';

import { motion } from 'framer-motion';
import styles from './Playbook.module.css';

export interface ProcessStep {
    number: string;
    title: string;
    description: string;
    methodology?: string;
    tools?: string[];
    deliverables?: string[];
}

interface ProcessModuleProps {
    step: ProcessStep;
    index: number;
}

export const ProcessModule = ({ step, index }: ProcessModuleProps) => {
    return (
        <motion.div
            className={styles.processCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            {/* Decorative Blueprint Line */}
            <div className={styles.connectorLine} />

            <div className={styles.cardHeader}>
                <span className={styles.stepNumber}>{step.number}</span>
            </div>

            <h3 className={styles.cardTitle}>{step.title}</h3>
            <p className={styles.cardDescription}>{step.description}</p>

            <div className={styles.metaGrid}>
                {/* Methodology / Input */}
                {step.methodology && (
                    <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Methodology</span>
                        <span className="text-sm font-medium text-[var(--accent)]">
                            {step.methodology}
                        </span>
                    </div>
                )}

                {/* Tools Stack */}
                {step.tools && step.tools.length > 0 && (
                    <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>System Tools</span>
                        <div className={styles.tagsContainer}>
                            {step.tools.map((tool) => (
                                <span key={tool} className={styles.techTag}>
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
