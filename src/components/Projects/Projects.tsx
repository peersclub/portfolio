'use client';

import { useEffect, useRef, useState } from 'react';
import ProjectCard, { Project } from './ProjectCard';

// Suresh Victor's Projects - Add your project images to /public/images/
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Assetworks AI',
    description: 'AI-powered financial analytics platform enabling users to create sophisticated investment widgets through natural language queries.',
    longDescription: 'Co-founded and led AssetWorks, an AI-powered financial analytics platform. Built full-stack SaaS product integrating Claude AI and OpenAI GPT with Rust backend and Flutter mobile apps. Users can create investment widgets using simple natural language.',
    category: 'AI & Fintech',
    tags: ['Claude AI', 'OpenAI GPT', 'Rust', 'Flutter', 'SaaS'],
    images: [
      { src: '', alt: 'Assetworks AI Dashboard' },
      { src: '', alt: 'Natural Language Query Interface' },
    ],
    link: '#',
    featured: true,
  },
  {
    id: '2',
    title: 'CoinDCX',
    description: 'Led product development for India\'s largest crypto exchange with multiple products including DCXInsta, DCXTrade, DCXMargin, and DCXFutures.',
    longDescription: 'Leading the overall product of CoinDCX with multiple products like DCXInsta, DCXTrade, DCXMargin, DCXFutures on both mobile App and desktop web. Built a team of 3 product managers and closely involved in all leadership discussions.',
    category: 'Crypto Exchange',
    tags: ['Product Strategy', 'Mobile App', 'Web Platform', 'Fintech'],
    images: [
      { src: '', alt: 'CoinDCX Trading Platform' },
    ],
    link: 'https://coindcx.com',
  },
  {
    id: '3',
    title: 'CaptainFresh',
    description: 'Built first-in-industry products for a century-old seafood industry, leading product from scratch.',
    longDescription: 'Led the overall product of CaptainFresh, building the product and product team from scratch. Created first-in-the-industry products for a century-old industry, playing an active part in the long-term roadmap.',
    category: 'Supply Chain Tech',
    tags: ['B2B Platform', 'Supply Chain', 'Mobile Apps', 'Operations'],
    images: [
      { src: '', alt: 'CaptainFresh Platform' },
    ],
  },
  {
    id: '4',
    title: 'Cox & Kings',
    description: 'Building first personalized experience in travel tech as SVP Product and Tech.',
    category: 'Travel Tech',
    tags: ['Personalization', 'Travel', 'Team Building', 'Strategy'],
    images: [
      { src: '', alt: 'Cox & Kings Experience' },
    ],
  },
  {
    id: '5',
    title: 'Babychakra',
    description: 'Increased retention by 42% and stickiness by 21%. Built product marketplace and revamped web platform.',
    longDescription: 'Babychakra as a product includes Web (Mobile and Desktop), Android App and iOS app. Retention and Stickiness of Babychakra app users has increased by at least 42% and 21% respectively in 8 months. Web platform was completely revamped for a better user experience.',
    category: 'Parenting Platform',
    tags: ['Consumer App', 'Marketplace', 'Retention', 'Growth'],
    images: [
      { src: '', alt: 'Babychakra App' },
    ],
  },
  {
    id: '6',
    title: 'KleverKid',
    description: 'Managed product requirements and development for an afterschool activities marketplace for kids.',
    longDescription: 'Managed product feature requirements, timeline, and development team. Involved in full product life cycle, scalability, and performance. Managed KleverKid Android and iOS app requirements. Designed wireframes and product flows.',
    category: 'EdTech Marketplace',
    tags: ['EdTech', 'Marketplace', 'Mobile Apps', 'Product Mgmt'],
    images: [
      { src: '', alt: 'KleverKid Platform' },
    ],
    link: '#',
  },
];

export default function Projects() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <span className="section-title">Selected Works</span>
          <h2>
            Projects I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="section-subtitle">
            A collection of work that showcases my passion for creating beautiful,
            functional digital experiences.
          </p>
        </div>

        <div className={`bento-grid ${isVisible ? 'visible' : ''}`}>
          {sampleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              size={index === 0 ? 'large' : 'medium'}
              index={index}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .projects {
          background: var(--bg-primary);
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

        .section-header h2 {
          margin-bottom: var(--space-md);
        }

        .section-subtitle {
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: minmax(250px, auto);
          gap: var(--space-lg);
          opacity: 0;
          transition: opacity 0.6s var(--ease-out-expo) 0.2s;
        }

        .bento-grid.visible {
          opacity: 1;
        }

        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
