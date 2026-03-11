'use client';

import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import {
  buildGraphData,
  getTooltipContent,
  stats,
  type FilterType,
  type GraphNode,
} from './graphData';
import styles from './KnowledgeGraph.module.css';

// Dynamic import — react-force-graph-3d uses WebGL, no SSR
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false });

// =====================================================================
// Helpers
// =====================================================================

function resolveColor(color: string) {
  return color === 'var(--accent-solid)' ? '#667eea' : color;
}

/** Create a soft-glow sprite texture */
function createGlowTexture(color: string, size = 128): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const half = size / 2;
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
  gradient.addColorStop(0, color + 'cc');
  gradient.addColorStop(0.4, color + '44');
  gradient.addColorStop(1, color + '00');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/** Create a text sprite for labels */
function createLabelSprite(text: string, color: string, fontSize = 48): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const font = `bold ${fontSize}px Inter, system-ui, sans-serif`;
  ctx.font = font;
  const metrics = ctx.measureText(text);
  const w = Math.ceil(metrics.width + 20);
  const h = fontSize + 16;
  canvas.width = w;
  canvas.height = h;
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(w / 10, h / 10, 1);
  return sprite;
}

// =====================================================================
// COMPONENT
// =====================================================================

export default function KnowledgeGraph() {
  const fgRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    type: string;
    color: string;
    name: string;
    meta: string;
  }>({ visible: false, x: 0, y: 0, type: '', color: '', name: '', meta: '' });

  // Build graph data (same data layer, now in 3D)
  const graphData = useMemo(() => {
    const { nodes, links } = buildGraphData(filter);
    return {
      nodes: nodes.map((n) => ({ ...n })),
      links: links.map((l) => ({
        source: typeof l.source === 'string' ? l.source : l.source.id,
        target: typeof l.target === 'string' ? l.target : l.target.id,
        strength: l.strength,
        color: (typeof l.target === 'string'
          ? nodes.find((n) => n.id === l.target)?.color
          : (l.target as GraphNode).color) || '#3b82f6',
      })),
    };
  }, [filter]);

  // Resize
  useEffect(() => {
    const update = () => {
      if (wrapperRef.current) {
        setDimensions({
          width: wrapperRef.current.clientWidth,
          height: wrapperRef.current.clientHeight,
        });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Camera position + auto-orbit after mount
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;

    // Set up scene background and fog
    const scene = fg.scene?.();
    if (scene) {
      scene.background = new THREE.Color('#0a0a0f');
      scene.fog = new THREE.FogExp2('#0a0a0f', 0.0015);
    }

    // Add ambient + point lights
    const renderer = fg.renderer?.();
    if (renderer) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    // Zoom to fit after data settles
    setTimeout(() => {
      fg.cameraPosition?.({ x: 0, y: 0, z: 300 }, { x: 0, y: 0, z: 0 }, 0);
      setTimeout(() => fg.zoomToFit?.(400, 100), 300);
    }, 500);
  }, [filter]);

  // Slow auto-rotation
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    const controls = fg.controls?.();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
    }
  }, []);

  // Keep simulation warm
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    const interval = setInterval(() => {
      fg.d3ReheatSimulation?.();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Custom 3D node objects
  const nodeThreeObject = useCallback((node: any) => {
    const r = node.r || 8;
    const color = resolveColor(node.color);
    const group = new THREE.Group();

    // Main sphere
    const geometry = new THREE.SphereGeometry(
      node.type === 'center' ? r * 0.6 : node.type === 'hub' ? r * 0.5 : r * 0.4,
      32,
      32,
    );
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(color),
      emissive: new THREE.Color(color),
      emissiveIntensity: node.type === 'center' ? 0.8 : 0.4,
      shininess: 80,
      transparent: true,
      opacity: 0.9,
    });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);

    // Outer glow sprite
    const glowSize = node.type === 'center' ? r * 3.5 : node.type === 'hub' ? r * 2.5 : r * 2;
    const glowTex = createGlowTexture(color);
    const glowMat = new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      opacity: node.type === 'center' ? 0.7 : 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Sprite(glowMat);
    glow.scale.set(glowSize, glowSize, 1);
    group.add(glow);

    // Rings for center node
    if (node.type === 'center') {
      for (let i = 1; i <= 3; i++) {
        const ringGeo = new THREE.RingGeometry(r * 0.6 + i * 4, r * 0.6 + i * 4 + 0.3, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          transparent: true,
          opacity: 0.15 / i,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        // Tilt each ring differently for 3D effect
        ring.rotation.x = Math.PI / 2 + (i * 0.3);
        ring.rotation.y = i * 0.5;
        group.add(ring);
      }
    }

    // Hub ring
    if (node.type === 'hub') {
      const ringGeo = new THREE.RingGeometry(r * 0.55, r * 0.55 + 0.4, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      group.add(ring);
    }

    // Label
    const label = node.name.length > 16 ? node.name.slice(0, 15) + '\u2026' : node.name;
    const labelSize = node.type === 'center' ? 56 : node.type === 'hub' ? 44 : 36;
    const labelSprite = createLabelSprite(label, '#ffffff', labelSize);
    const offset = node.type === 'center' ? r * 0.8 : node.type === 'hub' ? r * 0.6 : r * 0.5;
    labelSprite.position.set(0, offset + 4, 0);
    labelSprite.material.opacity = node.type === 'center' || node.type === 'hub' ? 1 : 0.75;
    group.add(labelSprite);

    // Count sublabel
    if (node.count && node.count > 20) {
      const countSprite = createLabelSprite(`${node.count}`, color + 'aa', 28);
      countSprite.position.set(0, -(offset + 3), 0);
      countSprite.material.opacity = 0.6;
      group.add(countSprite);
    }

    return group;
  }, []);

  // Node hover
  const handleNodeHover = useCallback((node: any) => {
    if (node) {
      const info = getTooltipContent(node);
      if (info) {
        setTooltip({ visible: true, x: 0, y: 0, ...info });
      }
    } else {
      setTooltip((prev) => ({ ...prev, visible: false }));
    }
  }, []);

  // Click to focus
  const handleNodeClick = useCallback((node: any) => {
    const fg = fgRef.current;
    if (!fg || !node) return;
    const distance = node.type === 'center' ? 200 : node.type === 'hub' ? 120 : 80;
    fg.cameraPosition(
      { x: node.x, y: node.y, z: node.z + distance },
      { x: node.x, y: node.y, z: node.z },
      1000,
    );
  }, []);

  // Track mouse for tooltip
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) =>
      prev.visible
        ? {
            ...prev,
            x: Math.min(e.clientX + 16, window.innerWidth - 260),
            y: Math.min(e.clientY - 10, window.innerHeight - 120),
          }
        : prev,
    );
  }, []);

  const filtersList: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Companies', value: 'companies' },
    { label: 'Roles', value: 'roles' },
    { label: 'Interests', value: 'interests' },
    { label: 'Hashtags', value: 'hashtags' },
  ];

  return (
    <div ref={wrapperRef} className={styles.wrapper} onMouseMove={handleMouseMove}>
      {/* 3D Force Graph */}
      <div className={styles.graphContainer}>
        <ForceGraph3D
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          backgroundColor="#0a0a0f"
          nodeRelSize={1}
          nodeVal={(node: any) => node.r * node.r}
          nodeThreeObject={nodeThreeObject}
          nodeThreeObjectExtend={false}
          linkColor={(link: any) => {
            const c = resolveColor(link.color || '#3b82f6');
            return c + '40';
          }}
          linkWidth={0.5}
          linkOpacity={0.3}
          linkCurvature={0.25}
          linkCurveRotation={0.5}
          onNodeHover={handleNodeHover}
          onNodeClick={handleNodeClick}
          onNodeDragEnd={(node: any) => {
            node.fx = undefined;
            node.fy = undefined;
            node.fz = undefined;
          }}
          d3AlphaDecay={0.01}
          d3VelocityDecay={0.3}
          cooldownTime={Infinity}
          warmupTicks={100}
          enablePointerInteraction={true}
          showNavInfo={false}
        />
      </div>

      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className={styles.headerLeft}>
          <h2>Network Atlas</h2>
          <p>LinkedIn Knowledge Graph &bull; 3D</p>
        </div>
        <div className={styles.headerRight}>
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className={styles.statPill}>
              <span className={styles.num}>{value}</span>
              <span className={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        className={styles.filters}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {filtersList.map((f) => (
          <button
            key={f.value}
            className={filter === f.value ? styles.filterBtnActive : styles.filterBtn}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Legend */}
      <motion.div
        className={styles.legend}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className={styles.legendTitle}>Node Type</div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: '#667eea' }} /> You (Center)
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: '#8b5cf6' }} /> Company
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: '#10b981' }} /> Role / Title
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: '#f59e0b' }} /> Interest / Hashtag
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: '#ec4899' }} /> Company Follow
        </div>
      </motion.div>

      {/* Controls hint */}
      <motion.div
        className={styles.controls}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <button
          className={styles.ctrlBtn}
          onClick={() => fgRef.current?.zoomToFit?.(600, 80)}
          title="Reset view"
        >
          &loz;
        </button>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip.visible && (
          <motion.div
            className={`${styles.tooltip} ${styles.visible}`}
            style={{ left: tooltip.x, top: tooltip.y }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className={styles.tooltipType} style={{ color: tooltip.color }}>{tooltip.type}</div>
            <div className={styles.tooltipName}>{tooltip.name}</div>
            <div className={styles.tooltipMeta}>{tooltip.meta}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
