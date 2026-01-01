'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  images: ProjectImage[];
  link?: string;
  github?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  size?: 'large' | 'medium' | 'small';
  index: number;
}

export default function ProjectCard({ project, size = 'medium', index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const heroImage = project.images[0];
  const hasMultipleImages = project.images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <>
      <article
        className={`project-card size-${size}`}
        style={{ animationDelay: `${index * 0.1}s` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowLightbox(true)}
      >
        <div className="project-image-container">
          {heroImage && heroImage.src ? (
            <Image
              src={heroImage.src}
              alt={heroImage.alt || project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`project-image ${isHovered ? 'zoomed' : ''}`}
            />
          ) : (
            <div className="project-image-placeholder">
              <Camera size={32} strokeWidth={1.5} />
              <span>Add your project image</span>
            </div>
          )}

          {/* Image count indicator */}
          {hasMultipleImages && (
            <div className="image-count">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              {project.images.length}
            </div>
          )}

          {/* Hover overlay */}
          <div className={`project-overlay ${isHovered ? 'visible' : ''}`}>
            <div className="overlay-content">
              <span className="project-category">{project.category}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              <div className="project-actions">
                <button className="action-btn view-btn">
                  View Gallery
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Lightbox Modal for Photo Gallery */}
      {showLightbox && (
        <div className="lightbox" onClick={() => setShowLightbox(false)}>
          <button className="lightbox-close" onClick={() => setShowLightbox(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-main">
              {project.images[currentImageIndex] && project.images[currentImageIndex].src ? (
                <Image
                  src={project.images[currentImageIndex].src}
                  alt={project.images[currentImageIndex].alt || project.title}
                  fill
                  className="lightbox-image"
                  sizes="90vw"
                />
              ) : (
                <div className="lightbox-placeholder">No image available</div>
              )}

              {hasMultipleImages && (
                <>
                  <button className="lightbox-nav prev" onClick={prevImage}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button className="lightbox-nav next" onClick={nextImage}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            <div className="lightbox-info">
              <h3>{project.title}</h3>
              <p>{project.longDescription || project.description}</p>

              <div className="lightbox-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              {hasMultipleImages && (
                <div className="lightbox-thumbnails">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(idx)}
                    >
                      {img.src ? (
                        <Image src={img.src} alt={img.alt || ''} fill sizes="80px" />
                      ) : (
                        <div className="thumbnail-placeholder"><Camera size={16} /></div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="lightbox-links">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    View Live
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {hasMultipleImages && (
            <div className="lightbox-counter">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .project-card {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          cursor: pointer;
          animation: scaleIn var(--duration-slow) var(--ease-out-expo) forwards;
          opacity: 0;
        }

        .size-large {
          grid-column: span 2;
          grid-row: span 2;
        }

        .size-medium {
          grid-column: span 1;
          grid-row: span 1;
        }

        .size-small {
          grid-column: span 1;
          grid-row: span 1;
        }

        .project-image-container {
          position: relative;
          width: 100%;
          padding-bottom: 75%;
          background: var(--bg-tertiary);
        }

        .size-large .project-image-container {
          padding-bottom: 100%;
        }

        :global(.project-image) {
          object-fit: cover;
          transition: transform 0.6s var(--ease-out-expo);
        }

        :global(.project-image.zoomed) {
          transform: scale(1.08);
        }

        .project-image-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .project-image-placeholder span:first-child {
          font-size: 2rem;
        }

        .image-count {
          position: absolute;
          top: var(--space-md);
          right: var(--space-md);
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-xs) var(--space-sm);
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          color: white;
          z-index: 2;
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
          display: flex;
          align-items: flex-end;
          padding: var(--space-lg);
          opacity: 0;
          transition: opacity 0.4s var(--ease-out-expo);
        }

        .project-overlay.visible {
          opacity: 1;
        }

        .overlay-content {
          transform: translateY(20px);
          transition: transform 0.4s var(--ease-out-expo);
        }

        .project-overlay.visible .overlay-content {
          transform: translateY(0);
        }

        .project-category {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent);
          margin-bottom: var(--space-xs);
          display: block;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin-bottom: var(--space-sm);
        }

        .project-description {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
          margin-bottom: var(--space-md);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-tags {
          display: flex;
          gap: var(--space-xs);
          flex-wrap: wrap;
          margin-bottom: var(--space-md);
        }

        .tag {
          padding: var(--space-xs) var(--space-sm);
          background: rgba(255,255,255,0.1);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          color: rgba(255,255,255,0.8);
        }

        .project-actions {
          display: flex;
          gap: var(--space-sm);
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-sm) var(--space-md);
          background: var(--accent);
          border: none;
          border-radius: var(--radius-full);
          font-size: 0.8125rem;
          font-weight: 500;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }

        /* Lightbox Styles */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          z-index: var(--z-modal);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-xl);
          animation: fadeIn 0.3s ease-out;
        }

        .lightbox-close {
          position: absolute;
          top: var(--space-lg);
          right: var(--space-lg);
          background: rgba(255,255,255,0.1);
          border: none;
          padding: var(--space-sm);
          border-radius: var(--radius-full);
          color: white;
          cursor: pointer;
          transition: background 0.2s;
          z-index: 10;
        }

        .lightbox-close:hover {
          background: rgba(255,255,255,0.2);
        }

        .lightbox-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: var(--space-xl);
          max-width: 1400px;
          max-height: 90vh;
          width: 100%;
        }

        .lightbox-main {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-tertiary);
          min-height: 400px;
        }

        :global(.lightbox-image) {
          object-fit: contain !important;
        }

        .lightbox-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.1);
          border: none;
          padding: var(--space-md);
          border-radius: var(--radius-full);
          color: white;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 5;
        }

        .lightbox-nav:hover {
          background: var(--accent);
        }

        .lightbox-nav.prev {
          left: var(--space-md);
        }

        .lightbox-nav.next {
          right: var(--space-md);
        }

        .lightbox-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          color: white;
          overflow-y: auto;
        }

        .lightbox-info h3 {
          font-size: 1.75rem;
        }

        .lightbox-info p {
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
        }

        .lightbox-tags {
          display: flex;
          gap: var(--space-sm);
          flex-wrap: wrap;
        }

        .lightbox-thumbnails {
          display: flex;
          gap: var(--space-sm);
          overflow-x: auto;
          padding: var(--space-sm) 0;
        }

        .thumbnail {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          flex-shrink: 0;
          background: var(--bg-tertiary);
          padding: 0;
        }

        .thumbnail.active {
          border-color: var(--accent);
        }

        .thumbnail :global(img) {
          object-fit: cover;
        }

        .thumbnail-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .lightbox-links {
          display: flex;
          gap: var(--space-md);
          margin-top: auto;
        }

        .lightbox-counter {
          position: absolute;
          bottom: var(--space-lg);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.6);
          padding: var(--space-xs) var(--space-md);
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          color: white;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 968px) {
          .lightbox-content {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr auto;
          }

          .lightbox-main {
            min-height: 300px;
          }
        }

        @media (max-width: 640px) {
          .size-large {
            grid-column: span 1;
            grid-row: span 1;
          }
        }
      `}</style>
    </>
  );
}
