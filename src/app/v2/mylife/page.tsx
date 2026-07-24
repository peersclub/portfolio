'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
    animate,
    motion,
    useInView,
    useReducedMotion,
    useScroll,
    useTransform,
    type MotionValue,
    type Variants,
} from 'framer-motion';
import V2Nav from '../components/V2Nav';
import { THREAD_SHAPES } from '../components/threadShapes';
import { acts, metrics, philosophy, type Act } from './data';
import '../v2.css';
import './mylife.css';

const ThreadScene = dynamic(() => import('../components/ThreadScene'), { ssr: false });

/* ————— the SAME gold thread as /v2, posed for a life —————
   One shared 3D string across the whole v2 world; this page only chooses
   its sequence of poses. Section-center anchors warp scroll → progress so
   each pose lands exactly when its act is on screen. */

// shape vocabulary indices: [tangle, knot, loop, spiral, coil, helix, wave, line]
const LIFE_STATES = [
    THREAD_SHAPES[0], // hero       — TANGLE: a life before structure
    THREAD_SHAPES[2], // craft      — LOOP:   the line learns to curve
    THREAD_SHAPES[1], // emergence  — KNOT:   the line meets other lines
    THREAD_SHAPES[5], // rise       — HELIX:  the line learns to climb
    THREAD_SHAPES[6], // frontier   — WAVE:   the line learns to think
    THREAD_SHAPES[3], // philosophy — SPIRAL: moments compounding
    THREAD_SHAPES[4], // metrics    — COIL:   the record, wound tight
    THREAD_SHAPES[7], // end        — LINE:   and it continues
];

// act heads alternate left/right — the thread takes the opposite side
const LIFE_OFFSETS: [number, number, number][] = [
    [0, -0.2, -3.4],  // hero — deep backdrop behind the scrim
    [2.6, 0, -0.6],   // craft head left → thread right
    [-2.6, 0, -0.6],  // emergence head right → thread left
    [2.6, 0, -0.6],   // rise
    [-2.4, 0, -0.6],  // frontier
    [0, 0.2, -3.0],   // philosophy — recedes behind the words
    [0, 0.5, -2.2],   // metrics
    [0, 0.9, -0.4],   // end — the line rises behind the headline
];
const LIFE_SCALES = [1.05, 0.75, 0.9, 0.9, 0.85, 0.9, 0.8, 1];

const SECTION_IDS = ['hero', 'craft', 'emergence', 'rise', 'frontier', 'philo', 'metrics', 'end'];

/* ————— motion vocabulary ————— */

const rise: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } },
};

const wordUp: Variants = {
    hidden: { y: '115%', rotate: 2 },
    show: { y: '0%', rotate: 0, transition: { duration: 0.85, ease: [0.19, 1, 0.22, 1] } },
};

// a pen-stroke wipe, left to right
const wipe: Variants = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
    show: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } },
};

const Word = ({ children }: { children: ReactNode }) => (
    <span className="v2-w">
        <motion.span className="v2-wi" variants={wordUp}>{children}</motion.span>
    </span>
);

/* philosophy text — each word brightens as the reader passes it */
function ScrubWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.15, 1]);
    return <motion.span className="v2ml-word" style={{ opacity }}>{word}&nbsp;</motion.span>;
}

function ScrubText({ text }: { text: string }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] });
    const words = text.split(' ');
    return (
        <p ref={ref} className="v2ml-philosophy">
            {words.map((w, i) => (
                <ScrubWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
        </p>
    );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-15%' });
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!inView) return;
        const c = animate(0, value, { duration: 1.6, ease: [0.19, 1, 0.22, 1], onUpdate: (v) => setN(Math.round(v)) });
        return () => c.stop();
    }, [inView, value]);
    return (
        <span ref={ref} className="v2ml-metric-value">
            {n}{suffix}
        </span>
    );
}

/* an act: parallax numeral, pen-wipe title, glass cards that land like
   pinned notes, margin lessons whose arrows draw themselves, write-on quote */
