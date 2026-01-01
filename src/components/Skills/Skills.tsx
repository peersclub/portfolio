'use client';

import { useEffect, useRef, useState } from 'react';

const skills = [
  { name: 'Product Strategy', level: 95, color: '#8B5CF6' },
  { name: 'Team Leadership', level: 92, color: '#EC4899' },
  { name: 'User Experience', level: 90, color: '#06B6D4' },
  { name: 'Data Analytics', level: 85, color: '#10B981' },
  { name: 'AI/ML Products', level: 80, color: '#F59E0B' },
  { name: 'Full Stack Dev', level: 75, color: '#3B82F6' },
];

const technologies = [
  'Product Management', 'Roadmapping', 'User Research', 'A/B Testing',
  'Agile/Scrum', 'Analytics', 'Figma', 'Flutter', 'Rust', 'Claude AI',
  'OpenAI GPT', 'Mobile Apps', 'Web Platforms', 'SaaS', 'Fintech',
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <span className="section-title">Skills & Expertise</span>
          <h2>
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
        </div>

        <div className="skills-content">
          <div className={`skill-bars ${isVisible ? 'visible' : ''}`}>
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{
                      width: isVisible ? `${skill.level}%` : '0%',
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                      transitionDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="skill-glow" style={{ background: skill.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`tech-cloud ${isVisible ? 'visible' : ''}`}>
            <div className="marquee">
              <div className="marquee-content">
                {[...technologies, ...technologies].map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="marquee reverse">
              <div className="marquee-content">
                {[...technologies.reverse(), ...technologies].map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .skills {
          background: var(--bg-secondary);
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--space-3xl);
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s var(--ease-out-expo);
        }

        .section-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .skills-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-4xl);
        }

        .skill-bars {
          max-width: 700px;
          margin: 0 auto;
          width: 100%;
        }

        .skill-bars.visible .skill-item {
          animation: slideUp 0.6s var(--ease-out-expo) forwards;
        }

        .skill-item {
          margin-bottom: var(--space-lg);
          opacity: 0;
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--space-sm);
        }

        .skill-name {
          font-weight: 500;
          color: var(--text-primary);
        }

        .skill-level {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .skill-bar {
          height: 8px;
          background: var(--bg-glass);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .skill-progress {
          height: 100%;
          border-radius: var(--radius-full);
          position: relative;
          transition: width 1s var(--ease-out-expo);
        }

        .skill-glow {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.6;
        }

        .tech-cloud {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          opacity: 0;
          transition: opacity 0.6s var(--ease-out-expo) 0.4s;
        }

        .tech-cloud.visible {
          opacity: 1;
        }

        .marquee {
          display: flex;
          margin-bottom: var(--space-md);
        }

        .marquee-content {
          display: flex;
          gap: var(--space-md);
          animation: marquee 30s linear infinite;
        }

        .marquee.reverse .marquee-content {
          animation-direction: reverse;
        }

        .tech-tag {
          padding: var(--space-sm) var(--space-lg);
          background: var(--bg-glass);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          color: var(--text-secondary);
          white-space: nowrap;
          transition: all 0.3s;
        }

        .tech-tag:hover {
          background: var(--accent-light);
          border-color: var(--accent);
          color: var(--text-primary);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
