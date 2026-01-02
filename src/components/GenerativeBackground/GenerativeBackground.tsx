'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
    count?: number;
    mousePosition: React.MutableRefObject<{ x: number; y: number }>;
    scrollProgress: React.MutableRefObject<number>;
}

function ParticleField({ count = 2000, mousePosition, scrollProgress }: ParticleFieldProps) {
    const meshRef = useRef<THREE.Points>(null);
    const { viewport } = useThree();

    // Generate particle positions
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const speeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Spread particles across the viewport
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;

            // Gold-ish colors with variation
            const brightness = 0.3 + Math.random() * 0.7;
            colors[i * 3] = 0.91 * brightness; // R (gold)
            colors[i * 3 + 1] = 0.77 * brightness; // G
            colors[i * 3 + 2] = 0.28 * brightness; // B

            sizes[i] = Math.random() * 2 + 0.5;
            speeds[i] = Math.random() * 0.5 + 0.1;
        }

        return { positions, colors, sizes, speeds };
    }, [count]);

    // Animation loop
    useFrame((state) => {
        if (!meshRef.current) return;

        const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Subtle floating motion
            positions[i3 + 1] += Math.sin(time * particles.speeds[i] + i) * 0.002;

            // React to mouse position (normalized -1 to 1)
            const mouseInfluence = 0.3;
            const distanceX = positions[i3] - mousePosition.current.x * viewport.width * 0.5;
            const distanceY = positions[i3 + 1] - mousePosition.current.y * viewport.height * 0.5;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < 3) {
                const pushStrength = (3 - distance) * 0.01;
                positions[i3] += (distanceX / distance) * pushStrength * mouseInfluence;
                positions[i3 + 1] += (distanceY / distance) * pushStrength * mouseInfluence;
            }

            // React to scroll (subtle vertical shift)
            positions[i3 + 1] -= scrollProgress.current * 0.001;
        }

        meshRef.current.geometry.attributes.position.needsUpdate = true;
        meshRef.current.rotation.z = time * 0.02;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles.positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[particles.colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={1.5}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function GenerativeBackground() {
    const mousePosition = useRef({ x: 0, y: 0 });
    const scrollProgress = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePosition.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            };
        };

        const handleScroll = () => {
            scrollProgress.current = window.scrollY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.4,
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]}
                style={{ background: 'transparent' }}
            >
                <ParticleField
                    count={1500}
                    mousePosition={mousePosition}
                    scrollProgress={scrollProgress}
                />
            </Canvas>
        </div>
    );
}
