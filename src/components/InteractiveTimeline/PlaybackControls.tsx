'use client';

import { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import styles from './PlaybackControls.module.css';

interface PlaybackControlsProps {
  totalEvents: number;
  currentIndex: number | null;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSeek: (index: number) => void;
}

// Shared transition so both icon variants don't recreate the object each render
const ICON_TRANSITION = { duration: 0.15 };
const ICON_VARIANTS = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.5, opacity: 0 },
};

export default function PlaybackControls({
  totalEvents,
  currentIndex,
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onSeek,
}: PlaybackControlsProps) {
  const progress = currentIndex !== null ? (currentIndex + 1) / totalEvents : 0;

  const handleBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      const index = Math.min(Math.floor(ratio * totalEvents), totalEvents - 1);
      onSeek(index);
    },
    [totalEvents, onSeek],
  );

  // Stable array — only reallocated when totalEvents changes
  const dotIndices = useMemo(
    () => Array.from({ length: totalEvents }, (_, i) => i),
    [totalEvents],
  );

  const displayIndex = currentIndex !== null ? currentIndex + 1 : 0;

  return (
    <div className={styles.container}>
      {/* Controls row */}
      <div className={styles.controls}>
        {/* Play/Pause */}
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={isPlaying ? onPause : onPlay}
          aria-label={isPlaying ? 'Pause journey' : 'Play journey'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying ? (
              <motion.span
                key="pause"
                variants={ICON_VARIANTS}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={ICON_TRANSITION}
              >
                <Pause size={14} />
              </motion.span>
            ) : (
              <motion.span
                key="play"
                variants={ICON_VARIANTS}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={ICON_TRANSITION}
              >
                <Play size={14} />
              </motion.span>
            )}
          </AnimatePresence>
          <span className={styles.btnLabel}>{isPlaying ? 'Pause' : 'Play Journey'}</span>
        </button>

        {/* Reset */}
        <button
          className={styles.btn}
          onClick={onReset}
          aria-label="Reset journey"
          disabled={currentIndex === null && !isPlaying}
        >
          <RotateCcw size={12} />
        </button>

        {/* Counter */}
        <span className={styles.counter}>
          {displayIndex} / {totalEvents}
        </span>
      </div>

      {/* Progress bar */}
      <div
        className={styles.progressBar}
        onClick={handleBarClick}
        role="progressbar"
        aria-valuenow={currentIndex ?? 0}
        aria-valuemin={0}
        aria-valuemax={totalEvents - 1}
        aria-label="Journey progress"
      >
        {/* Track */}
        <div className={styles.progressTrack} />

        {/* Fill */}
        <motion.div
          className={styles.progressFill}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Event dots */}
        {dotIndices.map((i) => (
          <motion.button
            key={i}
            className={styles.eventDot}
            style={{
              left: `${(i / (totalEvents - 1)) * 100}%`,
            }}
            animate={{
              scale: i === currentIndex ? 2 : 1,
              backgroundColor:
                i < (currentIndex ?? -1) + 1
                  ? '#00F0FF'
                  : 'rgba(255,255,255,0.25)',
              boxShadow:
                i === currentIndex
                  ? '0 0 8px rgba(0,240,255,0.8)'
                  : 'none',
            }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              onSeek(i);
            }}
            aria-label={`Jump to chapter ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
