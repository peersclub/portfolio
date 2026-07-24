'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
    animate,
    motion,
    useAnimationFrame,
    useInView,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
    type Variants,
} from 'framer-motion';
import V2Nav from '../components/V2Nav';
import { acts, metrics, philosophy } from './data';
import '../v2.css';
import './mylife.css';

/* ————— the line —————
   One path through a 1000×9000 viewBox, stretched over the whole story
   (preserveAspectRatio="none" + non-scaling stroke). Each act changes the
   stroke's character: pencil curls → network zigzag → chart steps → neural
   wave → straight gold line. */

const VBH = 9000;

const LINE_D = [
    'M 500 60',
    // hero — a first, curious stroke
    'C 620 250 380 420 500 640',
    'C 640 780 360 820 500 900',
    // Act I — childhood: playful pencil curls
    'C 820 1060 180 1160 420 1360',
    'C 660 1560 840 1700 560 1780',
    'C 280 1860 320 2040 520 2100',
    'C 700 2160 560 2280 500 2340',
    // Act II — emergence: sharp lines connecting people
    'L 770 2560 L 250 2800 L 740 3040 L 280 3280 L 640 3500 L 500 3780',
    // Act III — rise: chart staircase, then the growth curve
    'L 340 3920 L 340 4080 L 560 4080 L 560 4260 L 730 4260 L 730 4440',
    'C 780 4760 220 4960 500 5220',
    // Act IV — frontier: smooth neural wave, converging
    'C 840 5460 160 5680 500 5920',
    'C 800 6140 240 6360 500 6560',
    'C 540 6600 480 6630 500 6660',
    // philosophy — almost still
    'C 545 6960 455 7260 500 7560',
    // metrics + end — resolved, straight
    'L 500 8100 L 500 8720',
].join(' ');

const NODE_POINTS: [number, number][] = [
    [770, 2560], [250, 2800], [740, 3040], [280, 3280], [640, 3500],
];
const NEURAL_POINTS: [number, number][] = [
    [840, 5460], [160, 5680], [800, 6140], [240, 6360],
];

// progress boundaries of each act along the page (approx.) → pen-tip color
const PEN_STOPS: [number, string][] = [
    [0.1, '#E8C547'],
    [0.26, '#00F0FF'],
    [0.42, '#7B2FFF'],
    [0.58, '#FFB800'],
    [0.74, '#FF0080'],
    [1.01, '#E8C547'],
];

const rise: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } },
};

