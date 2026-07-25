'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion, type MotionValue } from 'framer-motion';
import type { StateFn } from './threadShapes';
import { V2_THEMES } from './themes';
import { useV2Theme } from './useV2Theme';

const ThreadScene = dynamic(() => import('./ThreadScene'), { ssr: false });

export interface StageTick {
    id: string;
    numeral: string;
    /** tooltip text */
    title: string;
    active: boolean;
    color?: string;
    onClick: () => void;
}

export interface ThreadStageProps {
    /** pin the thread to one pose (sub-pages)… */
    progress?: number;
    /** …or drive it yourself (scroll-scrubbed pages). Takes precedence. */
    progressRef?: MutableRefObject<number>;
    /** page-specific choreography — defaults to the /v2 home journey */
    states?: StateFn[];
    offsets?: [number, number, number][];
    scales?: number[];
    /** backdrop mode 0..1 — dims material/sparkles/bloom for text-heavy pages */
    dim?: number;
    /** pinned-pose shorthand: park the thread at one position/scale
        (only meaningful with a fixed `progress`) */
    offset?: [number, number, number];
    poseScale?: number;
    /** show the "pulling the thread…" veil until WebGL is live */
    veil?: boolean;
    /** HUD (bottom bar). Omit all three to render no HUD. */
    hudLabel?: string;
    hudLabelColor?: string;
    hudProgress?: MotionValue<number>;
    ticks?: StageTick[];
}

/**
 * The one owner of v2's fixed layers: the WebGL gold-thread canvas, the
 * loading veil, and the HUD. Everything is portaled to <body> because
 * app/template.tsx keeps a `filter`/`will-change` wrapper on every page,
 * which makes it the containing block for position:fixed — inside <main>,
 * "fixed" would pin to the page instead of the viewport.
 */
export default function ThreadStage({
    progress,
    progressRef,
    states,
    offsets,
    scales,
    dim,
    offset,
    poseScale,
    veil = false,
    hudLabel,
    hudLabelColor,
    hudProgress,
    ticks,
}: ThreadStageProps) {
    const internalRef = useRef(progress ?? 0);
    if (progress !== undefined) internalRef.current = progress;
    const ref = progressRef ?? internalRef;

    const [mounted, setMounted] = useState(false);
    const [ready, setReady] = useState(!veil);
    const reduced = useReducedMotion() ?? false;
    const theme = useV2Theme();
    const palette = V2_THEMES[theme];

    useEffect(() => setMounted(true), []);

    // Failsafe: never leave the veil up if WebGL can't start.
    useEffect(() => {
        if (!veil) return;
        const t = setTimeout(() => setReady(true), 4000);
        return () => clearTimeout(t);
    }, [veil]);

    if (!mounted) return null;

    const hasHud = Boolean(hudLabel || hudProgress || ticks?.length);

    const n = states?.length ?? 8;
    const offsetsProp = offset ? Array.from({ length: n }, () => offset) : offsets;
    const scalesProp = poseScale !== undefined ? Array.from({ length: n }, () => poseScale) : scales;

    return createPortal(
        <>
            <div className="v2-canvas" aria-hidden="true">
                <ThreadScene
                    progressRef={ref}
                    reduced={reduced}
                    onReady={() => setReady(true)}
                    states={states}
                    offsets={offsetsProp}
                    scales={scalesProp}
                    dim={dim}
                    palette={palette}
                />
            </div>

            {veil && (
                <div className={`v2-veil ${ready ? 'v2-veil--done' : ''}`} aria-hidden="true">
                    <span className="v2-veil-mark">pulling the thread…</span>
                </div>
            )}

            {hasHud && (
                <div className="v2-hud" aria-hidden="true">
                    {hudLabel && (
                        <span className="v2-hud-label" style={hudLabelColor ? { color: hudLabelColor } : undefined}>
                            {hudLabel}
                        </span>
                    )}
                    {hudProgress && (
                        <div className="v2-hud-track">
                            <motion.div className="v2-hud-bar" style={{ scaleX: hudProgress }} />
                        </div>
                    )}
                    {ticks && ticks.length > 0 && (
                        <div className="v2-rail">
                            {ticks.map((t) => (
                                <button
                                    key={t.id}
                                    className={`v2-tick ${t.active ? 'v2-tick--on' : ''}`}
                                    style={t.active && t.color ? { color: t.color, borderColor: t.color } : undefined}
                                    data-title={t.title}
                                    onClick={t.onClick}
                                    aria-label={`Go to ${t.title}`}
                                >
                                    {t.numeral}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>,
        document.body,
    );
}
