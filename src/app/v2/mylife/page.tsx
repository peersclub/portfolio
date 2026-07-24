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
    useVelocity,
    type MotionValue,
    type Variants,
} from 'framer-motion';
import V2Nav from '../components/V2Nav';
import { acts, metrics, philosophy, type Act } from './data';
import '../v2.css';
import './mylife.css';

/* ————— the line —————
   The path is GENERATED from the measured DOM layout: each act's gesture
   (pencil curls / network zigzag / chart staircase / neural wave) spans
   exactly that act's real pixels, so the ink and the content can never
   drift out of sync — the geometry is rebuilt on mount and on resize. */

const VBH = 9000; // viewBox height; y positions are px/wrapHeight * VBH

const PALETTE = ['#FF6B6B', '#FFB800', '#00F0FF', '#7B2FFF', '#10B981', '#F472B6'];

interface Geom {
    d: string;
    stops: { off: number; color: string }[];
    kite: { x: number; y: number };
    dabs: { x: number; y: number; c: string }[];
    nodes: { x: number; y: number }[];
    mesh: [number, number][];
    bars: { x: number; base: number; h: number }[];
    neurons: { x: number; y: number }[];
    synapses: [number, number][];
    arrowY: number;
    /** y-fraction thresholds (px/wrapH) → pen tip color */
    penStops: [number, string][];
}

function buildGeom(wrapH: number): Geom | null {
    if (!wrapH) return null;
    const get = (id: string) => {
        const el = document.getElementById(id);
        return el ? { top: el.offsetTop, h: el.offsetHeight } : null;
    };
    const hero = get('v2ml-hero');
    const philo = get('v2ml-philo');
    const met = get('v2ml-metrics');
    const end = get('v2ml-end');
    const actB = acts.map((a) => get(`v2ml-${a.id}`));
    if (!hero || !philo || !met || !end || actB.some((x) => !x)) return null;
    const bounds = actB as { top: number; h: number }[];

    const vb = (px: number) => (px / wrapH) * VBH;
    const seg: string[] = [];
    const C = (y0: number, y1: number, pts: [number, number, number, number, number, number]) => {
        const m = (f: number) => y0 + (y1 - y0) * f;
        seg.push(`C ${pts[0]} ${m(pts[1])} ${pts[2]} ${m(pts[3])} ${pts[4]} ${m(pts[5])}`);
    };

    /* hero — a first curious stroke */
    const h0 = vb(hero.top + 100);
    const h1 = vb(bounds[0].top);
    seg.push(`M 500 ${h0}`);
    C(h0, h1, [620, 0.3, 380, 0.55, 500, 0.78]);
    C(h0, h1, [640, 0.86, 380, 0.95, 500, 1]);

    /* Act I — pencil curls */
    const a0 = vb(bounds[0].top);
    const a1 = vb(bounds[1].top);
    C(a0, a1, [820, 0.12, 180, 0.2, 420, 0.33]);
    C(a0, a1, [660, 0.45, 840, 0.55, 560, 0.62]);
    C(a0, a1, [280, 0.68, 320, 0.8, 520, 0.86]);
    C(a0, a1, [700, 0.91, 560, 0.96, 500, 1]);
    const kite = { x: 830, y: a0 + (a1 - a0) * 0.09 };
    const dabs = PALETTE.map((c, i) => ({
        x: 250 + i * 62,
        y: a0 + (a1 - a0) * 0.72 + Math.sin(i * 1.7) * 14,
        c,
    }));

    /* Act II — zigzag through people */
    const b0 = vb(bounds[1].top);
    const b1 = vb(bounds[2].top);
    const nodeFr: [number, number][] = [
        [760, 0.12], [240, 0.3], [760, 0.48], [240, 0.66], [640, 0.82],
    ];
    const nodes = nodeFr.map(([x, f]) => ({ x, y: b0 + (b1 - b0) * f }));
    nodes.forEach((n) => seg.push(`L ${n.x} ${n.y}`));
    seg.push(`L 500 ${b1}`);
    const mesh: [number, number][] = [[0, 2], [1, 3], [2, 4]];

    /* Act III — chart staircase, then the growth curve */
    const c0 = vb(bounds[2].top);
    const c1 = vb(bounds[3].top);
    const cm = (f: number) => c0 + (c1 - c0) * f;
    seg.push(`L 340 ${cm(0.08)}`, `L 340 ${cm(0.2)}`, `L 560 ${cm(0.2)}`, `L 560 ${cm(0.33)}`, `L 730 ${cm(0.33)}`, `L 730 ${cm(0.46)}`);
    C(c0, c1, [810, 0.66, 220, 0.84, 500, 1]);
    const bars = [0, 1, 2, 3].map((i) => ({
        x: 764 + i * 52,
        base: cm(0.9),
        h: (c1 - c0) * (0.045 + i * 0.032),
    }));

    /* Act IV — neural wave */
    const d0 = vb(bounds[3].top);
    const d1 = vb(philo.top);
    C(d0, d1, [840, 0.17, 160, 0.34, 500, 0.5]);
    C(d0, d1, [800, 0.62, 240, 0.78, 500, 0.88]);
    C(d0, d1, [540, 0.93, 480, 0.97, 500, 1]);
    const neuronFr: [number, number][] = [[820, 0.14], [180, 0.33], [760, 0.6], [240, 0.76]];
    const neurons = neuronFr.map(([x, f]) => ({ x, y: d0 + (d1 - d0) * f }));
    const synapses: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3]];

    /* philosophy — almost still; metrics + end — resolved */
    const p0 = vb(philo.top);
    const p1 = vb(met.top);
    C(p0, p1, [545, 0.33, 455, 0.66, 500, 1]);
    const arrowY = vb(end.top + end.h * 0.72);
    seg.push(`L 500 ${vb(end.top)}`, `L 500 ${arrowY}`);

    const midFrac = (i: number) => (bounds[i].top + bounds[i].h / 2) / wrapH;
    const stops = [
        { off: 0, color: '#3A342C' },
        { off: midFrac(0), color: acts[0].color },
        { off: midFrac(1), color: acts[1].color },
        { off: midFrac(2), color: acts[2].color },
        { off: midFrac(3), color: acts[3].color },
        { off: Math.min(1, philo.top / wrapH + 0.06), color: '#8F6E1A' },
        { off: 1, color: '#8F6E1A' },
    ];

    const penStops: [number, string][] = [
        [bounds[0].top / wrapH, '#3A342C'],
        [bounds[1].top / wrapH, acts[0].color],
        [bounds[2].top / wrapH, acts[1].color],
        [bounds[3].top / wrapH, acts[2].color],
        [philo.top / wrapH, acts[3].color],
        [2, '#8F6E1A'],
    ];

    return { d: seg.join(' '), stops, kite, dabs, nodes, mesh, bars, neurons, synapses, arrowY, penStops };
}

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

