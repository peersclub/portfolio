'use client';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, CheckCircle, Database } from 'lucide-react';

export default function SecurityStack() {
    return (
        <section className="h-screen w-full relative bg-[#0f172a] flex items-center justify-center px-4 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-30"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 70%)',
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#4ECDC4] font-mono text-sm tracking-widest uppercase">
                        Infrastructure layer
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
                        Bank-Grade <span className="text-[#4ECDC4]">Security</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        A multi-layered security architecture designed to protect user assets
                        using BitGo's cold storage solutions.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Architecture Diagram */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-[#4ECDC4]/20 blur-[100px] rounded-full" />

                        <div className="relative space-y-4">
                            <SecurityLayer
                                icon={Shield}
                                label="BitGo Cold Storage"
                                desc="Offline multisig wallets"
                                active
                            />
                            <div className="h-8 w-0.5 bg-slate-700 mx-auto" />
                            <SecurityLayer
                                icon={Lock}
                                label="Encryption Layer"
                                desc="AES-256 data protection"
                            />
                            <div className="h-8 w-0.5 bg-slate-700 mx-auto" />
                            <SecurityLayer
                                icon={Server}
                                label="Matching Engine"
                                desc="Isolated high-speed core"
                            />
                            <div className="h-8 w-0.5 bg-slate-700 mx-auto" />
                            <SecurityLayer
                                icon={Database}
                                label="User Data"
                                desc="Distributed ledger"
                            />
                        </div>
                    </motion.div>

                    {/* Features List */}
                    <div className="space-y-6">
                        <FeatureItem
                            title="7-Layer Security"
                            desc="Comprehensive audit logs, DDoS protection, and regular penetration testing."
                        />
                        <FeatureItem
                            title="BitGo Insured"
                            desc="Assets protected by global insurance policy for complete peace of mind."
                        />
                        <FeatureItem
                            title="95% Cold Storage"
                            desc="The vast majority of funds are held offline, inaccessible to online threats."
                        />
                        <FeatureItem
                            title="ISO 27001 Certified"
                            desc="Adhering to the highest international information security standards."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function SecurityLayer({ icon: Icon, label, desc, active = false }: any) {
    return (
        <div className={`
            bg-[#1e293b] border ${active ? 'border-[#4ECDC4]' : 'border-slate-700'} 
            p-4 rounded-xl flex items-center gap-4 relative z-10 shadow-xl w-full max-w-md mx-auto
            hover:scale-105 transition-transform duration-300
        `}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${active ? 'bg-[#4ECDC4]/20 text-[#4ECDC4]' : 'bg-slate-800 text-slate-400'}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className={`font-bold ${active ? 'text-white' : 'text-slate-300'}`}>{label}</h3>
                <p className="text-xs text-slate-500 font-mono">{desc}</p>
            </div>
            {active && (
                <div className="absolute top-1/2 -translate-y-1/2 right-4 w-3 h-3 bg-[#4ECDC4] rounded-full animate-pulse shadow-[0_0_10px_#4ECDC4]" />
            )}
        </div>
    );
}

function FeatureItem({ title, desc }: { title: string, desc: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex gap-4 p-4 hover:bg-white/5 rounded-lg transition-colors"
        >
            <CheckCircle className="w-6 h-6 text-[#4ECDC4] flex-shrink-0 mt-0.5" />
            <div>
                <h4 className="text-white font-bold mb-1">{title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    );
}
