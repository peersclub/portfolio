import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function SensorMap() {
    return (
        <section className="h-screen w-full relative bg-[#020c1b] overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 z-0 opacity-80">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 5, 5]} fov={50} />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2.5} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />

                    <TerrainGrid />
                    <DataNodes />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
                    </EffectComposer>
                </Canvas>
            </div>

            <div className="relative z-10 pointer-events-none max-w-4xl text-center p-8 bg-[#020c1b]/50 backdrop-blur-sm border-y border-cyan-900/30">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">THE SENSOR MESH</h2>
                <h3 className="text-2xl text-cyan-400 font-mono mb-6">Source: Fishgram SuperApp</h3>
                <p className="text-blue-200/80 max-w-2xl mx-auto mb-8 font-light text-lg">
                    We don't just guess; we know. A network of thousands of fishermen provides real-time telemetry on catch zones, market demand, and pricing.
                </p>
                <div className="flex gap-4 justify-center">
                    <DataBadge label="PFZ Accuracy" value="94%" />
                    <DataBadge label="Active Nodes" value="12,400+" />
                    <DataBadge label="Data Velocity" value="Real-time" />
                </div>
            </div>
        </section>
    );
}

function DataBadge({ label, value }: { label: string, value: string }) {
    return (
        <div className="border border-cyan-500/30 bg-cyan-950/30 px-6 py-3 rounded backdrop-blur-md">
            <div className="text-cyan-400 font-bold text-xl">{value}</div>
            <div className="text-cyan-200/50 text-xs uppercase tracking-wider font-mono">{label}</div>
        </div>
    );
}

function TerrainGrid() {
    const meshRef = useRef<THREE.Mesh>(null);
    const geometryRef = useRef<THREE.PlaneGeometry>(null);

    // Initial flat geometry
    const geometry = useMemo(() => {
        return new THREE.PlaneGeometry(30, 30, 60, 60); // Wider and more dense
    }, []);

    useFrame((state) => {
        if (!geometryRef.current) return;

        const time = state.clock.getElapsedTime();
        const pos = geometryRef.current.attributes.position;

        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);

            // Gentle rolling waves
            const wave1 = Math.sin(x * 0.5 + time * 0.5) * 0.3;
            const wave2 = Math.cos(y * 0.3 + time * 0.3) * 0.3;
            // Surface chop
            const chop = Math.sin(x * 2 + time * 2) * 0.05;

            pos.setZ(i, wave1 + wave2 + chop);
        }
        pos.needsUpdate = true;
    });

    return (
        <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh ref={meshRef}>
                <primitive object={geometry} attach="geometry" ref={geometryRef} />
                <meshBasicMaterial color="#00f3ff" wireframe={true} transparent opacity={0.15} />
            </mesh>
            <mesh position={[0, 0, -0.1]}>
                <primitive object={geometry} attach="geometry" />
                <meshBasicMaterial color="#000" transparent opacity={0.9} />
            </mesh>
        </group>
    );
}

function DataNodes() {
    const count = 50;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = 0.5 + Math.random(); // Float above terrain
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Maybe pulsate logic here if ref was used
    });

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} args={[positions, 3]} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.15} color="#ff00ff" transparent opacity={0.8} sizeAttenuation />
        </points>
    );
}
