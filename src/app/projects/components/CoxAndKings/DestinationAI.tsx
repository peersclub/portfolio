'use client';
import { motion } from 'framer-motion';
import { Brain, Heart, Map, User, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DestinationAI() {
    const [step, setStep] = useState(0);

    // Auto-advance the visualization steps
    useEffect(() => {
        const interval = setInterval(() => {
            setStep((s) => (s + 1) % 4);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="h-screen w-full relative bg-[#0f0e17] flex items-center justify-center overflow-hidden">
            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 px-6 items-center">
                {/* Visualizer */}
                <div className="relative h-[400px] flex items-center justify-center">
                    {/* Center Brain */}
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-24 h-24 bg-[#A78BFA] rounded-full flex items-center justify-center relative z-20 shadow-[0_0_50px_rgba(167,139,250,0.5)]"
                    >
                        <Brain className="text-white w-10 h-10" />
                    </motion.div>

                    {/* Surrounding Nodes */}
                    <div className="absolute w-full h-full">
                        {/* User Prefs */}
                        <Node
                            icon={User}
                            label="User Profile"
                            angle={0}
                            active={step === 0}
                            color="#3B82F6"
                        />
                        <Node
                            icon={Heart}
                            label="Interests"
                            angle={120}
                            active={step === 1}
                            color="#EC4899"
                        />
                        <Node
                            icon={Map}
                            label="Destinations"
                            angle={240}
                            active={step === 2}
                            color="#10B981"
                        />
                    </div>

                    {/* Connections */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                        <Connection angle={0} active={step >= 0} color="#3B82F6" />
                        <Connection angle={120} active={step >= 1} color="#EC4899" />
                        <Connection angle={240} active={step >= 2} color="#10B981" />
                    </svg>
                </div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-4xl font-serif text-white mb-6">
                        The Knowledge <span className="text-[#A78BFA]">Graph</span>
                    </h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        We built a proprietary recommendation engine that maps millions of data points.
                        It understands not just <strong>where</strong> to go, but <strong>why</strong> you'll love it.
                    </p>

                    <div className="space-y-6">
                        <StepItem
                            num="01"
                            title="Interest Mapping"
                            desc="Analyzing past travel behavior and explicit preferences."
                            active={step === 0}
                        />
                        <StepItem
                            num="02"
                            title="Semantic Matching"
                            desc="Connecting abstract desires ('romantic + adventure') to concrete locations."
                            active={step === 1}
                        />
                        <StepItem
                            num="03"
                            title="Real-time Availability"
                            desc="Filtering matches against live booking inventory."
                            active={step === 2}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Node({ icon: Icon, label, angle, active, color }: any) {
    const rad = (angle * Math.PI) / 180;
    const radius = 140; // distance from center
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;

    return (
        <div
            className="absolute top-1/2 left-1/2 transition-all duration-500"
            style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${active ? 1.2 : 1})`,
                opacity: active ? 1 : 0.5
            }}
        >
            <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 shadow-lg transition-colors border border-white/10"
                style={{ backgroundColor: active ? color : '#1f2937' }}
            >
                <Icon className="text-white w-6 h-6" />
            </div>
            <div className={`text-center text-xs font-bold uppercase tracking-wider ${active ? 'text-white' : 'text-slate-600'}`}>
                {label}
            </div>
        </div>
    );
}

function Connection({ angle, active, color }: any) {
    // End points on circle
    const rad = (angle * Math.PI) / 180;
    const x2 = 200 + Math.cos(rad) * 140; // 200 is center of 400x400 SVG
    const y2 = 200 + Math.sin(rad) * 140;

    return (
        <line
            x1="200" y1="200"
            x2={x2} y2={y2}
            stroke={color}
            strokeWidth="2"
            strokeDasharray="10"
            className="transition-all duration-500"
            opacity={active ? 1 : 0.1}
        >
            {active && (
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" />
            )}
        </line>
    );
}

function StepItem({ num, title, desc, active }: any) {
    return (
        <div className={`flex gap-4 p-4 rounded-lg transition-colors ${active ? 'bg-white/5 border border-white/10' : 'opacity-50'}`}>
            <div className="font-mono text-[#A78BFA] text-sm pt-1">{num}</div>
            <div>
                <h4 className="text-white font-bold mb-1">{title}</h4>
                <p className="text-slate-500 text-sm">{desc}</p>
            </div>
        </div>
    );
}
