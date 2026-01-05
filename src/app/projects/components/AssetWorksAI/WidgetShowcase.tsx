'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, PieChart, BarChart3, LineChart, Zap } from 'lucide-react';

const samplePrompts = [
    { text: "Show me BTC vs ETH performance last 6 months", widget: "comparison" },
    { text: "Create a portfolio allocation pie chart", widget: "pie" },
    { text: "Daily trading volume for top 10 cryptos", widget: "bar" },
    { text: "Moving average crossover signals for AAPL", widget: "signals" },
];

export default function WidgetShowcase() {
    const [activePromptIndex, setActivePromptIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showWidget, setShowWidget] = useState(false);

    const currentPrompt = samplePrompts[activePromptIndex];

    // Typing effect
    useEffect(() => {
        setTypedText('');
        setShowWidget(false);
        setIsGenerating(false);

        let charIndex = 0;
        const text = currentPrompt.text;

        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                setTypedText(text.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setIsGenerating(true);
                setTimeout(() => {
                    setIsGenerating(false);
                    setShowWidget(true);
                }, 1500);
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, [activePromptIndex, currentPrompt.text]);

    // Cycle through prompts
    useEffect(() => {
        const interval = setInterval(() => {
            setActivePromptIndex(prev => (prev + 1) % samplePrompts.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-screen w-full relative bg-gradient-to-b from-[#0d1117] to-[#0a0a0f] py-20 px-4 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8C547]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8C547]/30 bg-[#E8C547]/5 mb-6">
                        <Sparkles className="w-4 h-4 text-[#E8C547]" />
                        <span className="text-sm font-mono text-[#E8C547] tracking-wide">Natural Language Interface</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Speak Your <span className="text-[#E8C547]">Analysis</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Simply describe what you want to see. Our AI understands context,
                        interprets intent, and generates powerful financial widgets instantly.
                    </p>
                </motion.div>

                {/* Demo Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Terminal Input */}
                    <div className="bg-[#161b22] border border-slate-700/50 rounded-xl p-6 mb-6 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                            </div>
                            <span className="text-xs font-mono text-slate-500">assetworks-ai-terminal</span>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-[#E8C547] font-mono text-lg">$</span>
                            <div className="flex-1">
                                <span className="text-white font-mono text-lg">
                                    {typedText}
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                        className="inline-block w-2 h-5 bg-[#E8C547] ml-0.5 translate-y-0.5"
                                    />
                                </span>
                            </div>
                        </div>

                        {/* Processing Indicator */}
                        <AnimatePresence>
                            {isGenerating && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4 flex items-center gap-3"
                                >
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ scale: [1, 1.3, 1] }}
                                                transition={{ duration: 0.5, delay: i * 0.15, repeat: Infinity }}
                                                className="w-2 h-2 rounded-full bg-[#E8C547]"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-mono text-slate-400">Processing with Claude AI...</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Widget Output */}
                    <AnimatePresence mode="wait">
                        {showWidget && (
                            <motion.div
                                key={currentPrompt.widget}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="bg-gradient-to-br from-[#1c2128] to-[#161b22] border border-[#E8C547]/20 rounded-xl p-6 shadow-2xl"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#E8C547]/10 flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-[#E8C547]" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">Generated Widget</h3>
                                            <p className="text-xs text-slate-500 font-mono">AI-powered visualization</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-mono">
                                        ✓ Ready
                                    </span>
                                </div>

                                {/* Mock Chart */}
                                <WidgetPreview type={currentPrompt.widget} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Prompt Selector */}
                <div className="flex justify-center gap-2 mt-8">
                    {samplePrompts.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActivePromptIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === activePromptIndex
                                    ? 'bg-[#E8C547] w-6'
                                    : 'bg-slate-600 hover:bg-slate-500'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function WidgetPreview({ type }: { type: string }) {
    const chartBars = [40, 65, 45, 80, 55, 75, 90, 60, 70, 85];
    const linePoints = [20, 45, 30, 60, 40, 70, 55, 80, 65, 90];

    return (
        <div className="h-48 relative">
            {type === 'comparison' && (
                <div className="h-full flex items-end justify-around gap-4 px-4">
                    {/* BTC */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-full flex items-end justify-center gap-1">
                            {[30, 45, 35, 55, 65, 75].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="w-4 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t"
                                />
                            ))}
                        </div>
                        <span className="text-xs font-mono text-orange-400">BTC +42.5%</span>
                    </div>
                    {/* ETH */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-full flex items-end justify-center gap-1">
                            {[25, 35, 50, 45, 70, 85].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="w-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                                />
                            ))}
                        </div>
                        <span className="text-xs font-mono text-blue-400">ETH +67.2%</span>
                    </div>
                </div>
            )}

            {type === 'pie' && (
                <div className="h-full flex items-center justify-center gap-8">
                    <svg viewBox="0 0 100 100" className="w-32 h-32">
                        <motion.circle
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1 }}
                            cx="50" cy="50" r="40" fill="none" stroke="#E8C547" strokeWidth="20"
                            strokeDasharray="125.6 251.2" transform="rotate(-90 50 50)"
                        />
                        <motion.circle
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="20"
                            strokeDasharray="75.4 251.2" strokeDashoffset="-125.6" transform="rotate(-90 50 50)"
                        />
                        <motion.circle
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="20"
                            strokeDasharray="50.2 251.2" strokeDashoffset="-201" transform="rotate(-90 50 50)"
                        />
                    </svg>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-[#E8C547]" />
                            <span className="text-slate-300">BTC 50%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-blue-500" />
                            <span className="text-slate-300">ETH 30%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-green-500" />
                            <span className="text-slate-300">Others 20%</span>
                        </div>
                    </div>
                </div>
            )}

            {type === 'bar' && (
                <div className="h-full flex items-end justify-around gap-2 px-4">
                    {chartBars.map((height, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="flex-1 bg-gradient-to-t from-[#E8C547] to-[#f0d579] rounded-t opacity-80 hover:opacity-100 transition-opacity"
                        />
                    ))}
                </div>
            )}

            {type === 'signals' && (
                <div className="h-full relative p-4">
                    <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                        {/* Moving Average Lines */}
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5 }}
                            d="M 0 70 Q 50 50 100 55 T 200 45 T 300 35"
                            fill="none" stroke="#E8C547" strokeWidth="2"
                        />
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                            d="M 0 60 Q 75 65 150 40 T 300 50"
                            fill="none" stroke="#3B82F6" strokeWidth="2"
                        />
                        {/* Signal Points */}
                        <motion.circle
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1 }}
                            cx="150" cy="43" r="6" fill="#10B981"
                        />
                        <motion.circle
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.2 }}
                            cx="230" cy="40" r="6" fill="#EF4444"
                        />
                    </svg>
                    <div className="absolute bottom-2 right-4 flex gap-4 text-xs font-mono">
                        <span className="text-[#E8C547]">SMA(20)</span>
                        <span className="text-blue-400">SMA(50)</span>
                        <span className="text-green-400">● Buy</span>
                        <span className="text-red-400">● Sell</span>
                    </div>
                </div>
            )}
        </div>
    );
}
