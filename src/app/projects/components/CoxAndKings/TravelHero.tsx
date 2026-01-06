'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import { useState, useRef, useMemo } from 'react';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion } from 'framer-motion';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Plane, MapPin } from 'lucide-react';

export default function TravelHero() {
    return (
        <section className="h-screen w-full relative bg-[#1e1b4b] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
                    <GlobeParticles />
                    <DeviceConnection />
                    <ambientLight intensity={0.5} />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b] via-transparent to-transparent z-10 opactiy-80" />

            {/* Content w/ Glassmorphism */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl max-w-3xl"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="p-2 bg-[#A78BFA]/20 rounded-full">
                            <Plane className="w-5 h-5 text-[#A78BFA]" />
                        </div>
                        <span className="font-serif text-[#A78BFA] tracking-widest uppercase text-sm">Since 1758</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
                        The Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#c4b5fd] italic">Odyssey</span>
                    </h1>

                    <p className="text-slate-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                        Reinventing the world's oldest travel brand with <br />
                        <strong className="text-white">AI-Powered Personalization</strong> and <strong className="text-white">Seamless Tech</strong>.
                    </p>
                </motion.div>

                {/* Simulated Floating Cards */}
                <div className="absolute w-full h-full top-0 left-0 pointer-events-none overflow-hidden">
                    <FloatingCard
                        icon={MapPin}
                        text="Paris, France"
                        sub="Match Score: 98%"
                        initial={{ x: -300, y: -200 }}
                        animate={{ x: -100, y: -50 }}
                        delay={0.5}
                    />
                    <FloatingCard
                        icon={Plane}
                        text="Flight CK204"
                        sub="On Time • First Class"
                        initial={{ x: 300, y: 200 }}
                        animate={{ x: 100, y: 100 }}
                        delay={0.8}
                    />
                </div>
            </div>
        </section>
    );
}

function GlobeParticles() {
    const ref = useRef<any>(null);
    const count = 3000;

    // Create a sphere of points
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        random.inSphere(positions, { radius: 3.5 });
        return positions;
    }, []);

    useFrame((state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.y += delta * 0.1; // Rotate globe
        ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    });

    return (
        <group>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#A78BFA"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>

    );
}

function DeviceConnection() {
    // A simplified visual of "connecting" lines (flights)
    const ref = useRef<any>(null);
    const linesCount = 10;
    const lines = useMemo(() => {
        return new Array(linesCount).fill(0).map(() => {
            const start = new THREE.Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5).normalize().multiplyScalar(3.5);
            const end = new THREE.Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5).normalize().multiplyScalar(3.5);
            // Curve points would be better but straight lines for now
            return [start, end];
        });
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group ref={ref}>
            {lines.map((line, i) => (
                <Line
                    key={i}
                    points={line}
                    color="white"
                    opacity={0.1}
                    transparent
                    lineWidth={1}
                />
            ))}
        </group>
    )
}


function FloatingCard({ icon: Icon, text, sub, initial, animate, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, ...initial }}
            animate={{ opacity: 1, ...animate }}
            transition={{ duration: 1.5, delay, type: "spring" }}
            className="absolute top-1/2 left-1/2 p-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 flex items-center gap-3 shadow-xl"
        >
            <div className="p-2 bg-[#A78BFA] rounded-md text-white">
                <Icon size={16} />
            </div>
            <div className="text-left">
                <div className="text-white text-xs font-bold">{text}</div>
                <div className="text-[#A78BFA] text-[10px] uppercase font-mono">{sub}</div>
            </div>
        </motion.div>
    )
}
