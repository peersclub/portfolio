'use client';

import { Project } from '@/data/projects';
import FinanceHero from './FinanceHero';
import WidgetShowcase from './WidgetShowcase';
import TechStack from './TechStack';
import PlatformOverview from './PlatformOverview';
import { useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface AssetWorksLayoutProps {
    project: Project;
}

export default function AssetWorksLayout({ project }: AssetWorksLayoutProps) {
    useEffect(() => {
        // Initialize any AssetWorks-specific effects
    }, []);

    return (
        <div className="assetworks-page bg-[#0a0a0f] h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory text-slate-300 font-sans selection:bg-[#E8C547]/30">
            
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
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[#E8C547] text-[#0a0a0f] font-mono font-semibold hover:bg-[#f0d579] transition-all uppercase tracking-widest mb-6"
                    >
                        <span>Let&apos;s talk</span>
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
