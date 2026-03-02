'use client';

import { useId, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { phases, getProportionalPosition } from './timelineData';
import styles from './TimelineThread.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EventPosition {
  id: number;
  xPercent: number; // 0–100 percent, for positioning on the path
  phaseId: string;
}

export interface ActiveConnection {
  fromEventId: number;
  toEventId: number;
  label: string;
}

interface TimelineThreadProps {
  eventPositions: EventPosition[];
  totalWidth: number;       // pixel width of timeline wrapper (from ResizeObserver)
  activeEventId: number | null;
  playheadIndex: number | null; // 0-based index into eventPositions
  isPlaying: boolean;
  activeConnections: ActiveConnection[];
  height?: number;          // SVG height, default 80
}

// ─── Path Generation ──────────────────────────────────────────────────────────

/**
 * Phase boundaries (xPercent values) where the path gently bumps.
 * Derived from the start years of phases II, III, and IV so they stay in
 * sync with the actual data rather than being hardcoded magic numbers.
 */
const PHASE_BOUNDARIES_PCT = phases
  .slice(1) // skip phase I — we want the *start* of phases II, III, IV
  .map(p => getProportionalPosition(p.yearRange[0])) as [number, number, number];

// Destructure once at module level so getPathYAtPercent doesn't re-destructure on every call
const [B1P, B2P, B3P] = PHASE_BOUNDARIES_PCT;

/** Convert an xPercent value to an absolute pixel X coordinate. */
function pctToX(xPercent: number, totalWidth: number): number {
  return (xPercent / 100) * totalWidth;
}

function generateThreadPath(totalWidth: number, centerY: number): string {
  const W = totalWidth;
  const Y = centerY;
  const bump = 14; // vertical bump amplitude at phase transitions

  // Phase boundary X positions (pixels)
  const b1 = pctToX(B1P, W);
  const b2 = pctToX(B2P, W);
  const b3 = pctToX(B3P, W);

  // Build path: start → phase I → boundary 1 (bump up) → phase II →
  // boundary 2 (bump down) → phase III → boundary 3 (bump up) → phase IV → end
  return [
    `M 0 ${Y}`,
    `C ${b1 * 0.3} ${Y}, ${b1 * 0.7} ${Y - 4}, ${b1} ${Y - bump}`,
    `C ${b1 + (b2 - b1) * 0.3} ${Y - bump * 0.3}, ${b1 + (b2 - b1) * 0.7} ${Y + 3}, ${b2} ${Y + bump}`,
    `C ${b2 + (b3 - b2) * 0.3} ${Y + bump * 0.3}, ${b2 + (b3 - b2) * 0.7} ${Y - 2}, ${b3} ${Y - bump * 0.7}`,
    `C ${b3 + (W - b3) * 0.3} ${Y - bump * 0.3}, ${b3 + (W - b3) * 0.7} ${Y}, ${W} ${Y}`,
  ].join(' ');
}

/**
 * Get Y position on the path at a given xPercent.
 * Approximates the cubic bezier path used above.
 */
