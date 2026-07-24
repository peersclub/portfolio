'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ThreadStage from '../components/ThreadStage';
import { rise } from '../components/motion';
import V2Nav from '../components/V2Nav';
import '../v2.css';

const DETAILS: [string, string][] = [
    ['Based in', 'Bangalore, India'],
    ['Education', 'B.Tech, NIT Karnataka'],
    ['Focus', 'Product Strategy, AI, and Fintech'],
    ['Now', 'Co-Founder & CPO, AssetWorks AI'],
];

const MORE: [string, string][] = [
    ['/resume', 'Résumé'],
    ['/mylife', 'My life, scrolling'],
    ['/network', 'Network atlas — 11k connections'],
    ['/sharing', 'Writing & sharing'],
];

export default function V2AboutPage() {
    return (
        <div className="v2">
            {/* knot, small and dimmed in the upper right — decoration, not competition */}
            <ThreadStage progress={1 / 7} dim={0.55} offset={[3.2, 0.5, -1.8]} poseScale={0.65} />
            <V2Nav />

            <div className="v2-page">
                <div className="v2-about-grid">
                    <motion.div
                        className="v2-about-main"
                        initial="hidden"
                        animate="show"
                        variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
                    >
                        <motion.span className="v2-label" variants={rise}>
                            About
                        </motion.span>
                        <motion.h1 className="v2-page-title" variants={rise}>
                            Ten years of building <em>what matters.</em>
                        </motion.h1>
                        <motion.p className="v2-lede" variants={rise}>
                            I&apos;m driven by a simple mission: build high-quality, scalable
                            products that people genuinely love to use.
                        </motion.p>
                        <motion.p className="v2-body" variants={rise}>
                            From scaling India&apos;s largest crypto exchange to pioneering
                            AI-powered financial tools, I specialize in turning complex ideas
                            into intuitive experiences that serve millions. Currently
                            co-founding AssetWorks AI, where we&apos;re making sophisticated
                            financial analysis accessible through natural language.
                        </motion.p>
                        <motion.p className="v2-body" variants={rise}>
                            I work in written docs over meetings, measure outcomes over
                            output, and treat engineers as product partners — not ticket
                            takers.
                        </motion.p>
                        <motion.div variants={rise}>
                            <Link href="/about" className="v2-case-link">
                                The full story →
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.aside
                        className="v2-chapter-card v2-about-card"
                        initial="hidden"
                        animate="show"
                        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
                    >
                        {DETAILS.map(([label, value]) => (
                            <motion.div key={label} className="v2-detail" variants={rise}>
                                <span className="v2-metric-label">{label}</span>
                                <span className="v2-detail-value">{value}</span>
                            </motion.div>
                        ))}
                        <motion.div className="v2-more" variants={rise}>
                            <span className="v2-metric-label">More</span>
                            {MORE.map(([href, label]) => (
                                <Link key={href} href={href} className="v2-more-link">
                                    {label} →
                                </Link>
                            ))}
                        </motion.div>
                    </motion.aside>
                </div>
            </div>
        </div>
    );
}
