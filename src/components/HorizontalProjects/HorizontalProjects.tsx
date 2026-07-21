'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Reveal-on-scroll for the section
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Track scroll position → arrow enabled state (with a small tolerance so
  // sub-pixel scrollLeft saturation on Retina/zoom can't leave an arrow stuck)
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setOverflowing(max > 2);
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < max - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Active-card counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) setActiveIndex(index);
          }
        });
      },
      { root: scrollRef.current, threshold: 0.55 }
    );
    cardsRef.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const scrollByCards = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = cardsRef.current[0];
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  // Drag-to-scroll for mouse users (touch/trackpad use native scrolling)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const suppressClick = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = scrollRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!drag.current.active) return;
    drag.current.active = false;
    if (drag.current.moved) suppressClick.current = true; // swallow the click a drag would trigger
    el?.releasePointerCapture?.(e.pointerId);
  };
  // A drag ends with a click event on the card link — cancel it once.
  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressClick.current = false;
    }
  };

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
            {overflowing && (
              <div className="nav-arrows">
                <button
                  type="button"
                  aria-label="Previous projects"
                  onClick={() => scrollByCards(-1)}
                  disabled={!canScrollLeft}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next projects"
                  onClick={() => scrollByCards(1)}
                  disabled={!canScrollRight}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`projects-scroll ${isVisible ? 'visible' : ''}`}
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <div className="projects-track">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              data-index={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`project-card-wrapper ${activeIndex === index ? 'active' : ''}`}
            >
              <Link href={`/projects/${project.slug}`} className="project-link" draggable={false}>
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

        .header-right {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
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

        .nav-arrows {
          display: flex;
          gap: var(--space-sm);
        }

        .nav-arrows button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 1px solid var(--glass-border);
          background: var(--bg-secondary);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.25s var(--ease-out-expo);
        }

        .nav-arrows button:hover:not(:disabled) {
          border-color: var(--accent);
          color: var(--accent);
        }

        .nav-arrows button:disabled {
          opacity: 0.35;
          cursor: default;
        }

        .projects-scroll {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x proximity;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: var(--space-md) 0;
          opacity: 0;
          cursor: grab;
          transition: opacity 0.8s var(--ease-out-expo) 0.2s;
        }

        .projects-scroll:active {
          cursor: grabbing;
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
          padding-right: var(--space-xl);
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
            color-mix(in srgb, var(--accent) 4%, transparent),
            transparent
          );
          box-shadow: 0 8px 30px color-mix(in srgb, var(--accent) 8%, transparent);
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
          cursor: pointer;
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
