'use client';

/* "Scrub the timeline" — drag through 33 years of Victor. The display
   morphs through real milestones and the variable font gains weight as
   the career does: wght 200 as a kid with a pencil → 800 at co-founder. */

import { useMemo, useRef, useState, type PointerEvent } from 'react';

interface Milestone {
    year: number;
    title: string;
    detail: string;
    metric: string;
}

const MILESTONES: Milestone[] = [
    { year: 1992, title: 'A pencil', detail: 'Drawing shapes until the hand knows them by heart — the first product spec.', metric: 'Age 1 — it begins' },
    { year: 2004, title: 'Kites over Bangalore', detail: 'Crosswind flying: read the pull, give slack, never let go.', metric: 'Strategy = feel' },
    { year: 2013, title: 'NITK Surathkal', detail: 'B.Tech done. Engineering gives the curves a grammar — systems, constraints, trade-offs.', metric: 'Systems thinking unlocked' },
    { year: 2015, title: 'KleverKid', detail: 'First PM role. Users can’t read your mind — you draw it out loud for them.', metric: 'First product shipped' },
    { year: 2017, title: 'BabyChakra', detail: 'Rebuilt the loop parents wanted to re-enter, then rebuilt the platform around it.', metric: '+42% retention · 8 months' },
    { year: 2019, title: 'CoinDCX', detail: 'India’s largest crypto exchange. At this scale every pixel is a promise.', metric: '1M+ traders' },
    { year: 2021, title: 'CaptainFresh', detail: 'First-in-industry supply chain platform for a century-old seafood trade.', metric: '+40% fisher income' },
    { year: 2024, title: 'Cox & Kings', detail: 'SVP, Product & Tech — teaching one of travel’s oldest brands to feel personal.', metric: '267-year-old brand, new line' },
    { year: 2025, title: 'AssetWorks AI', detail: 'Co-founder & CPO. Plain language in, investment insight out.', metric: 'Founder mode: on' },
    { year: 2026, title: 'Still drawing', detail: 'The medium keeps changing. The line doesn’t.', metric: 'To be continued…' },
];

const MIN = MILESTONES[0].year;
const MAX = MILESTONES[MILESTONES.length - 1].year;

export default function TimeScrub() {
    const [year, setYear] = useState(2025);
    const stageRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    const t = (year - MIN) / (MAX - MIN);
    const weight = Math.round(200 + t * 600);

    const active = useMemo(() => {
        let m = MILESTONES[0];
        for (const ms of MILESTONES) if (ms.year <= year) m = ms;
        return m;
    }, [year]);

    const yearFromPointer = (e: PointerEvent<HTMLDivElement>) => {
        const rect = stageRef.current!.getBoundingClientRect();
        const f = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        setYear(Math.round(MIN + f * (MAX - MIN)));
    };

    return (
        <div className="v3-scrub">
            {/* stage — drag anywhere on it */}
            <div
                ref={stageRef}
                className="v3-scrub-stage"
                onPointerDown={(e) => {
                    dragging.current = true;
                    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                    yearFromPointer(e);
                }}
                onPointerMove={(e) => dragging.current && yearFromPointer(e)}
                onPointerUp={() => (dragging.current = false)}
                onPointerCancel={() => (dragging.current = false)}
            >
                <span
                    className="v3-scrub-year"
                    style={{ fontVariationSettings: `'wght' ${weight}, 'opsz' 96` }}
                >
                    {year}
                </span>
                <div className="v3-scrub-info" key={active.year}>
                    <span className="v3-scrub-title" style={{ fontVariationSettings: `'wght' ${Math.max(500, weight)}` }}>
                        {active.title}
                    </span>
                    <span className="v3-scrub-detail">{active.detail}</span>
                    <span className="v3-scrub-metric">{active.metric}</span>
                </div>
                <span className="v3-scrub-hint v3-label">◂ drag ▸</span>
            </div>

            {/* track with milestone ticks */}
            <div className="v3-scrub-track-wrap">
                <input
                    className="v3-scrub-range"
                    type="range"
                    min={MIN}
                    max={MAX}
                    value={year}
                    onChange={(e) => setYear(+e.target.value)}
                    aria-label="Scrub through the timeline"
                />
                <div className="v3-scrub-ticks" aria-hidden="true">
                    {MILESTONES.map((m) => (
                        <button
                            key={m.year}
                            className={`v3-scrub-tick ${active.year === m.year ? 'v3-scrub-tick--on' : ''}`}
                            style={{ left: `${((m.year - MIN) / (MAX - MIN)) * 100}%` }}
                            onClick={() => setYear(m.year)}
                            title={`${m.year} — ${m.title}`}
                            tabIndex={-1}
                        />
                    ))}
                </div>
                <div className="v3-scrub-scale">
                    <span className="v3-label">1992 · wght 200</span>
                    <span className="v3-label">now · wght 800</span>
                </div>
            </div>
        </div>
    );
}
