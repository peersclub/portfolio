import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function DataTunnel() {
    return (
        <section className="h-screen w-full relative bg-[#020c1b] overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
                    <TunnelMesh />
                    <SpeedLines />
                    <ambientLight intensity={0.5} />
                    <fog attach="fog" args={['#020c1b', 5, 20]} />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={2} />
                    </EffectComposer>
                </Canvas>
            </div>

            <div className="relative z-10 pointer-events-none text-center p-8">
                <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-4 opacity-20">LOGISTICS</h2>

                <div className="bg-[#020c1b]/80 backdrop-blur border-l-4 border-cyan-500 p-6 max-w-2xl mx-auto text-left">
                    <h3 className="text-2xl text-white font-bold mb-2">The Cold Tunnel</h3>
                    <p className="text-cyan-400 font-mono mb-4 text-sm">LATENCY REDUCTION: 99.8%</p>
                    <p className="text-slate-400 font-light">
                        From harvest to retail in under 24 hours. Our optimized logistics network operates like a high-speed data packet switching system, ensuring physical freshness matches digital speed.
                    </p>
                </div>
            </div>
        </section>
    );
}

function TunnelMesh() {
    const ref = useRef<THREE.Mesh>(null);
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -10]}>
            <cylinderGeometry args={[4, 4, 40, 32, 1, true]} />
            <meshBasicMaterial color="#00f3ff" wireframe={true} transparent opacity={0.1} side={THREE.BackSide} />
        </mesh>
    );
}

function SpeedLines() {
    const count = 100;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const tempObj = new THREE.Object3D();

    // Initial random positions
    const initialData = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
            z: Math.random() * -20,
            speed: Math.random() * 0.5 + 0.2
        }));
    }, []);

    useFrame((state, delta) => {
        if (!mesh.current) return;

        initialData.forEach((data, i) => {
            data.z += data.speed * 20 * delta; // Move forward
            if (data.z > 5) data.z = -20; // Reset

            tempObj.position.set(data.x, data.y, data.z);
            tempObj.rotation.z = Math.atan2(data.y, data.x); // Radial rotation
            tempObj.scale.z = data.speed * 5; // Stretch based on speed
            tempObj.updateMatrix();
            mesh.current!.setMatrixAt(i, tempObj.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <boxGeometry args={[0.05, 0.05, 1]} />
            <meshBasicMaterial color="#fff" transparent opacity={0.8} />
        </instancedMesh>
    );
}
