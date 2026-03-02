'use client';

import { type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import styles from './InteractiveTimeline.module.css';
import type { Phase } from './timelineData';

interface PhaseZoneProps {
  phase: Phase;
  leftPercent: number;
  widthPercent: number;
  isActive: boolean;
  anyActive: boolean; // true if any event in the timeline is active/hovered
}

function getPatternStyle(pattern: Phase['backgroundPattern'], color: string): CSSProperties {
  switch (pattern) {
    case 'dots':
      return {
        backgroundImage: `radial-gradient(circle, ${color}18 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      };
    case 'grid':
      return {
        backgroundImage: `
          linear-gradient(${color}10 1px, transparent 1px),
          linear-gradient(90deg, ${color}10 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
      };
    case 'waves':
      return {
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          ${color}08 10px,
          ${color}08 11px
        )`,
      };
    case 'neural':
      return {
        backgroundImage: `radial-gradient(circle, ${color}20 1.5px, transparent 1.5px)`,
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 20px 20px',
      };
  }
}

export default function PhaseZone({ phase, leftPercent, widthPercent, isActive, anyActive }: PhaseZoneProps) {
  const patternStyle = getPatternStyle(phase.backgroundPattern, phase.primaryColor);

  return (
    <motion.div
      className={styles.phaseZone}
      style={{
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
      }}
      animate={{
        opacity: anyActive ? (isActive ? 1 : 0.3) : 0.8,
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      {/* Gradient overlay */}
      <div
        className={styles.phaseZoneGradient}
        style={{ background: phase.gradient }}
      />

      {/* Pattern overlay */}
      <div
        className={styles.phaseZonePattern}
        style={patternStyle}
      />

      {/* Left edge fade */}
      <div
        className={styles.phaseZoneEdgeLeft}
        style={{
          background: `linear-gradient(90deg, var(--bg-primary, #0a0a0f) 0%, transparent 100%)`,
        }}
      />

      {/* Right edge fade */}
      <div
        className={styles.phaseZoneEdgeRight}
        style={{
          background: `linear-gradient(270deg, var(--bg-primary, #0a0a0f) 0%, transparent 100%)`,
        }}
      />

      {/* Decorative Roman numeral */}
      <div
        className={styles.phaseZoneNumeral}
        style={{ color: phase.primaryColor }}
      >
        {phase.numeral}
      </div>

      {/* Phase label */}
      <div
        className={styles.phaseZoneLabel}
        style={{ color: phase.primaryColor }}
      >
        {phase.label}
      </div>

      {/* Atmospheric description */}
      <div className={styles.phaseZoneAtmosphere}>
        {phase.atmosphericDescription}
      </div>

      {/* Active indicator bar at top */}
      <motion.div
        className={styles.phaseZoneTopBar}
        style={{ backgroundColor: phase.primaryColor }}
        animate={{ scaleX: isActive ? 1 : 0.3, opacity: isActive ? 1 : 0.2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
