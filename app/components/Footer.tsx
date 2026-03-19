"use client"

export default function Footer() {

    return (
        <footer className="py-12 px-6 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#0a0a0a]">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    © 2026 YUDA FATONI. All Right Reserved
                </p>

                <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:opacity-50 transition">
                        Back to Top ↑
                    </button>
                </div>
            </div>
        </footer>
    )
}