'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, getProjectBySlug } from '@/data/projects';
import CaptainFreshLayout from '../components/CaptainFreshLayout';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Case study sections (placeholder - user can customize)
const caseSections = [
    { id: 'overview', title: 'Overview' },
    { id: 'challenge', title: 'The Challenge' },
    { id: 'solution', title: 'The Solution' },
    { id: 'results', title: 'Results & Impact' },
];

export default function ProjectCaseStudy() {
    const params = useParams();
    const slug = params.slug as string;
    const project = getProjectBySlug(slug);
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Find next/prev projects
    const currentIndex = projects.findIndex(p => p.slug === slug);
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    // GSAP animations
    useEffect(() => {
        if (!mounted || !containerRef.current) return;

        const ctx = gsap.context(() => {
            // Animate sections on scroll
            gsap.utils.toArray<HTMLElement>('.case-section').forEach((section, i) => {
                gsap.fromTo(section,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

            // Parallax hero image
            gsap.to('.hero-visual', {
                yPercent: 30,
                scrollTrigger: {
                    trigger: '.case-hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [mounted]);

    if (!mounted) return null;
    if (!project) {
        notFound();
    }

    if (slug === 'captain-fresh') {
        return <CaptainFreshLayout project={project} />;
    }

    return (
        <div className="case-study" ref={containerRef} style={{ '--project-color': project.color } as React.CSSProperties}>
            {/* Back Button */}
            <Link href="/projects" className="back-button">
                <ArrowLeft size={18} />
                <span>All Projects</span>
            </Link>

            {/* Hero Section */}
            <section className="case-hero">
                <div className="hero-visual">
                    <div className="visual-placeholder">
                        <span>Hero Image / Video</span>
                    </div>
                </div>
                <div className="hero-content">
                    <motion.div
                        className="hero-meta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="project-year">{project.year}</span>
                        <span className="project-company">{project.company}</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {project.title}
                    </motion.h1>
                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {project.description}
                    </motion.p>
                    <motion.div
                        className="hero-metrics"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {project.metrics.map((m, i) => (
                            <div key={i} className="metric">
                                <span className="metric-value">{m.value}</span>
                                <span className="metric-label">{m.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Project Info Bar */}
            <section className="info-bar">
                <div className="info-item">
                    <span className="info-label">Role</span>
                    <span className="info-value">{project.role}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Timeline</span>
                    <span className="info-value">{project.year}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Tech Stack</span>
                    <div className="tech-tags">
                        {project.tech.map((t, i) => (
                            <span key={i} className="tech-tag">{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Study Sections */}
            <div className="case-content">
                {caseSections.map((section, index) => (
                    <section key={section.id} className="case-section">
                        <div className="section-number">{String(index + 1).padStart(2, '0')}</div>
                        <h2>{section.title}</h2>

                        {/* Placeholder content - User to fill in */}
                        <div className="section-content">
                            <p>
                                Add your case study content here. Describe the {section.title.toLowerCase()}
                                in detail with supporting visuals and data.
                            </p>

                            {/* Image placeholder */}
                            <div className="image-placeholder">
                                <span>Add Image / Screenshot / Video</span>
                            </div>

                            {index === 0 && (
                                <div className="callout">
                                    <strong>Key Insight:</strong> Add an important callout or quote here.
                                </div>
                            )}
                        </div>
                    </section>
                ))}
            </div>

            {/* Navigation */}
            <nav className="project-nav">
                {prevProject ? (
                    <Link href={`/projects/${prevProject.slug}`} className="nav-link prev">
                        <ArrowLeft size={20} />
                        <div>
                            <span className="nav-label">Previous</span>
                            <span className="nav-title">{prevProject.title}</span>
                        </div>
                    </Link>
                ) : <div />}

                {nextProject ? (
                    <Link href={`/projects/${nextProject.slug}`} className="nav-link next">
                        <div>
                            <span className="nav-label">Next</span>
                            <span className="nav-title">{nextProject.title}</span>
                        </div>
                        <ArrowRight size={20} />
                    </Link>
                ) : <div />}
            </nav>

            <style jsx>{`
                .case-study {
                    min-height: 100vh;
                    background: var(--bg-primary);
                }

                .back-button {
                    position: fixed;
                    top: 6rem;
                    left: 2rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: var(--bg-glass);
                    backdrop-filter: blur(12px);
                    border: 1px solid var(--glass-border);
                    border-radius: 999px;
                    color: var(--text-secondary);
                    font-size: 0.875rem;
                    text-decoration: none;
                    z-index: 50;
                    transition: all 0.2s;
                }

                .back-button:hover {
                    color: var(--project-color);
                    border-color: var(--project-color);
                }

                /* Hero */
                .case-hero {
                    position: relative;
                    min-height: 90vh;
                    display: flex;
                    align-items: flex-end;
                    padding: 4rem;
                    overflow: hidden;
                }

                .hero-visual {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                }

                .hero-visual::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, var(--bg-primary) 0%, transparent 50%, var(--bg-primary) 100%);
                }

                .visual-placeholder {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted);
                    font-size: 1.25rem;
                }

                .hero-content {
                    position: relative;
                    z-index: 1;
                    max-width: 800px;
                }

                .hero-meta {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .project-year {
                    font-family: var(--font-mono);
                    font-size: 0.875rem;
                    color: var(--project-color);
                    padding: 0.35rem 0.85rem;
                    border: 1px solid var(--project-color);
                    border-radius: 999px;
                }

                .project-company {
                    font-family: var(--font-mono);
                    font-size: 0.75rem;
                    letter-spacing: 0.2em;
                    color: var(--text-muted);
                    text-transform: uppercase;
                }

                h1 {
                    font-size: clamp(3rem, 8vw, 5rem);
                    font-weight: 800;
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                }

                .hero-description {
                    font-size: 1.25rem;
                    color: var(--text-secondary);
                    line-height: 1.7;
                    margin-bottom: 2rem;
                    max-width: 600px;
                }

                .hero-metrics {
                    display: flex;
                    gap: 3rem;
                }

                .metric {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .metric-value {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: var(--project-color);
                    line-height: 1;
                }

                .metric-label {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }

                /* Info Bar */
                .info-bar {
                    display: flex;
                    justify-content: center;
                    gap: 4rem;
                    padding: 2rem 4rem;
                    background: var(--bg-secondary);
                    border-top: 1px solid var(--glass-border);
                    border-bottom: 1px solid var(--glass-border);
                }

                .info-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .info-label {
                    font-size: 0.7rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                }

                .info-value {
                    font-weight: 500;
                    color: var(--text-primary);
                }

                .tech-tags {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .tech-tag {
                    font-size: 0.75rem;
                    padding: 0.25rem 0.5rem;
                    background: var(--bg-glass);
                    border: 1px solid var(--glass-border);
                    border-radius: 4px;
                    color: var(--text-secondary);
                }

                /* Case Content */
                .case-content {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 6rem 2rem;
                }

                .case-section {
                    margin-bottom: 6rem;
                    position: relative;
                }

                .section-number {
                    font-family: var(--font-mono);
                    font-size: 0.75rem;
                    color: var(--project-color);
                    margin-bottom: 0.5rem;
                }

                .case-section h2 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 2rem;
                }

                .section-content {
                    font-size: 1.125rem;
                    color: var(--text-secondary);
                    line-height: 1.8;
                }

                .section-content p {
                    margin-bottom: 2rem;
                }

                .image-placeholder {
                    width: 100%;
                    aspect-ratio: 16/9;
                    background: var(--bg-secondary);
                    border: 2px dashed var(--glass-border);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted);
                    margin: 2rem 0;
                }

                .callout {
                    padding: 1.5rem 2rem;
                    background: var(--bg-secondary);
                    border-left: 3px solid var(--project-color);
                    border-radius: 0 12px 12px 0;
                    margin: 2rem 0;
                }

                /* Project Navigation */
                .project-nav {
                    display: flex;
                    justify-content: space-between;
                    padding: 3rem 4rem;
                    border-top: 1px solid var(--glass-border);
                    background: var(--bg-secondary);
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    text-decoration: none;
                    color: var(--text-secondary);
                    transition: color 0.2s;
                }

                .nav-link:hover {
                    color: var(--accent);
                }

                .nav-link.next {
                    text-align: right;
                }

                .nav-label {
                    display: block;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--text-muted);
                    margin-bottom: 0.25rem;
                }

                .nav-title {
                    font-weight: 600;
                    font-size: 1.125rem;
                }

                @media (max-width: 768px) {
                    .case-hero {
                        padding: 2rem;
                        min-height: 80vh;
                    }

                    .info-bar {
                        flex-direction: column;
                        gap: 1.5rem;
                        padding: 2rem;
                    }

                    .hero-metrics {
                        flex-wrap: wrap;
                        gap: 1.5rem;
                    }

                    .project-nav {
                        flex-direction: column;
                        gap: 2rem;
                        padding: 2rem;
                    }

                    .nav-link.next {
                        text-align: left;
                        flex-direction: row-reverse;
                    }
                }
            `}</style>
        </div>
    );
}
