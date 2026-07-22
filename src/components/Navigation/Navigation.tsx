'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { NAV_LINKS as navLinks } from '@/data/navigation';

const MotionLink = motion(Link);

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Hide nav on scroll-down, reveal on scroll-up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
          setIsHidden(true);
        } else if (lastScrollY.current - currentScrollY > 5) {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mirror hidden state to <html> so sticky elements (via --subnav-top) can
  // hug the viewport top while the nav is away. Centrally consumed in tokens.css.
  useEffect(() => {
    document.documentElement.setAttribute('data-nav-hidden', String(isHidden));
    return () => document.documentElement.removeAttribute('data-nav-hidden');
  }, [isHidden]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <nav className={`navigation ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden-nav' : ''}`}>
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            <Sparkles className="logo-icon" size={22} strokeWidth={2.5} />
          </Link>

          {/* Desktop Links */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                aria-current={pathname === link.href ? 'page' : undefined}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {hoveredLink === link.href && (
                  <motion.div
                    className="hover-bg"
                    layoutId="navHover"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {pathname === link.href && !hoveredLink && (
                  <motion.div
                    className="active-indicator"
                    layoutId="navActive"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <button
            className={`mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop — tap to close */}
              <motion.div
                className="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                className="mobile-menu"
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
              >
                <div className="mobile-menu-content">
                  {navLinks.map((link, index) => (
                    <MotionLink
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                      className="group flex items-center gap-4 text-3xl sm:text-5xl font-[var(--font-heading)] font-extrabold uppercase tracking-tight text-[var(--text-primary)] p-4 rounded-xl transition-all relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[var(--accent)] rounded-full transition-all duration-300 group-hover:h-6" />
                      <span className="relative z-10 group-hover:translate-x-4 transition-transform duration-300 group-hover:text-[var(--accent)]">
                        {link.label}
                      </span>
                    </MotionLink>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <style jsx>{`
        .navigation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-fixed);
          padding: var(--space-md) var(--space-xl);
          transition: all 0.3s var(--ease-out-expo);
          background: transparent;
          border-bottom: none;
        }

        .navigation.hidden-nav {
          transform: translateY(-100%);
          pointer-events: none;
        }

        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent);
          transform-origin: 0%;
          z-index: calc(var(--z-fixed) + 1);
        }

        .navigation.scrolled {
          /* Slightly tighter padding on scroll */
          padding: var(--space-sm) var(--space-xl);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navigation :global(.nav-logo) {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-gradient);
          border-radius: 12px;
          transition: all 0.3s var(--ease-out-expo);
          z-index: 200;
          box-shadow: 0 2px 8px var(--accent-subtle);
        }

        .navigation :global(.nav-logo:hover) {
          transform: scale(1.08) rotate(5deg);
          box-shadow: 0 4px 20px var(--accent-border);
        }

        .navigation :global(.logo-icon) {
          color: white;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
        }

        .nav-links {
          display: flex;
          gap: 4px;
          position: relative;
          background: var(--surface-primary);
          padding: 4px;
          border-radius: 100px;
          border: 1px solid var(--line-subtle);
        }

        .nav-links :global(.nav-link) {
          position: relative;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: var(--text-muted);
          padding: 10px 16px;
          border-radius: 100px;
          transition: all 0.25s ease;
          isolation: isolate;
        }

        .nav-links :global(.nav-link:hover) {
          color: var(--text-primary);
          background: var(--line-subtle);
        }

        .nav-links :global(.nav-link.active) {
          color: var(--accent);
          background: var(--accent-subtle);
        }

        /* Framer Motion Backgrounds */
        .navigation :global(.hover-bg) {
          position: absolute;
          inset: 0;
          background: var(--line-subtle);
          border-radius: 100px;
          z-index: -1;
        }

        .navigation :global(.active-indicator) {
            position: absolute;
            bottom: 6px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 3px;
            background: var(--accent);
            border-radius: 2px;
            z-index: -1;
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 10px;
          background: var(--surface-primary);
          border: 1px solid var(--line-subtle);
          border-radius: 10px;
          cursor: pointer;
          z-index: 200;
          transition: all 0.2s ease;
        }

        .mobile-toggle:hover {
          background: var(--line-subtle);
        }

        .mobile-toggle span {
          width: 20px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all 0.3s var(--ease-out-expo);
        }

        .mobile-toggle.open span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .mobile-toggle.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-toggle.open span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        .navigation :global(.mobile-backdrop) {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 140;
        }

        .navigation :global(.mobile-menu) {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 85%;
            max-width: 360px;
            background: var(--surface-overlay);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border-left: 1px solid var(--line-subtle);
            z-index: 150;
            display: flex;
            flex-direction: column;
            box-shadow: -20px 0 60px rgba(0, 0, 0, 0.5);
        }

        .mobile-menu-content {
            padding: 120px 32px 40px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        @media (max-width: 768px) {
          .navigation {
            padding: var(--space-md);
          }

          .navigation.scrolled {
            padding: var(--space-sm) var(--space-md);
          }

          .mobile-toggle {
            display: flex;
          }

          .nav-links {
            display: none;
          }
        }
      `}</style>
      </nav>
    </>
  );
}
