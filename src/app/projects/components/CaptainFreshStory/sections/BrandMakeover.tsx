'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Palette, Layers, RefreshCcw } from 'lucide-react';

export default function BrandMakeover() {
    const [view, setView] = useState<'old' | 'transition' | 'new'>('old');

    // Auto-cycle the animation
    useEffect(() => {
        const timer = setInterval(() => {
            setView(prev => {
                if (prev === 'old') return 'transition';
                if (prev === 'transition') return 'new';
                return 'old';
            });
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-full bg-primary relative overflow-hidden flex flex-col items-center justify-center p-8">
            <h3 className="absolute top-8 left-8 text-xs font-mono font-bold tracking-widest text-muted uppercase flex items-center gap-2">
                <Palette className="w-4 h-4" /> Identity System
            </h3>

            {/* Main Stage */}
            <div className="relative w-full max-w-md aspect-square bg-secondary/50 rounded-3xl border border-glass flex items-center justify-center p-12 overflow-hidden shadow-2xl backdrop-blur-sm transition-all duration-500">

                <AnimatePresence mode="wait">
                    {/* OLD IDENTITY */}
                    {view === 'old' && (
                        <motion.div
                            key="old"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            className="text-center"
                        >
                            <div className="w-40 h-40 bg-[#8b7355] rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg relative group">
                                <span className="text-4xl">🐟</span>
                                <div className="absolute inset-0 border-4 border-[#5d4037]/30 rounded-full border-dashed animate-[spin_10s_linear_infinite]"></div>
                            </div>
                            <h4 className="text-2xl font-serif text-[#8b7355] mb-2">Ocean Supply</h4>
                            <p className="text-sm text-[#5d4037]/60 font-mono">Commodity. Bulk. Invisible.</p>
                        </motion.div>
                    )}

                    {/* TRANSITION (Chaos/Construction) */}
                    {view === 'transition' && (
                        <motion.div
                            key="trans"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md"
                        >
                            <div className="grid grid-cols-3 grid-rows-3 gap-2 w-48 h-48">
                                {[...Array(9)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, rotate: 180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 2, opacity: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-indigo-500 rounded-sm"
                                    />
                                ))}
                            </div>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="absolute w-12 h-12 border-t-2 border-indigo-400 rounded-full"
                            />
                        </motion.div>
                    )}

                    {/* NEW IDENTITY (Fishgram) */}
                    {view === 'new' && (
                        <motion.div
                            key="new"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="text-center w-full"
                        >
                            {/* Logo Construction */}
                            <div className="relative w-48 h-48 mx-auto mb-8">
                                {/* The Grid */}
                                <div className="absolute inset-0 border border-white/5 rounded-full grid grid-cols-2 grid-rows-2">
                                    <div className="border-r border-b border-white/5"></div>
                                    <div className="border-b border-white/5"></div>
                                    <div className="border-r border-white/5"></div>
                                    <div></div>
                                </div>

                                {/* The Shape */}
                                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]">
                                    <motion.path
                                        d="M 50,20 C 70,20 85,35 85,50 C 85,65 70,80 50,80 C 30,80 15,65 15,50 C 15,35 30,20 50,20 Z"
                                        fill="transparent"
                                        stroke="var(--color-success)"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1 }}
                                    />
                                    <motion.path
                                        d="M 35,50 L 65,50 M 50,35 L 50,65"
                                        stroke="var(--color-chart-2)"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                    />
                                </svg>

                                {/* Floating Elements */}
                                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -top-2 -right-4 bg-teal-500 text-[10px] font-bold text-black px-2 py-1 rounded-full">
                                    Community
                                </motion.div>
                                <motion.div animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute -bottom-2 -left-4 bg-orange-500 text-[10px] font-bold text-white px-2 py-1 rounded-full">
                                    Safety
                                </motion.div>
                            </div>

                            <motion.h4
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="text-4xl font-black text-white tracking-tighter mb-2"
                            >
                                fishgram
                            </motion.h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Swatches */}
            <div className="flex gap-4 mt-8">
                <Swatch color="var(--color-success)" label="Ocean Teal" active={view === 'new'} />
                <Swatch color="var(--color-chart-2)" label="Lifejacket Orange" active={view === 'new'} />
                <Swatch color="var(--text-primary)" label="Fresh Silver" active={view === 'new'} />
            </div>
        </div>
    );
}

function Swatch({ color, label, active }: { color: string, label: string, active: boolean }) {
    return (
        <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${active ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-4 grayscale'}`}>
            <div className="w-12 h-12 rounded-full shadow-lg border-2 border-slate-700" style={{ backgroundColor: color }}></div>
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{label}</span>
        </div>
    )
}
