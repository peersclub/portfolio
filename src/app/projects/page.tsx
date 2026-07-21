'use client';

import { motion } from 'framer-motion';
import SelectedWork from '@/components/SelectedWork/SelectedWork';
import Footer from '@/components/Footer/Footer';

export default function ProjectsPage() {
    return (
        <>
            <div className="min-h-screen bg-[var(--bg-primary)]">
                <section className="relative flex min-h-[35vh] flex-col justify-end px-4 sm:px-6 pb-4 pt-24 sm:pt-32">
                    <div className="container mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)]"
                        >
                            Work
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 sm:mt-6 max-w-2xl text-lg sm:text-xl text-[var(--text-secondary)]"
                        >
                            Three case studies told in depth — problem, decisions, outcomes — and the
                            rest of the road that led here.
                        </motion.p>
                    </div>
                </section>
                <SelectedWork />
            </div>
            <Footer />
        </>
    );
}
