'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Sections
import IntroVisual from './sections/IntroVisual';
import ProblemSection from './sections/ProblemSection';
import JourneyMap from './sections/JourneyMap';
import BrandMakeover from './sections/BrandMakeover';
import AppShowcase from './sections/AppShowcase';
import { Project } from '@/data/projects';

interface StoryLayoutProps {
    project: Project;
}

export default function StoryLayout({ project }: StoryLayoutProps) {
    const [activeSection, setActiveSection] = useState(-1); // Start with intro
    const introRef = useRef(null);
    const introInView = useInView(introRef, { amount: 0.5 });

    // Forces dark mode and Window-Level Scroll Snap
    useEffect(() => {
        // Theme
        document.documentElement.style.setProperty('--bg-primary', 'var(--bg-primary)');
        document.documentElement.style.setProperty('--text-primary', 'var(--text-primary)');

        // Apply scroll-snap to the html element for window-level snapping
        document.documentElement.style.scrollSnapType = 'y mandatory';
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.style.overflow = 'auto'; // Ensure body is scrollable

        return () => {
            // Cleanup on unmount
            document.documentElement.style.scrollSnapType = '';
            document.documentElement.style.scrollBehavior = '';
        };
    }, []);

    // Track intro section visibility
    useEffect(() => {
        if (introInView) setActiveSection(-1);
    }, [introInView]);

    return (
        <div className="min-h-screen w-full bg-primary text-slate-50 font-sans selection:bg-indigo-500/30">

            {/* Sticky Nav */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference pointer-events-none">
                <Link href="/projects" className="pointer-events-auto flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase font-mono text-sm tracking-widest group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Projects</span>
                </Link>
                <div className="font-mono text-xs text-white/30 hidden md:block">
                    STORY MODE // {activeSection === -1 ? 'INTRO' : `${activeSection + 1}/4`}
                </div>
            </nav>

            <div className="flex flex-col md:flex-row w-full relative">
                {/* LEFT: Scrollable Narrative Content */}
                <div className="w-full md:w-1/2 z-10 relative">

                    {/* Intro Section */}
                    <header ref={introRef} className="h-screen w-full flex items-center justify-center p-8 md:p-20 snap-start snap-always">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="max-w-xl"
                        >
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                                THE CATCH
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light">
                                Technology often forgets the hands that feed it. <br />
                                This is the story of how we built for the <strong className="text-white font-medium">1%.</strong>
                                <span className="text-sm uppercase tracking-widest opacity-50 mt-4 block">The 1% who risk their lives at sea every day.</span>
                            </p>
                            <div className="mt-4 text-xs text-slate-600 font-mono text-center border-t border-slate-800 pt-4">
                                <span className="text-slate-500">Sources: </span>
                                FAO Fisheries Report 2023 • CMFRI Annual Census •
                                <span className="text-indigo-400"> 400+ Field Interviews</span>
                            </div>
                            <div className="mt-8 animate-bounce text-center text-slate-500 text-sm font-mono uppercase tracking-widest">
                                Scroll to Dive In
                            </div>
                        </motion.div>
                    </header>

                    <ScrollSection index={0} setActive={setActiveSection}>
                        <h2 className="text-4xl font-bold mb-6 text-red-500">The Fading Coastline</h2>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            India's fishing communities are in crisis. With fuel prices rising and fish stocks migrating deeper due to climate change, the small-scale fisherman is being squeezed out.
                        </p>
                        <div className="pl-6 border-l-2 border-red-500/30 mb-8">
                            <p className="italic text-slate-400">"My father was a fisherman. I am a fisherman. But I don't want my son to touch a net."</p>
                            <span className="text-sm font-mono text-red-400 mt-2 block">— Fisherman in Nagapattinam</span>
                        </div>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            It's not just about hard work anymore. It's a gamble. Every trip costs ₹5,000 in fuel. If they catch nothing, they slide deeper into debt.
                        </p>
                    </ScrollSection>

                    <ScrollSection index={1} setActive={setActiveSection}>
                        <h2 className="text-4xl font-bold mb-6 text-amber-500">1,000 km of Truth</h2>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            We didn't build from a glass office. We drove from Pulicut (North TN) to Kanyakumari (The Southern Tip).
                        </p>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            We slept in harbors, woke up at 3 AM for auctions, and sat on boats. We learned that trust is the only currency that matters.
                        </p>
                        <ul className="space-y-4 font-mono text-sm text-amber-200/60">
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> 30 Villages visited</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> 400+ Interviews</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> 0 Assumptions left</li>
                        </ul>
                    </ScrollSection>

                    <ScrollSection index={2} setActive={setActiveSection}>
                        <h2 className="text-4xl font-bold mb-6 text-teal-400">Fishgram Identity</h2>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            They needed a tool that felt like theirs. Not a corporate logistic tool, but a community platform.
                        </p>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            We pivoted the brand from "Supply Chain Efficiency" to "Fisherman Empowerment". The new identity draws from the colors of their world:
                            The <span className="text-teal-400">Deep Ocean Teal</span>, the <span className="text-orange-400">Safety Orange</span> of life jackets, and the <span className="text-slate-400">Silver</span> of a fresh catch.
                        </p>
                    </ScrollSection>

                    <ScrollSection index={3} setActive={setActiveSection}>
                        <h2 className="text-4xl font-bold mb-6 text-indigo-400">The Solution</h2>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            A SuperApp that handles everything: Weather forecasts, PFZ (Potential Fishing Zone) satellite data, and a marketplace to sell their catch before they even dock.
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            By reducing uncertainty, we increased their average monthly income by 40%.
                        </p>
                    </ScrollSection>

                    {/* Footer / Outro */}
                    <div className="h-screen w-full flex items-center justify-center snap-start snap-always bg-slate-950">
                        <Link href="/projects" className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors">
                            Next Project →
                        </Link>
                    </div>
                </div>

                {/* RIGHT: Sticky Visuals */}
                <div className="hidden md:flex w-1/2 h-screen sticky top-0 right-0 bg-slate-900 border-l border-slate-800 items-center justify-center overflow-hidden z-0">
                    <VisualContainer activeSection={activeSection} />
                </div>
            </div>
        </div>
    );
}

function ScrollSection({ children, index, setActive }: { children: React.ReactNode, index: number, setActive: (i: number) => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 });

    useEffect(() => {
        if (isInView) setActive(index);
    }, [isInView, index, setActive]);

    return (
        <section
            ref={ref}
            className="h-screen w-full flex flex-col justify-center p-8 md:p-20 snap-start snap-always border-b border-slate-800/50"
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {children}
            </motion.div>
        </section>
    );
}

function VisualContainer({ activeSection }: { activeSection: number }) {
    return (
        <div className="w-full h-full relative">
            {/* Intro: Industry Scale Data */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${activeSection === -1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <IntroVisual />
            </div>

            {/* Section 0: The Problem/Crisis */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${activeSection === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <ProblemSection />
            </div>

            {/* Section 1: Journey Map */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${activeSection === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <JourneyMap />
            </div>

            {/* Section 2: Brand Makeover */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${activeSection === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <BrandMakeover />
            </div>

            {/* Section 3: App Showcase */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${activeSection === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <AppShowcase />
            </div>
        </div>
    );
}
