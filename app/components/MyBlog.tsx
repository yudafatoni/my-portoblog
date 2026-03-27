'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart3, PenTool, Zap } from "lucide-react";

export default function BlogCTA() {
    return (
        <section className="py-32 px-6 bg-white dark:bg-[#0a0a0a] border-t border-black/5 overflow-hidden">
            <div className="max-w-6xl mx-auto relative">

                {/* Ornamen Background (Halus) */}
                <div className="absolute -top-24 -right-24 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                    <BarChart3 size={400} />
                </div>

                <div className="relative z-10">
                    {/* Label Kecil */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <div className="h-[1px] w-12 bg-black dark:bg-white" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-gray-500">
                            Personal Journal
                        </span>
                    </motion.div>

                    {/* Judul Utama Raksasa */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.8] mb-12 italic"
                    >
                        Writings <br />
                        <span className="text-gray-300 dark:text-zinc-800">& Insights.</span>
                    </motion.h2>

                    {/* Deskripsi & Poin-poin */}
                    <div className="grid md:grid-cols-2 gap-12 items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <p className="text-xl md:text-2xl text-gray-500 italic leading-relaxed max-w-xl mb-12">
                                Seputar pengolahan data, visualisasi interaktif dengan <span className="text-black dark:text-white font-bold not-italic">Tableau</span>, dan ruang sederhana untuk berbagi cerita.</p>

                            {/* Fitur Tulisan */}
                            <div className="flex flex-wrap gap-8 opacity-40 uppercase font-mono text-[9px] tracking-[0.2em]">
                                <div className="flex items-center gap-2">
                                    <BarChart3 size={14} /> Data Storytelling
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap size={14} /> Tech Trends
                                </div>
                                <div className="flex items-center gap-2">
                                    <PenTool size={14} /> Daily Notes
                                </div>
                            </div>
                        </motion.div>

                        {/* Tombol CTA Utama */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex md:justify-end"
                        >
                            <Link href="/blog" className="group relative">
                                <div className="relative z-10 px-12 py-8 bg-black dark:bg-white text-white dark:text-black flex items-center gap-6 overflow-hidden">
                                    <span className="text-xs font-black uppercase tracking-[0.4em]">Explore All Articles</span>
                                    <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" size={20} />

                                    {/* Efek Hover Latar Belakang */}
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "0%" }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="absolute inset-0 bg-zinc-800 dark:bg-zinc-200 z-[-1]"
                                    />
                                </div>
                                {/* Bayangan Estetik */}
                                <div className="absolute top-2 left-2 w-full h-full border border-black dark:border-white z-0" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}