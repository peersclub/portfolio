'use client';

import { useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PlaybackControls.module.css';

interface SkillTrackerProps {
  totalSkills: number;
  unlockedSkills: number;
  totalYears: number;
  totalChapters: number;
  isComplete: boolean;
}

export default function SkillTracker({
  totalSkills,
  unlockedSkills,
  totalYears,
  totalChapters,
  isComplete,
}: SkillTrackerProps) {
  const gradientId = useId();
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSkills > 0 ? unlockedSkills / totalSkills : 0;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className={styles.trackerContainer}>
      {/* SVG circular arc */}
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        className={styles.trackerSvg}
        aria-label={`${unlockedSkills} of ${totalSkills} skills unlocked`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#7B2FFF" />
            <stop offset="100%" stopColor="#FF0080" />
          </linearGradient>
        </defs>

        {/* Background track */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="4"
        />

        {/* Progress arc */}
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          transform="rotate(-90 48 48)"
        />
      </svg>

      {/* Center text */}
      <div className={styles.trackerCenter}>
        <motion.span
          className={styles.trackerCount}
          key={unlockedSkills}
          initial={{ scale: 1.4, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {unlockedSkills}
        </motion.span>
        <span className={styles.trackerTotal}>/{totalSkills}</span>
        <span className={styles.trackerLabel}>SKILLS</span>
      </div>

      {/* Stats row */}
      <div className={styles.statsRow}>
        <span className={styles.statItem}>{totalYears}yr</span>
        <span className={styles.statSep}>·</span>
        <span className={styles.statItem}>{totalChapters}ch</span>
      </div>

      {/* Completion flourish */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            className={styles.completionText}
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            ∞ Impact
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
