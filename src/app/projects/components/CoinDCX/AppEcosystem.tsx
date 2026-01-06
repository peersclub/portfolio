'use client';
import { motion } from 'framer-motion';
import { Sparkles, Layers, CreditCard, Zap } from 'lucide-react';

export default function AppEcosystem() {
    return (
        <section className="h-screen w-full relative bg-gradient-to-b from-[#0f172a] to-[#000000] flex items-center justify-center px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="text-[#4ECDC4] font-mono text-sm tracking-widest uppercase">
                        Product Ecosystem
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
                        One Account. <span className="text-[#4ECDC4]">Limitless Possibilities.</span>
                    </h2>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
                    {/* CoinDCX Go Mockup - Left */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px]" />
                        <div className="w-[280px] h-[560px] bg-[#1e293b] rounded-[40px] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                            {/* Content - Simple App */}
                            <div className="h-full bg-slate-900 p-6 pt-12">
                                <h3 className="text-white text-2xl font-bold mb-2">CoinDCX Go</h3>
                                <p className="text-slate-400 text-sm mb-8">Simplest way to invest</p>

                                <div className="space-y-4">
                                    <div className="bg-[#4ECDC4] h-32 rounded-2xl p-4 flex flex-col justify-end">
                                        <div className="text-[#0f172a] font-bold">Bitcoin</div>
                                        <div className="text-white text-3xl font-bold">$46,240</div>
                                    </div>

                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                                            <div className="w-10 h-10 rounded-full bg-white/10" />
                                            <div className="flex-1">
                                                <div className="h-2 w-20 bg-white/20 rounded mb-2" />
                                                <div className="h-2 w-12 bg-white/10 rounded" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Features Center */}
                    <div className="grid grid-cols-2 gap-4 max-w-sm">
                        <AppFeature icon={Sparkles} title="Insta Trade" />
                        <AppFeature icon={Layers} title="Margin" />
                        <AppFeature icon={CreditCard} title="Lend / Earn" />
                        <AppFeature icon={Zap} title="Futures" />
                    </div>

                    {/* CoinDCX Pro Mockup - Right */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#4ECDC4]/20 rounded-full blur-[80px]" />
                        <div className="w-[280px] h-[560px] bg-[#1e293b] rounded-[40px] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            {/* Content - Pro App */}
                            <div className="h-full bg-[#0f172a] p-4 pt-12">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-[#4ECDC4] text-xl font-bold font-mono">PRO</h3>
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                </div>

                                {/* Chart simulation */}
                                <div className="h-40 bg-slate-800/50 rounded-lg mb-4 border border-slate-700/50 p-2 flex items-end gap-1">
                                    {[40, 60, 45, 70, 50, 80, 65, 90, 75, 55].map((h, i) => (
                                        <div key={i} className="flex-1 bg-[#4ECDC4]" style={{ height: `${h}%`, opacity: 0.5 + (i / 20) }} />
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    <div className="bg-green-500/10 text-green-500 text-center py-2 rounded font-mono text-sm">BUY</div>
                                    <div className="bg-red-500/10 text-red-500 text-center py-2 rounded font-mono text-sm">SELL</div>
                                </div>

                                <div className="space-y-2 font-mono text-xs">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="flex justify-between text-slate-500">
                                            <span>0.0024 BTC</span>
                                            <span className="text-white">46,2{i}5.00</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function AppFeature({ icon: Icon, title }: any) {
    return (
        <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-700 hover:border-[#4ECDC4] transition-colors group cursor-default">
            <Icon className="w-6 h-6 text-[#4ECDC4] mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-white text-sm">{title}</div>
        </div>
    );
}
