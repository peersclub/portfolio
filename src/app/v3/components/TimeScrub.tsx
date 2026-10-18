'use client';

/* "Scrub the timeline" — drag through 33 years of Victor. Every chapter
   leads with the business numbers; the display weight still quietly grows
   with the career (visitors feel it, we don't explain it). */

import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import {
    Pencil, Wind, GraduationCap, Rocket, Zap, Briefcase, Trophy, Plane, Sparkles, Infinity as InfinityIcon,
    type LucideIcon,
} from 'lucide-react';
import { haptics } from '@/lib/haptics';
import IconStack from './IconStack';

interface Stat {
    value: string;
    label: string;
}

interface Milestone {
    year: number;
    title: string;
    detail: string;
    stats: Stat[];
    icon: LucideIcon;
}

const MILESTONES: Milestone[] = [
    { year: 1992, icon: Pencil, title: 'A pencil', detail: 'Drawing shapes until the hand knows them by heart — the first product spec.', stats: [{ value: 'Day 1', label: 'curiosity compounds' }] },
    { year: 2004, icon: Wind, title: 'Kites over Bangalore', detail: 'Crosswind flying: read the pull, give slack, never let go.', stats: [{ value: '∞', label: 'iterations to liftoff' }] },
    { year: 2013, icon: GraduationCap, title: 'NITK Surathkal', detail: 'Engineering gives the curves a grammar — systems, constraints, trade-offs.', stats: [{ value: 'B.Tech', label: 'NIT Karnataka' }] },
    { year: 2015, icon: Rocket, title: 'KleverKid', detail: 'Product Manager — the full product lifecycle, from requirements to performance.', stats: [{ value: '3', label: 'platforms · web, Android, iOS' }] },
    { year: 2017, icon: Zap, title: 'BabyChakra', detail: 'Rebuilt the loop parents wanted to re-enter, then the platform around it.', stats: [{ value: '+42%', label: 'retention · 8 months' }, { value: '+21%', label: 'stickiness' }] },
    { year: 2019, icon: Briefcase, title: 'CoinDCX', detail: 'Product Lead for India’s leading crypto exchange, on mobile app and desktop web.', stats: [{ value: '4', label: 'trading products led' }, { value: '3', label: 'PMs in the team I built' }] },
    { year: 2021, icon: Trophy, title: 'Captain Fresh', detail: 'Industry-first digital products for a century-old seafood supply chain.', stats: [{ value: '0 → 1', label: 'product and product team' }, { value: '3', label: 'sourcing · operations · customers' }] },
    { year: 2024, icon: Plane, title: 'Cox & Kings', detail: 'SVP, Product & Technology — the first personalized customer experience on the travel-tech platform.', stats: [{ value: 'SVP', label: 'product & technology' }] },
    { year: 2025, icon: Sparkles, title: 'AssetWorks AI', detail: 'Co-founder. Plain language in, investment widgets out.', stats: [{ value: 'Claude + GPT', label: 'Rust backend · Flutter apps' }] },
    { year: 2026, icon: InfinityIcon, title: 'KoinBX, now', detail: 'Since Nov 2025: product and technology strategy, CPO scope. Crypto futures from strategy to market.', stats: [{ value: 'Aug 2026', label: 'futures launched' }, { value: '~9×', label: 'delivery throughput · 4 months' }, { value: '10+', label: 'years' }] },
];

const MIN = MILESTONES[0].year;
const MAX = MILESTONES[MILESTONES.length - 1].year;

const milestoneFor = (y: number): Milestone => {
    let m = MILESTONES[0];
    for (const ms of MILESTONES) if (ms.year <= y) m = ms;
    return m;
};

