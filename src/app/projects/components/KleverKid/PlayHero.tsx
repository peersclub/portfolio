'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, useBox, usePlane } from '@react-three/cannon';
import { Float, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { MousePointer2, MapPin } from 'lucide-react';

export default function PlayHero() {
    return (
        <section className="h-screen w-full relative bg-[#EFF6FF] overflow-hidden flex flex-col items-center justify-center">
            {/* Physics Playground */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 5]} intensity={0.8} />
                    <Physics>
                        <Plane />
                        <FallingBlock position={[-2, 10, 0]} color="#60A5FA" args={[1, 1, 1]} />
                        <FallingBlock position={[0, 12, 0]} color="#F59E0B" args={[1.2, 1.2, 1.2]} />
                        <FallingBlock position={[2, 15, 0]} color="#10B981" args={[0.8, 0.8, 0.8]} />
                        <FallingBlock position={[1, 18, 1]} color="#EC4899" args={[1, 1, 1]} />
                        <FallingBlock position={[-1, 20, -1]} color="#8B5CF6" args={[1.5, 1.5, 1.5]} />
                    </Physics>
                </Canvas>
            </div>

            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="inline-block"
                >
                    <h1 className="text-6xl md:text-8xl font-black text-[#1D4ED8] mb-4 drop-shadow-sm transform -rotate-2">
                        KleverKid
                    </h1>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-4xl font-bold text-[#2563EB] mb-8"
                >
                    The Playground for <span className="text-[#F59E0B] underline decoration-wavy">Learning</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-[#60A5FA] text-lg font-bold bg-white/80 backdrop-blur px-6 py-2 rounded-full shadow-lg border-2 border-white inline-flex items-center gap-2"
                >
                    <MapPin size={18} className="animate-bounce" />
                    Discover best tutors & classes near you
                </motion.p>
            </div>
        </section>
    );
}

function FallingBlock({ position, color, args }: any) {
    const [ref] = useBox(() => ({ mass: 1, position, args, rotation: [Math.random(), Math.random(), Math.random()] }));
    return (
        <mesh ref={ref as any}>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
        </mesh>
    );
}

function Plane() {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
    return (
        <mesh ref={ref as any} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#EFF6FF" transparent opacity={0} /> {/* Invisible floor */}
        </mesh>
    );
}
