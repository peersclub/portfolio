'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Heart } from 'lucide-react';
import { useRef } from 'react';

export default function NurtureHero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <section className="h-screen w-full relative bg-[#FFF0F5] overflow-hidden flex items-center justify-center">
            {/* Background 3D Elements */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 5]} intensity={1} color="#FFF0F5" />
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        <Bubble position={[1.5, 1, -1]} size={1.2} color="#FBCFE8" speed={0.4} />
                    </Float>
                    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
                        <Bubble position={[-1.5, -0.5, 0]} size={1.5} color="#FCE7F3" speed={0.3} />
                    </Float>
                    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
                        <Bubble position={[0, -1.5, -2]} size={1} color="#F9A8D4" speed={0.5} />
                    </Float>
                </Canvas>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full mb-8 text-[#DB2777] shadow-sm">
                        <Heart size={16} className="fill-current" />
                        <span className="text-sm font-bold tracking-wide uppercase">Trusted by 2M+ Parents</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-[#831843] mb-6 tracking-tight leading-tight">
                        Nurturing the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DB2777] to-[#EC4899]">Next Generation</span>
                    </h1>

                    <p className="text-xl text-[#BE185D]/80 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                        India's leading parenting platform connecting families with <br className="hidden md:block" />
                        top care, doctors, and a supportive community.
                    </p>

                    <motion.div
                        className="flex justify-center gap-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Stat val="42%" label="Retention Increase" />
                        <Stat val="21%" label="Stickiness Growth" />
                        <Stat val="8 Mo" label="Turnaround Time" />
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#DB2777]/50"
            >
                <ArrowDown />
            </motion.div>
        </section>
    );
}

function Bubble({ position, size, color, speed }: any) {
    const mesh = useRef<any>(null);
    useFrame((state) => {
        if (!mesh.current) return;
        // mesh.current.distort = THREE.MathUtils.lerp(mesh.current.distort, 0.4, 0.05)
    });

    return (
        <Sphere args={[size, 64, 64]} position={position} ref={mesh}>
            <MeshDistortMaterial
                color={color}
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0}
                metalness={0.1}
                distort={0.4}
                speed={speed}
            />
        </Sphere>
    );
}

function Stat({ val, label }: { val: string, label: string }) {
    return (
        <div className="text-center">
            <div className="text-4xl font-bold text-[#DB2777] mb-1">{val}</div>
            <div className="text-sm text-[#9D174D] font-medium uppercase tracking-wide">{label}</div>
        </div>
    );
}
