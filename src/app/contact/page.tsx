'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, MapPin, Linkedin, ArrowUpRight } from 'lucide-react';
import Footer from '@/components/Footer/Footer';

const PHONE = '9535710101';
const EMAIL = 'sureshthejosephite@gmail.com';

const CHANNELS = [
    {
        id: 'whatsapp',
        icon: MessageCircle,
        brand: '#25D366',
        title: 'WhatsApp',
        note: 'Fastest — I usually reply within the hour',
        cta: 'Say hi',
        href: `https://wa.me/91${PHONE}?text=${encodeURIComponent('Hi Suresh — found you through sureshvictor.com.')}`,
        external: true,
    },
    {
        id: 'email',
        icon: Mail,
        brand: '#EA4335',
        title: 'Email',
        note: 'For the longer, formal stuff — replies within a day',
        cta: EMAIL,
        href: `mailto:${EMAIL}?subject=${encodeURIComponent('Hello from sureshvictor.com')}`,
        external: false,
    },
    {
        id: 'call',
        icon: Phone,
        brand: 'var(--accent)',
        title: 'Call',
        note: 'If it can’t wait — IST daytime works best',
        cta: `+91 ${PHONE.slice(0, 5)} ${PHONE.slice(5)}`,
        href: `tel:+91${PHONE}`,
        external: false,
    },
];

const TOPICS = [
    'Product leadership roles',
    'Advisory & consulting',
    'AssetWorks AI',
    'Zero-to-one product builds',
    'Or just a good product debate',
];

const stagger = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.08 * i },
});

export default function ContactPage() {
    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg-primary)] px-4 sm:px-6 pt-28 pb-16">
                <div className="w-full max-w-3xl">
                    {/* Availability status */}
                    <motion.div {...stagger(0)} className="flex justify-center">
                        <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--glass-border)] bg-[var(--bg-secondary)] px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-success)] opacity-60" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-success)]" />
                            </span>
                            Open to new opportunities &amp; interesting conversations
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.div {...stagger(1)} className="mt-8 text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold normal-case tracking-tight text-[var(--text-primary)]">
                            Tell me what you&apos;re <span className="text-[var(--accent)]">building</span>.
                        </h1>
                        <p className="mx-auto mt-5 max-w-xl text-lg sm:text-xl leading-relaxed text-[var(--text-secondary)]">
                            Thirteen years of shipping products that scale — and the most interesting
                            ones all started with a message like the one you&apos;re about to send.
                        </p>
                    </motion.div>

                    {/* Channels */}
                    <motion.div {...stagger(2)} className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {CHANNELS.map((ch) => (
                            <a
                                key={ch.id}
                                href={ch.href}
                                {...(ch.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="group relative flex flex-col gap-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                style={{ ['--ch' as string]: ch.brand }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = ch.brand.startsWith('var') ? 'var(--accent)' : ch.brand; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; }}
                            >
                                <span
                                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                                    style={{ background: `color-mix(in srgb, ${ch.brand} 14%, transparent)` }}
                                >
                                    <ch.icon size={21} style={{ color: ch.brand }} />
                                </span>
                                <span className="flex items-center gap-1.5 text-base font-bold text-[var(--text-primary)]">
                                    {ch.title}
                                    <ArrowUpRight
                                        size={15}
                                        className="opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                                        style={{ color: ch.brand }}
                                    />
                                </span>
                                <span className="text-sm leading-relaxed text-[var(--text-secondary)]">{ch.note}</span>
                                <span className="mt-auto break-all font-mono text-xs text-[var(--text-muted)]">{ch.cta}</span>
                            </a>
                        ))}
                    </motion.div>

                    {/* Worth reaching out about */}
                    <motion.div {...stagger(3)} className="mt-12 text-center">
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            Worth reaching out about
                        </span>
                        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                            {TOPICS.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full border border-[var(--glass-border)] bg-[var(--bg-tertiary)] px-4 py-1.5 text-sm text-[var(--text-secondary)]"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Location + LinkedIn */}
                    <motion.div
                        {...stagger(4)}
                        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm text-[var(--text-muted)]"
                    >
                        <span className="inline-flex items-center gap-2">
                            <MapPin size={15} className="text-[var(--accent)]" />
                            Bangalore, India · IST (UTC+5:30)
                        </span>
                        <a
                            href="https://www.linkedin.com/in/sureshvictor/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 transition-colors hover:text-[var(--accent)]"
                        >
                            <Linkedin size={15} className="text-[var(--accent)]" />
                            Prefer LinkedIn? Connect there
                        </a>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </>
    );
}
