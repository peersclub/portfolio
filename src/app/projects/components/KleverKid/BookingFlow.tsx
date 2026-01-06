'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Calendar, CheckCircle2, Star, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

const slots = ['4:00 PM', '5:00 PM', '6:00 PM'];

export default function BookingFlow() {
    const [step, setStep] = useState(0); // 0: Select, 1: Confirm
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const handleBook = () => {
        if (!selectedSlot) return;
        setStep(1);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#60A5FA', '#F59E0B', '#10B981']
        });
    };

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center bg-[#EFF6FF] px-4 relative overflow-hidden">
            {/* Decorative Blobs */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-[#60A5FA]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl animate-pulse delay-700" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-12 relative z-10"
            >
                <h2 className="text-4xl md:text-5xl font-black text-[#1e3a8a] mb-4">
                    Booking Made <span className="text-[#F59E0B]">Fun</span>
                </h2>
                <p className="text-[#1e40af] text-lg max-w-xl mx-auto">
                    We gamified the checkout process, reducing drop-offs by 40% and making enrolling as easy as a game.
                </p>
            </motion.div>

            {/* Card UI */}
            <div className="relative z-10">
                <AnimatePresence mode="wait">
                    {step === 0 ? (
                        <motion.div
                            key="select"
                            initial={{ opacity: 0, rotateY: -90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            exit={{ opacity: 0, rotateY: 90 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white w-[350px] rounded-3xl shadow-2xl overflow-hidden border-4 border-white"
                        >
                            <div className="h-32 bg-[#3B82F6] p-6 text-white flex flex-col justify-end relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <Star size={80} />
                                </div>
                                <h3 className="text-2xl font-bold">Piano Masterclass</h3>
                                <div className="flex items-center gap-1 text-blue-100 text-sm">
                                    <Star size={14} fill="currentColor" /> 4.9 (120 Reviews)
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Select Slot</div>
                                <div className="grid grid-cols-3 gap-2 mb-8">
                                    {slots.map(slot => (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`py-2 px-1 rounded-lg text-sm font-bold border-2 transition-all ${selectedSlot === slot
                                                    ? 'border-[#3B82F6] bg-[#EFF6FF] text-[#3B82F6] scale-105'
                                                    : 'border-slate-100 text-slate-500 hover:border-slate-200'
                                                }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={handleBook}
                                    disabled={!selectedSlot}
                                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform ${selectedSlot
                                            ? 'bg-[#F59E0B] hover:translate-y-[-2px] hover:shadow-xl'
                                            : 'bg-slate-300 cursor-not-allowed'
                                        }`}
                                >
                                    Book Class
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="confirm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white w-[350px] h-[400px] rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-center border-4 border-[#10B981]"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="w-24 h-24 bg-[#10B981] rounded-full flex items-center justify-center text-white mb-6 shadow-green-200 shadow-xl"
                            >
                                <CheckCircle2 size={48} />
                            </motion.div>
                            <h3 className="text-2xl font-black text-[#1e3a8a] mb-2">You're In!</h3>
                            <p className="text-slate-500 font-medium">
                                Your slot for <span className="text-[#3B82F6] font-bold">Piano Masterclass</span> at {selectedSlot} is confirmed.
                            </p>
                            <button
                                onClick={() => setStep(0)}
                                className="mt-8 text-[#10B981] font-bold hover:underline"
                            >
                                Book Another
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
