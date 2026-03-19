"use client"
import { motion } from "framer-motion"
import { useLanguage } from '../src/context/LanguageContext'
import { Construction } from "lucide-react"

export default function DevBadge() {
    const { lang } = useLanguage()

    const text = {
        id: "DALAM PENGEMBANGAN",
        en: "UNDER DEVELOPMENT"
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 bg-black/80 dark:bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 dark:border-black/10 shadow-2xl shadow-black/50"
        >
            {/* Lampu Indikator Berdenyut */}
            <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </div>

            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white dark:text-black uppercase">
                {text[lang]}</span>

        </motion.div>
    )
}