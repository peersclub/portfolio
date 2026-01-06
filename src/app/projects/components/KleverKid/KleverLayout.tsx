'use client';

import { Project } from '@/data/projects';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import PlayHero from './PlayHero';
import ActivityMap from './ActivityMap';
import BookingFlow from './BookingFlow';

interface KleverLayoutProps {
    project: Project;
}

export default function KleverLayout({ project }: KleverLayoutProps) {
    return (
        <div className="klever-page bg-[#EFF6FF] h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory font-sans selection:bg-[#60A5FA]/30">
            {/* Fun Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-white/50 backdrop-blur-md">
                <Link
                    href="/projects"
                    className="flex items-center gap-2 text-[#2563EB] hover:scale-105 transition-transform font-bold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Projects</span>
                </Link>
                <div className="px-4 py-1 bg-[#F59E0B] text-white rounded-full font-bold text-xs uppercase tracking-wide shadow-md">
                    Product Manager
                </div>
            </nav>

            {/* Hero */}
            <section className="h-screen w-full snap-start relative">
                <PlayHero />
            </section>

            {/* Discovery Map */}
            <section className="h-screen w-full snap-start relative">
                <ActivityMap />
            </section>

            {/* Booking Gamification */}
            <section className="h-screen w-full snap-start relative">
                <BookingFlow />
            </section>

            {/* Footer */}
            <section className="h-[50vh] w-full snap-start relative flex flex-col items-center justify-center bg-[#2563EB] text-white bg-[url('/grid.svg')]">
                <div className="text-center">
                    <h3 className="text-3xl font-black mb-6 transform -rotate-2">Keep Learning!</h3>
                    <p className="max-w-md mx-auto mb-8 opacity-90">
                        KleverKid helped thousands of parents find the perfect after-school programs.
                    </p>
                    <a
                        href="https://kleverkid.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2563EB] font-bold rounded-xl shadow-[0_8px_0_rgba(0,0,0,0.1)] hover:translate-y-1 hover:shadow-[0_4px_0_rgba(0,0,0,0.1)] transition-all"
                    >
                        <span>Visit Archive</span>
                        <ExternalLink className="w-5 h-5" />
                    </a>
                </div>
            </section>
        </div>
    );
}
