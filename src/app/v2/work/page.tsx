'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import ThreadStage from '../components/ThreadStage';
import { rise } from '../components/motion';
import V2Nav from '../components/V2Nav';
import '../v2.css';

export default function V2WorkPage() {
    return (
        <div className="v2">
            {/* tangle, pushed deep — a quiet backdrop for the grid */}
            <ThreadStage progress={0} />
            <V2Nav />

            <div className="v2-page">
                <motion.header
                    className="v2-page-head"
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
                >
                    <motion.span className="v2-label" variants={rise}>
                        Selected Work
                    </motion.span>
                    <motion.h1 className="v2-page-title" variants={rise}>
                        Six companies, one <em>thread.</em>
                    </motion.h1>
                    <motion.p className="v2-lede" variants={rise}>
                        Fintech, consumer, supply chain, travel, AI — every chapter pulled
                        a different knot.
                    </motion.p>
                </motion.header>

                <div className="v2-work-grid">
                    {projects.map((p) => (
                        <motion.article
                            key={p.slug}
                            className="v2-chapter-card v2-work-card"
                            style={{ '--ch': p.color } as CSSProperties}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-10%' }}
                            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
                        >
                            <motion.span className="v2-label" variants={rise}>
                                {p.year} · {p.category}
                            </motion.span>
                            <motion.h2 className="v2-chapter-h" variants={rise}>
                                {p.company}
                            </motion.h2>
                            <motion.p className="v2-body" variants={rise}>
                                {p.tagline}
                            </motion.p>
                            <motion.div className="v2-metric-row" variants={rise}>
                                {p.metrics.map((m) => (
                                    <div key={m.label} className="v2-mini-metric">
                                        <span className="v2-mini-value">{m.value}</span>
                                        <span className="v2-metric-label">{m.label}</span>
                                    </div>
                                ))}
                            </motion.div>
                            <motion.div className="v2-chip-row" variants={rise}>
                                {p.tech.map((t) => (
                                    <span className="v2-chip" key={t}>
                                        {t}
                                    </span>
                                ))}
                            </motion.div>
                            <motion.div variants={rise}>
                                <Link className="v2-case-link" href={`/projects/${p.slug}`}>
                                    Read the case study →
                                </Link>
                            </motion.div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
}
