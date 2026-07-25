'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useScroll } from 'framer-motion';
import BrandName from '@/components/BrandName';
import ThreadStage from './components/ThreadStage';
import V2Nav from './components/V2Nav';
import Word from './components/Word';
import { reveal, stagger } from './components/motion';
import { chapters, CONTACT, THREAD_LABELS } from './data';
import './v2.css';

export default function V2Page() {
    const progressRef = useRef(0);
    const [activeState, setActiveState] = useState(0);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        return scrollYProgress.on('change', (v) => {
            progressRef.current = v;
            const idx = Math.min(
                THREAD_LABELS.length - 1,
                Math.round(v * (THREAD_LABELS.length - 1)),
            );
            setActiveState((prev) => (prev === idx ? prev : idx));
        });
    }, [scrollYProgress]);

    return (
        <div className="v2">
            <ThreadStage
                progressRef={progressRef}
                veil
                hudLabel={`${String(activeState + 1).padStart(2, '0')} / ${THREAD_LABELS[activeState]}`}
                hudProgress={scrollYProgress}
            />

            <V2Nav />

            {/* ————— HERO ————— */}
            <section className="v2-section v2-hero">
                <motion.div
                    className="v2-hero-inner"
                    initial="hidden"
                    animate="show"
                    variants={stagger(0.12, 0.3)}
                >
                    <motion.span className="v2-label" variants={reveal}>
                        Suresh Victor — Second Edition
                    </motion.span>
                    <motion.h1 className="v2-title" variants={stagger(0.08)}>
                        <Word>Every</Word> <Word>product</Word> <Word>starts</Word>
                        <br />
                        <Word>as</Word> <Word>a</Word> <Word><em>knot.</em></Word>
                    </motion.h1>
                    <motion.p className="v2-lede" variants={reveal}>
                        Ten years untangling fintech, consumer, and AI products —
                        from first PM role to co-founder. Scroll to pull the thread.
                    </motion.p>
                    <motion.div className="v2-scroll-cue" variants={reveal}>
                        <span className="v2-scroll-line" />
                        <span>scroll</span>
                    </motion.div>
                </motion.div>
            </section>

            {/* ————— CHAPTERS ————— */}
            {chapters.map((c, i) => (
                <section key={c.id} className={`v2-section v2-chapter v2-chapter--${c.align}`}>
                    <motion.div
                        className="v2-chapter-card"
                        style={{ '--ch': c.color } as CSSProperties}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-20%' }}
                        variants={stagger(0.1)}
                    >
                        <motion.span className="v2-label" variants={reveal}>
                            {String(i + 1).padStart(2, '0')} · {c.era} · <BrandName name={c.company} />
                        </motion.span>
                        <motion.div className="v2-metric" variants={reveal}>
                            <span className="v2-metric-value">{c.metric}</span>
                            <span className="v2-metric-label">{c.metricLabel}</span>
                        </motion.div>
                        <motion.h2 className="v2-chapter-h" variants={reveal}>{c.headline}</motion.h2>
                        <motion.p className="v2-body" variants={reveal}>{c.body}</motion.p>
                        <motion.div variants={reveal}>
                            <Link href={c.href} className="v2-case-link">
                                {c.role} → read the case study
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>
            ))}

            {/* ————— CONTACT ————— */}
            <section className="v2-section v2-contact">
                <motion.div
                    className="v2-hero-inner v2-contact-inner"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-20%' }}
                    variants={stagger(0.12)}
                >
                    <motion.span className="v2-label" variants={reveal}>
                        {String(chapters.length + 1).padStart(2, '0')} · Now
                    </motion.span>
                    <motion.h2 className="v2-contact-h" variants={reveal}>
                        …and ships as a <em>straight line.</em>
                    </motion.h2>
                    <motion.p className="v2-lede" variants={reveal}>
                        Currently building AssetWorks AI. Always up for a hard knot.
                    </motion.p>
                    <motion.div className="v2-cta-row" variants={reveal}>
                        <a href={`mailto:${CONTACT.email}`} className="v2-cta v2-cta--solid">
                            Start a thread
                        </a>
                        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="v2-cta">
                            WhatsApp
                        </a>
                        <Link href="/" className="v2-cta v2-cta--ghost">
                            Classic site →
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}
