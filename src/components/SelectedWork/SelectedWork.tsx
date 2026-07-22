'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjects, moreProjects, type Project } from '@/data/projects';

function CardVisual({ project, large = false }: { project: Project; large?: boolean }) {
    if (project.cover) {
        return (
            <div className="visual">
                <Image
                    src={project.cover}
                    alt={`${project.title} — field photo`}
                    fill
                    sizes={large ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                    className="cover-img"
                    style={{ objectFit: 'cover' }}
                />
                <style jsx>{`
                    .visual {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        min-height: ${large ? '280px' : '140px'};
                        overflow: hidden;
                    }
                `}</style>
            </div>
        );
    }
    return (
        <div className="visual gradient">
            {project.logo && (
                <span className="logo-chip">
                    {/* Brand SVGs vary in color — the chip guarantees contrast on any theme */}
                    <img src={project.logo} alt={`${project.title} logo`} width={large ? 56 : 36} height={large ? 56 : 36} />
                </span>
            )}
            <style jsx>{`
                .visual {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    min-height: ${large ? '280px' : '140px'};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background:
                        radial-gradient(120% 120% at 20% 0%, color-mix(in srgb, ${project.color} 28%, transparent), transparent 60%),
                        linear-gradient(135deg, color-mix(in srgb, ${project.color} 14%, var(--bg-secondary)), var(--bg-secondary));
                }
                .logo-chip {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: ${large ? '20px' : '12px'};
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.92);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
                }
            `}</style>
        </div>
    );
}

export default function SelectedWork() {
    return (
        <section className="work" id="projects">
            <div className="container">
                <div className="section-header">
                    <span className="label">Selected Work</span>
                    <h2>Three products, built deep</h2>
                </div>

                <div className="featured">
                    {featuredProjects.map((project, i) => (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10%' }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <Link href={`/projects/${project.slug}`} className="featured-card">
                                <div className="card-visual">
                                    <CardVisual project={project} large />
                                </div>
                                <div className="card-body">
                                    <span className="meta">
                                        {project.category} · {project.year}
                                    </span>
                                    <h3>
                                        {project.title}
                                        <ArrowUpRight className="arrow" size={22} />
                                    </h3>
                                    <p className="tagline">{project.tagline}</p>
                                    <div className="metrics">
                                        {project.metrics.map((m) => (
                                            <div key={m.label} className="metric">
                                                <span className="metric-value">{m.value}</span>
                                                <span className="metric-label">{m.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="more">
                    <span className="label">More Work</span>
                    <div className="more-grid">
                        {moreProjects.map((project) => (
                            <Link key={project.slug} href={`/projects/${project.slug}`} className="more-card">
                                <div className="more-visual">
                                    <CardVisual project={project} />
                                </div>
                                <div className="more-body">
                                    <h4>{project.title}</h4>
                                    <span className="more-meta">
                                        {project.role} · {project.year}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .work {
                    padding: var(--space-5xl) 0;
                    background: var(--bg-primary);
                }

                .section-header {
                    margin-bottom: var(--space-3xl);
                }

                .label {
                    font-family: var(--font-mono);
                    font-size: 0.75rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: var(--text-muted);
                    display: block;
                    margin-bottom: var(--space-md);
                }

                .featured {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-xl);
                }

                .work :global(.featured-card) {
                    display: grid;
                    grid-template-columns: 5fr 4fr;
                    border: 1px solid var(--glass-border);
                    border-radius: 1.5rem;
                    overflow: hidden;
                    background: var(--bg-secondary);
                    text-decoration: none;
                    color: inherit;
                    transition: all 0.4s var(--ease-out-expo);
                }

                .work :global(.featured-card:hover) {
                    transform: translateY(-4px);
                    border-color: var(--accent);
                    box-shadow: 0 8px 30px color-mix(in srgb, var(--accent) 8%, transparent);
                }

                .card-visual {
                    min-height: 280px;
                }

                .card-body {
                    padding: var(--space-2xl);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: var(--space-md);
                }

                .meta {
                    font-family: var(--font-mono);
                    font-size: 0.7rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: var(--text-muted);
                }

                .card-body h3 {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 1.75rem;
                    font-weight: 700;
                    text-transform: none;
                    color: var(--text-primary);
                }

                .card-body :global(.arrow) {
                    color: var(--accent);
                    opacity: 0;
                    transform: translate(-4px, 4px);
                    transition: all 0.3s var(--ease-out-expo);
                }

                .work :global(.featured-card:hover) .card-body :global(.arrow) {
                    opacity: 1;
                    transform: translate(0, 0);
                }

                .tagline {
                    color: var(--text-secondary);
                    line-height: 1.6;
                }

                .metrics {
                    display: flex;
                    gap: var(--space-2xl);
                    margin-top: var(--space-sm);
                }

                .metric {
                    display: flex;
                    flex-direction: column;
                }

                .metric-value {
                    font-size: 1.35rem;
                    font-weight: 700;
                    color: var(--accent);
                }

                .metric-label {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                }

                .more {
                    margin-top: var(--space-3xl);
                }

                .more-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: var(--space-lg);
                }

                .work :global(.more-card) {
                    border: 1px solid var(--glass-border);
                    border-radius: 1rem;
                    overflow: hidden;
                    background: var(--bg-secondary);
                    text-decoration: none;
                    color: inherit;
                    transition: all 0.3s var(--ease-out-expo);
                }

                .work :global(.more-card:hover) {
                    transform: translateY(-3px);
                    border-color: var(--accent);
                }

                .more-visual {
                    height: 140px;
                }

                .more-body {
                    padding: var(--space-md) var(--space-lg);
                }

                .more-body h4 {
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    text-transform: none;
                }

                .more-meta {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                }

                @media (max-width: 900px) {
                    .work :global(.featured-card) {
                        grid-template-columns: 1fr;
                    }
                    .more-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
}
