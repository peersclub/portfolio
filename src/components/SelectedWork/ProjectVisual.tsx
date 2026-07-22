'use client';

import Image from 'next/image';
import type { Project } from '@/data/projects';

/*
 * Per-project illustrative UI vignettes — replaces the logo-on-gradient cards.
 * Each is built from the project's own domain (terminal, widget builder, route
 * map…) with subtle always-on micro-animations. Deliberately abstract: these
 * read as sketches, not screenshots, until real product shots exist (Phase 2).
 * All colors derive from the project accent + surface tokens, so every
 * theme/accent combination stays coherent. Motion respects reduced-motion.
 */

function Panel({ color, children }: { color: string; children: React.ReactNode }) {
    return (
        <div className="panel">
            {children}
            <style jsx>{`
                .panel {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background:
                        radial-gradient(130% 130% at 15% 0%, color-mix(in srgb, ${color} 22%, transparent), transparent 55%),
                        linear-gradient(150deg, color-mix(in srgb, ${color} 10%, var(--surface-primary)), var(--surface-primary));
                }

                .panel::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(var(--line-subtle) 1px, transparent 1px),
                        linear-gradient(90deg, var(--line-subtle) 1px, transparent 1px);
                    background-size: 28px 28px;
                    mask-image: radial-gradient(80% 80% at 50% 40%, black, transparent);
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}

/* ---------- AssetWorks AI: prompt → widget sketch ---------- */
function AssetWorksVignette({ color }: { color: string }) {
    return (
        <Panel color={color}>
            <div className="stack">
                <div className="prompt">
                    <span className="prompt-text">create a BTC vs ETH widget</span>
                    <span className="caret" />
                </div>
                <div className="widget">
                    <svg viewBox="0 0 160 56" className="chart" aria-hidden>
                        <path
                            className="area"
                            d="M0,48 C20,44 32,30 48,32 C64,34 72,20 92,18 C112,16 128,8 160,6 L160,56 L0,56 Z"
                            fill={`color-mix(in srgb, ${color} 25%, transparent)`}
                        />
                        <path
                            className="line"
                            d="M0,48 C20,44 32,30 48,32 C64,34 72,20 92,18 C112,16 128,8 160,6"
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                        />
                    </svg>
                    <span className="chip">+24.6%</span>
                </div>
            </div>
            <style jsx>{`
                .stack {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    width: 72%;
                    max-width: 260px;
                }

                .prompt {
                    display: flex;
                    align-items: center;
                    gap: 2px;
                    padding: 8px 12px;
                    border-radius: var(--radius-full);
                    border: 1px solid var(--line-default);
                    background: var(--surface-overlay);
                    font-family: var(--font-mono);
                    font-size: 0.62rem;
                    color: var(--content-secondary);
                    white-space: nowrap;
                    overflow: hidden;
                }

                .caret {
                    display: inline-block;
                    width: 6px;
                    height: 12px;
                    background: ${color};
                    animation: blink 1.1s steps(1) infinite;
                }

                .widget {
                    position: relative;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--line-default);
                    background: var(--surface-overlay);
                    padding: 10px 10px 4px;
                }

                .chart {
                    display: block;
                    width: 100%;
                }

                .chart .line {
                    stroke-dasharray: 240;
                    stroke-dashoffset: 240;
                    animation: draw 2.4s var(--ease-out-expo) forwards;
                }

                .chip {
                    position: absolute;
                    top: -10px;
                    right: 10px;
                    padding: 3px 8px;
                    border-radius: var(--radius-full);
                    background: ${color};
                    color: var(--surface-root);
                    font-family: var(--font-mono);
                    font-size: 0.6rem;
                    font-weight: 700;
                }

                @keyframes blink {
                    50% { opacity: 0; }
                }

                @keyframes draw {
                    to { stroke-dashoffset: 0; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .caret { animation: none; }
                    .chart .line { animation: none; stroke-dashoffset: 0; }
                }
            `}</style>
        </Panel>
    );
}

/* ---------- CoinDCX: mini trading terminal ---------- */
const CANDLES = [
    { x: 6, o: 30, c: 20, up: true },
    { x: 26, o: 34, c: 24, up: true },
    { x: 46, o: 22, c: 32, up: false },
    { x: 66, o: 28, c: 16, up: true },
    { x: 86, o: 20, c: 28, up: false },
    { x: 106, o: 26, c: 12, up: true },
    { x: 126, o: 16, c: 24, up: false },
    { x: 146, o: 22, c: 8, up: true },
];

function CoinDCXVignette({ color }: { color: string }) {
    return (
        <Panel color={color}>
            <div className="terminal">
                <div className="ticker">
                    <span className="pair">BTC/INR</span>
                    <span className="price">46,240</span>
                    <span className="delta">▲ 2.4%</span>
                </div>
                <svg viewBox="0 0 160 48" className="candles" aria-hidden>
                    {CANDLES.map((k, i) => {
                        const top = Math.min(k.o, k.c);
                        const h = Math.max(Math.abs(k.o - k.c), 3);
                        return (
                            <g key={k.x} className="candle" style={{ animationDelay: `${i * 0.12}s` }}>
                                <line
                                    x1={k.x + 4} x2={k.x + 4}
                                    y1={top - 5} y2={top + h + 5}
                                    stroke={k.up ? color : 'var(--content-muted)'}
                                    strokeWidth="1.5"
                                />
                                <rect
                                    x={k.x} y={top} width="8" height={h} rx="1.5"
                                    fill={k.up ? color : 'var(--content-muted)'}
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>
            <style jsx>{`
                .terminal {
                    position: relative;
                    z-index: 1;
                    width: 72%;
                    max-width: 260px;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--line-default);
                    background: var(--surface-overlay);
                    padding: 10px 12px 6px;
                }

                .ticker {
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                    font-family: var(--font-mono);
                    margin-bottom: 6px;
                }

                .pair {
                    font-size: 0.6rem;
                    color: var(--content-muted);
                }

                .price {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--content-primary);
                }

                .delta {
                    font-size: 0.6rem;
                    font-weight: 700;
                    color: ${color};
                    animation: pulse 2.2s ease-in-out infinite;
                }

                .candles {
                    display: block;
                    width: 100%;
                }

                .candles :global(.candle) {
                    transform-origin: center bottom;
                    animation: rise 0.7s var(--ease-out-expo) backwards;
                }

                @keyframes rise {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.45; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .candles :global(.candle), .delta { animation: none; }
                }
            `}</style>
        </Panel>
    );
}

/* ---------- Cox & Kings: itinerary route ---------- */
function CoxVignette({ color }: { color: string }) {
    return (
        <Panel color={color}>
            <div className="route-card">
                <div className="cities">
                    <span>BLR</span>
                    <svg viewBox="0 0 120 24" className="route" aria-hidden>
                        <path
                            d="M4,20 C34,2 86,2 116,20"
                            fill="none"
                            stroke={`color-mix(in srgb, ${color} 55%, transparent)`}
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                        />
                        <circle cx="4" cy="20" r="2.5" fill={color} />
                        <circle cx="116" cy="20" r="2.5" fill={color} />
                        <g className="plane">
                            <path d="M0,0 L9,3 L0,6 L2.2,3 Z" fill={color} />
                        </g>
                    </svg>
                    <span>CDG</span>
                </div>
                <div className="meta-row">
                    <span className="tag">Personalized</span>
                    <span className="tag ghost">7 days · 2 travelers</span>
                </div>
            </div>
            <style jsx>{`
                .route-card {
                    position: relative;
                    z-index: 1;
                    width: 72%;
                    max-width: 260px;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--line-default);
                    background: var(--surface-overlay);
                    padding: 12px;
                }

                .cities {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: var(--font-mono);
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: var(--content-primary);
                }

                .route {
                    flex: 1;
                    display: block;
                }

                .route .plane {
                    offset-path: path('M4,20 C34,2 86,2 116,20');
                    offset-rotate: auto;
                    animation: fly 5s ease-in-out infinite;
                }

                .meta-row {
                    display: flex;
                    gap: 6px;
                    margin-top: 10px;
                }

                .tag {
                    padding: 3px 8px;
                    border-radius: var(--radius-full);
                    background: color-mix(in srgb, ${color} 20%, transparent);
                    color: var(--content-primary);
                    font-family: var(--font-mono);
                    font-size: 0.55rem;
                }

                .tag.ghost {
                    background: transparent;
                    border: 1px solid var(--line-default);
                    color: var(--content-muted);
                }

                @keyframes fly {
                    0% { offset-distance: 0%; opacity: 0; }
                    12% { opacity: 1; }
                    88% { opacity: 1; }
                    100% { offset-distance: 100%; opacity: 0; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .route .plane { animation: none; offset-distance: 50%; opacity: 1; }
                }
            `}</style>
        </Panel>
    );
}

/* ---------- BabyChakra: growth tracker curve ---------- */
function BabyChakraVignette({ color }: { color: string }) {
    return (
        <Panel color={color}>
            <div className="growth">
                <div className="head">
                    <span className="label">Retention</span>
                    <span className="value">+42%</span>
                </div>
                <svg viewBox="0 0 160 44" className="curve" aria-hidden>
                    <path
                        d="M0,40 C30,38 50,34 80,26 C110,18 130,10 160,6"
                        fill="none"
                        stroke="var(--line-strong)"
                        strokeWidth="1.5"
                        strokeDasharray="3 4"
                    />
                    <path
                        className="grow-line"
                        d="M0,42 C30,40 55,36 85,24 C115,12 135,8 160,4"
                        fill="none"
                        stroke={color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <circle className="dot" cx="160" cy="4" r="3.5" fill={color} />
                </svg>
            </div>
            <style jsx>{`
                .growth {
                    position: relative;
                    z-index: 1;
                    width: 72%;
                    max-width: 260px;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--line-default);
                    background: var(--surface-overlay);
                    padding: 10px 12px 6px;
                }

                .head {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                    font-family: var(--font-mono);
                    margin-bottom: 4px;
                }

                .label {
                    font-size: 0.6rem;
                    color: var(--content-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                }

                .value {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: ${color};
                }

                .curve {
                    display: block;
                    width: 100%;
                }

                .grow-line {
                    stroke-dasharray: 230;
                    stroke-dashoffset: 230;
                    animation: draw 2.2s var(--ease-out-expo) forwards;
                }

                .dot {
                    animation: pop 2.4s ease-in-out infinite;
                    transform-origin: 160px 4px;
                }

                @keyframes draw {
                    to { stroke-dashoffset: 0; }
                }

                @keyframes pop {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.5); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .grow-line { animation: none; stroke-dashoffset: 0; }
                    .dot { animation: none; }
                }
            `}</style>
        </Panel>
    );
}

/* ---------- KleverKid: activity tiles ---------- */
function KleverKidVignette({ color }: { color: string }) {
    const TILES = [
        { emoji: '⚽', label: 'Football' },
        { emoji: '🎹', label: 'Piano' },
        { emoji: '🎨', label: 'Art' },
    ];
    return (
        <Panel color={color}>
            <div className="tiles">
                {TILES.map((t, i) => (
                    <div key={t.label} className="tile" style={{ animationDelay: `${i * 0.4}s` }}>
                        <span className="emoji">{t.emoji}</span>
                        <span className="tile-label">{t.label}</span>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .tiles {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    gap: 8px;
                }

                .tile {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    padding: 10px 12px;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--line-default);
                    background: var(--surface-overlay);
                    animation: bob 3.2s ease-in-out infinite;
                }

                .emoji {
                    font-size: 1.1rem;
                }

                .tile-label {
                    font-family: var(--font-mono);
                    font-size: 0.55rem;
                    color: var(--content-muted);
                }

                @keyframes bob {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .tile { animation: none; }
                }
            `}</style>
        </Panel>
    );
}

