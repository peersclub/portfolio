'use client';

import { useEffect, useState } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
}

export default function Particles() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Generate initial particles
        const initialParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.1,
            speedY: (Math.random() - 0.5) * 0.1,
            opacity: Math.random() * 0.5 + 0.2,
        }));
        setParticles(initialParticles);

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const interval = setInterval(() => {
            setParticles((prev) =>
                prev.map((p) => ({
                    ...p,
                    x: (p.x + p.speedX + 100) % 100,
                    y: (p.y + p.speedY + 100) % 100,
                }))
            );
        }, 50);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="particles-container">
            {particles.map((particle) => {
                // Calculate distance from mouse for repel effect
                const dx = particle.x - mousePos.x;
                const dy = particle.y - mousePos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const repelRadius = 15;
                const repelStrength = distance < repelRadius ? (repelRadius - distance) / repelRadius : 0;
                const offsetX = repelStrength * dx * 0.5;
                const offsetY = repelStrength * dy * 0.5;

                return (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: `${particle.x + offsetX}%`,
                            top: `${particle.y + offsetY}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            opacity: particle.opacity,
                        }}
                    />
                );
            })}

            <style jsx>{`
        .particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .particle {
          position: absolute;
          background: var(--particle-color);
          border-radius: 50%;
          filter: blur(1px);
          transition: left 0.3s ease-out, top 0.3s ease-out;
          box-shadow: 0 0 10px var(--particle-color);
        }
      `}</style>
        </div>
    );
}
