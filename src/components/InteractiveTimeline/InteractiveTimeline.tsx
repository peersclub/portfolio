'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Move } from 'lucide-react';
import styles from './InteractiveTimeline.module.css';

import {
  timelineEvents,
  phases,
  skillConnections,
  getProportionalPosition,
  getPhaseZoneBounds,
  TIMELINE_STATS,
} from './timelineData';
import PhaseZone from './PhaseZone';
import TimelineCard from './TimelineCard';
import TimelineThread from './TimelineThread';
import PlaybackControls from './PlaybackControls';
import SkillTracker from './SkillTracker';

const PLAY_INTERVAL_MS = 1800;

export default function InteractiveTimeline() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadIndex, setPlayheadIndex] = useState<number | null>(null);
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Measure wrapper width for TimelineThread SVG
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new ResizeObserver(entries => {
      setWrapperWidth(entries[0].contentRect.width);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Auto-play logic
  const handlePlay = useCallback(() => {
    if (isPlaying) return;
    const first = timelineEvents[0];
    setIsPlaying(true);
    setPlayheadIndex(0);
    setRevealedIds(new Set([first.id]));
    setActiveId(first.id);
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx++;
      if (idx >= timelineEvents.length) {
        clearInterval(intervalRef.current!);
        setIsPlaying(false);
        setPlayheadIndex(null);
        setActiveId(null);
        return;
      }
      const ev = timelineEvents[idx];
      setPlayheadIndex(idx);
      setRevealedIds(prev => new Set([...prev, ev.id]));
      setActiveId(ev.id);
    }, PLAY_INTERVAL_MS);
  }, [isPlaying]);

  const handlePause = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
  }, []);

  const handleReset = useCallback(() => {
    handlePause();
    setPlayheadIndex(null);
    setRevealedIds(new Set());
    setActiveId(null);
  }, [handlePause]);

  const handleSeek = useCallback((index: number) => {
    handlePause();
    const ev = timelineEvents[index];
    if (!ev) return;
    setPlayheadIndex(index);
    setActiveId(ev.id);
    setRevealedIds(new Set(timelineEvents.slice(0, index + 1).map(e => e.id)));
  }, [handlePause]);

  // ─── Static derived data (no deps — computed once) ────────────────────────

  // Enriched events: add yearDisplay + chapterNumber needed by TimelineCard
  const enrichedEvents = useMemo(() =>
    timelineEvents.map((e, idx) => ({
      ...e,
      yearDisplay: String(e.year),
      chapterNumber: idx + 1,
    })),
  []);

  // Minimal event shape for TimelineCard's allEvents prop — derived from
  // enrichedEvents to avoid a second traversal of timelineEvents.
  const allEventsMin = useMemo(() =>
    enrichedEvents.map(e => ({
      id: e.id,
      title: e.title,
      context: e.context,
      primaryColor: e.primaryColor,
    })),
  [enrichedEvents]);

  // O(1) skill-count lookup: id → number of skills
  const skillCountById = useMemo(() => {
    const map = new Map<number, number>();
    for (const e of timelineEvents) map.set(e.id, e.skills.length);
    return map;
  }, []);

  // Connections pre-grouped by fromEventId for O(1) render-time lookup
  const connectionsByFromId = useMemo(() => {
    const map = new Map<number, typeof skillConnections>();
    for (const c of skillConnections) {
      const list = map.get(c.fromEventId) ?? [];
      list.push(c);
      map.set(c.fromEventId, list);
    }
    return map;
  }, []);

  // Event positions for the thread SVG (id, xPercent, phaseId)
  const eventPositions = useMemo(() =>
    enrichedEvents.map(e => ({
      id: e.id,
      xPercent: getProportionalPosition(e.year),
      phaseId: e.phaseId,
    })),
  [enrichedEvents]);

  // Phase zone bounds — static
  const phaseZoneBounds = useMemo(() =>
    phases.map(p => ({ phase: p, ...getPhaseZoneBounds(p) })),
  []);

  // ─── Reactive derived data ────────────────────────────────────────────────

  // Skills counter — O(n) over revealedIds using the pre-built Map
  const totalSkillsUnlocked = useMemo(() => {
    let total = 0;
    for (const id of revealedIds) total += skillCountById.get(id) ?? 0;
    return total;
  }, [revealedIds, skillCountById]);

  // Active phase for zone highlighting
  const activePhaseId = useMemo(() => {
    if (activeId !== null) {
      return timelineEvents.find(e => e.id === activeId)?.phaseId ?? null;
    }
    if (hoveredId !== null) {
      return timelineEvents.find(e => e.id === hoveredId)?.phaseId ?? null;
    }
    return null;
  }, [activeId, hoveredId]);

  const anyActive = activeId !== null || hoveredId !== null;

  // Active connections for the thread (connections FROM the active event)
  const activeConnections = useMemo(() => {
    if (!activeId) return [];
    return (connectionsByFromId.get(activeId) ?? []).map(c => ({
      fromEventId: c.fromEventId,
      toEventId: c.toEventId,
      label: c.label,
    }));
  }, [activeId, connectionsByFromId]);

  return (
    <div className={styles.outerContainer} ref={containerRef}>
      {/* Controls strip — above the draggable timeline */}
      <div className={styles.controlsStrip}>
        <PlaybackControls
          totalEvents={TIMELINE_STATS.totalEvents}
          currentIndex={playheadIndex}
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onReset={handleReset}
          onSeek={handleSeek}
        />
        <SkillTracker
          totalSkills={TIMELINE_STATS.totalSkills}
          unlockedSkills={totalSkillsUnlocked}
          totalYears={TIMELINE_STATS.totalYears}
          totalChapters={TIMELINE_STATS.totalChapters}
          isComplete={revealedIds.size === TIMELINE_STATS.totalEvents}
        />
      </div>

      {/* Zoom controls */}
      <div className={styles.zoomControls}>
        <button
          onClick={() => setZoom(z => Math.min(z + 0.25, 2))}
          className={styles.zoomBtn}
          title="Zoom In"
          aria-label="Zoom in"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => setZoom(z => Math.max(z - 0.25, 0.5))}
          className={styles.zoomBtn}
          title="Zoom Out"
          aria-label="Zoom out"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={() => setZoom(1)}
          className={styles.zoomBtn}
          title="Reset zoom"
          aria-label="Reset zoom"
        >
          <Move size={16} />
        </button>
        <span className={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>
      </div>

      {/* Draggable timeline canvas */}
      <motion.div
        ref={wrapperRef}
        className={styles.timelineWrapper}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0.08}
        style={{ scale: zoom }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        whileDrag={{ cursor: 'grabbing' }}
      >
        {/* Phase zones — rendered behind events */}
        {phaseZoneBounds.map(({ phase, leftPercent, widthPercent }) => (
          <PhaseZone
            key={phase.id}
            phase={phase}
            leftPercent={leftPercent}
            widthPercent={widthPercent}
            isActive={activePhaseId === phase.id}
            anyActive={anyActive}
          />
        ))}

        {/* Animated SVG thread — sits at the horizontal axis */}
        <div className={styles.threadLayer}>
          <TimelineThread
            eventPositions={eventPositions}
            totalWidth={wrapperWidth}
            activeEventId={activeId}
            playheadIndex={playheadIndex}
            isPlaying={isPlaying}
            activeConnections={activeConnections}
          />
        </div>

        {/* Event items — absolutely positioned by proportional year */}
        <div className={styles.itemsContainer}>
          {enrichedEvents.map((event, i) => {
            // xPercent already computed in eventPositions — reuse it
            const leftPct = eventPositions[i].xPercent;
            const isFocused = hoveredId === event.id || activeId === event.id;
            const isRevealed = revealedIds.has(event.id) || isFocused;
            const connections = connectionsByFromId.get(event.id) ?? [];

            return (
              <div
                key={event.id}
                className={styles.itemWrapper}
                style={{ left: `${leftPct}%` }}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Stem connector */}
                <motion.div
                  className={`${styles.stem} ${styles[event.position]}`}
                  animate={{
                    height: isFocused ? 80 : 30,
                    opacity: isFocused ? 1 : 0.25,
                    backgroundColor: isFocused
                      ? event.primaryColor
                      : 'rgba(255,255,255,0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Marker dot */}
                <motion.div
                  className={styles.markerDot}
                  animate={{
                    backgroundColor: isFocused
                      ? event.primaryColor
                      : 'rgba(255,255,255,0.4)',
                    scale: isFocused ? 2 : 1,
                    boxShadow: isFocused
                      ? `0 0 12px ${event.primaryColor}`
                      : 'none',
                  }}
                  transition={{ duration: 0.25 }}
                />

                {/* Year label */}
                <div
                  className={`${styles.yearLabel} ${styles[event.position]}`}
                  style={{
                    opacity: isFocused ? 1 : 0.5,
                    color: isFocused ? event.primaryColor : undefined,
                  }}
                >
                  <span style={{ opacity: 0.5 }}>// </span>
                  {event.year}
                </div>

                {/* Holographic TimelineCard */}
                <TimelineCard
                  event={event}
                  connections={connections}
                  allEvents={allEventsMin}
                  isHovered={hoveredId === event.id}
                  isActive={activeId === event.id}
                  isRevealed={isRevealed}
                  isDragging={isDragging}
                  onCardClick={id => setActiveId(activeId === id ? null : id)}
                />
              </div>
            );
          })}
        </div>

        {/* System status end node */}
        <div className={styles.systemStatus}>
          <div className={styles.statusLine} />
          <div className={styles.statusContent}>
            <div className={styles.statusHeader}>STATUS: ONLINE</div>
            <div className={styles.statusYear}>2026_READY</div>
            <div className={styles.statusMsg}>ARCHITECTING THE FUTURE</div>
            <motion.div
              className={styles.cursor}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