/* ---------- CaptainFresh: border-safety alert map ---------- */
function CaptainFreshVignette({ color }: { color: string }) {
    return (
        <Panel color={color}>
            <div className="nav-card">
                <div className="nav-head">
                    <span className="app">CaptainFresh</span>
                    <span className="alert">⚠ BORDER 2 KM</span>
                </div>
                <svg viewBox="0 0 160 52" className="sea" aria-hidden>
                    {/* international waters boundary */}
                    <line
                        x1="118" y1="-4" x2="150" y2="56"
                        stroke={color} strokeWidth="2" strokeDasharray="5 4"
                    />
                    <text x="152" y="12" fontSize="6" fill="var(--content-muted)" fontFamily="monospace" textAnchor="end" transform="rotate(62 148 10)"></text>
                    {/* waves */}
                    <path d="M0,16 Q10,12 20,16 T40,16 T60,16 T80,16" fill="none" stroke="var(--line-strong)" strokeWidth="1.2" />
                    <path d="M8,34 Q18,30 28,34 T48,34 T68,34" fill="none" stroke="var(--line-strong)" strokeWidth="1.2" />
                    <path d="M2,46 Q12,42 22,46 T42,46" fill="none" stroke="var(--line-subtle)" strokeWidth="1.2" />
                    {/* geofence pulse around the boat */}
                    <circle className="fence" cx="86" cy="26" r="10" fill="none" stroke={color} strokeWidth="1.5" />
                    {/* boat */}
                    <g className="boat">
                        <path d="M78,26 L94,26 L90,31 L82,31 Z" fill={color} />
                        <path d="M86,16 L86,26 L92,23 Z" fill="var(--content-primary)" />
                    </g>
                </svg>
            </div>
            <style jsx>{`
                .nav-card {
                    position: relative;
                    z-index: 1;
                    width: 72%;
                    max-width: 260px;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--line-default);
                    background: var(--surface-overlay);
                    padding: 10px 12px 6px;
                }

                .nav-head {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                    font-family: var(--font-mono);
                    margin-bottom: 4px;
                }

                .app {
                    font-size: 0.6rem;
                    color: var(--content-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                }

                .alert {
                    font-size: 0.58rem;
                    font-weight: 700;
                    padding: 2px 7px;
                    border-radius: var(--radius-full);
                    background: color-mix(in srgb, ${color} 22%, transparent);
                    color: ${color};
                    animation: blink-alert 1.6s ease-in-out infinite;
                }

                .sea {
                    display: block;
                    width: 100%;
                }

                .fence {
                    transform-origin: 86px 26px;
                    animation: fence-pulse 2.4s ease-out infinite;
                }

                .boat {
                    animation: drift 4.5s ease-in-out infinite;
                }

                @keyframes blink-alert {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.45; }
                }

                @keyframes fence-pulse {
                    0% { transform: scale(0.6); opacity: 0.9; }
                    100% { transform: scale(1.6); opacity: 0; }
                }

                @keyframes drift {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(4px, -2px) rotate(1.5deg); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .alert, .fence, .boat { animation: none; }
                    .fence { opacity: 0.5; }
                }
            `}</style>
        </Panel>
    );
}

