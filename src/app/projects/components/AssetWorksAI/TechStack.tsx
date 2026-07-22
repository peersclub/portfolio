'use client';
import { motion } from 'framer-motion';
import { Bot, Server, Smartphone, Zap, Shield, Globe, MessageSquare, Cpu, Database, BarChart3, ArrowRight, Activity } from 'lucide-react';

const technologies = [
    {
        name: 'LLM Intelligence',
        role: 'Primary Reasoning',
        description: 'Frontier large language models for natural language understanding and financial analysis',
        icon: Bot,
        color: '#D97757',
        stats: ['Context Understanding', 'Complex Reasoning', 'Safe Outputs'],
    },
    {
        name: 'Multi-Model Routing',
        role: 'Resilience & Breadth',
        description: 'A routed model layer for diverse capabilities and graceful fallback',
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

const architectureNodes = [
    { id: 'input', label: 'Natural Language', sublabel: 'User Query', icon: MessageSquare, color: '#3B82F6' },
    { id: 'ai', label: 'AI Processing', sublabel: 'LLMs', icon: Cpu, color: '#E8C547' },
    { id: 'backend', label: 'Rust Backend', sublabel: 'Data Engine', icon: Database, color: '#F97316' },
    { id: 'output', label: 'Financial Widget', sublabel: 'Visualization', icon: BarChart3, color: '#10B981' },
];

export default function TechStack() {
    return (
        <section className="h-screen w-full relative bg-[#0a0a0f] flex items-center justify-center px-4 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #E8C547 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="max-w-6xl mx-auto relative z-10 w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
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

                {/* Professional Architecture Diagram */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-slate-700/50 rounded-2xl p-8 mb-8"
                >
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                            <Activity className="w-5 h-5 text-[#E8C547]" />
                            System Pipeline
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span>LIVE</span>
                        </div>
                    </div>

                    {/* Architecture Flow */}
                    <div className="relative">
                        {/* Connection Lines - SVG */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                                    <stop offset="33%" stopColor="#E8C547" stopOpacity="0.5" />
                                    <stop offset="66%" stopColor="#F97316" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.5" />
                                </linearGradient>
                            </defs>
                            <motion.line
                                x1="12.5%" y1="50%" x2="87.5%" y2="50%"
                                stroke="url(#lineGradient)"
                                strokeWidth="2"
                                strokeDasharray="8,4"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5 }}
                            />
                        </svg>

                        {/* Nodes */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                            {architectureNodes.map((node, idx) => (
                                <motion.div
                                    key={node.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 }}
                                    className="relative group"
                                >
                                    <div
                                        className="p-4 rounded-xl border transition-all duration-300 group-hover:scale-105"
                                        style={{
                                            backgroundColor: `${node.color}08`,
                                            borderColor: `${node.color}30`
                                        }}
                                    >
                                        {/* Pulse Ring */}
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                                            className="absolute inset-0 rounded-xl"
                                            style={{ border: `1px solid ${node.color}` }}
                                        />

                                        {/* Icon */}
                                        <div
                                            className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-3"
                                            style={{ backgroundColor: `${node.color}15` }}
                                        >
                                            <node.icon className="w-6 h-6" style={{ color: node.color }} />
                                        </div>

                                        {/* Labels */}
                                        <div className="text-center">
                                            <div className="text-white font-semibold text-sm">{node.label}</div>
                                            <div className="text-slate-500 text-xs font-mono mt-1">{node.sublabel}</div>
                                        </div>
                                    </div>

                                    {/* Arrow (except last) */}
                                    {idx < architectureNodes.length - 1 && (
                                        <motion.div
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20"
                                        >
                                            <ArrowRight className="w-5 h-5 text-slate-600" />
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Data Flow Metrics */}
                    <div className="mt-6 pt-6 border-t border-slate-700/50 grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-[#E8C547] font-mono text-lg font-bold">&lt;50ms</div>
                            <div className="text-slate-500 text-xs">Avg. Latency</div>
                        </div>
                        <div className="text-center">
                            <div className="text-[#E8C547] font-mono text-lg font-bold">1M+</div>
                            <div className="text-slate-500 text-xs">Queries/Day</div>
                        </div>
                        <div className="text-center">
                            <div className="text-[#E8C547] font-mono text-lg font-bold">99.9%</div>
                            <div className="text-slate-500 text-xs">Uptime SLA</div>
                        </div>
                    </div>
                </motion.div>

                {/* Tech Grid - Compact */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {technologies.map((tech, idx) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#161b22]/50 border border-slate-700/30 rounded-xl p-4 hover:border-[#E8C547]/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${tech.color}15` }}
                                >
                                    <tech.icon className="w-4 h-4" style={{ color: tech.color }} />
                                </div>
                                <div>
                                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                                    <div className="text-slate-500 text-xs font-mono">{tech.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
