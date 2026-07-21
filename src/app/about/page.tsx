'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { StickySubNav } from '@/components/StickySubNav';
import Footer from '@/components/Footer/Footer';

const SECTIONS = [
    { id: 'who', label: 'Who I Am' },
    { id: 'how', label: 'How I Work' },
    { id: 'fit', label: 'Working Together' },
    { id: 'journey', label: 'The Journey' },
];

// Condensed from the retired /playbook — 3 phases, 9 steps
const PROCESS = [
    {
        phase: 'Discovery',
        steps: [
            { title: 'Stakeholder Alignment', desc: "Deconstructing business goals to find the 'True North'. I don't take requirements; I interrogate the problem space." },
            { title: 'User Research', desc: "Qualitative deep-dives and quantitative verification — uncovering needs users can't articulate themselves." },
            { title: 'Market Intelligence', desc: 'Finding white space in the competitive landscape — what competitors are ignoring.' },
        ],
    },
    {
        phase: 'Definition',
        steps: [
            { title: 'First Principles Framing', desc: "Boiling the problem down to fundamental truths and building up from there. No copy-paste solutions." },
            { title: 'System Architecture', desc: 'Mapping object relationships, data flows, and state logic before a single pixel is drawn.' },
            { title: 'Rapid Prototyping', desc: 'Low-fidelity validation loops to fail fast and cheap — testing core mechanics, not just UI.' },
        ],
    },
    {
        phase: 'Delivery',
        steps: [
            { title: 'Agile Development', desc: 'Iterative sprints with strict acceptance criteria. Value ships in vertical slices, not horizontal layers.' },
            { title: 'Quality Engineering', desc: "Automated testing plus manual polish. 'Works on my machine' is not a status." },
            { title: 'Launch & Telemetry', desc: 'Controlled rollout with real-time impact monitoring. Retention over vanity metrics.' },
        ],
    },
];

// Condensed from the retired /therightfit
const VALUES = [
    { title: 'Empathy & Logic', desc: 'Great products live at the intersection of deep human empathy and rigorous system logic. One cannot exist without the other.' },
    { title: 'Outcome > Output', desc: 'Success is user impact and business value — not features shipped or ticket velocity.' },
    { title: 'Simplicity', desc: 'Complexity is the enemy of scale. I simplify systems, processes, and interfaces relentlessly.' },
];

const GREEN_FLAGS = [
    'Your team values autonomous decision making over top-down directives.',
    'You prefer written documentation (async) over endless meetings (sync).',
    'Feedback is radical, candid, and treated as a mechanism for improvement.',
    "You define 'Done' as 'Verified in Production', not 'Merged to Master'.",
];

const RED_FLAGS = [
    "Decisions are made on HiPPO (Highest Paid Person's Opinion) rather than data.",
    "Engineers are treated as 'Ticket Monkeys' rather than product partners.",
    'Failure is punished rather than analyzed for root cause.',
    'Process is valued more than the actual product outcome.',
];

// Condensed from /mylife (the full chronicle lives on as an easter egg)
const JOURNEY = [
    { years: '2009 – 2013', label: 'NITK Surathkal', detail: 'B.Tech, Chemical Engineering — and the ENGINEER fest that taught orchestration' },
    { years: '2015 – 2019', label: 'The PM years', detail: 'KleverKid → BabyChakra (+42% retention) → Hopscotch' },
    { years: '2019 – 2024', label: 'Scale', detail: "CoinDCX to 1M+ users; CaptainFresh's first-in-industry supply chain products" },
    { years: '2024 – Present', label: 'Building', detail: 'SVP at Cox & Kings; co-founded AssetWorks AI' },
];

export default function AboutPage() {
    return (
        <>
            <div className="min-h-screen bg-[var(--bg-primary)]">
                {/* Hero */}
                <section className="relative flex min-h-[40vh] flex-col justify-end px-4 sm:px-6 pb-8 sm:pb-12 pt-24 sm:pt-32">
                    <div className="container mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)]"
                        >
                            About
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 sm:mt-6 max-w-2xl text-lg sm:text-xl text-[var(--text-secondary)]"
                        >
                            Who I am, how I work, and the signals that tell us we&apos;d build well together.
                        </motion.p>
                    </div>
                </section>

                <StickySubNav sections={SECTIONS} />

                <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
                    {/* Who I Am */}
                    <section id="who" className="mb-32 scroll-mt-48 pt-12">
                        <p className="max-w-3xl text-2xl sm:text-3xl font-light leading-relaxed text-[var(--text-primary)]">
                            I&apos;m driven by a simple mission: build high-quality, scalable products that people
                            genuinely love to use. From scaling India&apos;s largest crypto exchange to putting
                            border-safety alerts in fishermen&apos;s hands, I turn complex problems into products
                            that serve millions. Currently co-founding{' '}
                            <span className="text-[var(--accent)]">AssetWorks AI</span>.
                        </p>
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
                            {VALUES.map((v) => (
                                <div key={v.title} className="rounded-xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-5">
                                    <h3 className="text-base font-bold text-[var(--accent)]">{v.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* How I Work */}
                    <section id="how" className="mb-32 scroll-mt-32">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-10">How I work</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {PROCESS.map((group) => (
                                <div key={group.phase}>
                                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                                        {group.phase}
                                    </h3>
                                    <div className="flex flex-col gap-4">
                                        {group.steps.map((step) => (
                                            <div key={step.title} className="rounded-xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-4">
                                                <h4 className="text-sm font-semibold text-[var(--text-primary)]">{step.title}</h4>
                                                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">{step.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Working Together */}
                    <section id="fit" className="mb-32 scroll-mt-32">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-10">Working together</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-6">
                                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-success,#4ade80)] mb-4">
                                    We&apos;ll thrive if
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    {GREEN_FLAGS.map((f) => (
                                        <li key={f} className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                                            <Check size={16} className="mt-0.5 shrink-0 text-[var(--color-success,#4ade80)]" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-6">
                                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-error,#f87171)] mb-4">
                                    We&apos;ll struggle if
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    {RED_FLAGS.map((f) => (
                                        <li key={f} className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                                            <X size={16} className="mt-0.5 shrink-0 text-[var(--color-error,#f87171)]" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Journey */}
                    <section id="journey" className="mb-24 scroll-mt-32">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-10">The journey</h2>
                        <div className="flex flex-col gap-0">
                            {JOURNEY.map((j) => (
                                <div key={j.years} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 border-l-2 border-[var(--glass-border)] pl-6 pb-8 relative">
                                    <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[var(--accent)]" />
                                    <span className="font-mono text-xs text-[var(--text-muted)] sm:w-36 shrink-0">{j.years}</span>
                                    <div>
                                        <h4 className="text-base font-semibold text-[var(--text-primary)]">{j.label}</h4>
                                        <p className="text-sm text-[var(--text-secondary)]">{j.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-sm text-[var(--text-muted)]">
                            Want the long version?{' '}
                            <Link href="/mylife" className="text-[var(--accent)] hover:opacity-80">
                                Read the full chronicle
                            </Link>{' '}
                            or explore{' '}
                            <Link href="/network" className="text-[var(--accent)] hover:opacity-80">
                                my network in 3D
                            </Link>
                            .
                        </p>
                    </section>

                    {/* CTA */}
                    <section className="mb-12 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-8 sm:p-12 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Sound like a fit?</h2>
                        <p className="mt-3 text-[var(--text-secondary)]">I answer fast on WhatsApp and email.</p>
                        <Link
                            href="/contact"
                            className="mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                            style={{ background: 'var(--accent)' }}
                        >
                            Let&apos;s talk
                        </Link>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
