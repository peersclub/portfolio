'use client';

import { Project } from '@/data/projects';
import FinanceHero from './FinanceHero';
import WidgetShowcase from './WidgetShowcase';
import TechStack from './TechStack';
import PlatformOverview from './PlatformOverview';
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface AssetWorksLayoutProps {
    project: Project;
}

export default function AssetWorksLayout({ project }: AssetWorksLayoutProps) {
    useEffect(() => {
        // Initialize any AssetWorks-specific effects
    }, []);

    return (
        <div className="assetworks-page bg-[#0a0a0f] h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory text-slate-300 font-sans selection:bg-[#E8C547]/30">
            {/* Navigation Overlay */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <Link
                    href="/projects"
                    className="flex items-center gap-2 text-[#E8C547] hover:text-[#f0d579] transition-colors uppercase font-mono text-sm tracking-widest group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Projects</span>
                </Link>
                <a
                    href="https://assetworks.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#E8C547]/70 hover:text-[#E8C547] transition-colors font-mono text-xs tracking-widest"
                >
                    <span>assetworks.ai</span>
                    <ExternalLink className="w-3 h-3" />
                </a>
            </nav>

            {/* Hero Section */}
            <section className="h-screen w-full snap-start relative">
                <FinanceHero />
            </section>

            {/* Widget Showcase */}
            <section className="h-screen w-full snap-start relative">
                <WidgetShowcase />
            </section>

            {/* Tech Stack */}
            <section className="h-screen w-full snap-start relative">
                <TechStack />
            </section>

            {/* Platform Overview */}
            <section className="h-screen w-full snap-start relative">
                <PlatformOverview />
            </section>

            {/* Footer / Connect */}
            <section className="h-screen w-full snap-start relative flex flex-col items-center justify-center bg-[#0a0a0f]">
                <div className="text-center">
                    <p className="text-slate-500 mb-4 font-mono text-sm">Ready to revolutionize your investment workflow?</p>
                    <a
                        href="https://assetworks.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[#E8C547] text-[#0a0a0f] font-mono font-semibold hover:bg-[#f0d579] transition-all uppercase tracking-widest mb-6"
                    >
                        <span>Visit AssetWorks.ai</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                    <div className="mt-8">
                        <Link
                            href="/contact"
                            className="text-[#E8C547]/70 hover:text-[#E8C547] transition-colors font-mono text-sm underline underline-offset-4"
                        >
                            Or get in touch directly
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
