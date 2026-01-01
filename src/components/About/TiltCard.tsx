'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    intensity?: number;
}

export default function TiltCard({ children, className = '', intensity = 10 }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -intensity;
            const rotateY = ((x - centerX) / centerX) * intensity;

            setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
            setGlarePosition({
                x: (x / rect.width) * 100,
                y: (y / rect.height) * 100,
            });
        };

        const handleMouseLeave = () => {
            setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
            setGlarePosition({ x: 50, y: 50 });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [intensity]);

    return (
        <div
            ref={cardRef}
            className={`tilt-card ${className}`}
            style={{ transform, transition: 'transform 0.15s ease-out' }}
        >
            <div
                className="tilt-glare"
                style={{
                    background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                }}
            />
            {children}

            <style jsx>{`
        .tilt-card {
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .tilt-glare {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 2;
          transition: background 0.15s ease-out;
        }
      `}</style>
        </div>
    );
}
