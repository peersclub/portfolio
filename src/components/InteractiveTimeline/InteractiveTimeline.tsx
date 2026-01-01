'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pencil,
  Palette,
  Wind,
  Feather,
  Camera,
  Users,
  Crown,
  Globe,
  Rocket,
  Briefcase,
  Trophy,
  Sparkles,
  Zap,
  type LucideIcon
} from 'lucide-react';
import styles from './InteractiveTimeline.module.css';

interface TimelineEvent {
  id: number;
  year: string;
  age: string;
  title: string;
  context: string; // The "Life" origin (e.g., Drawing, Kites)
  points: string[];
  color: string;
  position: 'top' | 'bottom';
  icon: LucideIcon;
}

const timelineData: TimelineEvent[] = [
  {
    id: 1,
    year: '1995',
    age: '03',
    title: 'Visual Foundations',
    context: 'DRAWING',
    points: ['Memorizing shapes', 'Replicating reality', 'Mastering patience'],
    color: '#00F0FF', // Cyber Cyan
    position: 'top',
    icon: Pencil
  },
  {
    id: 2,
    year: '2002',
    age: '10',
    title: 'Creative Analysis',
    context: 'PAINTING',
    points: ['Love for colors', 'Attention to detailing', 'Unleashing creativity'],
    color: '#00F0FF',
    position: 'bottom',
    icon: Palette
  },
  {
    id: 3,
    year: '2004',
    age: '12',
    title: 'Adaptive Strategy',
    context: 'FLYING KITES',
    points: ['Strategic planning', 'Adapting to winds', 'Never giving up'],
    color: '#00F0FF',
    position: 'top',
    icon: Wind
  },
  {
    id: 4,
    year: '2007',
    age: '15',
    title: 'Design Precision',
    context: 'CALLIGRAPHY',
    points: ['Typography & Design', 'Pattern recognition', 'The art of details'],
    color: '#00F0FF',
    position: 'bottom',
    icon: Feather
  },
  {
    id: 5,
    year: '2010',
    age: '18',
    title: 'Perspective Shift',
    context: 'PHOTOGRAPHY',
    points: ['New perspectives', 'Capturing moments', 'Time & Composition'],
    color: '#00F0FF',
    position: 'top',
    icon: Camera
  },
  {
    id: 6,
    year: '2011',
    age: '19',
    title: 'Synergy',
    context: 'TEAM PLAYER',
    points: ['Empathy & Synergy', 'Learning from others', 'Shared success'],
    color: '#00F0FF',
    position: 'bottom',
    icon: Users
  },
  {
    id: 7,
    year: '2012',
    age: '20',
    title: 'Orchestration',
    context: 'LEADERSHIP',
    points: ['Creative Coordinator', 'Guiding vision', 'Taking ownership'],
    color: '#00F0FF',
    position: 'top',
    icon: Crown
  },
  {
    id: 8,
    year: '2014',
    age: '22',
    title: 'Global Context',
    context: 'TRAVELLING',
    points: ['Global Mindset', 'Risk management', 'Budgeting & Courage'],
    color: '#00F0FF',
    position: 'bottom',
    icon: Globe
  },
  {
    id: 9,
    year: '2016',
    age: '24',
    title: 'Product Strategy',
    context: 'PRODUCT MANAGER',
    points: ['User Empathy', 'Roadmap strategy', 'Feature prioritization'],
    color: '#FFD700', // Gold for Career Start
    position: 'top',
    icon: Rocket
  },
  {
    id: 10,
    year: '2019',
    age: '27',
    title: 'Scale & Optimization',
    context: 'SENIOR PM',
    points: ['Scaling products', 'Data-driven decisions', 'Mentoring teams'],
    color: '#FFD700',
    position: 'bottom',
    icon: Briefcase
  },
  {
    id: 11,
    year: '2022',
    age: '30',
    title: 'Org Architecture',
    context: 'PRODUCT DIRECTOR',
    points: ['Visionary leadership', 'Market expansion', 'Org building'],
    color: '#FFD700',
    position: 'top',
    icon: Trophy
  },
  {
    id: 12,
    year: '2024',
    age: '32',
    title: 'Future Systems',
    context: 'AI INNOVATION',
    points: ['LLM integration', 'Future-tech stack', 'AI Strategy'],
    color: '#FF0055', // Future Red/Pink
    position: 'bottom',
    icon: Sparkles
  }
];

