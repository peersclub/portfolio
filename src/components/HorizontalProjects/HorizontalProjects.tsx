'use client';

import { useRef, useState, useEffect } from 'react';

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  year: string;
  tags: string[];
}

const projects: Project[] = [
  {
    number: '01',
    title: 'Assetworks AI',
    category: 'AI & Fintech',
    description: 'AI-powered financial analytics platform. Natural language queries create sophisticated investment widgets.',
    year: '2025',
    tags: ['Claude AI', 'Rust', 'Flutter'],
  },
  {
    number: '02',
    title: 'CoinDCX',
    category: 'Crypto Exchange',
    description: 'India\'s largest crypto exchange. Led products: DCXInsta, DCXTrade, DCXMargin, DCXFutures.',
    year: '2019-2021',
    tags: ['Product Strategy', 'Mobile', 'Web'],
  },
  {
    number: '03',
    title: 'CaptainFresh',
    category: 'Supply Chain',
    description: 'First-in-industry products for century-old seafood industry. Built product and team from scratch.',
    year: '2021-2024',
    tags: ['B2B', 'Operations', 'Mobile'],
  },
  {
    number: '04',
    title: 'Cox & Kings',
    category: 'Travel Tech',
    description: 'Building first personalized experience in travel tech as SVP Product and Tech.',
    year: '2024',
    tags: ['Personalization', 'Strategy'],
  },
  {
    number: '05',
    title: 'Babychakra',
    category: 'Consumer',
    description: '42% retention increase. Built product marketplace. Complete web platform overhaul.',
    year: '2017-2018',
    tags: ['Growth', 'Marketplace', 'UX'],
  },
  {
    number: '06',
    title: 'KleverKid',
    category: 'EdTech',
    description: 'Managed product requirements and development for afterschool activities marketplace. Android/iOS apps.',
    year: '2015-2016',
    tags: ['EdTech', 'Marketplace', 'Product Mgmt'],
  },
];

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
      >
        <div className="projects-track">
          {projects.map((project, index) => (
            <div
              key={project.number}
              data-index={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`project-card ${activeIndex === index ? 'active' : ''}`}
            >
              <div className="card-header">
                <span className="project-number">{project.number}</span>
                <span className="project-year">{project.year}</span>
              </div>

              <div className="card-body">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>

              <div className="card-footer">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
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

        .project-card {
          flex-shrink: 0;
          width: 70vw;
          max-width: 600px;
          min-height: 400px;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          padding: var(--space-2xl);
          border: 1px solid var(--glass-border);
          background: var(--bg-secondary);
          transition: all 0.4s var(--ease-out-expo);
        }

        .project-card:hover,
        .project-card.active {
          border-color: var(--accent);
          background: linear-gradient(
            135deg,
            rgba(232, 197, 71, 0.03),
            transparent
          );
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--space-2xl);
        }

        .project-number {
          font-family: var(--font-mono);
          font-size: 3rem;
          font-weight: 700;
          color: var(--accent);
          line-height: 1;
        }

        .project-year {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--text-muted);
        }

        .card-body {
          flex: 1;
        }

        .project-category {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: var(--space-sm);
          display: block;
        }

        .project-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-md);
        }

        .project-description {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .card-footer {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          margin-top: var(--space-xl);
          padding-top: var(--space-xl);
          border-top: 1px solid var(--glass-border);
        }

        .tag {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: var(--space-xs) var(--space-sm);
          border: 1px solid var(--glass-border);
        }

        @media (max-width: 768px) {
          .project-card {
            width: 85vw;
            min-height: 350px;
            padding: var(--space-xl);
          }

          .projects-track {
            padding-left: var(--space-md);
          }
        }
      `}</style>
    </section>
  );
}
