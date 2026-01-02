'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
}

interface Ripple {
    id: number;
    x: number;
    y: number;
}

export default function EnhancedCursor() {
    const [isVisible, setIsVisible] = useState(true); // Default to true
    const [isPointer, setIsPointer] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const [mounted, setMounted] = useState(false);

    // Initial off-screen position to avoid flash, but we'll update immediately on mount/move
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    // Outer ring (slower follow)
    const ringConfig = { damping: 35, stiffness: 180, mass: 0.8 };
    const ringX = useSpring(cursorX, ringConfig);
    const ringY = useSpring(cursorY, ringConfig);

    const particleIdRef = useRef(0);
    const rippleIdRef = useRef(0);
    const lastPositionRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);
    const pendingUpdateRef = useRef<{ x: number; y: number; isPointer: boolean } | null>(null);

    useEffect(() => {
        setMounted(true);
        // Force visible on mount in case logic prevents it
        setIsVisible(true);
    }, []);

    // Throttled RAF update
    const scheduleUpdate = useCallback(() => {
        if (rafRef.current) return;

        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;
            if (pendingUpdateRef.current) {
                const { x, y, isPointer: pointer } = pendingUpdateRef.current;

                // IMPORTANT: Directly setting state if it was hidden
                if (!isVisible) setIsVisible(true);

                cursorX.set(x);
                cursorY.set(y);
                setIsPointer(pointer);
                pendingUpdateRef.current = null;
            }
        });
    }, [cursorX, cursorY, isVisible]);

    // Mouse move handler
    const handleMouseMove = useCallback((e: MouseEvent) => {
        // Double check visibility
        if (!isVisible) setIsVisible(true);

        // Check if hovering on interactive element
        const target = e.target as HTMLElement;
        const isInteractive =
            target.tagName === 'A' ||
            target.tagName === 'BUTTON' ||
            target.closest('a') !== null ||
            target.closest('button') !== null ||
            window.getComputedStyle(target).cursor === 'pointer';

        pendingUpdateRef.current = { x: e.clientX, y: e.clientY, isPointer: isInteractive };
        scheduleUpdate();

        // Spawn particles based on velocity
        const dx = e.clientX - lastPositionRef.current.x;
        const dy = e.clientY - lastPositionRef.current.y;
        const velocity = Math.sqrt(dx * dx + dy * dy);

        if (velocity > 15) {
            const newParticle: Particle = {
                id: particleIdRef.current++,
                x: e.clientX,
                y: e.clientY,
                vx: -dx * 0.08 + (Math.random() - 0.5) * 1.5,
                vy: -dy * 0.08 + (Math.random() - 0.5) * 1.5,
                life: 1,
            };
            setParticles(prev => [...prev.slice(-10), newParticle]);
        }

        lastPositionRef.current = { x: e.clientX, y: e.clientY };
    }, [scheduleUpdate, isVisible]);

    // Click handler for ripples
    const handleClick = useCallback((e: MouseEvent) => {
        const newRipple: Ripple = {
            id: rippleIdRef.current++,
            x: e.clientX,
            y: e.clientY,
        };
        setRipples(prev => [...prev, newRipple]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
        setIsVisible(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsVisible(false);
    }, []);

    // Update particles loop
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev =>
                prev
                    .map(p => ({
                        ...p,
                        x: p.x + p.vx,
                        y: p.y + p.vy + 0.3,
                        vy: p.vy + 0.08,
                        life: p.life - 0.03,
                    }))
                    .filter(p => p.life > 0)
            );
        }, 20);

        return () => clearInterval(interval);
    }, []);

    // Setup event listeners
    useEffect(() => {
        if (!mounted) return;

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('click', handleClick);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            document.removeEventListener('mouseleave', handleMouseLeave);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [mounted, handleMouseMove, handleClick, handleMouseLeave]);

    if (!mounted) {
        return null;
    }

    return (
        <div className="enhanced-cursor-wrapper">
            {/* Particles (Fixed positioning, self-rendered) */}
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="cursor-particle"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        opacity: particle.life,
                        transform: `translate(-50%, -50%) scale(${particle.life})`,
                    }}
                />
            ))}

            {/* Click Ripples */}
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.div
                        key={ripple.id}
                        className="cursor-ripple"
                        initial={{ scale: 0, opacity: 0.6 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Outer Ring Wrapper - Moves with X/Y Spring */}
            <motion.div
                className="cursor-mover"
                style={{
                    x: ringX,
                    y: ringY,
                }}
            >
                {/* Visual Ring - Centered */}
                <div
                    className="cursor-ring-visual"
                    style={{
                        width: isPointer ? 50 : 36,
                        height: isPointer ? 50 : 36,
                        opacity: isVisible ? 0.5 : 0,
                    }}
                />
            </motion.div>

            {/* Inner Dot Wrapper - Moves with SmoothSpring */}
            <motion.div
                className="cursor-mover"
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
            >
                {/* Visual Dot - Centered */}
                <div
                    className="cursor-dot-visual"
                    style={{
                        width: isPointer ? 8 : 10,
                        height: isPointer ? 8 : 10,
                        opacity: isVisible ? 1 : 0,
                    }}
                />
            </motion.div>

            {/* Global cursor override */}
            <style jsx global>{`
                @media (pointer: fine) {
                    * {
                        cursor: none !important;
                    }
                }
            `}</style>

            <style jsx>{`
                .enhanced-cursor-wrapper {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 99999;
                    overflow: hidden; /* Prevent scrollbars from cursor elements? No, allow overflow. */
                }

                .cursor-particle {
                    position: fixed;
                    width: 5px;
                    height: 5px;
                    background: var(--accent);
                    border-radius: 50%;
                    pointer-events: none;
                    will-change: transform, opacity;
                }

                .cursor-ripple {
                    position: fixed;
                    width: 30px;
                    height: 30px;
                    border: 2px solid var(--accent);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                }

                /* Mover Element - strictly for X/Y positioning */
                .cursor-mover {
                    position: fixed;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                    will-change: transform;
                    /* Ensure no dimension issues */
                    width: 0;
                    height: 0;
                }

                /* Visual Element - Handles size, centering, styling */
                .cursor-ring-visual {
                    position: absolute;
                    top: 0;
                    left: 0;
                    border: 1.5px solid var(--accent);
                    border-radius: 50%;
                    transform: translate(-50%, -50%); /* Always centered on the Mover */
                    transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
                }

                .cursor-dot-visual {
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: var(--accent);
                    border-radius: 50%;
                    transform: translate(-50%, -50%); /* Always centered on the Mover */
                    transition: width 0.15s cubic-bezier(0.16, 1, 0.3, 1), height 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
                }
            `}</style>
        </div>
    );
}
