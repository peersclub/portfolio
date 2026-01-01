"use client";

import { StickySubNav } from "@/components/StickySubNav";
import { ExperienceCard } from "@/components/Resume/ExperienceCard";
import { motion } from "framer-motion";
import Footer from "@/components/Footer/Footer";

const SECTIONS = [
    { id: "summary", label: "About Me" },
    { id: "experience", label: "Experience" },
    { id: "roles", label: "Roles" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
];

const EXPERIENCE_DATA = [
    {
        company: "AssetWorks AI",
        roles: [
            {
                title: "Co-Founder & CPO",
                period: "2023 - Present",
                details: [
                    "Building the first AI-Native financial analytics platform.",
                    "Making sophisticated financial analysis accessible through natural language interfaces.",
                    "Leading product strategy, design, and engineering.",
                ],
            },
        ],
    },
    {
        company: "CoinDCX",
        roles: [
            {
                title: "Director of Product",
                period: "2021 - 2023",
                details: [
                    "Scaled India's largest crypto exchange to 1M+ users.",
                    "Led the core exchange product and growth initiatives.",
                    "Launched multiple crypto-native financial products.",
                ],
            },
        ],
    },
    {
        company: "CaptainFresh",
        roles: [
            {
                title: "Senior Product Manager",
                period: "2020 - 2021",
                details: [
                    "Built the industry's first B2B supply chain platform for fisheries.",
                    "Optimized supply chain efficiency and marketplace liquidity.",
                ],
            },
        ],
    },
];

const SKILLS = [
    "Product Strategy",
    "AI & LLMs",
    "Web3 & Fintech",
    "System Architecture",
    "Team Leadership",
    "Growth & Retention",
    "Go-to-Market",
    "UI/UX Design"
];

export default function ResumePage() {
    return (
        <>
            <div className="min-h-screen bg-[var(--bg-primary)]">
                {/* Hero Section */}
                {/* Hero Section */}
                <section className="relative flex min-h-[40vh] flex-col justify-end px-4 sm:px-6 pb-8 sm:pb-12 pt-24 sm:pt-32">
                    <div className="container mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)]"
                        >
                            Suresh <span className="text-[var(--text-muted)]">Victor</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 sm:mt-6 max-w-2xl text-lg sm:text-xl text-[var(--text-secondary)]"
                        >
                            Product Architect building systems that scale.
                        </motion.p>
                    </div>
                </section>

                <StickySubNav
                    sections={SECTIONS}
                    rightElement={
                        <a
                            href="/resume.pdf"
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] transition-opacity hover:opacity-80"
                            download
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                            Get Resume
                        </a>
                    }
                />

                <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
                    {/* Summary Section */}
                    <section id="summary" className="mb-32 scroll-mt-48 pt-12">
                        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--accent)] opacity-30">01</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-30" />
                        </div>
                        <p className="max-w-3xl text-3xl font-light leading-relaxed text-[var(--text-primary)]">
                            I sit at the intersection of <span className="text-[var(--accent)]">Design</span>, <span className="text-[var(--accent)]">Technology</span>, and <span className="text-[var(--accent)]">Business</span>. With over a decade of experience, I don't just manage products; I architect ecosystems that solve complex human problems.
                        </p>
                    </section>

                    {/* Experience Section */}
                    <section id="experience" className="mb-32 scroll-mt-32">
                        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--accent)] opacity-30">02</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-30" />
                        </div>
                        <div className="grid gap-6 md:grid-cols-1">
                            {EXPERIENCE_DATA.map((exp, idx) => (
                                <ExperienceCard key={idx} {...exp} />
                            ))}
                        </div>
                    </section>

                    {/* Roles Section */}
                    <section id="roles" className="mb-32 scroll-mt-32">
                        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--accent)] opacity-30">03</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-30" />
                        </div>
                        <ExperienceCard
                            company="Previous Roles"
                            roles={[
                                { title: "Product Manager @ Babychakra", period: "2018-2020", details: ["Increased retention by 42% in 8 months.", "Scaled parenting community platform."] },
                                { title: "Product Engineer @ Early Startups", period: "2014-2018", details: ["Foundational engineering and product roles."] }
                            ]}
                        />
                    </section>

                    {/* Skills Section */}
                    <section id="skills" className="mb-32 scroll-mt-32">
                        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--accent)] opacity-30">04</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-30" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {SKILLS.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="rounded-full border border-[var(--glass-border)] bg-[var(--bg-tertiary)] px-4 py-2 text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Education Section */}
                    <section id="education" className="mb-32 scroll-mt-32">
                        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--accent)] opacity-30">05</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-30" />
                        </div>
                        <div className="border-l-2 border-[var(--glass-border)] pl-6">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-[var(--text-primary)]">National Institute of Technology Karnataka</h3>
                                <p className="text-[var(--text-secondary)]">B.Tech in Computer Science</p>
                                <p className="text-sm text-[var(--text-muted)]">2010 - 2014</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
