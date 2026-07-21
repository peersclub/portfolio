'use client';

import { Project } from '@/data/projects';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import TravelHero from './TravelHero';
import ItineraryEngine from './ItineraryEngine';
import DestinationAI from './DestinationAI';

interface CoxLayoutProps {
    project: Project;
}

export default function CoxLayout({ project }: CoxLayoutProps) {
    return (
        <div className="cox-page bg-[#F3F4F6] h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory font-sans selection:bg-[#A78BFA]/30">
            {/* Navigation Overlay */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <Link
                    href="/projects"
                    className="flex items-center gap-2 text-white hover:text-[#A78BFA] transition-colors uppercase font-serif tracking-widest group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Projects</span>
                </Link>
                <div className="font-serif italic text-white/70">
                    SVP Product & Tech // 2024-Present
                </div>
            </nav>

            {/* Hero Section */}
            <section className="h-screen w-full snap-start relative">
                <TravelHero project={project} />
            </section>

            {/* Smart Itinerary */}
            <section className="h-screen w-full snap-start relative">
                <ItineraryEngine />
            </section>

            {/* AI Graph */}
            <section className="h-screen w-full snap-start relative">
                <DestinationAI />
            </section>

            {/* Footer */}
            <section className="h-[50vh] w-full snap-start relative flex flex-col items-center justify-center bg-[#1e1b4b] text-white">
                <div className="text-center">
                    <h3 className="text-3xl font-serif mb-6">The Journey Continues</h3>
                </div>
            </section>
        </div>
    );
}
