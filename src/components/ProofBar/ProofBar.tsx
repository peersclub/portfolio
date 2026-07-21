'use client';

import { motion } from 'framer-motion';

// Falsifiable numbers only — every stat names its source.
const PROOF = [
    { value: '1M+', label: 'users scaled', source: 'CoinDCX' },
    { value: '+42%', label: 'retention in 8 months', source: 'BabyChakra' },
    { value: '+40%', label: 'fisher income, 50K+ downloads', source: 'CaptainFresh' },
    { value: '13 yrs', label: 'shipping products', source: '8 companies' },
];

export default function ProofBar() {
    return (
        <section className="proof section" aria-label="Track record">
            <div className="container">
                <div className="proof-grid">
                    {PROOF.map((stat, i) => (
                        <motion.div
                            key={stat.source}
                            className="proof-item"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10%' }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                            <span className="value">{stat.value}</span>
                            <span className="label">{stat.label}</span>
                            <span className="source">{stat.source}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .proof {
                    padding: var(--space-3xl) 0;
                    border-top: 1px solid var(--line-subtle, var(--glass-border));
                    border-bottom: 1px solid var(--line-subtle, var(--glass-border));
                    background: var(--bg-secondary);
                }

                .proof-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: var(--space-xl);
                }

                .proof-item {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .value {
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: var(--accent);
                    line-height: 1.1;
                }

                .label {
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                }

                .source {
                    font-family: var(--font-mono);
                    font-size: 0.7rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: var(--text-muted);
                }

                @media (max-width: 768px) {
                    .proof-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: var(--space-lg);
                    }
                    .value {
                        font-size: 1.75rem;
                    }
                }
            `}</style>
        </section>
    );
}
