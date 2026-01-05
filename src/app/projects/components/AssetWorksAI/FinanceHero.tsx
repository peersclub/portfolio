'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useState, useRef, useMemo, useEffect } from 'react';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion, AnimatePresence } from 'framer-motion';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function FinanceHero() {
    const [initialized, setInitialized] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const gold = '#E8C547';
    const goldDim = 'rgba(232, 197, 71, 0.6)';

    useEffect(() => {
        const timer = setTimeout(() => setInitialized(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleInit = () => {
        setInitialized(prev => !prev);
    };

    return (
        <section className="h-screen w-full relative bg-gradient-to-br from-[#0a0a0f] via-[#0d1117] to-[#161b22] overflow-hidden cursor-pointer" onClick={handleInit}>
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 2, 5], fov: 55 }}>
                    <ParticleChart initialized={initialized} color={gold} />
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={0.5} color={gold} />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* Scan Line */}
            <AnimatePresence>
                {!initialized && (
                    <motion.div
                        initial={{ top: '-10%' }}
                        animate={{ top: '120%' }}
                        transition={{ duration: 2.5, ease: 'linear', delay: 0.5 }}
                        className="absolute left-0 w-full h-1 z-20 pointer-events-none"
                        style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, boxShadow: `0 0 40px ${gold}` }}
                    />
                )}
            </AnimatePresence>

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-5 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(${gold}22 1px, transparent 1px), linear-gradient(90deg, ${gold}22 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-center"
                >
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mb-6"
                    >
                        <Image
                            src="/projects/assetworks-ai/logo-white.png"
                            alt="AssetWorks AI"
                            width={180}
                            height={40}
                            className="mx-auto"
                        />
                    </motion.div>

                    {/* Status Badge */}
                    <div className={`inline-block px-4 py-1.5 mb-6 border rounded-full backdrop-blur-sm transition-all duration-1000 ${initialized ? 'border-[#E8C547]/50 bg-[#E8C547]/10' : 'border-blue-400/50 bg-blue-900/20'}`}>
                        <span className={`font-mono text-xs tracking-widest uppercase ${initialized ? 'text-[#E8C547]' : 'text-blue-400'}`}>
                            {initialized ? '⚡ AI Analytics Active' : '◉ Initializing Neural Network'}
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight text-white">
                        <span className="block">Financial</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8C547] via-[#f0d579] to-[#E8C547]">
                            Intelligence
                        </span>
                    </h1>

                    <p className="font-mono text-sm md:text-base tracking-wider text-slate-400 mb-10 max-w-xl mx-auto">
                        Create investment widgets using simple natural language.
                        <br />Powered by Claude AI & OpenAI GPT.
                    </p>

                    {/* Metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="flex gap-8 md:gap-16 justify-center"
                    >
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-[#E8C547]">10x</div>
                            <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Efficiency</div>
                        </div>
                        <div className="w-px bg-slate-700" />
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-[#E8C547]">99%</div>
                            <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Accuracy</div>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    {!initialized && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mt-10 px-6 py-2.5 border border-[#E8C547]/50 rounded-lg text-[#E8C547] font-mono text-xs uppercase tracking-widest hover:bg-[#E8C547]/10 transition-all flex items-center gap-2 mx-auto pointer-events-auto"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8C547] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8C547]"></span>
                            </span>
                            Click to Activate
                        </motion.button>
                    )}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="flex flex-col items-center gap-2 text-slate-500">
                    <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-5 h-8 border-2 border-slate-600 rounded-full flex justify-center pt-1"
                    >
                        <div className="w-1 h-2 bg-[#E8C547] rounded-full" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

function ParticleChart({ initialized, color }: { initialized: boolean; color: string }) {
    const ref = useRef<any>(null);
    const count = 4096;

    // Chaos: Random sphere
    const chaosPositions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        random.inSphere(positions, { radius: 4 });
        return positions;
    }, []);

    // Order: Financial chart pattern
    const chartPositions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const chartPoints = 64;
        const layers = count / chartPoints;

        for (let layer = 0; layer < layers; layer++) {
            for (let i = 0; i < chartPoints; i++) {
                const idx = (layer * chartPoints + i) * 3;
                const x = (i / chartPoints - 0.5) * 12;
                // Create a financial chart-like pattern
                const baseY = Math.sin(i * 0.15) * 1.5 + Math.cos(i * 0.08) * 0.8 + Math.sin(i * 0.3) * 0.5;
                const layerOffset = (layer / layers - 0.5) * 0.3;
                const y = baseY + layerOffset;
                const z = (layer / layers - 0.5) * 2;

                positions[idx] = x;
                positions[idx + 1] = y;
                positions[idx + 2] = z;
            }
        }
        return positions;
    }, []);

    const bufferRef = useRef<Float32Array>(new Float32Array(chaosPositions));

    useFrame((state, delta) => {
        if (!ref.current) return;

        const targetPositions = initialized ? chartPositions : chaosPositions;
        const lerpSpeed = initialized ? 2.5 : 1.5;
        const positions = ref.current.geometry.attributes.position.array;

        for (let i = 0; i < count * 3; i++) {
            positions[i] += (targetPositions[i] - positions[i]) * delta * lerpSpeed;
        }

        ref.current.geometry.attributes.position.needsUpdate = true;

        // Gentle rotation
        if (initialized) {
            ref.current.rotation.y = THREE.MathUtils.lerp(
                ref.current.rotation.y,
                state.clock.elapsedTime * 0.02,
                delta * 0.5
            );
            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0.1, delta);
        } else {
            ref.current.rotation.y += delta * 0.15;
            ref.current.rotation.x += delta * 0.05;
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
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
