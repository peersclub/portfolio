'use client';

import { useRef, useState, useEffect } from 'react';

interface MagneticTextProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}

export default function MagneticText({ children, className = '', strength = 0.3 }: MagneticTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            // Only apply magnetic effect when mouse is within range
            const maxDistance = 150;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < maxDistance) {
                const factor = (maxDistance - distance) / maxDistance;
                setPosition({
                    x: distanceX * strength * factor,
                    y: distanceY * strength * factor,
                });
            } else {
                setPosition({ x: 0, y: 0 });
            }
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return (
        <div
            ref={ref}
            className={`magnetic-text ${className}`}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: 'transform 0.2s cubic-bezier(0.19, 1, 0.22, 1)',
            }}
        >
            {children}
        </div>
    );
}
