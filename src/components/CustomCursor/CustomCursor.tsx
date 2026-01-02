'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    opacity: number;
    scale: number;
}

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const particleIdRef = useRef(0);
    const lastPosRef = useRef({ x: 0, y: 0 });

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Magnetic effect values
    const magnetX = useMotionValue(0);
    const magnetY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const magnetSpringConfig = { damping: 15, stiffness: 150 };

    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);
    const magnetXSpring = useSpring(magnetX, magnetSpringConfig);
    const magnetYSpring = useSpring(magnetY, magnetSpringConfig);

    // Spawn particles on movement
    const spawnParticle = useCallback((x: number, y: number) => {
        const distance = Math.sqrt(
            Math.pow(x - lastPosRef.current.x, 2) +
            Math.pow(y - lastPosRef.current.y, 2)
        );

        // Only spawn if moved enough distance
        if (distance > 20) {
            const newParticle: Particle = {
                id: particleIdRef.current++,
                x: x + 12,
                y: y + 12,
                opacity: 0.6,
                scale: 1,
            };
            setParticles(prev => [...prev.slice(-12), newParticle]);
            lastPosRef.current = { x, y };
        }
    }, []);

    // Decay particles
    useAnimationFrame(() => {
        setParticles(prev =>
            prev
                .map(p => ({
                    ...p,
                    opacity: p.opacity - 0.03,
                    scale: p.scale * 0.96,
                }))
                .filter(p => p.opacity > 0)
        );
    });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            const x = e.clientX - 16;
            const y = e.clientY - 16;
            cursorX.set(x);
            cursorY.set(y);
            spawnParticle(x, y);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsHovering(true);
        const handleMouseUp = () => setIsHovering(false);

        const handleLinkEnter = (e: Event) => {
            setIsHovering(true);
            const target = e.target as HTMLElement;
            const rect = target.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate magnetic pull toward center
            const pullX = (centerX - cursorX.get() - 16) * 0.3;
            const pullY = (centerY - cursorY.get() - 16) * 0.3;
            magnetX.set(pullX);
            magnetY.set(pullY);
        };

        const handleLinkLeave = () => {
            setIsHovering(false);
            magnetX.set(0);
            magnetY.set(0);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        const attachLinkListeners = () => {
            const links = document.querySelectorAll('a, button, .clickable, .magnetic');
            links.forEach(link => {
                link.removeEventListener('mouseenter', handleLinkEnter);
                link.removeEventListener('mouseleave', handleLinkLeave);
                link.addEventListener('mouseenter', handleLinkEnter);
                link.addEventListener('mouseleave', handleLinkLeave);
            });
        };

        attachLinkListeners();

        const observer = new MutationObserver(attachLinkListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            observer.disconnect();
        };
    }, [cursorX, cursorY, magnetX, magnetY, spawnParticle, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* Particle Trail */}
            {particles.map(particle => (
                <motion.div
                    key={particle.id}
                    className="cursor-particle"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        opacity: particle.opacity,
                        scale: particle.scale,
                    }}
                />
            ))}

            {/* Main Cursor Dot */}
            <motion.div
                className="cursor-dot"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: magnetXSpring,
                    y: magnetYSpring,
                    scale: isHovering ? 1.5 : 1,
                }}
            />

            {/* Cursor Ring */}
            <motion.div
                className="cursor-ring"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: magnetXSpring,
                    y: magnetYSpring,
                    scale: isHovering ? 1.8 : 1,
                }}
            />

            <style jsx global>{`
                body {
                    cursor: none;
                }
                
                @media (hover: none) and (pointer: coarse) {
                    body {
                        cursor: auto;
                    }
                    .cursor-dot, .cursor-ring, .cursor-particle {
                        display: none;
                    }
                }

                .cursor-particle {
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: var(--accent);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9997;
                    mix-blend-mode: difference;
                }

                .cursor-dot {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 8px;
                    height: 8px;
                    background-color: var(--accent);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    mix-blend-mode: difference;
                }

                .cursor-ring {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 32px;
                    height: 32px;
                    border: 1px solid var(--accent);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    mix-blend-mode: difference;
                    transition: width 0.3s, height 0.3s;
                }
            `}</style>
        </>
    );
}

