'use client';
import { motion, Reorder } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plane, Hotel, Coffee, GripVertical, Sparkles, Check } from 'lucide-react';

const initialItems = [
    { id: '1', type: 'flight', title: 'Flight to London', time: '10:00 AM', duration: '8h 20m' },
    { id: '2', type: 'hotel', title: 'The Ritz Carlton', time: 'Check-in', duration: '3 Nights' },
    { id: '3', type: 'activity', title: 'Private Museum Tour', time: '04:00 PM', duration: '2 Hours' },
    { id: '4', type: 'dinner', title: 'Michelin Star Dinner', time: '08:00 PM', duration: 'Resv confirmed' },
];

export default function ItineraryEngine() {
    const [items, setItems] = useState(initialItems);
    const [isOptimizing, setIsOptimizing] = useState(false);

    const handleOptimize = () => {
        setIsOptimizing(true);
        setTimeout(() => {
            // Shuffle slightly to simulate "Smart Optimization"
            const newOrder = [...items];
            const temp = newOrder[2];
            newOrder[2] = newOrder[3];
            newOrder[3] = temp;
            setItems(newOrder);
            setIsOptimizing(false);
        }, 1500);
    };

    return (
        <section className="h-screen w-full relative bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E5E7EB]/50 skew-x-12" />

            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 px-6 items-center relative z-10">
                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="text-[#A78BFA] w-5 h-5" />
                        <span className="text-[#4B5563] font-mono text-sm tracking-widest uppercase">Smart Itinerary</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#111827] mb-6">
                        Seamlessly <span className="text-[#A78BFA] italic">Curated.</span>
                    </h2>
                    <p className="text-[#4B5563] text-lg mb-8 leading-relaxed">
                        Our AI engine dynamically re-optimizes your schedule based on real-time flight data, weather,
                        and traffic conditions, ensuring every moment is perfect.
                    </p>
                    <button
                        onClick={handleOptimize}
                        disabled={isOptimizing}
                        className="px-6 py-3 bg-[#1e1b4b] text-white rounded-lg flex items-center gap-2 hover:bg-[#2e2b5b] transition-colors"
                    >
                        {isOptimizing ? <Sparkles className="animate-spin" size={18} /> : <Sparkles size={18} />}
                        {isOptimizing ? 'Optimizing Trip...' : 'Optimize My Trip'}
                    </button>
                    {isOptimizing && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 text-sm text-[#A78BFA] font-mono"
                        >
                            ● Analyzing traffic patterns in London...
                        </motion.div>
                    )}
                </motion.div>

                {/* Interactive Phone UI */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="relative mx-auto"
                >
                    <div className="w-[320px] h-[640px] bg-white rounded-[40px] border-[8px] border-[#1e1b4b] shadow-2xl overflow-hidden relative">
                        {/* Phone Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1e1b4b] rounded-b-xl z-20" />

                        {/* App Header */}
                        <div className="bg-[#1e1b4b] p-6 pt-12 text-white pb-8 rounded-b-[2rem] shadow-lg relative z-10">
                            <div className="text-xs uppercase opacity-70 mb-1">Upcoming Trip</div>
                            <h3 className="text-2xl font-serif">London Escape</h3>
                            <div className="text-sm opacity-80">Oct 12 - Oct 15</div>
                        </div>

                        {/* List */}
                        <div className="p-4 h-full bg-slate-50 overflow-y-auto pb-20">
                            <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-3">
                                {items.map((item) => (
                                    <Reorder.Item key={item.id} value={item} id={item.id}>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 cursor-grab active:cursor-grabbing">
                                            <div className="text-slate-300">
                                                <GripVertical size={16} />
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-[#A78BFA]/10 flex items-center justify-center text-[#7c3aed]">
                                                {item.type === 'flight' && <Plane size={18} />}
                                                {item.type === 'hotel' && <Hotel size={18} />}
                                                {item.type === 'activity' && <Coffee size={18} />}
                                                {item.type === 'dinner' && <Sparkles size={18} />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-[#1f2937] font-medium text-sm">{item.title}</div>
                                                <div className="text-slate-400 text-xs flex justify-between mt-1">
                                                    <span>{item.time}</span>
                                                    <span>{item.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>
                        </div>

                        {/* Bottom Nav */}
                        <div className="absolute bottom-0 w-full bg-white border-t p-4 flex justify-around text-slate-400">
                            <div className="p-2 text-[#7c3aed]"><Hotel size={20} /></div>
                            <div className="p-2"><Plane size={20} /></div>
                            <div className="p-2"><Coffee size={20} /></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
