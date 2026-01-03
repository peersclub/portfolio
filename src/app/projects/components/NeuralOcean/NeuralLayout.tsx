'use client';

import { Project } from '@/data/projects';
import ParticleHero from './ParticleHero';
import SensorMap from './SensorMap';
import HoloAuction from './HoloAuction';
import DataTunnel from './DataTunnel';
import ProcessFlow from './ProcessFlow';
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface NeuralLayoutProps {
    project: Project;
}

export default function NeuralLayout({ project }: NeuralLayoutProps) {

    // Smooth scroll setup could go here
    useEffect(() => {
        // Initialize any specific Neural Layout effects
    }, []);

    return (
        <div className="neural-fresh-page bg-primary h-screen overflow-y-scroll snap-y snap-mandatory text-slate-300 font-sans selection:bg-cyan-500/30">
            {/* Removed forced style overrides to allow global theme to work */}
            {/* Navigation Overlay */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <Link href="/projects" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors uppercase font-mono text-sm tracking-widest group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Return to Base</span>
                </Link>
                <div className="font-mono text-xs text-cyan-500/50">
                    SECURE CONNECTION // ENCRYPTED
                </div>
            </nav>

            {/* Hero Section: Entropy vs Signal */}
            <section className="h-screen w-full snap-start relative">
                <ParticleHero />
            </section>

            {/* Phase 2: Sensor Mesh */}
            <section className="h-screen w-full snap-start relative">
                <SensorMap />
            </section>

            {/* Phase 3: Market & Logistics */}
            <section className="h-screen w-full snap-start relative">
                <HoloAuction />
            </section>
            <section className="h-screen w-full snap-start relative">
                <DataTunnel />
            </section>

            {/* Phase 4: Process Flow (How it works) */}
            <ProcessFlow />

            {/* Footer / Connect */}
            <div className="py-24 flex items-center justify-center bg-primary border-t border-cyan-900/30">
                <Link href="/contact" className="px-8 py-3 border border-cyan-500 text-cyan-500 font-mono hover:bg-cyan-500 hover:text-[#020c1b] transition-all">
                    INITIATE HANDSHAKE protocol://connect
                </Link>
            </div>

        </div>
    );
}
