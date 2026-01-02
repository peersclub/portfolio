'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';

interface KineticTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function KineticText({ text, className = '', delay = 0 }: KineticTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [glitchActive, setGlitchActive] = useState(true);
    const controls = useAnimation();

    const characters = text.split('');

    // Mouse position for magnetic effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Glitch effect on mount
    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 150);
        }, 100);

        // Stop glitching after initial animation
        const stopTimer = setTimeout(() => {
            clearInterval(glitchInterval);
            setGlitchActive(false);
        }, 800 + delay);

        return () => {
            clearInterval(glitchInterval);
            clearTimeout(stopTimer);
        };
    }, [delay]);

    // Track mouse for magnetic effect
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }, [mouseX, mouseY]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // Character animation variants
    const charVariants = {
        hidden: {
            opacity: 0,
            y: 100,
            rotateX: -90,
            filter: 'blur(20px)',
        },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            transition: {
                delay: delay / 1000 + i * 0.08,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    };

    return (
        <div
            ref={containerRef}
            className={`kinetic-text-container ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="kinetic-text">
                {characters.map((char, index) => (
                    <KineticChar
                        key={index}
                        char={char}
                        index={index}
                        variants={charVariants}
                        glitchActive={glitchActive}
                        isHovered={isHovered}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        containerRef={containerRef}
                    />
                ))}
            </div>

            <style jsx>{`
                .kinetic-text-container {
                    display: inline-block;
                    perspective: 1000px;
                }

                .kinetic-text {
                    display: flex;
                    gap: 0.02em;
                }
            `}</style>
        </div>
    );
}

// Individual character with magnetic effect
function KineticChar({
    char,
    index,
    variants,
    glitchActive,
    isHovered,
    mouseX,
    mouseY,
    containerRef,
}: {
    char: string;
    index: number;
    variants: any;
    glitchActive: boolean;
    isHovered: boolean;
    mouseX: any;
    mouseY: any;
    containerRef: React.RefObject<HTMLDivElement | null>;
}) {
    const charRef = useRef<HTMLSpanElement>(null);
    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });
    const scale = useSpring(1, { stiffness: 300, damping: 20 });

    // Magnetic pull effect
    useEffect(() => {
        if (!isHovered || !charRef.current || !containerRef.current) {
            x.set(0);
            y.set(0);
            scale.set(1);
            return;
        }

        const updatePosition = () => {
            if (!charRef.current) return;

            const charRect = charRef.current.getBoundingClientRect();
            const containerRect = containerRef.current?.getBoundingClientRect();
            if (!containerRect) return;

            const charCenterX = charRect.left - containerRect.left + charRect.width / 2;
            const charCenterY = charRect.top - containerRect.top + charRect.height / 2;

            const deltaX = mouseX.get() - charCenterX;
            const deltaY = mouseY.get() - charCenterY;
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

            // Only apply magnetic effect within 100px
            if (distance < 100) {
                const force = (100 - distance) / 100;
                x.set(deltaX * force * 0.3);
                y.set(deltaY * force * 0.3);
                scale.set(1 + force * 0.1);
            } else {
                x.set(0);
                y.set(0);
                scale.set(1);
            }
        };

        const interval = setInterval(updatePosition, 16);
        return () => clearInterval(interval);
    }, [isHovered, mouseX, mouseY, x, y, scale, containerRef]);

    // Random glitch offset
    const glitchOffset = glitchActive ? {
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 5,
    } : { x: 0, y: 0 };

    return (
        <motion.span
            ref={charRef}
            className="kinetic-char"
            custom={index}
            variants={variants}
            initial="hidden"
            animate="visible"
            style={{
                x,
                y,
                scale,
                display: 'inline-block',
                position: 'relative',
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Main character */}
            <span
                className="char-main"
                style={{
                    transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
                }}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>

            {/* Glitch layers */}
            {glitchActive && (
                <>
                    <span
                        className="char-glitch cyan"
                        style={{
                            transform: `translate(${-glitchOffset.x * 2}px, ${glitchOffset.y}px)`,
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    <span
                        className="char-glitch magenta"
                        style={{
                            transform: `translate(${glitchOffset.x * 2}px, ${-glitchOffset.y}px)`,
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                </>
            )}

            <style jsx>{`
                .kinetic-char {
                    position: relative;
                    cursor: default;
                }

                .char-main {
                    display: inline-block;
                    transition: transform 0.05s;
                }

                .char-glitch {
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0.7;
                    pointer-events: none;
                }

                .char-glitch.cyan {
                    color: #00F0FF;
                    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
                }

                .char-glitch.magenta {
                    color: #FF0055;
                    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
                }
            `}</style>
        </motion.span>
    );
}
