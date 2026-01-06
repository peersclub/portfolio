'use client';

import { Project } from '@/data/projects';
import CryptoHero from './CryptoHero';
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import ProTerminal from './ProTerminal';
import SecurityStack from './SecurityStack';
import AppEcosystem from './AppEcosystem';

interface CoinDCXLayoutProps {
    project: Project;
}

export default function CoinDCXLayout({ project }: CoinDCXLayoutProps) {
    return (
        <div className="coindcx-page bg-[#0f172a] h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory text-slate-300 font-sans selection:bg-[#4ECDC4]/30">
            {/* Navigation Overlay */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <Link
                    href="/projects"
                    className="flex items-center gap-2 text-[#4ECDC4] hover:text-white transition-colors uppercase font-mono text-sm tracking-widest group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Projects</span>
                </Link>
                <div className="font-mono text-xs text-[#4ECDC4]/70">
                    Product Leader // 2019-2021
                </div>
            </nav>

            {/* Hero Section */}
            <section className="h-screen w-full snap-start relative">
                <CryptoHero />
            </section>

            {/* Pro Terminal (Trading) */}
            <section className="h-screen w-full snap-start relative">
                <ProTerminal />
            </section>

            {/* Security Architecture */}
            <section className="h-screen w-full snap-start relative">
                <SecurityStack />
            </section>

            {/* App Ecosystem */}
            <section className="h-screen w-full snap-start relative">
                <AppEcosystem />
            </section>

            {/* Footer */}
            <section className="h-screen w-full snap-start relative flex flex-col items-center justify-center bg-[#0f172a] bg-grid-slate-800/[0.2]">
                <div className="text-center">
                    <p className="text-slate-500 mb-4 font-mono text-sm">Experience the future of trading</p>
                    <a
                        href="https://coindcx.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[#4ECDC4] text-[#0f172a] font-mono font-semibold hover:bg-white transition-all uppercase tracking-widest mb-6 rounded-sm"
                    >
                        <span>Visit CoinDCX.com</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </section>
        </div>
    );
}