// ... imports

export default function InteractiveTimeline() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);

  // Default to showing everything in "sleep" mode if nothing is hovered?
  // User wants it "visual even on just view".

  return (
    <div className={styles.container}>
      <div className={styles.timelineWrapper}>
        {/* Central Axis - The Data Backbone */}
        <div className={styles.axis}>
          <div className={styles.axisLine} />
          <div className={styles.axisGlow} />
        </div>

        {/* Timeline Items */}
        <div className={styles.itemsContainer}>
          {timelineData.map((event) => {
            const isHovered = hoveredId === event.id;
            const isActive = activeId === event.id;
            const isTop = event.position === 'top';
            // Scale and opacity logic:
            // If hovered/active: Full duplicate.
            // If nothing is hovered: Show 'sleep' mode (dimmed, compact).
            // If another is hovered: Dim this further? Or keep sleep mode.
            const isFocus = isHovered || isActive;

            return (
              <div
                key={event.id}
                className={styles.itemWrapper}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveId(isActive ? null : event.id)}
                style={{
                  // @ts-ignore
                  '--accent': event.color
                }}
              >
                {/* The Scan Line Connector */}
                <motion.div
                  className={`${styles.scanLine} ${styles[event.position]}`}
                  initial={false}
                  animate={{
                    height: isFocus ? '100px' : '40px', // Always show a little anchor
                    opacity: isFocus ? 1 : 0.3
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* The Marker - Technical Tick */}
                <div className={styles.marker}>
                  <div className={styles.markerCore} style={{ opacity: isFocus ? 1 : 0.6 }} />
                  <div className={styles.markerBracketLeft} style={{ opacity: isFocus ? 1 : 0 }}>[</div>
                  <div className={styles.markerBracketRight} style={{ opacity: isFocus ? 1 : 0 }}>]</div>
                </div>

                {/* Year Label */}
                <div className={`${styles.nodeYear} ${styles[event.position]}`} style={{ opacity: isFocus ? 1 : 0.8 }}>
                  <span className={styles.yearPrefix}>// </span>
                  {event.year}
                </div>

                {/* HUD Card - Always rendered, state changes */}
                <motion.div
                  className={`${styles.hudCard} ${styles[event.position]}`}
                  initial={false}
                  animate={{
                    y: isTop
                      ? (isFocus ? -120 : -60)
                      : (isFocus ? 120 : 60),
                    opacity: 1, // Always visible!
                    scale: isFocus ? 1 : 0.9,
                    filter: isFocus ? 'blur(0px)' : 'blur(0px)', // Removed blur for default visibility
                    zIndex: isFocus ? 10 : 1,
                    backgroundColor: isFocus ? 'var(--bg-glass)' : 'var(--bg-secondary)',
                    borderColor: isFocus ? event.color : 'var(--glass-border)'
                  }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                >
                  <div className={styles.cardHeader}>
                    {/* Show icon always */}
                    <event.icon size={16} className={styles.cardIcon} style={{ color: isFocus ? event.color : 'var(--text-secondary)', opacity: isFocus ? 1 : 0.7 }} />
                    <span className={styles.cardId} style={{ opacity: isFocus ? 1 : 0.7 }}>AGE: {event.age}</span>
                  </div>

                  <h3 className={styles.title} style={{ color: isFocus ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {event.title}
                  </h3>

                  {/* Origin Context Label */}
                  <div style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    color: event.color,
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                    opacity: isFocus ? 1 : 0.6
                  }}>
                    {event.context}
                  </div>

                  <div className={styles.separator} style={{ opacity: isFocus ? 0.5 : 0.2 }} />

                  {/* Details only on hover */}
                  <AnimatePresence>
                    {isFocus && (
                      <motion.ul
                        className={styles.points}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {event.points.map((p, i) => (
                          <li key={i}>
                            <span className={styles.bullet}>&gt;</span> {p}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}

          {/* Final System Status Node */}
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
        </div>
      </div>
    </div>
  );
}
