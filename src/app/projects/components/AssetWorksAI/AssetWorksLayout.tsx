'use client';

import { Project } from '@/data/projects';
import FinanceHero from './FinanceHero';
import WidgetShowcase from './WidgetShowcase';
import TechStack from './TechStack';
import PlatformOverview from './PlatformOverview';
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface AssetWorksLayoutProps {
    project: Project;
}

export default function AssetWorksLayout({ project }: AssetWorksLayoutProps) {
    useEffect(() => {
        // Initialize any AssetWorks-specific effects
    }, []);

    return (
        <div className="assetworks-page bg-[#0a0a0f] min-h-screen text-slate-300 font-sans selection:bg-[#E8C547]/30">
            {/* Navigation Overlay */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <Link
                    href="/projects"
                    className="flex items-center gap-2 text-[#E8C547] hover:text-[#f0d579] transition-colors uppercase font-mono text-sm tracking-widest group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Projects</span>
                </Link>
                <div className="font-mono text-xs text-[#E8C547]/50">
                    Co-Founder // 2025
                </div>
            </nav>

            {/* Hero Section */}
            <section className="h-screen w-full relative">
                <FinanceHero />
            </section>

            {/* Widget Showcase */}
            <WidgetShowcase />

            {/* Tech Stack */}
            <TechStack />

            {/* Platform Overview */}
            <PlatformOverview />

            {/* Footer / Connect */}
            <div className="py-24 flex flex-col items-center justify-center bg-[#0a0a0f] border-t border-[#E8C547]/10">
                <p className="text-slate-500 mb-6 font-mono text-sm">Ready to revolutionize your investment workflow?</p>
                <Link
                    href="/contact"
                    className="px-8 py-3 border border-[#E8C547] text-[#E8C547] font-mono hover:bg-[#E8C547] hover:text-[#0a0a0f] transition-all uppercase tracking-widest"
                >
                    Get in Touch
                </Link>
            </div>
        </div>
    );
}