const popIn = {
    initial: { scale: 0, opacity: 0 },
    style: { transformBox: 'fill-box', transformOrigin: 'center' } as CSSProperties,
};

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

/* an act of the story: parallax numeral, pen-wipe title with hand-drawn
   underline, index cards that land on the desk, margin notes whose arrows
   draw themselves, a quote that writes on */
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
                <motion.svg className="v2ml-underline" viewBox="0 0 220 14" fill="none" variants={{}}>
                    <motion.path
                        d="M 3 9 C 60 3, 120 13, 217 6"
                        stroke={act.color}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        variants={{
                            hidden: { pathLength: 0 },
                            show: { pathLength: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.35 } },
                        }}
                    />
                </motion.svg>
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
    const pathRef = useRef<SVGPathElement>(null);
    const penRef = useRef<HTMLDivElement>(null);
    const totalLen = useRef(0);
    const geomRef = useRef<Geom | null>(null);
    const [geom, setGeom] = useState<Geom | null>(null);
    const [mounted, setMounted] = useState(false);
    const [activeAct, setActiveAct] = useState(-1);
    const reduced = useReducedMotion() ?? false;

    const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });

    useEffect(() => setMounted(true), []);

    // measure layout → generate the line (and regenerate on resize)
    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        let frame = 0;
        const build = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const g = buildGeom(wrap.offsetHeight);
                if (g) {
                    geomRef.current = g;
                    setGeom(g);
                }
            });
        };
        build();
        const ro = new ResizeObserver(build);
        ro.observe(wrap);
        return () => {
            cancelAnimationFrame(frame);
            ro.disconnect();
        };
    }, []);

    // Arc-length reparametrization: invert y(length) so the drawn tip
    // tracks the reader's viewport instead of lagging where ink is dense.
    const LOOKUP_N = 256;
    const yTable = useRef<number[] | null>(null);
    useEffect(() => {
        if (!geom) return;
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
    }, [geom]);

    const drawTarget = useTransform(scrollYProgress, (v) => {
        const ys = yTable.current;
        const target = Math.min(1, v + 0.07);
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
    const drawnVelocity = useVelocity(drawn);

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

    // the pen tip rides the drawn stroke; ink flows faster when you scroll faster
    useAnimationFrame(() => {
        const path = pathRef.current;
        const wrap = wrapRef.current;
        const pen = penRef.current;
        const g = geomRef.current;
        if (!path || !wrap || !pen || !g || reduced || !totalLen.current) return;
        const p = Math.min(Math.max(drawn.get(), 0), 1);
        const pt = path.getPointAtLength(p * totalLen.current);
        const x = (pt.x / 1000) * wrap.offsetWidth;
        const y = (pt.y / VBH) * wrap.offsetHeight;
        const flow = 1 + Math.min(1.1, Math.abs(drawnVelocity.get()) * 7);
        pen.style.transform = `translate(${x}px, ${y}px) scale(${flow})`;
        const yFrac = pt.y / VBH;
        let color = g.penStops[g.penStops.length - 1][1];
        for (const [stop, c] of g.penStops) {
            if (yFrac < stop) { color = c; break; }
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
                    </div>,
                    document.body,
                )}

            <V2Nav />

            <div className="v2ml-wrap" ref={wrapRef}>
                {/* ————— THE LINE ————— */}
                {geom && (
                    <svg
                        className="v2ml-svg"
                        viewBox={`0 0 1000 ${VBH}`}
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient id="v2ml-ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={VBH}>
                                {geom.stops.map((s, i) => (
                                    <stop key={i} offset={s.off} stopColor={s.color} />
                                ))}
                            </linearGradient>
                            <filter id="v2ml-glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="5" />
                            </filter>
                        </defs>

                        {/* watercolor bleed + ink stroke, both drawn by scroll */}
                        <motion.path
                            d={geom.d}
                            fill="none"
                            stroke="url(#v2ml-ink)"
                            strokeWidth={9}
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                            filter="url(#v2ml-glow)"
                            opacity={0.16}
                            style={{ pathLength: reduced ? 1 : drawn }}
                        />
                        <motion.path
                            ref={pathRef}
                            d={geom.d}
                            fill="none"
                            stroke="url(#v2ml-ink)"
                            strokeWidth={3}
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                            style={{ pathLength: reduced ? 1 : drawn }}
                        />

                        {/* Act I — the kite, bobbing on its string */}
                        <motion.g
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-20%' }}
                            transition={{ duration: 1.2 }}
                        >
                            <motion.g
                                animate={reduced ? undefined : { y: [0, -16, 0], x: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                            >
                                <path
                                    d={`M ${geom.kite.x} ${geom.kite.y - 60} L ${geom.kite.x + 46} ${geom.kite.y} L ${geom.kite.x} ${geom.kite.y + 60} L ${geom.kite.x - 46} ${geom.kite.y} Z M ${geom.kite.x} ${geom.kite.y - 60} L ${geom.kite.x} ${geom.kite.y + 60} M ${geom.kite.x - 46} ${geom.kite.y} L ${geom.kite.x + 46} ${geom.kite.y}`}
                                    fill="none"
                                    stroke={acts[0].color}
                                    strokeWidth={1.8}
                                    vectorEffect="non-scaling-stroke"
                                    opacity={0.75}
                                />
                            </motion.g>
                            <path
                                d={`M ${geom.kite.x} ${geom.kite.y + 60} C ${geom.kite.x - 24} ${geom.kite.y + 120} ${geom.kite.x + 18} ${geom.kite.y + 160} ${geom.kite.x - 12} ${geom.kite.y + 210}`}
                                fill="none"
                                stroke={acts[0].color}
                                strokeWidth={1.4}
                                strokeDasharray="6 7"
                                vectorEffect="non-scaling-stroke"
                                opacity={0.5}
                            />
                        </motion.g>
                        {geom.dabs.map((d, i) => (
                            <motion.circle
                                key={`dab-${i}`}
                                cx={d.x}
                                cy={d.y}
                                r={7}
                                fill={d.c}
                                initial={popIn.initial}
                                style={popIn.style}
                                whileInView={{ scale: 1, opacity: 0.8 }}
                                viewport={{ once: true, margin: '-25%' }}
                                transition={{ duration: 0.5, delay: i * 0.09, ease: 'backOut' }}
                            />
                        ))}

                        {/* Act II — people as nodes + the mesh between them */}
                        {geom.mesh.map(([a, b], i) => (
                            <motion.line
                                key={`mesh-${i}`}
                                x1={geom.nodes[a].x}
                                y1={geom.nodes[a].y}
                                x2={geom.nodes[b].x}
                                y2={geom.nodes[b].y}
                                stroke={acts[1].color}
                                strokeWidth={1}
                                strokeDasharray="5 6"
                                vectorEffect="non-scaling-stroke"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 0.3 }}
                                viewport={{ once: true, margin: '-25%' }}
                                transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                            />
                        ))}
                        {geom.nodes.map((n, i) => (
                            <motion.circle
                                key={`node-${i}`}
                                cx={n.x}
                                cy={n.y}
                                r={8}
                                fill={acts[1].color}
                                initial={popIn.initial}
                                style={popIn.style}
                                whileInView={{ scale: 1, opacity: 0.85 }}
                                viewport={{ once: true, margin: '-25%' }}
                                transition={{ duration: 0.5, delay: i * 0.12, ease: 'backOut' }}
                            />
                        ))}

                        {/* Act III — the bars the staircase implies */}
                        {geom.bars.map((b, i) => (
                            <motion.line
                                key={`bar-${i}`}
                                x1={b.x}
                                x2={b.x}
                                y1={b.base}
                                stroke={acts[2].color}
                                strokeWidth={16}
                                strokeLinecap="round"
                                vectorEffect="non-scaling-stroke"
                                initial={{ y2: b.base, opacity: 0 }}
                                whileInView={{ y2: b.base - b.h, opacity: 0.6 }}
                                viewport={{ once: true, margin: '-25%' }}
                                transition={{ duration: 0.7, delay: i * 0.12, ease: 'backOut' }}
                            />
                        ))}

                        {/* Act IV — neurons that breathe + synapses */}
                        {geom.synapses.map(([a, b], i) => (
                            <motion.line
                                key={`syn-${i}`}
                                x1={geom.neurons[a].x}
                                y1={geom.neurons[a].y}
                                x2={geom.neurons[b].x}
                                y2={geom.neurons[b].y}
                                stroke={acts[3].color}
                                strokeWidth={1}
                                strokeDasharray="4 7"
                                vectorEffect="non-scaling-stroke"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 0.26 }}
                                viewport={{ once: true, margin: '-25%' }}
                                transition={{ duration: 1.1, delay: 0.2 + i * 0.12 }}
                            />
                        ))}
                        {geom.neurons.map((n, i) => (
                            <motion.g key={`neu-${i}`}>
                                <motion.circle
                                    cx={n.x}
                                    cy={n.y}
                                    fill="none"
                                    stroke={acts[3].color}
                                    strokeWidth={1.5}
                                    vectorEffect="non-scaling-stroke"
                                    initial={{ opacity: 0, r: 16 }}
                                    whileInView={{ opacity: 0.5 }}
                                    viewport={{ once: true, margin: '-25%' }}
                                    animate={reduced ? undefined : { r: [16, 20, 16] }}
                                    transition={{ opacity: { duration: 0.9, delay: i * 0.14 }, r: { repeat: Infinity, duration: 3.2, ease: 'easeInOut', delay: i * 0.5 } }}
                                />
                                <motion.circle
                                    cx={n.x}
                                    cy={n.y}
                                    r={5}
                                    fill={acts[3].color}
                                    initial={popIn.initial}
                                    style={popIn.style}
                                    whileInView={{ scale: 1, opacity: 0.85 }}
                                    viewport={{ once: true, margin: '-25%' }}
                                    transition={{ duration: 0.5, delay: 0.2 + i * 0.14, ease: 'backOut' }}
                                />
                            </motion.g>
                        ))}

                        {/* the arrow the line becomes */}
                        <motion.path
                            d={`M 455 ${geom.arrowY - 55} L 500 ${geom.arrowY} L 545 ${geom.arrowY - 55}`}
                            fill="none"
                            stroke="#8F6E1A"
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
                )}

                {/* the pen tip */}
                {!reduced && <div className="v2ml-pen" ref={penRef} aria-hidden="true" />}

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
                        {/* the signature stroke, signing the page */}
                        <motion.svg className="v2ml-flourish" viewBox="0 0 260 28" fill="none" variants={{}} aria-hidden="true">
                            <motion.path
                                d="M 6 20 C 60 4, 92 26, 132 14 S 202 5, 254 16"
                                stroke="#8F6E1A"
                                strokeWidth={2.2}
                                strokeLinecap="round"
                                variants={{
                                    hidden: { pathLength: 0, opacity: 0 },
                                    show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: 'easeInOut', delay: 0.9 } },
                                }}
                            />
                        </motion.svg>
                        <motion.p className="v2-lede" variants={rise}>
                            I&apos;ve been drawing the same line since 1992 — through sketchbooks,
                            classrooms, trading screens, and AI models. Scroll to draw it with me.
                        </motion.p>
                        <motion.div className="v2-scroll-cue" variants={rise}>
                            <span className="v2-scroll-line" />
                            <span>scroll to draw</span>
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