function ActSection({ act, index }: { act: Act; index: number }) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const numY = useTransform(scrollYProgress, [0, 1], [90, -90]);

    return (
        <section
            ref={ref}
            id={`v2ml-${act.id}`}
            className={`v2ml-act ${index % 2 ? 'v2ml-act--flip' : ''}`}
            style={{ '--act': act.color } as CSSProperties}
        >
            <motion.span className="v2ml-numeral" style={{ y: numY }} aria-hidden="true">
                {act.numeral}
            </motion.span>

            <motion.header
                className="v2ml-act-head"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-15%' }}
                variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            >
                <motion.span className="v2-label v2ml-act-label" variants={rise}>
                    Act {act.numeral} · {act.years} · {act.kicker}
                </motion.span>
                <motion.h2 className="v2ml-act-title" variants={wipe}>{act.title}</motion.h2>
                <motion.p className="v2-body v2ml-act-desc" variants={rise}>{act.intro}</motion.p>
            </motion.header>

            <div className="v2ml-moments">
                {act.moments.map((m, j) => {
                    const tilt = (j % 2 ? -1 : 1) * (0.6 + ((j * 7 + index * 3) % 5) * 0.18);
                    return (
                        <motion.div
                            key={m.year + m.label}
                            className="v2ml-moment"
                            style={{ '--tilt': `${tilt}deg` } as CSSProperties}
                            initial={{ opacity: 0, y: 46, rotate: tilt * 4 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            viewport={{ once: true, margin: '-12%' }}
                            transition={{ type: 'spring', stiffness: 120, damping: 17, delay: (j % 3) * 0.09 }}
                        >
                            <span className="v2ml-moment-icon"><m.icon size={17} strokeWidth={1.8} /></span>
                            <div className="v2ml-moment-text">
                                <span className="v2ml-moment-year">{m.year} · {m.label}</span>
                                <span className="v2ml-moment-story">{m.story}</span>
                                <span className="v2ml-note">
                                    <motion.svg viewBox="0 0 30 18" fill="none" aria-hidden="true">
                                        <motion.path
                                            d="M 3 3 C 8 13, 16 16, 27 12 M 21 8 L 27 12 L 21 16"
                                            stroke="currentColor"
                                            strokeWidth={1.6}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            viewport={{ once: true, margin: '-12%' }}
                                            transition={{ duration: 0.55, delay: 0.45 + (j % 3) * 0.09 }}
                                        />
                                    </motion.svg>
                                    {m.note}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <motion.blockquote
                className="v2ml-quote"
                initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.6 }}
                whileInView={{ clipPath: 'inset(0 -8% 0 0)', opacity: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
            >
                “{act.quote}”
            </motion.blockquote>
        </section>
    );
}

export default function OneLinePage() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef(0);
    const anchorsRef = useRef<number[] | null>(null);
    const [mounted, setMounted] = useState(false);
    const [ready, setReady] = useState(false);
    const [activeAct, setActiveAct] = useState(-1);
    const reduced = useReducedMotion() ?? false;
    const { scrollYProgress } = useScroll();

    useEffect(() => setMounted(true), []);

    // Failsafe: never leave the veil up if WebGL can't start.
    useEffect(() => {
        const t = setTimeout(() => setReady(true), 4000);
        return () => clearTimeout(t);
    }, []);

    const onSceneReady = useCallback(() => setReady(true), []);

    // Section-center anchors: the thread reaches pose k exactly when
    // section k's center crosses the viewport center. Measured, not assumed —
    // and remeasured on resize.
    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const update = () => {
            const a = anchorsRef.current;
            if (!a) return;
            const y = window.scrollY + window.innerHeight * 0.5;
            const last = a.length - 1;
            let p: number;
            if (y <= a[0]) p = 0;
            else if (y >= a[last]) p = 1;
            else {
                let i = 0;
                while (i < last - 1 && y > a[i + 1]) i++;
                p = (i + (y - a[i]) / (a[i + 1] - a[i])) / last;
            }
            progressRef.current = Math.min(1, Math.max(0, p));
        };
        const measure = () => {
            anchorsRef.current = SECTION_IDS.map((id) => {
                const el = document.getElementById(`v2ml-${id}`);
                return el ? el.offsetTop + el.offsetHeight / 2 : 0;
            });
            update();
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(wrap);
        window.addEventListener('scroll', update, { passive: true });
        return () => {
            ro.disconnect();
            window.removeEventListener('scroll', update);
        };
    }, []);

    // active act → HUD
    useEffect(() => {
        const els = acts.map((a) => document.getElementById(`v2ml-${a.id}`)).filter(Boolean) as HTMLElement[];
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActiveAct(els.indexOf(e.target as HTMLElement));
                });
            },
            { rootMargin: '-40% 0px -40% 0px' },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    const jumpTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
    };

    return (
        <div className="v2 v2ml">
            {/* Fixed layers portaled to <body> — template.tsx's filter wrapper
                would otherwise pin position:fixed to the page, not the viewport */}
            {mounted &&
                createPortal(
                    <>
                        {/* THE gold thread — same scene as /v2, life choreography */}
                        <div className="v2-canvas" aria-hidden="true">
                            <ThreadScene
                                progressRef={progressRef}
                                reduced={reduced}
                                onReady={onSceneReady}
                                states={LIFE_STATES}
                                offsets={LIFE_OFFSETS}
                                scales={LIFE_SCALES}
                            />
                        </div>

                        {/* Loading veil, fades once WebGL is live */}
                        <div className={`v2-veil ${ready ? 'v2-veil--done' : ''}`} aria-hidden="true">
                            <span className="v2-veil-mark">pulling the thread…</span>
                        </div>

                        {/* HUD — act label, progress hairline, act rail */}
                        <div className="v2-hud v2ml-hud" aria-hidden="true">
                            <span className="v2-hud-label" style={{ color: activeAct >= 0 ? acts[activeAct].color : undefined }}>
                                {activeAct >= 0 ? `ACT ${acts[activeAct].numeral} — ${acts[activeAct].kicker}` : 'ONE LINE'}
                            </span>
                            <div className="v2-hud-track">
                                <motion.div className="v2-hud-bar" style={{ scaleX: scrollYProgress }} />
                            </div>
                            <div className="v2ml-rail">
                                {acts.map((a, i) => (
                                    <button
                                        key={a.id}
                                        className={`v2ml-tick ${activeAct === i ? 'v2ml-tick--on' : ''}`}
                                        style={activeAct === i ? { color: a.color, borderColor: a.color } : undefined}
                                        data-act={a.kicker}
                                        onClick={() => jumpTo(`v2ml-${a.id}`)}
                                        aria-label={`Go to act ${a.numeral} — ${a.kicker}`}
                                    >
                                        {a.numeral}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>,
                    document.body,
                )}

            <V2Nav />

            <div className="v2ml-wrap" ref={wrapRef}>
                {/* ————— HERO ————— */}
                <section id="v2ml-hero" className="v2ml-hero">
                    <motion.div
                        className="v2-hero-inner"
                        initial="hidden"
                        animate="show"
                        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
                    >
                        <motion.span className="v2-label" variants={rise}>
                            Suresh Victor — My Life, Redrawn
                        </motion.span>
                        <motion.h1
                            className="v2-title"
                            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                        >
                            <Word>It</Word> <Word>all</Word> <Word>started</Word>
                            <br />
                            <Word>with</Word> <Word>a</Word> <Word><em>line.</em></Word>
                        </motion.h1>
                        <motion.p className="v2-lede" variants={rise}>
                            I&apos;ve been pulling the same golden thread since 1992 — through
                            sketchbooks, classrooms, trading screens, and AI models.
                            Scroll to pull it with me.
                        </motion.p>
                        <motion.div className="v2-scroll-cue" variants={rise}>
                            <span className="v2-scroll-line" />
                            <span>scroll to pull</span>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ————— ACTS ————— */}
                {acts.map((act, i) => (
                    <ActSection key={act.id} act={act} index={i} />
                ))}

                {/* ————— PHILOSOPHY ————— */}
                <section id="v2ml-philo" className="v2ml-philo-section">
                    <span className="v2-label">Philosophy</span>
                    <ScrubText text={philosophy} />
                </section>

                {/* ————— METRICS ————— */}
                <section id="v2ml-metrics" className="v2ml-metrics">
                    {metrics.map((m, i) => (
                        <motion.div
                            key={m.label}
                            className="v2ml-metric"
                            initial={{ opacity: 0, scale: 1.3, rotate: -2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true, margin: '-15%' }}
                            transition={{ type: 'spring', stiffness: 190, damping: 15, delay: i * 0.08 }}
                        >
                            <Counter value={m.value} suffix={m.suffix} />
                            <span className="v2-metric-label">{m.label}</span>
                        </motion.div>
                    ))}
                </section>

                {/* ————— END ————— */}
                <section id="v2ml-end" className="v2ml-end">
                    <motion.div
                        className="v2-hero-inner v2-contact-inner"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-20%' }}
                        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
                    >
                        <motion.span className="v2-label" variants={rise}>And now</motion.span>
                        <motion.h2 className="v2-contact-h" variants={rise}>
                            The line <em>continues.</em>
                        </motion.h2>
                        <motion.div className="v2-cta-row" variants={rise}>
                            {[
                                { href: '/v2', label: 'Follow the thread', cls: 'v2-cta v2-cta--solid' },
                                { href: '/v2/contact', label: 'Say hello', cls: 'v2-cta' },
                                { href: '/mylife', label: 'Classic story →', cls: 'v2-cta v2-cta--ghost' },
                            ].map((b) => (
                                <motion.div key={b.href} whileHover={{ scale: 1.045 }} whileTap={{ scale: 0.96 }} style={{ display: 'inline-block' }}>
                                    <Link href={b.href} className={b.cls}>{b.label}</Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}
