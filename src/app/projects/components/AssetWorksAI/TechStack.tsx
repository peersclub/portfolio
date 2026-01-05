'use client';
import { motion } from 'framer-motion';
import { Bot, Server, Smartphone, Zap, Shield, Globe } from 'lucide-react';

const technologies = [
    {
        name: 'Claude AI',
        role: 'Primary Intelligence',
        description: 'Anthropic\'s Claude for natural language understanding and financial analysis',
        icon: Bot,
        color: '#D97757',
        stats: ['Context Understanding', 'Complex Reasoning', 'Safe Outputs'],
    },
    {
        name: 'OpenAI GPT',
        role: 'Multi-Model Support',
        description: 'GPT models for diverse AI capabilities and fallback processing',
        icon: Bot,
        color: '#10B981',
        stats: ['Wide Compatibility', 'Fast Processing', 'Rich APIs'],
    },
    {
        name: 'Rust Backend',
        role: 'High-Performance Core',
        description: 'Memory-safe, blazingly fast backend for real-time data processing',
        icon: Server,
        color: '#F97316',
        stats: ['Zero-Cost Abstractions', 'Concurrent Processing', 'Type Safety'],
    },
    {
        name: 'Flutter Apps',
        role: 'Cross-Platform Mobile',
        description: 'Native mobile experience on iOS and Android from single codebase',
        icon: Smartphone,
        color: '#00B4D8',
        stats: ['60fps Performance', 'Hot Reload', 'Material Design'],
    },
];

const features = [
    { icon: Zap, label: 'Real-time Updates', value: '<100ms' },
    { icon: Shield, label: 'Enterprise Security', value: 'SOC 2' },
    { icon: Globe, label: 'Global CDN', value: '99.99%' },
];

export default function TechStack() {
    return (
        <section className="min-h-screen w-full relative bg-[#0a0a0f] py-24 px-4 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #E8C547 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-[#E8C547] font-mono text-sm tracking-widest uppercase">
                        Technology Architecture
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
                        Built for <span className="text-[#E8C547]">Scale</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        A modern tech stack combining cutting-edge AI with battle-tested infrastructure.
                    </p>
                </motion.div>

                {/* Tech Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    {technologies.map((tech, idx) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#E8C547]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-slate-700/50 rounded-2xl p-6 hover:border-[#E8C547]/30 transition-colors">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: `${tech.color}15`, border: `1px solid ${tech.color}30` }}
                                        >
                                            <tech.icon className="w-6 h-6" style={{ color: tech.color }} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{tech.name}</h3>
                                            <p className="text-sm text-slate-500 font-mono">{tech.role}</p>
                                        </div>
                                    </div>
                                    <div
                                        className="w-3 h-3 rounded-full animate-pulse"
                                        style={{ backgroundColor: tech.color }}
                                    />
                                </div>

                                <p className="text-slate-400 text-sm mb-4">{tech.description}</p>

                                {/* Stats */}
                                <div className="flex flex-wrap gap-2">
                                    {tech.stats.map((stat, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 rounded-full text-xs font-mono"
                                            style={{
                                                backgroundColor: `${tech.color}10`,
                                                color: tech.color,
                                                border: `1px solid ${tech.color}30`
                                            }}
                                        >
                                            {stat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Architecture Diagram */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-slate-700/50 rounded-2xl p-8"
                >
                    <h3 className="text-center text-xl font-bold text-white mb-8">System Architecture</h3>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                        {/* User Input */}
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-2">
                                <span className="text-2xl">💬</span>
                            </div>
                            <span className="text-sm text-slate-400">Natural Language</span>
                        </div>

                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-[#E8C547] text-2xl hidden md:block"
                        >
                            →
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-[#E8C547] text-2xl md:hidden rotate-90"
                        >
                            →
                        </motion.div>

                        {/* AI Layer */}
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto rounded-xl bg-[#E8C547]/10 border border-[#E8C547]/30 flex items-center justify-center mb-2 relative">
                                <span className="text-3xl">🧠</span>
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 rounded-xl border border-[#E8C547]"
                                />
                            </div>
                            <span className="text-sm text-slate-400">AI Processing</span>
                        </div>

                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                            className="text-[#E8C547] text-2xl hidden md:block"
                        >
                            →
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                            className="text-[#E8C547] text-2xl md:hidden rotate-90"
                        >
                            →
                        </motion.div>

                        {/* Rust Backend */}
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-2">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <span className="text-sm text-slate-400">Rust Backend</span>
                        </div>

                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                            className="text-[#E8C547] text-2xl hidden md:block"
                        >
                            →
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                            className="text-[#E8C547] text-2xl md:hidden rotate-90"
                        >
                            →
                        </motion.div>

                        {/* Output */}
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-2">
                                <span className="text-2xl">📊</span>
                            </div>
                            <span className="text-sm text-slate-400">Financial Widget</span>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center p-4 rounded-xl bg-[#161b22]/50 border border-slate-700/30"
                        >
                            <feature.icon className="w-6 h-6 text-[#E8C547] mx-auto mb-2" />
                            <div className="text-2xl font-bold text-white">{feature.value}</div>
                            <div className="text-xs text-slate-500">{feature.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
