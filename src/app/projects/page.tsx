'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';

// Register plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsPage() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !wrapperRef.current || !trackRef.current) return;

        const wrapper = wrapperRef.current;
        const track = trackRef.current;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 769px)", () => {
                // Calculate dimensions
                const trackWidth = track.scrollWidth;
                const windowWidth = window.innerWidth;
                const scrollAmount = trackWidth - windowWidth;

                // Set wrapper height to allow for the full horizontal scroll distance
                wrapper.style.height = `${scrollAmount + window.innerHeight}px`;

                // Animate
                gsap.to(track, {
                    x: -scrollAmount,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: wrapper,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 1, // Smooth scrubbing
                        invalidateOnRefresh: true,
                    },
                });
            });

            mm.add("(max-width: 768px)", () => {
                // Return clear function if needed for mobile cleanup
                // e.g. reset styles if they persist
                gsap.set(wrapper, { height: "auto" });
                gsap.set(track, { x: 0 });
            });

        }, wrapperRef);

        return () => ctx.revert();
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div
            className="projects-page-wrapper"
            ref={wrapperRef}
            // Ensure wrapper has explicit width
            style={{ width: '100%', position: 'relative' }}
        >
            <div className="sticky-viewport">
                <div className="header-overlay">
                    <span className="page-label">Selected Works</span>
                </div>

                <div className="horizontal-track" ref={trackRef}>
                    {/* Intro Section */}
                    <div className="intro-card-section">
                        <h1>
                            Innovating <br />
                            At <span className="golden-text">Scale</span>
                        </h1>
                        <p>
                            A timeline of products that defined industries.
                            <br />
                            Scroll to explore.
                        </p>
                        <div className="scroll-hint">
                            <span className="arrow">→</span>
                        </div>
                    </div>

                    {/* Project Cards */}
                    {projects.map((project, index) => (
                        <div
                            key={project.slug}
                            className="project-card"
                            style={{ '--accent': project.color } as React.CSSProperties}
                        >
                            <div className="card-number">
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            <div className="card-content">
                                <Link href={`/projects/${project.slug}`} className="card-link" aria-label={`View ${project.title}`}>
                                    <div className="card-header">
                                        <span className="year">{project.year}</span>
                                        <span className="company">{project.company}</span>
                                    </div>

                                    <h2 className="title">{project.title}</h2>
                                    <p className="description">{project.description}</p>

                                    <div className="metrics">
                                        {project.metrics.map((m, i) => (
                                            <div key={i} className="metric">
                                                <span className="metric-value">{m.value}</span>
                                                <span className="metric-label">{m.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="view-btn">
                                        View Case Study <ArrowRight size={16} />
                                    </div>
                                </Link>

                                <div className="tags">
                                    {project.tech.map(t => (
                                        <span key={t} className="tag">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Outro / Contact */}
                    <div className="outro-section">
                        <h3>Ready to Start?</h3>
                        <Link href="/contact" className="contact-btn">
                            Let's Talk
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                /* Sticky Viewport Logic DO NOT CHANGE */
                .sticky-viewport {
                    position: sticky;
                    top: 0;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                    background: var(--bg-primary);
                    display: flex;
                    align-items: center;
                    /* Ensure z-index is correct relative to cursor and nav */
                    z-index: 10;
                }

                .projects-page-wrapper {
                    /* ensure background covers standard scroll if any */
                    background: var(--bg-primary);
                }

                .horizontal-track {
                    display: flex;
                    height: 100%;
                    width: max-content; /* Critical for scrollWidth */
                    padding-left: 5vw;
                    gap: 5vw;
                    align-items: center;
                    will-change: transform;
                }
                
                /* Cursor Visibility Fix */
                .projects-page-wrapper,
                .sticky-viewport {
                    cursor: none !important;
                }

                /* --- Design Styles --- */

                .header-overlay {
                    position: absolute;
                    top: 2rem;
                    left: 2rem;
                    z-index: 20;
                    pointer-events: none; /* Let clicks pass through */
                }

                .page-label {
                    font-family: var(--font-mono);
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: var(--text-muted);
                }

                /* Intro Section */
                .intro-card-section {
                    min-width: 40vw;
                    padding-right: 5vw;
                    flex-shrink: 0;
                }

                .intro-card-section h1 {
                    font-size: clamp(3rem, 6vw, 5rem);
                    line-height: 1.1;
                    margin-bottom: 2rem;
                }

                .intro-card-section p {
                    font-size: 1.25rem;
                    color: var(--text-secondary);
                    margin-bottom: 3rem;
                }

                .scroll-hint {
                    font-size: 2rem;
                    color: var(--accent);
                    animation: bounce 2s infinite;
                }

                @keyframes bounce {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(10px); }
                }

                /* Project Cards */
                .project-card {
                    min-width: 60vw;
                    max-width: 800px;
                    height: 70vh;
                    background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    padding: 3rem;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    flex-shrink: 0;
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
                }

                /* Make the whole card clickable somewhat via the link */
                .card-link {
                    display: block;
                    text-decoration: none;
                    color: inherit;
                    cursor: none; /* Keep custom cursor */
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .project-card:hover {
                    border-color: var(--accent);
                    transform: translateY(-8px) scale(1.01);
                    background: linear-gradient(135deg, var(--bg-secondary) 0%, #1a1a1e 100%);
                    box-shadow: 0 20px 40px -12px rgba(0,0,0,0.6), 0 0 20px -5px var(--accent-light, rgba(232, 197, 71, 0.1));
                }

                .card-number {
                    position: absolute;
                    top: -4rem;
                    left: 0;
                    font-size: 8rem;
                    font-weight: 800;
                    color: var(--bg-tertiary);
                    z-index: -1;
                    -webkit-text-stroke: 1px var(--glass-border);
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                    font-family: var(--font-mono);
                    font-size: 0.875rem;
                    color: var(--text-muted);
                }

                .company { letter-spacing: 0.1em; text-transform: uppercase; }
                .year { color: var(--accent); }

                .title {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    color: var(--text-primary);
                }

                .description {
                    font-size: 1.125rem;
                    line-height: 1.6;
                    color: var(--text-secondary);
                    margin-bottom: 2rem;
                    max-width: 90%;
                }

                .metrics {
                    display: flex;
                    gap: 3rem;
                    margin-bottom: 3rem;
                    padding: 1.5rem 0;
                    border-top: 1px solid var(--glass-border);
                    border-bottom: 1px solid var(--glass-border);
                }

                .metric-value {
                    display: block;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--accent);
                }

                .metric-label {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--text-muted);
                }

                .tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                }

                .tag {
                    font-family: var(--font-mono);
                    font-size: 0.75rem;
                    padding: 0.25rem 0.5rem;
                    border: 1px solid var(--glass-border);
                    color: var(--text-muted);
                    border-radius: 4px;
                }

                .view-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-primary);
                    font-weight: 600;
                    transition: gap 0.2s;
                    margin-top: auto;
                }

                .project-card:hover .view-btn {
                    color: var(--accent);
                    gap: 1rem;
                }

                /* Outro */
                .outro-section {
                    min-width: 30vw;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    padding-right: 5vw;
                    flex-shrink: 0;
                }

                .contact-btn {
                    font-size: 1.5rem;
                    color: var(--accent);
                    text-decoration: underline;
                    text-decoration-color: transparent;
                    transition: text-decoration-color 0.3s;
                    cursor: none;
                }

                .contact-btn:hover {
                    text-decoration-color: var(--accent);
                }

                @media (max-width: 768px) {
                    .sticky-viewport {
                        position: relative;
                        height: auto;
                        overflow: visible;
                        display: block;
                    }
                    
                    .horizontal-track {
                        width: 100%;
                        flex-direction: column;
                        padding-left: 0;
                        gap: 4rem;
                        padding-bottom: 5rem;
                        transform: none !important; /* Force override GSAP if any lingers */
                    }
                    
                    .intro-card-section {
                        min-width: 100%;
                        padding: 2rem;
                        padding-top: 6rem;
                    }

                    .project-card {
                        min-width: unset;
                        width: 90%;
                        margin: 0 auto;
                        height: auto;
                        min-height: auto;
                        padding: 2rem;
                    }
                    
                    .card-number {
                        font-size: 4rem;
                        top: -2rem;
                        left: -1rem;
                    }
                    
                    .title {
                        font-size: 2rem;
                    }
                    
                    .outro-section {
                        min-width: 100%;
                        padding: 4rem 2rem;
                    }
                    
                    .header-overlay {
                        position: fixed; /* Keep header fixed on mobile too? or absolute? */
                        /* Let's keep it absolute relative to the top of the page so it scrolls away */
                        position: absolute; 
                    }
                }
            `}</style>
        </div>
    );
}
