'use client';
import { motion } from 'framer-motion';
import { Laptop, Smartphone, Users, TrendingUp, MessageSquare, Layers } from 'lucide-react';

const platformFeatures = [
    {
        icon: MessageSquare,
        title: 'Conversational Analytics',
        description: 'Ask in plain English, get instant visualizations.',
    },
    {
        icon: Layers,
        title: 'Custom Dashboards',
        description: 'Drag-and-drop widget builder.',
    },
    {
        icon: TrendingUp,
        title: 'Real-time Data',
        description: 'Live feeds with sub-second latency.',
    },
    {
        icon: Users,
        title: 'Team Collaboration',
        description: 'Share and annotate in real-time.',
    },
];

const roleHighlights = [
    { label: 'Role', value: 'Co-Founder' },
    { label: 'Duration', value: '2025+' },
    { label: 'Focus', value: 'Product & Eng' },
];

export default function PlatformOverview() {
    return (
        <section className="h-screen w-full relative bg-gradient-to-b from-[#0a0a0f] to-[#0d1117] flex items-center justify-center px-4 overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-[#E8C547]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10 w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <span className="text-[#E8C547] font-mono text-sm tracking-widest uppercase">
                        The Platform
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-2">
                        Finance, <span className="text-[#E8C547]">Simplified</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-sm">
                        A full-stack SaaS platform transforming how investors interact with financial data.
                    </p>
                </motion.div>

                {/* Combined Layout: Mockups + Features */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Device Mockups */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Desktop Mockup */}
                        <div className="relative">
                            <div className="w-[320px] h-[200px] bg-gradient-to-br from-[#1c2128] to-[#161b22] rounded-lg border border-slate-700/50 shadow-xl overflow-hidden">
                                {/* Browser Header */}
                                <div className="h-6 bg-[#0d1117] border-b border-slate-700/50 flex items-center px-2 gap-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500/70" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/70" />
                                    <div className="flex-1 mx-2">
                                        <div className="bg-[#161b22] rounded h-3 flex items-center px-2">
                                            <span className="text-[8px] text-slate-500 font-mono">app.assetworks.ai</span>
                                        </div>
                                    </div>
                                </div>
                                {/* App Content */}
                                <div className="p-3 h-full">
                                    <div className="flex gap-3 h-full">
                                        <div className="w-8 flex flex-col gap-1.5">
                                            {[0, 1, 2, 3].map(i => (
                                                <div key={i} className={`h-5 rounded ${i === 0 ? 'bg-[#E8C547]/20' : 'bg-slate-700/30'}`} />
                                            ))}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 w-24 bg-slate-700/30 rounded" />
                                            <div className="h-20 bg-gradient-to-br from-[#E8C547]/10 to-transparent rounded border border-[#E8C547]/20 flex items-end p-2 gap-0.5">
                                                {[40, 60, 35, 70, 55, 80, 65].map((h, i) => (
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
                            <Laptop className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-6 text-slate-700" />
                        </div>

                        {/* Phone Mockup */}
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="absolute -right-4 -bottom-4 md:relative md:right-0 md:bottom-0 md:-ml-8"
                        >
                            <div className="w-[100px] h-[200px] bg-gradient-to-br from-[#1c2128] to-[#161b22] rounded-[20px] border-2 border-slate-700 shadow-xl overflow-hidden">
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-[#0d1117] rounded-full" />
                                <div className="pt-6 px-2 h-full">
                                    <div className="space-y-2">
                                        <div className="h-14 bg-gradient-to-br from-[#E8C547]/10 to-transparent rounded-lg border border-[#E8C547]/20 p-1.5">
                                            <div className="h-1.5 w-8 bg-[#E8C547]/30 rounded mb-1" />
                                            <div className="text-xs font-bold text-[#E8C547]">$48.3K</div>
                                            <div className="text-[8px] text-green-400">+12.4%</div>
                                        </div>
                                        {[0, 1].map(i => (
                                            <div key={i} className="h-8 bg-slate-700/20 rounded flex items-center px-1.5 gap-1.5">
                                                <div className="w-4 h-4 rounded bg-slate-600/50" />
                                                <div className="flex-1">
                                                    <div className="h-1.5 w-8 bg-slate-600/50 rounded" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Features + Role */}
                    <div className="space-y-6">
                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {platformFeatures.map((feature, idx) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-[#161b22]/50 border border-slate-700/30 rounded-lg p-3 hover:border-[#E8C547]/30 transition-colors"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <feature.icon className="w-4 h-4 text-[#E8C547]" />
                                        <span className="text-white font-medium text-sm">{feature.title}</span>
                                    </div>
                                    <p className="text-xs text-slate-400">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Role Highlight */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-[#E8C547]/10 via-[#E8C547]/5 to-transparent border border-[#E8C547]/20 rounded-xl p-4"
                        >
                            <h3 className="text-lg font-bold text-white mb-2">My Role</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Leading product vision and engineering execution—from AI architecture to Flutter apps.
                            </p>
                            <div className="flex gap-4">
                                {roleHighlights.map((item) => (
                                    <div key={item.label} className="text-center">
                                        <div className="text-base font-bold text-[#E8C547]">{item.value}</div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wide">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
