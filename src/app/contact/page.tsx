"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle } from "lucide-react";
import Footer from "@/components/Footer/Footer";

export default function ContactPage() {
    const phone = "9535710101";
    const email = "sureshthejosephite@gmail.com";
    const whatsappLink = `https://wa.me/91${phone}`;
    const phoneLink = `tel:+91${phone}`;
    const emailLink = `mailto:${email}`;

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg-primary)] px-4 sm:px-6 py-12 sm:py-20">
                <div className="container max-w-2xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 sm:mb-16"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)]">
                            Let's <span className="text-[var(--accent)]">Build</span> Together.
                        </h1>
                        <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-[var(--text-secondary)]">
                            Open to new opportunities and interesting conversations.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
                    >
                        {/* WhatsApp Button */}
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--glass-border)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/10 hover:scale-105 w-full sm:w-auto justify-center"
                        >
                            <MessageCircle size={22} className="text-[#25D366]" />
                            <span className="font-semibold">WhatsApp</span>
                        </a>

                        {/* Call Button */}
                        <a
                            href={phoneLink}
                            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--glass-border)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:scale-105 w-full sm:w-auto justify-center"
                        >
                            <Phone size={22} className="text-[var(--accent)]" />
                            <span className="font-semibold">Call Me</span>
                        </a>

                        {/* Email Button */}
                        <a
                            href={emailLink}
                            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--glass-border)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] transition-all duration-300 hover:border-[#EA4335] hover:bg-[#EA4335]/10 hover:scale-105 w-full sm:w-auto justify-center"
                        >
                            <Mail size={22} className="text-[#EA4335]" />
                            <span className="font-semibold">Email</span>
                        </a>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </>
    );
}