/* ---------- Real-photo variant (unused until Phase 2 product shots) ---------- */
function PhotoVignette({ project, large }: { project: Project; large: boolean }) {
    return (
        <div className="photo">
            <Image
                src={project.cover!}
                alt={`${project.title} — field research photo`}
                fill
                sizes={large ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
                style={{ objectFit: 'cover' }}
            />
            <span className="badge">400+ field interviews</span>
            <style jsx>{`
                .photo {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                .photo::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.45), transparent 45%);
                }

                .badge {
                    position: absolute;
                    left: 12px;
                    bottom: 10px;
                    z-index: 1;
                    padding: 4px 10px;
                    border-radius: var(--radius-full);
                    background: rgba(0, 0, 0, 0.55);
                    backdrop-filter: blur(4px);
                    color: #fff;
                    font-family: var(--font-mono);
                    font-size: 0.6rem;
                    letter-spacing: 0.08em;
                }
            `}</style>
        </div>
    );
}

export default function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
    const inner = (() => {
        switch (project.slug) {
            case 'assetworks-ai':
                return <AssetWorksVignette color={project.color} />;
            case 'coindcx':
                return <CoinDCXVignette color={project.color} />;
            case 'captain-fresh':
                return <CaptainFreshVignette color={project.color} />;
            case 'cox-and-kings':
                return <CoxVignette color={project.color} />;
            case 'babychakra':
                return <BabyChakraVignette color={project.color} />;
            case 'kleverkid':
                return <KleverKidVignette color={project.color} />;
            default:
                // future projects: real photo if provided, plain panel otherwise
                return project.cover
                    ? <PhotoVignette project={project} large={large} />
                    : <Panel color={project.color}><span /></Panel>;
        }
    })();

    return (
        <div className="frame" style={{ minHeight: large ? 280 : 150 }}>
            {inner}
            <style jsx>{`
                .frame {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </div>
    );
}
