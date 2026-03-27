"use client"
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useLanguage } from '../src/context/LanguageContext'// Sesuaikan path ini jika masih error
import { Sun, Moon, Languages, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { lang, setLang } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false) // State untuk menu mobile
  const pathname = usePathname()

  // 1. Mencegah Hydration Error
  useEffect(() => setMounted(true), [])

  // 2. Sembunyikan Navbar jika sedang di Sanity Studio
  if (pathname.startsWith('/studio')) return null

  if (!mounted) return null

  // Variasi animasi untuk menu mobile
  const menuVariants = {
    closed: { opacity: 0, scale: 0.95, y: -20 },
    open: { opacity: 1, scale: 1, y: 0 }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-[100] px-4 md:px-6 py-4 flex justify-center"
    >
      <div className="w-full max-w-5xl flex items-center justify-between bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 px-6 py-3 rounded-full shadow-2xl">

        {/* LOGO */}
        <Link href="/" className="font-bold tracking-tighter text-xl hover:italic transition-all z-[110]">
          Yuda<span className="text-gray-400">.</span>
        </Link>

        {/* MENU TENGAH (Desktop Only) */}
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold">
          <Link href="/#journey" className="hover:opacity-50 transition">Journey</Link>
          <Link href="/blog" className="hover:opacity-50 transition">Blog</Link>
          <Link href="/#gallery" className="hover:opacity-50 transition">Gallery</Link>
          <Link href="/#contact" className="hover:opacity-50 transition">Contact</Link>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2 md:gap-4 z-[110]">
          {/* Toggle Bahasa */}
          {/* <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="flex items-center gap-1 text-[10px] font-mono hover:bg-black/5 dark:hover:bg-white/5 px-2 py-1 rounded"
          >
            <Languages size={14} />
            <span className="hidden sm:inline">{lang.toUpperCase()}</span>
          </button> */}

          {/* Toggle Dark Mode */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* HAMBURGER BUTTON (Mobile Only) */}
          <button
            className="md:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-20 left-0 right-0 mx-4 bg-white/95 dark:bg-black/95 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-3xl p-8 shadow-2xl md:hidden flex flex-col gap-6 text-center"
            >
              <Link href="/#gallery" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-[0.3em]">Gallery</Link>
              <Link href="/#journey" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-[0.3em]">Journey</Link>
              <Link href="/blog" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-[0.3em]">Blog</Link>
              <Link href="/#contact" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-[0.3em]">Contact</Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.nav>
  )
}