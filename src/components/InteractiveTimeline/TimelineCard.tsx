'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './TimelineCard.module.css';

// ─── Typewriter Hook ──────────────────────────────────────────────────────────

function useTypewriter(text: string, isActive: boolean, delay = 0): string {
  const [displayed, setDisplayed] = React.useState('');
  React.useEffect(() => {
    if (!isActive) {
      setDisplayed('');
      return;
    }
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 22);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isActive, text, delay]);
  return displayed;
}

// ─── Typewriter Bullet ────────────────────────────────────────────────────────

function TypewriterBullet({
  text,
  isActive,
  delay,
}: {
  text: string;
  isActive: boolean;
  delay: number;
}) {
  const displayed = useTypewriter(text, isActive, delay);
  return (
    <li className={styles.bulletItem}>
      <span className={styles.bulletArrow}>&gt;</span>
      <span className={styles.bulletText}>{displayed}</span>
      {displayed.length < text.length && isActive && (
        <motion.span
          className={styles.cursor}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          _
        </motion.span>
      )}
    </li>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface TimelineEventMin {
  id: number;
  year: number;
  yearDisplay: string;
  age: string;
  title: string;
  context: string;
  chapterNumber: number;
  quote: string;
  points: string[];
  skills: string[];
  phaseId: string;
  primaryColor: string;
  position: 'top' | 'bottom';
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  connectsTo: number[];
}

interface SkillConnectionMin {
  fromEventId: number;
  toEventId: number;
  label: string;
  type: 'feeds' | 'amplifies' | 'transforms';
}

interface AllEventMin {
  id: number;
  title: string;
  context: string;
  primaryColor: string;
}

interface TimelineCardProps {
  event: TimelineEventMin;
  connections: SkillConnectionMin[];
  allEvents: AllEventMin[];
  isHovered: boolean;
  isActive: boolean;
  isRevealed: boolean;
  isDragging: boolean;
  onCardClick: (id: number) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TimelineCard({
  event,
  connections,
  allEvents,
  isHovered,
  isActive,
  isRevealed,
  isDragging,
  onCardClick,
}: TimelineCardProps) {
  const isFocused = isHovered || isActive;
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt motion values — replicating the TiltCard pattern
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };

  // Tilt ranges are fixed at ±8 deg; dragging is gated in the mouse handler below
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Icon = event.icon;
  const chapterStr = String(event.chapterNumber).padStart(2, '0');

  // Y position based on position prop and focus/reveal state
  const yValue =
    event.position === 'top'
      ? isFocused
        ? -140
        : isRevealed
          ? -80
          : -65
      : isFocused
        ? 140
        : isRevealed
          ? 80
          : 65;

  return (
    <motion.div
      className={`${styles.cardWrapper} ${styles[event.position]}`}
      animate={{
        y: yValue,
        zIndex: isFocused ? 10 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onCardClick(event.id)}
    >
      <motion.div
        ref={cardRef}
        className={`${styles.card} ${isFocused ? styles.cardFocused : ''} ${isActive ? styles.cardActive : ''}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: '800px',
          borderColor: isFocused ? event.primaryColor : undefined,
          boxShadow: isFocused
            ? `0 0 24px ${event.primaryColor}30, 0 0 48px ${event.primaryColor}15, inset 0 0 12px ${event.primaryColor}08`
            : undefined,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={isDragging ? {} : { scale: 1.02 }}
      >
        {/* Holographic shimmer overlay */}
        <div
          className={`${styles.holoShimmer} ${isFocused ? styles.holoShimmerActive : ''}`}
        />

        {/* Card Header */}
        <div className={styles.cardHeader}>
          <span className={styles.chapterLabel} style={{ color: `${event.primaryColor}80` }}>
            CH. {chapterStr}
          </span>
          <div className={styles.iconWrapper} style={{ color: isFocused ? event.primaryColor : undefined }}>
            <Icon size={16} />
          </div>
        </div>

        {/* Context */}
        <div className={styles.contextLabel} style={{ color: event.primaryColor }}>
          {event.context}
        </div>

        {/* Title */}
        <h3 className={styles.title}>{event.title}</h3>

        {/* Quote */}
        <p className={styles.quote}>&ldquo;{event.quote}&rdquo;</p>

        <div
          className={styles.separator}
          style={{ backgroundColor: `${event.primaryColor}30` }}
        />

        {/* Age row */}
        <div className={styles.ageRow}>
          <span className={styles.ageLabel}>AGE: {event.age}</span>
          <span className={styles.yearLabel}>{event.yearDisplay}</span>
        </div>

        {/* Typewriter Bullets — only when focused */}
        <AnimatePresence>
          {isFocused && (
            <motion.ul
              className={styles.bulletList}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              {event.points.map((point, i) => (
                <TypewriterBullet
                  key={i}
                  text={point}
                  isActive={isFocused}
                  delay={i * 380}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Skills badge */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className={styles.skillsBadge}
              style={{
                color: event.primaryColor,
                borderColor: `${event.primaryColor}40`,
              }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ delay: 0.2 }}
            >
              ✦ Skills Unlocked: {event.skills.length}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lineage pills — only on active click */}
        <AnimatePresence>
          {isActive && connections.length > 0 && (
            <motion.div
              className={styles.lineageContainer}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: 0.3 }}
            >
              {connections.map((conn, i) => {
                const target = allEvents.find((e) => e.id === conn.toEventId);
                return (
                  <motion.div
                    key={i}
                    className={styles.lineagePill}
                    style={{
                      borderColor: `${event.primaryColor}50`,
                      color: event.primaryColor,
                    }}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.1 }}
                  >
                    <span className={styles.lineageArrow}>→</span>
                    <span className={styles.lineageLabel}>
                      {conn.label}
                      {target ? `: ${target.context}` : ''}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
