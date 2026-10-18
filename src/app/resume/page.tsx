"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { StickySubNav } from "@/components/StickySubNav";
import Footer from "@/components/Footer/Footer";
import ResumeGate from "@/components/ResumeGate/ResumeGate";
import {
    PROFILE,
    ROLES,
    EARLIER,
    SKILLS,
    EDUCATION,
    CERTIFICATIONS,
    ACTIVITIES,
    LANGUAGES,
    formatPeriod,
} from "@/data/career";

// The web version of the resume. Everything renders from data/career.ts,
// which mirrors the PDF line for line — edit there, not here.

const SECTIONS = [
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="mb-8 border-b border-[var(--glass-border)] pb-4 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] normal-case">
            {children}
        </h2>
    );
}

export default function ResumePage() {
    return (
        <>
            <div className="min-h-screen bg-[var(--bg-primary)]">
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
                            {PROFILE.headline}. {PROFILE.focus.replace(" · ", ", ")}. {PROFILE.location}.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6"
                        >
                            <ResumeGate tone="solid" label="Download PDF resume" />
                        </motion.div>
                    </div>
                </section>

                <StickySubNav sections={SECTIONS} rightElement={<ResumeGate tone="ghost" label="PDF" />} />

                <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-20">
                    <section id="summary" className="mb-24 scroll-mt-48 pt-8">
                        <SectionTitle>Summary</SectionTitle>
                        <p className="max-w-none text-xl sm:text-2xl font-light leading-relaxed text-[var(--text-primary)]">
                            {PROFILE.summary}
                        </p>
                    </section>

                    <section id="experience" className="mb-24 scroll-mt-32">
                        <SectionTitle>Experience</SectionTitle>
                        <ol className="flex flex-col">
                            {ROLES.map((r) => (
                                <li key={r.company} className="grid gap-x-8 gap-y-3 border-b border-[var(--glass-border)] py-8 sm:grid-cols-[12rem_1fr]">
                                    <div className="text-sm text-[var(--text-muted)] tabular-nums">
                                        <div>{formatPeriod(r)}</div>
                                        <div>{r.location}</div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold normal-case text-[var(--text-primary)]">
                                            {r.slug ? (
                                                <Link href={`/projects/${r.slug}`} className="group inline-flex items-center gap-1.5 hover:text-[var(--accent)]">
                                                    {r.company}
                                                    <ArrowUpRight size={18} className="opacity-50 transition-opacity group-hover:opacity-100" aria-label="Case study" />
                                                </Link>
                                            ) : (
                                                r.company
                                            )}
                                        </h3>
                                        <p className="mt-1 max-w-none font-medium text-[var(--text-secondary)]">{r.title}</p>
                                        {r.context && r.context.length > 80 && (
                                            <p className="mt-3 max-w-none text-sm leading-relaxed text-[var(--text-muted)]">{r.context}</p>
                                        )}
                                        <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 marker:text-[var(--accent)]">
                                            {r.bullets.map((b) => (
                                                <li key={b} className="leading-relaxed text-[var(--text-secondary)]">
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <p className="mt-6 max-w-none text-sm leading-relaxed text-[var(--text-muted)]">
                            <span className="font-semibold text-[var(--text-secondary)]">Earlier: </span>
                            {EARLIER}
                        </p>
                    </section>

                    <section id="skills" className="mb-24 scroll-mt-32">
                        <SectionTitle>Skills</SectionTitle>
                        <dl className="flex flex-col gap-6">
                            {SKILLS.map((g) => (
                                <div key={g.group} className="grid gap-2 sm:grid-cols-[12rem_1fr]">
                                    <dt className="font-semibold text-[var(--text-primary)]">{g.group}</dt>
                                    <dd className="leading-relaxed text-[var(--text-secondary)]">{g.items.join(", ")}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <section id="education" className="mb-24 scroll-mt-32">
                        <SectionTitle>Education</SectionTitle>
                        <div className="grid gap-2 sm:grid-cols-[12rem_1fr]">
                            <div className="text-sm text-[var(--text-muted)] tabular-nums">{EDUCATION.period}</div>
                            <div>
                                <h3 className="text-xl font-bold normal-case text-[var(--text-primary)]">{EDUCATION.degree}</h3>
                                <p className="mt-1 max-w-none text-[var(--text-secondary)]">{EDUCATION.school}</p>
                            </div>
                        </div>

                        <h3 className="mt-14 mb-4 text-lg font-bold normal-case text-[var(--text-primary)]">Certifications</h3>
                        <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-[var(--accent)]">
                            {CERTIFICATIONS.map((c) => (
                                <li key={c} className="leading-relaxed text-[var(--text-secondary)]">{c}</li>
                            ))}
                        </ul>

                        <h3 className="mt-14 mb-4 text-lg font-bold normal-case text-[var(--text-primary)]">Leadership and activities</h3>
                        <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-[var(--accent)]">
                            {ACTIVITIES.map((a) => (
                                <li key={a} className="leading-relaxed text-[var(--text-secondary)]">{a}</li>
                            ))}
                        </ul>

                        <h3 className="mt-14 mb-4 text-lg font-bold normal-case text-[var(--text-primary)]">Languages</h3>
                        <p className="max-w-none text-[var(--text-secondary)]">{LANGUAGES.join(", ")}</p>
                    </section>

                    <section className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-8 sm:p-12 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold normal-case text-[var(--text-primary)]">Want it as a PDF?</h2>
                        <p className="mx-auto mt-3 text-[var(--text-secondary)]">Enter your email and it downloads right away.</p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <ResumeGate tone="solid" label="Download PDF resume" />
                            <Link
                                href="/contact"
                                className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--glass-border)] px-5 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--text-primary)]"
                            >
                                Get in touch
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
