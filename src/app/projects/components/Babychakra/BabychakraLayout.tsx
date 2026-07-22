'use client';

import { Project } from '@/data/projects';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import NurtureHero from './NurtureHero';
import GrowthTracker from './GrowthTracker';
import CommunityGraph from './CommunityGraph';

interface BabychakraLayoutProps {
    project: Project;
}

export default function BabychakraLayout({ project }: BabychakraLayoutProps) {
    const pink = '#F472B6';

    return (
        <div className="babychakra-page bg-white min-h-screen font-sans selection:bg-[#F472B6]/30">
            
            <main className="pt-0">
                <NurtureHero />

                <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <GrowthTracker />
                    </div>
                </section>

                <section className="py-24 bg-[#FFF5F7]">
                    <div className="max-w-6xl mx-auto px-6">
                        <CommunityGraph />
                    </div>
                </section>

                <section className="py-24 text-center">
                    <h3 className="text-3xl font-bold text-[#831843] mb-6">Join the Community</h3>
                    <a
                        href="https://www.babychakra.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#DB2777] text-white font-bold rounded-full shadow-lg hover:bg-[#BE185D] transition-all transform hover:scale-105"
                    >
                        <span>Visit BabyChakra</span>
                        <ExternalLink className="w-5 h-5" />
                    </a>
                </section>
            </main>
        </div>
    );
}
