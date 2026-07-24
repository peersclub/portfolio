'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';
import { THREAD_SHAPES, type StateFn } from './threadShapes';

export { THREAD_SHAPES, type StateFn };

const GOLD = '#E8C547';
const BG = '#0a0a0a';

const CONTROL_POINTS = 28;
const TUBE_SEGMENTS = 240;
const RADIAL_SEGMENTS = 12;
const TUBE_RADIUS = 0.07;
const TAU = Math.PI * 2;

// Screen blocking per state: the thread yields space to the copy instead of
// sitting behind it. Chapters alternate cards left/right, so the thread takes
// the opposite side; hero pushes deep behind the scrim; contact floats high.
// [x, y, z] in world units — x is scaled down on narrow viewports.
const DEFAULT_OFFSETS: [number, number, number][] = [
    [0, -0.2, -3.4],  // TANGLE  — hero backdrop, pushed away
    [2.6, 0, -0.6],   // KNOT    — card left, thread right
    [-2.6, 0, -0.6],  // LOOP    — card right, thread left
    [2.6, 0, -0.6],   // SPIRAL
    [-2.6, 0, -0.6],  // COIL
    [2.6, 0, -0.6],   // HELIX
    [-2.4, 0, -0.6],  // WAVE
    [0, 0.9, -0.4],   // LINE    — contact, rises behind the headline
];
const DEFAULT_SCALES = [1.05, 0.9, 0.75, 0.85, 0.95, 0.9, 0.85, 1];

function buildTube(points: THREE.Vector3[]): THREE.TubeGeometry {
    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.5);
    return new THREE.TubeGeometry(curve, TUBE_SEGMENTS, TUBE_RADIUS, RADIAL_SEGMENTS, false);
}

interface RigProps {
    progressRef: MutableRefObject<number>;
    reduced: boolean;
}

interface ThreadRigProps extends RigProps {
    states: StateFn[];
    offsets: [number, number, number][];
    scales: number[];
}

function GoldThread({ progressRef, reduced, states, offsets, scales }: ThreadRigProps) {
    const mesh = useRef<THREE.Mesh>(null!);
    const group = useRef<THREE.Group>(null!);
    const damped = useRef(0);
    const lastBuilt = useRef(-1);
    const STATE_COUNT = states.length;

    const samples = useMemo(
        () =>
            states.map((fn) => {
                const pts: THREE.Vector3[] = [];
                for (let i = 0; i < CONTROL_POINTS; i++) {
                    pts.push(new THREE.Vector3(...fn(i / (CONTROL_POINTS - 1))));
                }
                return pts;
            }),
        [states],
    );
    const work = useMemo(
        () => Array.from({ length: CONTROL_POINTS }, () => new THREE.Vector3()),
        [],
    );
    const initialGeometry = useMemo(() => buildTube(samples[0]), [samples]);

    useEffect(() => {
        const m = mesh.current;
        return () => m?.geometry.dispose();
    }, []);

    useFrame((state, delta) => {
        // Chase the raw scroll value with critically-damped easing — this lag
        // is what makes the scrub feel liquid instead of jittery.
        damped.current = THREE.MathUtils.damp(damped.current, progressRef.current, 3.2, delta);
        const p = THREE.MathUtils.clamp(damped.current, 0, 1);

        const seg = Math.min(p, 0.99999) * (STATE_COUNT - 1);
        const i0 = Math.min(Math.floor(seg), STATE_COUNT - 2);
        const f = THREE.MathUtils.smoothstep(seg - i0, 0, 1);

        if (Math.abs(p - lastBuilt.current) > 0.0006) {
            lastBuilt.current = p;
            const a = samples[i0];
            const b = samples[i0 + 1];
            for (let i = 0; i < CONTROL_POINTS; i++) {
                work[i].lerpVectors(a[i], b[i], f);
            }
            const next = buildTube(work);
            mesh.current.geometry.dispose();
            mesh.current.geometry = next;
        }

        // Blocking: blend position/scale between states so the thread frames
        // the copy instead of colliding with it. x compresses on narrow
        // viewports where the cards sit centered.
        const oa = offsets[i0];
        const ob = offsets[i0 + 1];
        const xFactor = Math.min(1, state.viewport.width / 10);
        group.current.position.set(
            THREE.MathUtils.lerp(oa[0], ob[0], f) * xFactor,
            THREE.MathUtils.lerp(oa[1], ob[1], f),
            THREE.MathUtils.lerp(oa[2], ob[2], f),
        );
        group.current.scale.setScalar(THREE.MathUtils.lerp(scales[i0], scales[i0 + 1], f));

        // Idle drift fades out with progress; the scroll-coupled term is one
        // full revolution, so at p=1 the closing line always faces the camera
        // regardless of how long the page has been open.
        const drift = reduced ? 0 : state.clock.elapsedTime * 0.05;
        group.current.rotation.y = drift * (1 - p) + p * TAU;
        group.current.rotation.x = Math.sin(p * Math.PI) * 0.22;
    });

    return (
        <group ref={group}>
            <mesh ref={mesh} geometry={initialGeometry}>
                <meshPhysicalMaterial
                    color={GOLD}
                    metalness={1}
                    roughness={0.18}
                    clearcoat={0.6}
                    clearcoatRoughness={0.3}
                    envMapIntensity={1.35}
                />
            </mesh>
        </group>
    );
}

