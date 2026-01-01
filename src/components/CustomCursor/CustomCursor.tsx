'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsHovering(true);
        const handleMouseUp = () => setIsHovering(false);

        const handleLinkHover = () => setIsHovering(true);
        const handleLinkLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        const links = document.querySelectorAll('a, button, .clickable');
        links.forEach(link => {
            link.addEventListener('mouseenter', handleLinkHover);
            link.addEventListener('mouseleave', handleLinkLeave);
        });

        // Re-attach listeners when DOM changes (simple observer could be better but this is a start)
        const observer = new MutationObserver(() => {
            const newLinks = document.querySelectorAll('a, button, .clickable');
            newLinks.forEach(link => {
                link.removeEventListener('mouseenter', handleLinkHover); // cleanup duplicates
                link.addEventListener('mouseenter', handleLinkHover);
                link.addEventListener('mouseleave', handleLinkLeave);
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            links.forEach(link => {
                link.removeEventListener('mouseenter', handleLinkHover);
                link.removeEventListener('mouseleave', handleLinkLeave);
            });
            observer.disconnect();
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                className="cursor-dot"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    scale: isHovering ? 1.5 : 1,
                }}
            />
            <motion.div
                className="cursor-ring"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    scale: isHovering ? 1.5 : 1,
                }}
            />
            <style jsx global>{`
                body {
                    cursor: none; /* Hide default cursor */
                }
                
                /* Fallback for touch devices */
                @media (hover: none) and (pointer: coarse) {
                    body {
                        cursor: auto;
                    }
                    .cursor-dot, .cursor-ring {
                        display: none;
                    }
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
                    transition: width 0.3s, height 0.3s, background-color 0.3s;
                }
            `}</style>
        </>
    );
}
