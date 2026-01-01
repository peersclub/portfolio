'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TechGantt.module.css';

interface GanttItem {
    id: string;
    name: string;
    start: number;
    end: number;
    category: 'Creative' | 'Strategic' | 'Professional';
    tags: string[];
    efficiency: string; // "98%"
    impact: number; // 0-100 to visualize bar
    load: string; // "HIGH", "MED", "LOW"
}

const ganttData: GanttItem[] = [
    // --- CREATIVE STREAM ---
    { id: 'c1', name: 'Drawing & Fine Arts', start: 1995, end: 2010, category: 'Creative', tags: ['Pencil', 'Charcoal', 'Realism'], efficiency: '85%', impact: 60, load: 'MED' },
    { id: 'c2', name: 'Color Theory & Painting', start: 2002, end: 2012, category: 'Creative', tags: ['Oil', 'Acrylic', 'Abstract'], efficiency: '90%', impact: 75, load: 'HIGH' },
    { id: 'c4', name: 'Calligraphy & Typography', start: 2005, end: 2015, category: 'Creative', tags: ['Structure', 'Flow', 'Fonts'], efficiency: '92%', impact: 50, load: 'LOW' },
    { id: 'c5', name: 'Photography & Comp.', start: 2009, end: 2018, category: 'Creative', tags: ['DSLR', 'Lightroom', 'Framing'], efficiency: '88%', impact: 70, load: 'MED' },
    { id: 'c3', name: 'Digital Design & UX', start: 2012, end: 2026, category: 'Creative', tags: ['Figma', 'Systems', 'Interaction'], efficiency: '99%', impact: 95, load: 'HIGH' },

    // --- STRATEGIC STREAM ---
    { id: 's1', name: 'Competitive Strategy', start: 1998, end: 2008, category: 'Strategic', tags: ['Chess', 'Logic', 'Patience'], efficiency: '80%', impact: 40, load: 'LOW' },
    { id: 's2', name: 'Adaptive Tactics', start: 2002, end: 2010, category: 'Strategic', tags: ['Kites', 'Wind Dynamics', 'Control'], efficiency: '88%', impact: 55, load: 'MED' },
    { id: 's3', name: 'Global Exposure', start: 2012, end: 2016, category: 'Strategic', tags: ['Travel', 'Culture', 'Adaptability'], efficiency: '94%', impact: 85, load: 'HIGH' },
    { id: 's4', name: 'Org Leadership', start: 2018, end: 2026, category: 'Strategic', tags: ['Mentorship', 'Hiring', 'Culture'], efficiency: '96%', impact: 90, load: 'HIGH' },

    // --- PROFESSIONAL STREAM ---
    { id: 'p0', name: 'Engineering Foundation', start: 2012, end: 2016, category: 'Professional', tags: ['Code', 'Logic', 'Architecture'], efficiency: '85%', impact: 70, load: 'HIGH' },
    { id: 'p1', name: 'Product Management', start: 2016, end: 2019, category: 'Professional', tags: ['Roadmaps', 'Agile', 'User Centric'], efficiency: '92%', impact: 80, load: 'HIGH' },
    { id: 'p2', name: 'Senior Product Mgr', start: 2019, end: 2022, category: 'Professional', tags: ['Growth', 'Data', 'Scale'], efficiency: '94%', impact: 88, load: 'EXTREME' },
    { id: 'p3', name: 'Product Director', start: 2022, end: 2024, category: 'Professional', tags: ['Vision', 'Strategy', 'M&A'], efficiency: '96%', impact: 92, load: 'HIGH' },
    { id: 'p4', name: 'Product Architect', start: 2024, end: 2026, category: 'Professional', tags: ['AI Systems', 'Future Tech', 'LLMs'], efficiency: 'MAX', impact: 100, load: 'MAX' },
];

const START_YEAR = 1995;
const END_YEAR = 2026;
const TOTAL_YEARS = END_YEAR - START_YEAR;

