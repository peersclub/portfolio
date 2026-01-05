'use client';
import { motion } from 'framer-motion';
import { Laptop, Smartphone, Users, TrendingUp, MessageSquare, Layers } from 'lucide-react';
import Image from 'next/image';

const platformFeatures = [
    {
        icon: MessageSquare,
        title: 'Conversational Analytics',
        description: 'Ask questions in plain English, get instant visualizations and insights.',
    },
    {
        icon: Layers,
        title: 'Custom Dashboards',
        description: 'Build and share personalized dashboards with drag-and-drop widgets.',
    },
    {
        icon: TrendingUp,
        title: 'Real-time Market Data',
        description: 'Live feeds from major exchanges with sub-second latency.',
    },
    {
        icon: Users,
        title: 'Team Collaboration',
        description: 'Share insights, annotate charts, and collaborate in real-time.',
    },
];

const roleHighlights = [
    { label: 'Role', value: 'Co-Founder' },
    { label: 'Duration', value: '2025 - Present' },
    { label: 'Focus', value: 'Product & Engineering' },
];

export default function PlatformOverview() {
    return (
        <section className="min-h-screen w-full relative bg-gradient-to-b from-[#0a0a0f] to-[#0d1117] py-24 px-4 overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#E8C547]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-[#E8C547] font-mono text-sm tracking-widest uppercase">
                        The Platform
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
                        Finance, <span className="text-[#E8C547]">Simplified</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        A full-stack SaaS platform that transforms how investors interact with financial data.
                        Available on web and mobile.
                    </p>
                </motion.div>

                {/* Device Mockups */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative mb-24"
                >
                    <div className="flex items-center justify-center gap-8">
                        {/* Desktop Mockup */}
                        <div className="relative hidden md:block">
                            <div className="w-[500px] h-[320px] bg-gradient-to-br from-[#1c2128] to-[#161b22] rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden">
                                {/* Browser Header */}
                                <div className="h-8 bg-[#0d1117] border-b border-slate-700/50 flex items-center px-3 gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                                    <div className="flex-1 mx-4">
                                        <div className="bg-[#161b22] rounded h-4 flex items-center px-2">
                                            <span className="text-[10px] text-slate-500 font-mono">app.assetworks.ai</span>
                                        </div>
                                    </div>
                                </div>
                                {/* App Content */}
                                <div className="p-4 h-full">
                                    <div className="flex gap-4 h-full">
                                        {/* Sidebar */}
                                        <div className="w-12 flex flex-col gap-2">
                                            {[0, 1, 2, 3, 4].map(i => (
                                                <div key={i} className={`h-8 rounded ${i === 0 ? 'bg-[#E8C547]/20' : 'bg-slate-700/30'}`} />
                                            ))}
                                        </div>
                                        {/* Main Area */}
                                        <div className="flex-1 space-y-3">
                                            <div className="h-6 w-48 bg-slate-700/30 rounded" />
                                            <div className="grid grid-cols-3 gap-2">
                                                {[0, 1, 2].map(i => (
                                                    <div key={i} className="h-16 bg-slate-700/20 rounded-lg border border-slate-700/30" />
                                                ))}
                                            </div>
                                            <div className="h-32 bg-gradient-to-br from-[#E8C547]/10 to-transparent rounded-lg border border-[#E8C547]/20 flex items-end p-3 gap-1">
                                                {[40, 60, 35, 70, 55, 80, 65, 75, 85].map((h, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ height: 0 }}
                                                        whileInView={{ height: `${h}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: i * 0.05 }}
                                                        className="flex-1 bg-[#E8C547]/60 rounded-t"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Laptop Stand */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-3 bg-slate-700 rounded-b-lg" />
                            <Laptop className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-8 text-slate-600" />
                        </div>

                        {/* Phone Mockup */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="relative"
                        >
                            <div className="w-[180px] h-[380px] bg-gradient-to-br from-[#1c2128] to-[#161b22] rounded-[32px] border-4 border-slate-700 shadow-2xl overflow-hidden">
                                {/* Notch */}
                                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#0d1117] rounded-full" />
                                {/* Screen Content */}
                                <div className="pt-10 px-3 h-full">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div className="h-4 w-24 bg-slate-700/30 rounded" />
                                            <div className="w-6 h-6 rounded-full bg-[#E8C547]/20" />
                                        </div>
                                        <div className="h-24 bg-gradient-to-br from-[#E8C547]/10 to-transparent rounded-xl border border-[#E8C547]/20 p-2">
                                            <div className="h-2 w-16 bg-[#E8C547]/30 rounded mb-2" />
                                            <div className="text-xl font-bold text-[#E8C547]">$48,293</div>
                                            <div className="text-[10px] text-green-400">+12.4%</div>
                                        </div>
                                        <div className="space-y-2">
                                            {[0, 1, 2].map(i => (
                                                <div key={i} className="h-12 bg-slate-700/20 rounded-lg flex items-center px-2 gap-2">
                                                    <div className="w-6 h-6 rounded bg-slate-600/50" />
                                                    <div className="flex-1">
                                                        <div className="h-2 w-12 bg-slate-600/50 rounded mb-1" />
                                                        <div className="h-2 w-8 bg-slate-700/50 rounded" />
                                                    </div>
                                                    <div className="text-[10px] text-[#E8C547]">+{(Math.random() * 10).toFixed(1)}%</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Smartphone className="absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-slate-600 opacity-30" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {platformFeatures.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#161b22]/50 border border-slate-700/30 rounded-xl p-5 hover:border-[#E8C547]/30 transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-[#E8C547]/10 flex items-center justify-center mb-4 group-hover:bg-[#E8C547]/20 transition-colors">
                                <feature.icon className="w-5 h-5 text-[#E8C547]" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Role Highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#E8C547]/10 via-[#E8C547]/5 to-transparent border border-[#E8C547]/20 rounded-2xl p-8"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-2">My Role</h3>
                            <p className="text-slate-400">
                                As Co-Founder, I lead both product vision and engineering execution.
                                From designing the AI integration architecture to building the Flutter mobile apps,
                                I'm hands-on across the entire stack.
                            </p>
                        </div>
                        <div className="flex gap-6">
                            {roleHighlights.map((item) => (
                                <div key={item.label} className="text-center">
                                    <div className="text-xl font-bold text-[#E8C547]">{item.value}</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wide">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
