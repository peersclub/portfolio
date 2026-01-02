import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder, Text, Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export default function HoloAuction() {
    return (
        <section className="h-screen w-full relative bg-[#020c1b] overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <AuctionCylinder />
                    <FloatingBids />
                    <ambientLight intensity={0.5} />
                    <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={2} radius={0.8} />
                    </EffectComposer>
                </Canvas>
            </div>

            <div className="relative z-10 pointer-events-none text-center p-8 bg-[#020c1b]/60 backdrop-blur border border-cyan-500/20 rounded-xl">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-green-400 font-mono text-xs tracking-widest uppercase">Market Live</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">THE HOLOGRAPHIC MARKET</h2>
                <h3 className="text-xl text-cyan-400 font-mono mb-4">Real-time Demand Matching</h3>
                <div className="text-blue-200/80 font-mono text-sm max-w-lg mx-auto">
                    <p>Auctions settle in milliseconds.</p>
                    <p>Fair prices discovered instantly.</p>
                </div>
            </div>
        </section>
    );
}

function AuctionCylinder() {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <group rotation={[0.2, 0, 0]}>
            {/* Main holographic glass cylinder */}
            <Cylinder ref={mesh} args={[3, 3, 6, 64, 1, true]}>
                <meshStandardMaterial
                    color="#00f3ff"
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                    roughness={0.1}
                    metalness={0.8}
                    wireframe={false}
                />
            </Cylinder>

            {/* Wireframe overlay */}
            <Cylinder args={[3.05, 3.05, 6, 32, 5, true]}>
                <meshBasicMaterial color="#00f3ff" wireframe={true} transparent opacity={0.1} />
            </Cylinder>

            {/* Inner rings */}
            <Cylinder args={[2.8, 2.8, 5.8, 64, 1, true]}>
                <meshBasicMaterial color="#ff00ff" transparent opacity={0.05} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
            </Cylinder>
        </group>
    );
}

function FloatingBids() {
    const bids = [
        { price: "₹145.50", qty: "200kg", pos: [-2, 1, 2] },
        { price: "₹146.00", qty: "50kg", pos: [2, 2, 1] },
        { price: "₹144.75", qty: "500kg", pos: [0, -1, 2.5] },
        { price: "₹148.20", qty: "120kg", pos: [-1.5, -2, 1.5] },
        { price: "BID ACCEPTED", qty: "", pos: [0, 0, 3], color: "#4ade80" },
    ];

    return (
        <group>
            {bids.map((bid, i) => (
                <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <group position={bid.pos as [number, number, number]}>
                        <Text
                            color={bid.color || "#00f3ff"}
                            fontSize={0.25}
                            font="/fonts/Inter-Bold.ttf" // Fallback to default if not found
                            anchorX="center"
                            anchorY="middle"
                        >
                            {bid.price}
                        </Text>
                        <Text
                            position={[0, -0.2, 0]}
                            color="#94a3b8"
                            fontSize={0.15}
                            anchorX="center"
                            anchorY="middle"
                        >
                            {bid.qty}
                        </Text>
                        {/* Card Background */}
                        <mesh position={[0, -0.1, -0.05]}>
                            <planeGeometry args={[1.5, 0.8]} />
                            <meshBasicMaterial color="#000" transparent opacity={0.6} />
                        </mesh>
                    </group>
                </Float>
            ))}
        </group>
    );
}
