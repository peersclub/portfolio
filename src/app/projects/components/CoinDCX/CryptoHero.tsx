'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import { useState, useRef, useMemo } from 'react';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion } from 'framer-motion';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ArrowDown } from 'lucide-react';

export default function CryptoHero() {
    const teal = '#4ECDC4';

    return (
        <section className="h-screen w-full relative bg-[#0f172a] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                    <NetworkParticles color={teal} />
                    <ambientLight intensity={0.5} />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-5 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(${teal}22 1px, transparent 1px), linear-gradient(90deg, ${teal}22 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-8 relative inline-block">
                        <div className="absolute inset-0 bg-[#4ECDC4] blur-[40px] opacity-20" />
                        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white relative z-10">
                            CoinDCX
                        </h1>
                    </div>

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="px-4 py-1.5 rounded-full border border-[#4ECDC4]/30 bg-[#4ECDC4]/10 backdrop-blur-sm">
                            <span className="text-[#4ECDC4] font-mono text-xs tracking-widest uppercase">
                                India's Largest Exchange
                            </span>
                        </div>
                    </div>

                    <p className="max-w-xl mx-auto text-slate-400 text-lg mb-12 font-light">
                        Building the future of finance with <span className="text-[#4ECDC4]">trust</span>, <span className="text-[#4ECDC4]">security</span>, and <span className="text-[#4ECDC4]">simplicity</span>.
                    </p>

                    {/* Metrics Ticker */}
                    <div className="flex flex-wrap gap-8 justify-center items-center">
                        <Metric label="Users" value="1M+" color={teal} />
                        <div className="w-px h-8 bg-slate-700 hidden md:block" />
                        <Metric label="Quarterly Volume" value="$1B+" color={teal} />
                        <div className="w-px h-8 bg-slate-700 hidden md:block" />
                        <Metric label="Assets" value="500+" color={teal} />
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-widest font-mono">Scroll to Explore</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
            </motion.div>
        </section>
    );
}

function Metric({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-mono">{label}</div>
        </div>
    );
}

function NetworkParticles({ color }: { color: string }) {
    const ref = useRef<any>(null);
    const count = 3000;

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        random.inSphere(positions, { radius: 6 });
        return positions;
    }, []);

    useFrame((state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={color}
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}
