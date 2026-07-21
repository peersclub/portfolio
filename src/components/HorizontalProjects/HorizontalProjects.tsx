'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArticleCard } from '@/components/ui/blog-post-card';
import { projects as allProjects } from '@/data/projects';

// Single source of truth: entries with a cover image appear in the home gallery
const projects = allProjects.filter(p => p.cover && p.category);

// Parse year string like "2019-2021" → Date for the start year
function yearToDate(year: string): Date {
  const startYear = year.split('-')[0];
  return new Date(`${startYear}-01-01`);
}

export default function HorizontalProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Convert vertical mouse wheel into horizontal scroll
  // Must capture at the section level BEFORE Lenis intercepts
  useEffect(() => {
    const section = sectionRef.current;
    const el = scrollRef.current;
    if (!section || !el) return;

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;

      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

      // Let page scroll normally if we've reached either end
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;

      e.preventDefault();
      e.stopPropagation();
      el.scrollLeft += e.deltaY;
    };

    // Use capture phase to intercept BEFORE Lenis gets the event
    section.addEventListener('wheel', onWheel, { passive: false, capture: true });
    return () => section.removeEventListener('wheel', onWheel, { capture: true });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: scrollRef.current,
        threshold: 0.55
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <div className="header-left">
            <span className="label">Selected Work</span>
            <h2>Projects</h2>
          </div>
          <div className="header-right">
            <span className="counter">
              <span className="current">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="separator">/</span>
              <span className="total">{String(projects.length).padStart(2, '0')}</span>
            </span>
          </div>
        </div>
      </div>

      <div
        className={`projects-scroll ${isVisible ? 'visible' : ''}`}
        ref={scrollRef}
        data-lenis-prevent
      >
        <div className="projects-track">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              data-index={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`project-card-wrapper ${activeIndex === index ? 'active' : ''}`}
            >
              <Link href={`/projects/${project.slug}`} className="project-link">
                <ArticleCard
                  headline={project.title}
                  excerpt={project.description}
                  cover={project.cover!}
                  tag={project.category!}
                  writer={project.role}
                  publishedAt={yearToDate(project.year)}
                  clampLines={3}
                />
              </Link>
            </div>
          ))}
          <div className="scroll-padding" />
        </div>
      </div>

      <style jsx>{`
        .projects {
          background: var(--bg-primary);
          min-height: auto;
          padding: var(--space-5xl) 0;
          overflow: hidden;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: var(--space-3xl);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s var(--ease-out-expo);
        }

        .section-header.visible {
          opacity: 1;
          transform: translateY(0);
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

        .counter {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--text-muted);
        }

        .counter .current {
          color: var(--accent);
          font-size: 1.5rem;
        }

        .counter .separator {
          margin: 0 var(--space-sm);
        }

        .projects-scroll {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: var(--space-md) 0;
          opacity: 0;
          transition: opacity 0.8s var(--ease-out-expo) 0.2s;
        }

        .projects-scroll.visible {
          opacity: 1;
        }

        .projects-scroll::-webkit-scrollbar {
          display: none;
        }

        .projects-track {
          display: flex;
          gap: var(--space-lg);
          padding-left: max(var(--space-xl), calc((100vw - 1440px) / 2 + var(--space-xl)));
        }

        .scroll-padding {
          flex-shrink: 0;
          width: 20vw;
        }

        .project-card-wrapper {
          flex-shrink: 0;
          width: 380px;
          scroll-snap-align: start;
          border-radius: 1.5rem;
          border: 1px solid var(--glass-border);
          background: var(--bg-secondary);
          transition: all 0.4s var(--ease-out-expo);
        }

        .project-card-wrapper:hover,
        .project-card-wrapper.active {
          transform: translateY(-4px);
          border-color: var(--accent);
          background: linear-gradient(
            135deg,
            rgba(232, 197, 71, 0.03),
            transparent
          );
          box-shadow: 0 8px 30px rgba(232, 197, 71, 0.08);
        }

        .project-card-wrapper:hover :global(.rounded-2xl) {
          transform: scale(1.03);
        }

        .project-card-wrapper :global(.rounded-2xl) {
          transition: transform 0.4s var(--ease-out-expo);
        }

        .project-link {
          text-decoration: none;
          color: inherit;
          display: block;
          cursor: none;
        }

        @media (max-width: 768px) {
          .project-card-wrapper {
            width: 320px;
          }

          .projects-track {
            padding-left: var(--space-md);
          }
        }
      `}</style>
    </section>
  );
}