export default function TimeScrub() {
    const [year, setYear] = useState(2025);
    const stageRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    const t = (year - MIN) / (MAX - MIN);
    const weight = Math.round(200 + t * 600);

    const active = useMemo(() => milestoneFor(year), [year]);

    const hapticYear = useRef(year);
    const setFromX = (clientX: number, el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        const f = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        const next = Math.round(MIN + f * (MAX - MIN));
        // crown detents: every year crossed ticks, entering a new chapter taps
        if (next !== hapticYear.current) {
            if (milestoneFor(next).year !== milestoneFor(hapticYear.current).year) haptics.tap();
            else haptics.tick();
            hapticYear.current = next;
        }
        setYear(next);
    };

    const drag = (ref: React.RefObject<HTMLDivElement | null>) => ({
        onPointerDown: (e: PointerEvent<HTMLDivElement>) => {
            dragging.current = true;
            (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
            setFromX(e.clientX, ref.current!);
        },
        onPointerMove: (e: PointerEvent<HTMLDivElement>) => dragging.current && setFromX(e.clientX, ref.current!),
        onPointerUp: () => (dragging.current = false),
        onPointerCancel: () => (dragging.current = false),
    });

    const onKey = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') setYear((y) => Math.max(MIN, y - 1));
        if (e.key === 'ArrowRight') setYear((y) => Math.min(MAX, y + 1));
    };

    return (
        <div className="v3-scrub">
            {/* stage — drag anywhere on it */}
            <div ref={stageRef} className="v3-scrub-stage"
                data-cursor="drag" {...drag(stageRef)}>
                <span
                    className="v3-scrub-year"
                    style={{ fontVariationSettings: `'wght' ${weight}, 'opsz' 96` }}
                >
                    {year}
                </span>
                {/* persistent — lives outside the keyed block below so the
                    remount-per-chapter entrance never kills the 3D rig */}
                <IconStack icon={active.icon} epoch={active.year} />
                <div className="v3-scrub-info" key={active.year}>
                    <span className="v3-scrub-title" style={{ fontVariationSettings: `'wght' ${Math.max(500, weight)}` }}>
                        {active.title}
                    </span>
                    <span className="v3-scrub-detail">{active.detail}</span>
                    <div className="v3-scrub-stats">
                        {active.stats.map((s, i) => (
                            <div className="v3-scrub-stat" key={s.label} style={{ animationDelay: `${0.08 + i * 0.09}s` }}>
                                <span className="v3-scrub-stat-value">{s.value}</span>
                                <span className="v3-scrub-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <span className="v3-scrub-hint v3-label">
                    <span className="v3-hint-arrow v3-hint-arrow--l">◂</span> drag{' '}
                    <span className="v3-hint-arrow v3-hint-arrow--r">▸</span>
                </span>
            </div>

            {/* custom track — progress fill + milestone dots */}
            <div className="v3-scrub-track-wrap">
                <div
                    ref={trackRef}
                    className="v3-scrub-track"
                    role="slider"
                    tabIndex={0}
                    aria-valuemin={MIN}
                    aria-valuemax={MAX}
                    aria-valuenow={year}
                    aria-label="Scrub through the timeline"
                    data-cursor="drag"
                    onKeyDown={onKey}
                    {...drag(trackRef)}
                >
                    <div className="v3-scrub-rail" />
                    <div className="v3-scrub-fill" style={{ width: `${t * 100}%` }} />
                    {MILESTONES.map((m) => (
                        <span
                            key={m.year}
                            className={`v3-scrub-dot ${m.year <= year ? 'v3-scrub-dot--past' : ''} ${active.year === m.year ? 'v3-scrub-dot--on' : ''}`}
                            style={{ left: `${((m.year - MIN) / (MAX - MIN)) * 100}%` }}
                            data-year={m.year}
                        />
                    ))}
                    <span className="v3-scrub-thumb" style={{ left: `${t * 100}%` }} />
                </div>
                <div className="v3-scrub-scale">
                    <span className="v3-label">1992</span>
                    <span className="v3-label">today</span>
                </div>
            </div>
        </div>
    );
}
