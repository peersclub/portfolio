'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Work', href: '/#projects' },
  { label: 'Resume', href: '/resume' },
  { label: 'My Life', href: '/mylife' },
  { label: 'Playbook', href: '/playbook' },
  { label: 'The Right Fit', href: '/therightfit' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state for background
      setIsScrolled(currentScrollY > 50);

      // Smart hide/reveal
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
          // Scrolling down - hide
          setIsHidden(true);
        } else if (lastScrollY.current - currentScrollY > 5) {
          // Scrolling up - show
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;

      if (window.location.pathname === '/' && window.location.hash) {
        setActiveSection(window.location.hash.slice(1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (!href.startsWith('#') && !href.startsWith('/#')) return;

    e.preventDefault();
    const targetId = href.includes('#') ? href.split('#')[1] : href.slice(1);
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (href.startsWith('/')) {
      window.location.href = href;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="/" className="nav-logo">
            <Sparkles className="logo-icon" size={22} strokeWidth={2.5} />
          </a>

          {/* Desktop Links */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                onClick={(e) => handleNavClick(link.href, e)}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {hoveredLink === link.href && (
                  <motion.div
                    className="hover-bg"
                    layoutId="navHover"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {pathname === link.href && !hoveredLink && (
                  <motion.div
                    className="active-indicator"
                    layoutId="navActive"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            ))}
          </div>

          <button
            className={`mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="mobile-menu-content">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    className="group flex items-center gap-4 text-3xl sm:text-5xl font-[var(--font-heading)] font-extrabold uppercase tracking-tight text-[var(--text-primary)] p-4 rounded-xl transition-all relative overflow-hidden"
                  >
                    {/* Hover Indicator Line */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[var(--accent)] rounded-full transition-all duration-300 group-hover:h-6" />

                    <span className="relative z-10 group-hover:translate-x-4 transition-transform duration-300 group-hover:text-[var(--accent)]">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
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
          /* ALWAYS BLURRED */
          background: var(--bg-glass);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border-bottom: 1px solid var(--glass-border);
        }

        /* Header ALWAYS stays visible - no hide on scroll */

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

        .nav-logo {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-gradient);
          border-radius: 12px;
          transition: all 0.3s var(--ease-out-expo);
          z-index: 200;
          box-shadow: 0 2px 8px rgba(232, 197, 71, 0.2);
        }

        .nav-logo:hover {
          transform: scale(1.08) rotate(5deg);
          box-shadow: 0 4px 20px rgba(232, 197, 71, 0.4);
        }

        .logo-icon {
          color: white;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
        }

        .nav-links {
          display: flex;
          gap: 4px;
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          padding: 4px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .nav-link {
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

        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.08);
        }
        
        .nav-link.active {
          color: var(--accent);
          background: rgba(232, 197, 71, 0.1);
        }

        /* Framer Motion Backgrounds */
        .navigation :global(.hover-bg) {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.08);
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
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          cursor: pointer;
          z-index: 200;
          transition: all 0.2s ease;
        }
        
        .mobile-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
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

        .mobile-menu {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 85%;
            max-width: 360px;
            background: rgba(15, 15, 18, 0.95);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border-left: 1px solid rgba(255, 255, 255, 0.08);
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