const wordUp: Variants = {
    hidden: { y: '115%' },
    show: { y: '0%', transition: { duration: 0.85, ease: [0.19, 1, 0.22, 1] } },
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

export default function OneLinePage() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const penRef = useRef<HTMLDivElement>(null);
    const totalLen = useRef(0);
    const [mounted, setMounted] = useState(false);
    const [activeAct, setActiveAct] = useState(-1);
    const reduced = useReducedMotion() ?? false;

    const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });

    // Arc-length reparametrization: pathLength is linear in stroke length, but
    // the loopy early acts consume far more length per vertical unit than the
    // straight finale. Sample the path once, build a monotonic y(length) table,
    // and invert it so the drawn tip tracks the reader's viewport instead of
    // lagging a whole act behind by the end.
    const LOOKUP_N = 256;
    const yTable = useRef<number[] | null>(null);
    useEffect(() => {
        const path = pathRef.current;
        if (!path) return;
        const L = path.getTotalLength();
        totalLen.current = L;
        const ys: number[] = [];
        let maxY = 0;
        for (let i = 0; i <= LOOKUP_N; i++) {
            maxY = Math.max(maxY, path.getPointAtLength((i / LOOKUP_N) * L).y / VBH);
            ys.push(maxY);
        }
        yTable.current = ys;
    }, []);

    const drawTarget = useTransform(scrollYProgress, (v) => {
        const ys = yTable.current;
        const target = Math.min(1, v + 0.07); // slight lead: the reader pulls the pen
        if (!ys) return target;
        let lo = 0;
        let hi = LOOKUP_N;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (ys[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        if (lo <= 0) return 0;
        if (lo > LOOKUP_N) return 1;
        const y0 = ys[lo - 1];
        const y1 = ys[lo];
        const f = y1 > y0 ? (target - y0) / (y1 - y0) : 0;
        return (lo - 1 + f) / LOOKUP_N;
    });
    const drawn = useSpring(drawTarget, { stiffness: 55, damping: 18, restDelta: 0.0005 });

    useEffect(() => setMounted(true), []);

    // active act → HUD + aura
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

    // the pen tip rides the tip of the drawn stroke
    useAnimationFrame(() => {
        const path = pathRef.current;
        const wrap = wrapRef.current;
        const pen = penRef.current;
        if (!path || !wrap || !pen || reduced) return;
        if (!totalLen.current) totalLen.current = path.getTotalLength();
        const p = Math.min(Math.max(drawn.get(), 0), 1);
        const pt = path.getPointAtLength(p * totalLen.current);
        const x = (pt.x / 1000) * wrap.offsetWidth;
        const y = (pt.y / VBH) * wrap.offsetHeight;
        pen.style.transform = `translate(${x}px, ${y}px)`;
        let color = PEN_STOPS[PEN_STOPS.length - 1][1];
        for (const [stop, c] of PEN_STOPS) {
            if (p < stop) { color = c; break; }
        }
        pen.style.setProperty('--pen', color);
    });

    const jumpTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
    };

    return (
        <div className="v2 v2ml">
            {mounted &&
                createPortal(
                    <>
                        {/* act-reactive aura, crossfading behind everything */}
                        {acts.map((a, i) => (
                            <div
                                key={a.id}
                                className="v2ml-aura"
                                style={{
                                    opacity: activeAct === i ? 1 : 0,
                                    background: `radial-gradient(ellipse 60% 50% at ${i % 2 ? '25%' : '75%'} 45%, color-mix(in srgb, ${a.color} 11%, transparent), transparent 70%)`,
                                }}
                                aria-hidden="true"
                            />
                        ))}
                        {/* act rail */}
                        <div className="v2-hud v2ml-hud" aria-hidden="true">
                            <span className="v2-hud-label" style={{ color: activeAct >= 0 ? acts[activeAct].color : undefined }}>
                                {activeAct >= 0 ? `ACT ${acts[activeAct].numeral} — ${acts[activeAct].title}` : 'ONE LINE'}
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
                                        onClick={() => jumpTo(`v2ml-${a.id}`)}
                                        aria-label={`Go to act ${a.numeral} — ${a.title}`}
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
                {/* ————— THE LINE ————— */}
                <svg
                    className="v2ml-svg"
                    viewBox={`0 0 1000 ${VBH}`}
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="v2ml-ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={VBH}>
                            <stop offset="0" stopColor="#E8C547" />
                            <stop offset="0.12" stopColor="#00F0FF" />
                            <stop offset="0.3" stopColor="#7B2FFF" />
                            <stop offset="0.48" stopColor="#FFB800" />
                            <stop offset="0.66" stopColor="#FF0080" />
                            <stop offset="0.85" stopColor="#E8C547" />
                            <stop offset="1" stopColor="#E8C547" />
                        </linearGradient>
                        <filter id="v2ml-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="7" />
                        </filter>
                    </defs>

                    {/* glow underlay + ink stroke, both drawn by scroll */}
                    <motion.path
                        d={LINE_D}
                        fill="none"
                        stroke="url(#v2ml-ink)"
                        strokeWidth={11}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        filter="url(#v2ml-glow)"
                        opacity={0.55}
                        style={{ pathLength: reduced ? 1 : drawn }}
                    />
                    <motion.path
                        ref={pathRef}
                        d={LINE_D}
                        fill="none"
                        stroke="url(#v2ml-ink)"
                        strokeWidth={3}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        style={{ pathLength: reduced ? 1 : drawn }}
                    />

                    {/* Act I — the kite the line once flew */}
                    <motion.g
                        className="v2ml-deco"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-20%' }}
                        transition={{ duration: 1.2 }}
                    >
                        <path d="M 830 940 L 878 1000 L 830 1060 L 782 1000 Z" fill="none" stroke="#00F0FF" strokeWidth={2} vectorEffect="non-scaling-stroke" opacity={0.7} />
                        <path d="M 830 1060 C 810 1110 850 1140 820 1180" fill="none" stroke="#00F0FF" strokeWidth={1.5} strokeDasharray="6 7" vectorEffect="non-scaling-stroke" opacity={0.5} />
                    </motion.g>

                    {/* Act II — people as nodes the line connects */}
                    {NODE_POINTS.map(([x, y], i) => (
                        <motion.circle
                            key={i}
                            cx={x}
                            cy={y}
                            r={8}
                            fill="#7B2FFF"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 0.9 }}
                            viewport={{ once: true, margin: '-30%' }}
                            transition={{ duration: 0.5, delay: i * 0.12, ease: 'backOut' }}
                        />
                    ))}

                    {/* Act IV — faint neural halo */}
                    {NEURAL_POINTS.map(([x, y], i) => (
                        <motion.circle
                            key={i}
                            cx={x}
                            cy={y}
                            r={16}
                            fill="none"
                            stroke="#FF0080"
                            strokeWidth={1.5}
                            vectorEffect="non-scaling-stroke"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.45 }}
                            viewport={{ once: true, margin: '-30%' }}
                            transition={{ duration: 1, delay: i * 0.15 }}
                        />
                    ))}

                    {/* the arrow the line becomes */}
                    <motion.path
                        d="M 455 8660 L 500 8720 L 545 8660"
                        fill="none"
                        stroke="#E8C547"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-10%' }}
                        transition={{ duration: 0.8 }}
                    />
                </svg>

                {/* the pen tip */}
                {!reduced && <div className="v2ml-pen" ref={penRef} aria-hidden="true" />}

                {/* ————— HERO ————— */}
                <section className="v2ml-hero">
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
                            Drawing, kites, calligraphy, code, companies — one continuous
                            stroke from 1992 to now. Scroll to draw it.
                        </motion.p>
                        <motion.div className="v2-scroll-cue" variants={rise}>
                            <span className="v2-scroll-line" />
                            <span>draw</span>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ————— ACTS ————— */}
                {acts.map((act, i) => (
                    <section
                        key={act.id}
                        id={`v2ml-${act.id}`}
                        className={`v2ml-act ${i % 2 ? 'v2ml-act--flip' : ''}`}
                        style={{ '--act': act.color } as CSSProperties}
                    >
                        <span className="v2ml-numeral" aria-hidden="true">{act.numeral}</span>

                        <motion.header
                            className="v2ml-act-head"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-15%' }}
                            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                        >
                            <motion.span className="v2-label v2ml-act-label" variants={rise}>
                                Act {act.numeral} · {act.years}
                            </motion.span>
                            <motion.h2 className="v2ml-act-title" variants={rise}>{act.title}</motion.h2>
                            <motion.p className="v2-body v2ml-act-desc" variants={rise}>{act.description}</motion.p>
                        </motion.header>

                        <div className="v2ml-moments">
                            {act.moments.map((m, j) => (
                                <motion.div
                                    key={m.year + m.label}
                                    className="v2ml-moment"
                                    initial={{ opacity: 0, y: 36 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-12%' }}
                                    transition={{ duration: 0.7, delay: (j % 3) * 0.08, ease: [0.19, 1, 0.22, 1] }}
                                >
                                    <span className="v2ml-moment-icon"><m.icon size={17} strokeWidth={1.8} /></span>
                                    <div className="v2ml-moment-text">
                                        <span className="v2ml-moment-year">{m.year}</span>
                                        <span className="v2ml-moment-label">{m.label}</span>
                                        <span className="v2ml-moment-detail">{m.detail}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.blockquote
                            className="v2ml-quote"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: '-15%' }}
                            transition={{ duration: 1.1 }}
                        >
                            “{act.quote}”
                        </motion.blockquote>
                    </section>
                ))}

                {/* ————— PHILOSOPHY ————— */}
                <section className="v2ml-philo-section">
                    <span className="v2-label">Philosophy</span>
                    <ScrubText text={philosophy} />
                </section>

                {/* ————— METRICS ————— */}
                <section className="v2ml-metrics">
                    {metrics.map((m) => (
                        <div key={m.label} className="v2ml-metric">
                            <Counter value={m.value} suffix={m.suffix} />
                            <span className="v2-metric-label">{m.label}</span>
                        </div>
                    ))}
                </section>

                {/* ————— END ————— */}
                <section className="v2ml-end">
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
                            <Link href="/v2" className="v2-cta v2-cta--solid">Follow the thread</Link>
                            <Link href="/v2/contact" className="v2-cta">Say hello</Link>
                            <Link href="/mylife" className="v2-cta v2-cta--ghost">Classic story →</Link>
                        </motion.div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}