function getPathYAtPercent(xPercent: number, centerY: number): number {
  const bump = 14;

  if (xPercent < B1P) {
    // Phase I: slight dip toward boundary
    const t = xPercent / B1P;
    return centerY - bump * t * (1 - (1 - t) * (1 - t)); // gentle approach
  } else if (xPercent < B2P) {
    // Phase II: from -bump to +bump
    const t = (xPercent - B1P) / (B2P - B1P);
    return (centerY - bump) + (2 * bump) * t;
  } else if (xPercent < B3P) {
    // Phase III: from +bump to -bump*0.7
    const t = (xPercent - B2P) / (B3P - B2P);
    return (centerY + bump) - (bump + bump * 0.7) * t;
  } else {
    // Phase IV: approach center
    const t = (xPercent - B3P) / (100 - B3P);
    return (centerY - bump * 0.7) + (bump * 0.7) * t;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 6;

export default function TimelineThread({
  eventPositions,
  totalWidth,
  activeEventId,
  playheadIndex,
  isPlaying,
  activeConnections,
  height = 80,
}: TimelineThreadProps) {
  // Unique suffix so SVG <defs> IDs don't collide when multiple instances render
  const uid = useId().replace(/:/g, '');
  const gradId   = `threadGradient-${uid}`;
  const glowId   = `threadGlow-${uid}`;
  const arcGlowId = `arcGlow-${uid}`;
  const pathId   = `timelineThreadPath-${uid}`;

  const centerY = height / 2;
  const pathD = useMemo(
    () => (totalWidth > 0 ? generateThreadPath(totalWidth, centerY) : ''),
    [totalWidth, centerY]
  );

  // O(1) lookup map: event id → EventPosition
  const epMap = useMemo(
    () => new Map(eventPositions.map(ep => [ep.id, ep])),
    [eventPositions]
  );

  // Compute progress dot position
  const progressDotPos = useMemo(() => {
    if (playheadIndex === null || totalWidth === 0) return null;
    const ep = eventPositions[playheadIndex];
    if (!ep) return null;
    const { xPercent } = ep;
    return { x: pctToX(xPercent, totalWidth), y: getPathYAtPercent(xPercent, centerY) };
  }, [playheadIndex, eventPositions, totalWidth, centerY]);

  // Active event dot position (for the clicked/hovered event)
  const activePos = useMemo(() => {
    if (!activeEventId || totalWidth === 0) return null;
    const ep = epMap.get(activeEventId);
    if (!ep) return null;
    return {
      x: pctToX(ep.xPercent, totalWidth),
      y: getPathYAtPercent(ep.xPercent, centerY),
    };
  }, [activeEventId, epMap, totalWidth, centerY]);

  // Connection arc positions — uses the epMap for O(1) lookups
  const connectionArcs = useMemo(() => {
    if (!activeConnections.length || totalWidth === 0) return [];
    return activeConnections
      .map(conn => {
        const fromEp = epMap.get(conn.fromEventId);
        const toEp   = epMap.get(conn.toEventId);
        if (!fromEp || !toEp) return null;
        const x1 = pctToX(fromEp.xPercent, totalWidth);
        const y1 = getPathYAtPercent(fromEp.xPercent, centerY);
        const x2 = pctToX(toEp.xPercent, totalWidth);
        const y2 = getPathYAtPercent(toEp.xPercent, centerY);
        const mx = (x1 + x2) / 2;
        const my = Math.min(y1, y2) - 30; // arc peaks above the path
        return { x1, y1, x2, y2, mx, my, conn };
      })
      .filter(
        (arc): arc is {
          x1: number; y1: number; x2: number; y2: number;
          mx: number; my: number;
          conn: ActiveConnection;
        } => arc !== null
      );
  }, [activeConnections, epMap, totalWidth, centerY]);

  if (!totalWidth || !pathD) {
    return <div className={styles.placeholder} style={{ height }} />;
  }

  return (
    <svg
      width={totalWidth}
      height={height}
      viewBox={`0 0 ${totalWidth} ${height}`}
      className={styles.svg}
      aria-hidden="true"
    >
      <defs>
        {/* Main gradient — ID is unique per instance to avoid collisions */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#00F0FF" />
          <stop offset="33%"  stopColor="#7B2FFF" />
          <stop offset="66%"  stopColor="#FFB800" />
          <stop offset="100%" stopColor="#FF0080" />
        </linearGradient>

        {/* Glow filter */}
        <filter id={glowId} x="-20%" y="-100%" width="140%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Connection arc glow */}
        <filter id={arcGlowId} x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Glow halo path */}
      <path
        d={pathD}
        stroke={`url(#${gradId})`}
        strokeWidth={10}
        fill="none"
        opacity={0.12}
        filter={`url(#${glowId})`}
      />

      {/* Main path */}
      <path
        id={pathId}
        d={pathD}
        stroke={`url(#${gradId})`}
        strokeWidth={2}
        fill="none"
        opacity={0.85}
      />

      {/* Flowing particles */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <circle key={i} r={2} fill="rgba(255,255,255,0.75)">
          <animateMotion
            dur="6s"
            begin={`${(i / PARTICLE_COUNT) * 6}s`}
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      ))}

      {/* Connection arcs (skill lineage) */}
      <AnimatePresence>
        {connectionArcs.map((arc, i) => (
          <motion.path
            key={`arc-${arc.conn.fromEventId}-${arc.conn.toEventId}`}
            d={`M ${arc.x1} ${arc.y1} Q ${arc.mx} ${arc.my} ${arc.x2} ${arc.y2}`}
            fill="none"
            stroke="#FFB800"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.6, pathLength: 1 }}
            exit={{ opacity: 0, pathLength: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            filter={`url(#${arcGlowId})`}
          />
        ))}
      </AnimatePresence>

      {/* Active event marker ring */}
      <AnimatePresence>
        {activePos && (
          <motion.circle
            key={`active-ring-${activeEventId}`}
            cx={activePos.x}
            cy={activePos.y}
            r={6}
            fill="none"
            stroke="#FFB800"
            strokeWidth={1.5}
            initial={{ r: 6, opacity: 0 }}
            animate={{ r: [6, 12, 6], opacity: [0.8, 0.2, 0.8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {/* Playback progress dot */}
      <AnimatePresence>
        {isPlaying && progressDotPos && (
          <motion.g
            key={`playhead-${playheadIndex}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Outer pulse ring */}
            <motion.circle
              cx={progressDotPos.x}
              cy={progressDotPos.y}
              r={7}
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={1}
              animate={{ r: [7, 14], opacity: [0.6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            {/* Inner dot */}
            <circle
              cx={progressDotPos.x}
              cy={progressDotPos.y}
              r={4}
              fill="#ffffff"
              opacity={0.9}
            />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
