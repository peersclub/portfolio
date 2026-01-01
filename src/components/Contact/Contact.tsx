'use client';

import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const phone = "9535710101";
  const email = "sureshthejosephite@gmail.com";
  const whatsappLink = `https://wa.me/91${phone}`;
  const phoneLink = `tel:+91${phone}`;
  const emailLink = `mailto:${email}`;

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
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className={`contact-content ${isVisible ? 'visible' : ''}`}>
          <span className="label">Get In Touch</span>
          <h2>Let&apos;s build<br />something<br /><span className="golden-text">together</span></h2>

          {/* Availability Status */}
          <div className="availability-status">
            <span className="status-dot" />
            <span className="status-text">Available for new projects</span>
          </div>

          {/* Contact Buttons */}
          <div className="contact-buttons">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-btn whatsapp">
              <MessageCircle size={22} />
              <span>WhatsApp</span>
            </a>
            <a href={phoneLink} className="contact-btn phone">
              <Phone size={22} />
              <span>Call Me</span>
            </a>
            <a href={emailLink} className="contact-btn email">
              <Mail size={22} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact {
          background: var(--bg-secondary);
          min-height: auto;
          padding: var(--space-5xl) 0;
        }

        .contact-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s var(--ease-out-expo);
        }

        .contact-content.visible {
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

        h2 {
          font-size: clamp(2rem, 5vw, 3rem);
          line-height: 1.15;
          margin-bottom: var(--space-lg);
        }
        
        .availability-status {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-3xl);
          padding: var(--space-sm) var(--space-md);
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: var(--radius-full);
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse-green 2s infinite;
        }
        
        .status-text {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #22c55e;
        }
        
        @keyframes pulse-green {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
          }
        }

        .contact-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-md);
          justify-content: center;
          margin-bottom: var(--space-2xl);
        }

        .contact-btn {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-md) var(--space-xl);
          border-radius: var(--radius-full);
          border: 1px solid var(--glass-border);
          background: var(--bg-tertiary);
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s var(--ease-out-expo);
        }

        .contact-btn:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .contact-btn.whatsapp:hover {
          border-color: #25D366;
          background: rgba(37, 211, 102, 0.1);
        }

        .contact-btn.whatsapp :global(svg) {
          color: #25D366;
        }

        .contact-btn.phone:hover {
          border-color: var(--accent);
          background: rgba(232, 197, 71, 0.1);
        }

        .contact-btn.phone :global(svg) {
          color: var(--accent);
        }

        .contact-btn.email:hover {
          border-color: #EA4335;
          background: rgba(234, 67, 53, 0.1);
        }

        .contact-btn.email :global(svg) {
          color: #EA4335;
        }

        .contact-info-text {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        @media (max-width: 640px) {
          .contact-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .contact-btn {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
