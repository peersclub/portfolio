'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import ThreadStage from '../components/ThreadStage';
import V2Nav from '../components/V2Nav';
import { rise, stagger } from '../components/motion';
import '../v2.css';

export default function V2WorkPage() {
    return (
        <div className="v2">
            {/* distant, dimmed tangle — pure atmosphere behind the index */}
            <ThreadStage progress={0} dim={0.45} offset={[0, 0.2, -4.4]} poseScale={1.2} />
            <V2Nav />

            <div className="v2-page">
                <motion.header
                    className="v2-page-head v2-page-head--left"
                    initial="hidden"
                    animate="show"
                    variants={stagger(0.1, 0.15)}
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

                <motion.div
                    className="v2-index"
                    initial="hidden"
                    animate="show"
                    variants={stagger(0.08, 0.35)}
                >
                    {projects.map((p, i) => (
                        <motion.div key={p.slug} variants={rise}>
                            <Link
                                href={`/projects/${p.slug}`}
                                className="v2-index-row"
                                style={{ '--ch': p.color } as CSSProperties}
                            >
                                <span className="v2-index-num">{String(i + 1).padStart(2, '0')}</span>
                                <span className="v2-index-main">
                                    <span className="v2-index-company">{p.company}</span>
                                    <span className="v2-index-tagline">{p.tagline}</span>
                                </span>
                                <span className="v2-index-meta">
                                    {p.year}
                                    <br />
                                    {p.category}
                                </span>
                                <span className="v2-index-metric">
                                    <span className="v2-index-value">{p.metrics[0].value}</span>
                                    <span className="v2-metric-label">{p.metrics[0].label}</span>
                                </span>
                                <span className="v2-index-arrow" aria-hidden="true">→</span>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
