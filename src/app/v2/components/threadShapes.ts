// The v2 thread's shape vocabulary — pure math, no three.js imports, so
// pages can compose pose sequences without pulling the WebGL bundle into
// their static chunk (ThreadScene itself is always loaded via dynamic()).

export type StateFn = (t: number) => [number, number, number];

const TAU = Math.PI * 2;

// [tangle, knot, loop, spiral, coil, helix, wave, line] — all sampled at the
// same t values so control points correspond 1:1 and blend cleanly.
export const THREAD_SHAPES: StateFn[] = [
    // TANGLE — raw ideas, no structure
    (t) => [
        Math.sin(t * TAU * 2.0) * 2.1 + Math.sin(t * TAU * 5.3) * 0.9,
        Math.cos(t * TAU * 3.1) * 1.5 + Math.sin(t * TAU * 7.7) * 0.55,
        Math.sin(t * TAU * 4.2) * 1.5 + Math.cos(t * TAU * 6.1) * 0.6,
    ],
    // KNOT — trefoil: lines intertwining
    (t) => {
        const a = t * TAU;
        return [
            (Math.sin(a) + 2 * Math.sin(2 * a)) * 0.85,
            (Math.cos(a) - 2 * Math.cos(2 * a)) * 0.85,
            -Math.sin(3 * a) * 0.9,
        ];
    },
    // LOOP — closed orbit
    (t) => {
        const a = t * TAU;
        return [
            (2.1 + 0.5 * Math.cos(3 * a)) * Math.cos(a),
            0.5 * Math.sin(3 * a) + Math.sin(a * 2) * 0.35,
            (2.1 + 0.5 * Math.cos(3 * a)) * Math.sin(a),
        ];
    },
    // SPIRAL — compounding growth
    (t) => {
        const a = t * TAU * 3;
        const r = 0.35 + t * 2.3;
        return [r * Math.cos(a), (t - 0.5) * 1.4, r * Math.sin(a)];
    },
    // COIL — tight order
    (t) => {
        const a = t * TAU * 6;
        return [Math.cos(a) * 1.35, (t - 0.5) * 3.6, Math.sin(a) * 1.35];
    },
    // HELIX — two strands climbing
    (t) => {
        const a = t * TAU * 4;
        return [
            Math.cos(a) * (1.7 - Math.abs(t - 0.5) * 1.2),
            (t - 0.5) * 4.4,
            Math.sin(a) * (1.7 - Math.abs(t - 0.5) * 1.2),
        ];
    },
    // WAVE — signal out of noise
    (t) => [
        (t - 0.5) * 6.8,
        Math.sin(t * TAU * 2) * 1.15,
        Math.cos(t * TAU * 1.5) * 0.45,
    ],
    // LINE — shipped: a clean rising answer
    (t) => [(t - 0.5) * 7.2, (t - 0.5) * 3.0 + Math.sin(t * Math.PI) * 0.2, 0],
];

// ————— Life vocabulary — /v2/mylife —————
// The career shapes tell a product story; these tell a life. Ordered:
// first stroke → scribble → braid → climb → pulse → meander → coil → line.
export const LIFE_SHAPES: StateFn[] = [
    // FIRST STROKE — a child's wobbly, almost-straight line
    (t) => [
        (t - 0.5) * 6.4,
        Math.sin(t * Math.PI * 1.6) * 0.35 + (t - 0.5) * 0.5,
        Math.cos(t * Math.PI * 2.2) * 0.18,
    ],
    // SCRIBBLE — cursive practice loops marching across the page
    (t) => [
        (t - 0.5) * 4.6 + Math.sin(t * TAU * 4) * 0.45,
        Math.cos(t * TAU * 4) * 0.95 + Math.sin(t * TAU * 1.5) * 0.3,
        Math.sin(t * TAU * 2) * 0.4,
    ],
    // BRAID — two paths interweaving (lissajous weave)
    (t) => {
        const a = t * TAU;
        return [Math.sin(2 * a) * 1.9, Math.sin(3 * a) * 1.15, Math.cos(2 * a) * 0.85];
    },
    // CLIMB — a rising zigzag staircase
    (t) => [
        (t - 0.5) * 4.4 + Math.sin(t * TAU * 5) * 0.28,
        (t - 0.5) * 3.8 + Math.cos(t * TAU * 5) * 0.22,
        Math.sin(t * TAU * 2.5) * 0.35,
    ],
    // PULSE — a thinking wave-packet, calm → busy → calm
    (t) => {
        const env = Math.sin(t * Math.PI);
        return [
            (t - 0.5) * 6.6,
            Math.sin(t * TAU * 7) * 1.05 * env * env + Math.sin(t * TAU) * 0.15,
            Math.cos(t * TAU * 3) * 0.3 * env,
        ];
    },
    // MEANDER — slow, breathing S-curves
    (t) => [
        (t - 0.5) * 6.2,
        Math.sin(t * TAU * 1.2) * 1.05,
        Math.cos(t * TAU * 0.8) * 0.5,
    ],
    // COIL — the record, wound tight (shared with the career journey)
    THREAD_SHAPES[4],
    // LINE — and it continues (same finale as the career thread)
    THREAD_SHAPES[7],
];