export default function TechGantt() {
    const [hoveredItem, setHoveredItem] = useState<GanttItem | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [chartRect, setChartRect] = useState<DOMRect | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Update chart rect on resize
    useEffect(() => {
        const updateRect = () => {
            if (containerRef.current) {
                setChartRect(containerRef.current.getBoundingClientRect());
            }
        };
        updateRect();
        window.addEventListener('resize', updateRect);
        return () => window.removeEventListener('resize', updateRect);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (containerRef.current) {
            // Relative to viewport for fixed tooltip, relative to container for scanner?
            // Let's use generic mouse event
            setMousePos({ x: e.clientX, y: e.clientY });
        }
    };

    // Helper to get percentage position
    const getPos = (year: number) => {
        return ((year - START_YEAR) / TOTAL_YEARS) * 100;
    };

    const getWidth = (start: number, end: number) => {
        return ((end - start) / TOTAL_YEARS) * 100;
    };

    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case 'Creative': return '#00F0FF';
            case 'Strategic': return '#F1C40F'; // or Neon Yellow
            case 'Professional': return '#FF0055';
            default: return 'var(--text-primary)';
        }
    };

    // Render Time Ticks
    const renderTicks = () => {
        const ticks = [];
        for (let y = START_YEAR; y <= END_YEAR; y += 5) {
            ticks.push(
                <div key={y} className={styles.yearMarker} style={{ left: `${getPos(y)}%` }}>
                    {y}
                </div>
            );
        }
        return ticks;
    };

    // Render Bar Segments (Micro visual)
    const renderBarSegments = (width: number) => {
        // Visual only, creates a "grid" looking texture inside the bar
        const segments = [];
        for (let i = 0; i < width; i += 2) { // tick every 2%
            segments.push(<div key={i} className={styles.barTick} style={{ left: `${i}%` }} />);
        }
        return segments;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>Simultaneous Operations</div>
                <div className={styles.subtitle}>// MULTI-THREADED EXECUTION LOG</div>
            </div>

            <div className={styles.chartWrapper} onMouseMove={handleMouseMove} ref={containerRef}>
                {/* Time Scale */}
                <div className={styles.timeScale}>
                    {renderTicks()}
                </div>

                <div className={styles.gridContainer}>
                    {/* Background Scanner Line - Only visible if we are inside rect */}
                    {/* Simple boolean check if mouse is inside? reusing hover state for now or simple bounds check */}
                    <div
                        className={styles.scanner}
                        style={{
                            left: `${mousePos.x - (chartRect?.left || 0)}px`,
                            display: (mousePos.x > (chartRect?.left || 0) && mousePos.x < (chartRect?.right || 0)) ? 'block' : 'none'
                        }}
                    >
                        <div className={styles.scannerLabel}>
                            {Math.round(START_YEAR + ((mousePos.x - (chartRect?.left || 0)) / (chartRect?.width || 1)) * TOTAL_YEARS)}
                        </div>
                    </div>

                    {/* Render Categories */}
                    {['Creative', 'Professional', 'Strategic'].map((cat) => (
                        <div key={cat} className={styles.streamRow}>
                            <div className={styles.streamLabel}>{cat.toUpperCase()}</div>
                            <div className={styles.trackContainer}>
                                {ganttData.filter(d => d.category === cat).map(item => (
                                    <div
                                        key={item.id}
                                        className={`${styles.bar} ${styles.inView}`} // Add inView logic later if needed
                                        style={{
                                            left: `${getPos(item.start)}%`,
                                            width: `${getWidth(item.start, item.end)}%`,
                                            // @ts-ignore
                                            '--bar-color': getCategoryColor(cat)
                                        }}
                                        onMouseEnter={() => setHoveredItem(item)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        <div className={styles.barFill} />
                                        {/* Micro-texture for high-tech feel */}
                                        <div className={styles.barTexture} />
                                        <div className={styles.barLabel}>{item.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail Popup */}
            <AnimatePresence>
                {hoveredItem && (
                    <motion.div
                        className={styles.detailPopup}
                        initial={{ opacity: 0, scale: 0.95, x: 20 }} // Offset slightly
                        animate={{ opacity: 1, scale: 1, x: 20 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{
                            left: mousePos.x,
                            top: mousePos.y
                        }}
                    >
                        <div className={styles.popupHeader}>
                            <span className={styles.popupId}>ID: {hoveredItem.id.toUpperCase()}</span>
                            <span className={styles.popupStatus}>ACTIVE</span>
                        </div>

                        <div className={styles.popupTitle} style={{ color: getCategoryColor(hoveredItem.category) }}>
                            {hoveredItem.name}
                        </div>

                        <div className={styles.popupGrid}>
                            <div className={styles.popupMeta}>
                                <span className={styles.metaLabel}>PERIOD</span>
                                <span className={styles.metaValue}>{hoveredItem.start} — {hoveredItem.end === 2026 ? 'NOW' : hoveredItem.end}</span>
                            </div>
                            <div className={styles.popupMeta}>
                                <span className={styles.metaLabel}>SYS LOAD</span>
                                <span className={styles.metaValue}>{hoveredItem.load}</span>
                            </div>
                        </div>

                        {/* Impact Bar */}
                        <div className={styles.impactContainer}>
                            <div className={styles.metaLabel}>IMPACT FACTOR</div>
                            <div className={styles.impactTrack}>
                                <motion.div
                                    className={styles.impactFill}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${hoveredItem.impact}%` }}
                                    style={{ backgroundColor: getCategoryColor(hoveredItem.category) }}
                                />
                            </div>
                        </div>

                        <div className={styles.tagContainer}>
                            {hoveredItem.tags.map(t => (
                                <span key={t} className={styles.tag}>&lt;{t}/&gt;</span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
