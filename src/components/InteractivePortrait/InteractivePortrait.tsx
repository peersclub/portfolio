'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// Shader for the particles (Dots)
const vertexShader = `
  uniform float uTime;
  
  attribute float size;
  attribute vec3 color;
  attribute vec3 originalPos;
  
  varying vec3 vColor;
  varying float vDepth;
  
  void main() {
    vColor = color;
    vec3 pos = originalPos;
    vDepth = pos.z;
    
    // Enhanced breathing animation
    pos.z += sin(pos.x * 3.0 + uTime * 0.8) * 0.06;
    pos.y += cos(pos.y * 3.0 + uTime * 0.5) * 0.04;
    pos.x += sin(pos.y * 2.0 + uTime * 0.4) * 0.02;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Size attenuation
    gl_PointSize = size * (600.0 / -mvPosition.z); 
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vDepth;
  
  void main() {
    // Round dots
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.45) discard;
    
    // Glow based on depth (brighter = closer)
    float glow = 1.0 - (r * 2.2);
    glow = pow(glow, 1.5);
    
    // Depth-based brightness boost
    float depthBright = 0.7 + vDepth * 0.3;
    
    gl_FragColor = vec4(vColor * depthBright, glow * 0.95); 
  }
`;

// Helper for masking
function smoothstep(min: number, max: number, value: number) {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
}

function PointCloud() {
    const [textureData, setTextureData] = useState<{ positions: Float32Array; colors: Float32Array; sizes: Float32Array } | null>(null);

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load('/images/me.jpg', (texture) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const width = 350; // Higher resolution
            const img = texture.image;
            const aspect = img.width / img.height;
            const h = width / aspect;

            canvas.width = width;
            canvas.height = h;
            ctx.drawImage(img, 0, 0, width, h);
            const data = ctx.getImageData(0, 0, width, h).data;

            const positions: number[] = [];
            const colors: number[] = [];
            const sizes: number[] = [];

            // Calculate average brightness for adaptive thresholding
            let totalBrightness = 0;
            for (let i = 0; i < data.length; i += 4) {
                totalBrightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
            }
            const avgBrightness = totalBrightness / (data.length / 4) / 255;

            for (let y = 0; y < h; y++) {
                for (let x = 0; x < width; x++) {
                    const i = (y * width + x) * 4;
                    const r = data[i] / 255;
                    const g = data[i + 1] / 255;
                    const b = data[i + 2] / 255;
                    const brightness = (r + g + b) / 3;

                    // TIGHT circular vignette (focus on center/face)
                    const cx = x / width - 0.5;
                    const cy = y / h - 0.5;
                    const distFromCenter = Math.sqrt(cx * cx + cy * cy);

                    // Very tight mask - only center 70% of image
                    const mask = smoothstep(0.30, 0.38, distFromCenter);
                    const vignette = 1.0 - mask;

                    // HIGH threshold to cut background aggressively
                    // Anything below 20% brightness is cut
                    if (brightness > 0.18 && vignette > 0.1) {
                        const px = (x / width - 0.5) * 5;
                        const py = -(y / h - 0.5) * 5 / aspect;

                        // STRONG Z-DISPLACEMENT for real 3D depth
                        // Use brightness AND contrast for better depth
                        const contrast = Math.abs(brightness - avgBrightness);
                        const pz = brightness * 2.0 + contrast * 1.5;

                        positions.push(px, py, pz);

                        // WHITE DOTS with slight brightness variation
                        const white = 0.85 + brightness * 0.15;
                        colors.push(white, white, white);

                        // Variable size: Features (higher contrast) are bigger
                        sizes.push((brightness * vignette * 0.12) + 0.04);
                    }
                }
            }

            setTextureData({
                positions: new Float32Array(positions),
                colors: new Float32Array(colors),
                sizes: new Float32Array(sizes)
            });
        });
    }, []);

    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    if (!textureData) return null;

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[textureData.positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-originalPos"
                    args={[textureData.positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[textureData.colors, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[textureData.sizes, 1]}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uTime: { value: 0 }
                }}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function InteractivePortrait() {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                {/* Turnable Controls - wider rotation for inspection */}
                <PresentationControls
                    global={false}
                    cursor={true}
                    snap={true}
                    speed={1.5}
                    zoom={0.9}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 5, Math.PI / 5]}
                    azimuth={[-Math.PI / 2.5, Math.PI / 2.5]} // Wider rotation angle
                >
                    <PointCloud />
                </PresentationControls>
            </Canvas>
        </div>
    );
}