function CameraRig({ progressRef, reduced }: RigProps) {
    const pointer = useRef({ x: 0, y: 0 });
    const damped = useRef(0);

    useEffect(() => {
        if (reduced) return;
        const onMove = (e: PointerEvent) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener('pointermove', onMove);
        return () => window.removeEventListener('pointermove', onMove);
    }, [reduced]);

    useFrame((state, delta) => {
        damped.current = THREE.MathUtils.damp(damped.current, progressRef.current, 3.2, delta);
        const p = THREE.MathUtils.clamp(damped.current, 0, 1);
        const cam = state.camera;

        // Breathe out slightly through the tall mid-chapters, settle at the end.
        const targetZ = 8.2 + Math.sin(p * Math.PI) * 1.2;
        cam.position.z = THREE.MathUtils.damp(cam.position.z, targetZ, 2.5, delta);
        cam.position.x = THREE.MathUtils.damp(cam.position.x, pointer.current.x * 0.6, 2.5, delta);
        cam.position.y = THREE.MathUtils.damp(cam.position.y, -pointer.current.y * 0.4, 2.5, delta);
        cam.lookAt(0, 0, 0);
    });

    return null;
}

interface ThreadSceneProps {
    progressRef: MutableRefObject<number>;
    reduced: boolean;
    onReady: () => void;
    /** Optional page-specific choreography — defaults to the /v2 home journey.
        All v2 pages share the same thread; only its sequence of poses changes. */
    states?: StateFn[];
    offsets?: [number, number, number][];
    scales?: number[];
}

export default function ThreadScene({
    progressRef,
    reduced,
    onReady,
    states = THREAD_SHAPES,
    offsets = DEFAULT_OFFSETS,
    scales = DEFAULT_SCALES,
}: ThreadSceneProps) {
    return (
        <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 8.2], fov: 42 }}
            gl={{ antialias: true }}
            onCreated={onReady}
        >
            <color attach="background" args={[BG]} />
            <fog attach="fog" args={[BG, 9, 17]} />

            <GoldThread progressRef={progressRef} reduced={reduced} states={states} offsets={offsets} scales={scales} />
            <CameraRig progressRef={progressRef} reduced={reduced} />

            <Sparkles
                count={90}
                scale={[13, 9, 7]}
                size={2}
                speed={reduced ? 0 : 0.25}
                color={GOLD}
                opacity={0.35}
            />

            {/* Procedural "studio" — softboxes baked into an env map, no HDR fetch */}
            <Environment resolution={256} frames={1}>
                <Lightformer intensity={4} position={[0, 4, -6]} scale={[8, 4, 1]} color="#fff7e0" />
                <Lightformer intensity={2.4} position={[-5, 1, 3]} rotation-y={Math.PI / 2.6} scale={[6, 3, 1]} color="#ffffff" />
                <Lightformer intensity={1.6} position={[5, -1, 2]} rotation-y={-Math.PI / 2.6} scale={[6, 3, 1]} color={GOLD} />
                <Lightformer form="circle" intensity={1.8} position={[0, -5, 1]} rotation-x={Math.PI / 2} scale={[5, 5, 1]} color="#ffffff" />
            </Environment>

            <EffectComposer>
                <Bloom luminanceThreshold={0.72} luminanceSmoothing={0.4} intensity={0.5} mipmapBlur />
                <Vignette offset={0.22} darkness={0.72} />
            </EffectComposer>
        </Canvas>
    );
}
