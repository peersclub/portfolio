'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion, useScroll, type Variants } from 'framer-motion';
import { chapters, CONTACT, THREAD_LABELS } from './data';
import V2Nav from './components/V2Nav';
import './v2.css';

const ThreadScene = dynamic(() => import('./components/ThreadScene'), { ssr: false });

const reveal: Variants = {
    hidden: { opacity: 0, y: 48 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] },
    },
};

// Words rise out of an overflow-hidden mask, one after another.
const wordUp: Variants = {
    hidden: { y: '115%' },
    show: {
        y: '0%',
        transition: { duration: 0.85, ease: [0.19, 1, 0.22, 1] },
    },
};

const Word = ({ children }: { children: ReactNode }) => (
    <span className="v2-w">
        <motion.span className="v2-wi" variants={wordUp}>
            {children}
        </motion.span>
    </span>
);

export default function V2Page() {
    const progressRef = useRef(0);
    const [activeState, setActiveState] = useState(0);
    const [ready, setReady] = useState(false);
    const [mounted, setMounted] = useState(false);
    const reduced = useReducedMotion() ?? false;
    const { scrollYProgress } = useScroll();

    useEffect(() => setMounted(true), []);

    // Failsafe: never leave the veil up if WebGL can't start.
    useEffect(() => {
        const t = setTimeout(() => setReady(true), 4000);
        return () => clearTimeout(t);
    }, []);

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

    const onSceneReady = useCallback(() => setReady(true), []);

    return (
        <div className="v2">
            {/* Fixed layers live in a body portal: app/template.tsx keeps a
                `filter`/`will-change` wrapper on every page, which turns it
                into the containing block for position:fixed — inside <main>,
                "fixed" would pin to the page, not the viewport. */}
            {mounted &&
                createPortal(
                    <>
                        {/* Persistent 3D scene — the page scrolls, the thread morphs */}
                        <div className="v2-canvas" aria-hidden="true">
                            <ThreadScene progressRef={progressRef} reduced={reduced} onReady={onSceneReady} />
                        </div>

                        {/* Loading veil, fades once WebGL is live */}
                        <div className={`v2-veil ${ready ? 'v2-veil--done' : ''}`} aria-hidden="true">
                            <span className="v2-veil-mark">pulling the thread…</span>
                        </div>

                        {/* HUD — current thread state + progress hairline */}
                        <div className="v2-hud" aria-hidden="true">
                            <span className="v2-hud-label">
                                {String(activeState + 1).padStart(2, '0')} / {THREAD_LABELS[activeState]}
                            </span>
                            <div className="v2-hud-track">
                                <motion.div className="v2-hud-bar" style={{ scaleX: scrollYProgress }} />
                            </div>
                        </div>
                    </>,
                    document.body,
                )}

            <V2Nav />

            {/* ————— HERO ————— */}
            <section className="v2-section v2-hero">
                <motion.div
                    className="v2-hero-inner"
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
                >
                    <motion.span className="v2-label" variants={reveal}>
                        Suresh Victor — Second Edition
                    </motion.span>
                    <motion.h1
                        className="v2-title"
                        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                    >
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
                        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                    >
                        <motion.span className="v2-label" variants={reveal}>
                            {String(i + 1).padStart(2, '0')} · {c.era} · {c.company}
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
                    variants={{ show: { transition: { staggerChildren: 0.12 } } }}
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
