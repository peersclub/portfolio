'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useState, useRef, useMemo, useEffect } from 'react';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion, AnimatePresence } from 'framer-motion';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

import { useTheme } from 'next-themes';

export default function ParticleHero() {
    const [scanned, setScanned] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const cyan = isDark ? '#00f3ff' : '#0891B2';
    const bg = isDark ? '#020c1b' : '#F2F2F4';

    useEffect(() => {
        // Fallback timer
        const timer = setTimeout(() => setScanned(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleScan = () => {
        setScanned(prev => !prev); // Toggle for testing
    };

    return (
        <section className="h-screen w-full relative bg-primary overflow-hidden cursor-pointer" onClick={handleScan}>
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 2, 4], fov: 60 }}>
                    <ParticleSystem scanned={scanned} color={cyan} />
                    <ambientLight intensity={0.5} />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1} />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* Scan Line Overlay */}
            <AnimatePresence>
                {!scanned && (
                    <motion.div
                        initial={{ top: '-10%' }}
                        animate={{ top: '120%' }}
                        transition={{ duration: 3, ease: 'linear', delay: 1 }}
                        className="absolute left-0 w-full h-1 bg-cyan-400/50 shadow-[0_0_50px_rgba(34,211,238,0.8)] z-20 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-center"
                >
                    <div className={`inline-block px-4 py-1 mb-4 border rounded-full backdrop-blur-sm transition-all duration-1000 ${scanned ? 'border-cyan-400/50 bg-cyan-900/20' : 'border-red-400/50 bg-red-900/20'}`}>
                        <span className={`font-mono text-xs tracking-widest uppercase ${scanned ? 'text-cyan-400' : 'text-red-400'}`}>
                            System Status: {scanned ? 'Signal Locked' : 'Entropy High'}
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter" style={{ color: isDark ? '#fff' : '#121212' }}>
                        NEURAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">OCEAN</span>
                    </h1>
                    <p className="font-mono text-sm tracking-widest uppercase mb-8" style={{ color: isDark ? 'rgba(191, 219, 254, 0.6)' : 'rgba(82, 82, 91, 0.6)' }}>
                        Transforming Perishable Chaos into Digital Order
                    </p>

                    {!scanned && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 border border-cyan-500/50 rounded text-cyan-400 font-mono text-xs uppercase tracking-widest hover:bg-cyan-900/20 transition-all flex items-center gap-2 mx-auto"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            Click to Initialize System
                        </motion.button>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

function ParticleSystem({ scanned, color }: { scanned: boolean, color: string }) {
    const ref = useRef<any>(null);
    const count = 5184; // 72^2

    // CHAOS: Sphere
    const chaosPositions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        random.inSphere(positions, { radius: 3.5 });
        return positions;
    }, []);

    // ORDER: Flat Grid (Perfectly orderly)
    const orderPositions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const gridSize = Math.sqrt(count); // 72
        let i = 0;
        for (let x = 0; x < gridSize; x++) {
            for (let z = 0; z < gridSize; z++) {
                // Flat plane centered
                const u = (x / gridSize - 0.5) * 10;
                const v = (z / gridSize - 0.5) * 10;

                positions[i * 3] = u;
                positions[i * 3 + 1] = 0; // Flat
                positions[i * 3 + 2] = v;
                i++;
            }
        }
        return positions;
    }, []);

    // Current positions buffer
    const bufferRef = useRef<Float32Array>(new Float32Array(chaosPositions));

    useFrame((state, delta) => {
        if (!ref.current) return;

        const targetPositions = scanned ? orderPositions : chaosPositions;
        const lerpSpeed = 2.0;

        const positions = ref.current.geometry.attributes.position.array;

        for (let i = 0; i < count * 3; i++) {
            // Lerp
            positions[i] += (targetPositions[i] - positions[i]) * delta * lerpSpeed;
        }

        ref.current.geometry.attributes.position.needsUpdate = true;

        // Rotation
        if (scanned) {
            // Flat grid doesn't rotate much, maybe just slowly tilt?
            // Reset rotation to look nice
            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0.2, delta);
            ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.clock.elapsedTime * 0.05, delta);
            ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, 0, delta);
        } else {
            // Chaos rotates
            ref.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    args={[bufferRef.current, 3]}
                    array={bufferRef.current}
                    itemSize={3}
                />
            </bufferGeometry>
            <PointMaterial
                transparent
                color={color}
                size={0.015} // Smaller particles
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
