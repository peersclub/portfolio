"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Section {
    id: string;
    label: string;
}

interface StickySubNavProps {
    sections: Section[];
    rightElement?: React.ReactNode;
}

export const StickySubNav = ({ sections, rightElement }: StickySubNavProps) => {
    const [activeSection, setActiveSection] = useState(sections[0]?.id);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > window.innerHeight * 0.4);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -60% 0px",
                threshold: 0,
            }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 100,
                behavior: "smooth",
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="sticky-subnav-wrapper"
        >
            {/* Top accent line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)',
                opacity: 0.5,
            }} />

            <div style={{
                maxWidth: '1440px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                height: '56px',
            }} className="subnav-inner">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}>
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '10px 20px',
                                background: activeSection === section.id
                                    ? 'rgba(232, 197, 71, 0.1)'
                                    : 'transparent',
                                border: 'none',
                                borderRadius: '100px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={(e) => {
                                if (activeSection !== section.id) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeSection !== section.id) {
                                    e.currentTarget.style.background = 'transparent';
                                }
                            }}
                        >
                            <span style={{
                                fontSize: '0.875rem',
                                fontWeight: activeSection === section.id ? 600 : 500,
                                letterSpacing: '0.02em',
                                color: activeSection === section.id
                                    ? 'var(--accent)'
                                    : 'var(--text-muted)',
                                transition: 'color 0.3s ease',
                                position: 'relative',
                                zIndex: 2,
                            }}>
                                {section.label}
                            </span>
                            {activeSection === section.id && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    style={{
                                        position: 'absolute',
                                        bottom: '6px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '20px',
                                        height: '3px',
                                        background: 'var(--accent)',
                                        borderRadius: '2px',
                                        zIndex: 10, // Above other elements
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {rightElement && (
                    <div style={{
                        flexShrink: 0,
                        marginLeft: '24px',
                        opacity: isScrolled ? 1 : 0,
                        pointerEvents: isScrolled ? 'auto' : 'none',
                        transition: 'opacity 0.3s ease',
                        position: 'relative',
                        zIndex: 1, // Lower than indicator (z-index: 10)
                    }}>
                        {rightElement}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
