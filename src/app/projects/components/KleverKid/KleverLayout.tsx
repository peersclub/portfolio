'use client';

import { Project } from '@/data/projects';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PlayHero from './PlayHero';
import ActivityMap from './ActivityMap';
import BookingFlow from './BookingFlow';

interface KleverLayoutProps {
    project: Project;
}

export default function KleverLayout({ project }: KleverLayoutProps) {
    return (
        <div className="klever-page bg-[#EFF6FF] h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory font-sans selection:bg-[#60A5FA]/30">
            
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
                </div>
            </section>
        </div>
    );
}
