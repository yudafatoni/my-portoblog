"use client"

import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useLanguage } from "./src/context/LanguageContext"
import { useState, useRef } from "react"
import { X, Mail, Github, Instagram, ArrowUpRight } from "lucide-react"

const projectsData = [
  {
    id: 1,
    title: "Coming soom",
    category: "Web Development",
    year: "2024",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
    description: "lorem ipsum"
  },
  {
    id: 2,
    title: "Draft",
    category: "Branding",
    year: "2024",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
    description: "lorem ipsum...."
  },
  {
    id: 3,
    title: "FDraft",
    category: "Bisnis",
    year: "2023",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000",
    description: "comingsoon"
  },
]

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <Hero />
      <JourneySection />
      <GallerySection />
      <SkillSection />
      <ProjectSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

function Hero() {
  const { lang } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)

  const content = {
    id: {
      line1: "Halo, Saya",
      line2: "Yuda",
      line3: "Fatoni",
      sub: "Catatan perjalanan, refleksi, dan pengingat kecil untuk diri sendiri.",
      tag: "Coming Soon."
    },
    en: {
      line1: "Hello, I am",
      line2: "Yuda",
      line3: "Fatoni.",
      sub: "I build personal portfolio websites that stand out.",
      tag: "Modern & Minimalist."
    }
  }

  const t = content[lang]

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: custom * 0.2 }
    })
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black text-white px-6">
      <div className="absolute inset-0 z-0 grayscale opacity-60 dark:opacity-40">
        <Image src="/gambarhero.jpg"
          alt="Portrait"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center justify-center flex-grow mt-20">
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onTapStart={() => setIsHovered(true)} // AKTIF SAAT DISENTUH DI HP
          onTapCancel={() => setIsHovered(false)}
          className="cursor-default select-none"
        >
          <motion.h1
            custom={1} initial="hidden" animate="visible" variants={textVariants}
            className="text-[10vw] md:text-[9vw] font-black tracking-tighter uppercase leading-[0.8] mix-blend-difference"
          >
            {t.line1}
          </motion.h1>

          <motion.h1
            custom={2} initial="hidden" animate="visible" variants={textVariants}
            className="text-[14vw] md:text-[11vw] font-black tracking-tighter uppercase leading-[0.8] flex flex-col md:flex-row items-center gap-x-6 gap-y-0"
          >
            <motion.span
              animate={{
                WebkitTextStroke: isHovered ? "2px white" : "0px white",
                color: isHovered ? "transparent" : "white"
              }}
              transition={{ duration: 0.5 }}
              className="mix-blend-difference transition-all"
            >
              {t.line2}
            </motion.span>
            <span className="mix-blend-difference">{t.line3}</span>
          </motion.h1>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 w-full max-w-4xl mx-auto pb-12 text-center flex flex-col items-center"
      >
        <p className="text-sm md:text-base text-gray-300 max-w-xl leading-relaxed px-4">
          {t.sub}
        </p>
        <p className="text-sm md:text-base font-bold text-white mt-2 bg-black/50 px-4 py-1 rounded-sm backdrop-blur-sm">
          {t.tag}
        </p>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-10 text-xs text-gray-500 font-mono uppercase tracking-[0.3em]"
        >
          Scroll <br /> ↓
        </motion.div>
      </motion.div>
    </section>
  )
}

function JourneySection() {
  const journeys = [
    { year: "2021 - 2026", title: "Information System", org: "Jambi University", desc: "3.80/4.00" },
    { year: "2018 - 2021", title: "Science", org: "SMA MTA Surakarta", desc: "" },
  ]

  return (
    <section id="journey" className="py-32 px-6 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-black uppercase tracking-tighter mb-16 italic"
      >
        The Journey.
      </motion.h2>
      <div className="space-y-12 border-l border-black/10 dark:border-white/10 ml-4 pl-8">
        {journeys.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-2 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-black" />
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{item.year}</span>
            <h3 className="text-xl font-bold uppercase mt-1">{item.title} <span className="text-gray-400 text-sm">@ {item.org}</span></h3>
            <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-lg">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function GallerySection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])

  const images = [
    { src: "/pict1.jpg", y: y1, size: "w-64 h-80" },
    { src: "/gambar2.jpg", y: y2, size: "w-80 h-96" },
    { src: "/pict3.jpg", y: y3, size: "w-72 h-72" },
  ]

  return (
    <section id="gallery" ref={ref} className="py-60 px-6 relative flex flex-wrap justify-center items-center gap-16 overflow-hidden bg-white dark:bg-[#0a0a0a]">
      {images.map((img, index) => (
        <motion.div
          key={index}
          style={{ y: img.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            // JANGAN AKTIFKAN WARNA DI SINI, BIARKAN HITAM PUTIH SAAT SCROLL
          }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, delay: index * 0.1, ease: "circOut" }}

          // --- PENGATURAN WARNA ---

          // Untuk Desktop: Berwarna saat mouse di atas gambar
          whileHover={{
            scale: 1.05,
            rotate: index % 2 === 0 ? 3 : -3,
            filter: "grayscale(0%)" // <--- BERWARNA SAAT HOVER
          }}

          // Untuk Mobile: Berwarna saat layar DISENTUH/DITEKAN
          whileTap={{
            scale: 0.95,
            filter: "grayscale(0%)" // <--- BERWARNA SAAT DITAP (SENTUH)
          }}

          // Tambahkan class Tailwind 'grayscale' agar default-nya hitam putih
          className={`relative overflow-hidden grayscale transition-all duration-700 rounded-sm border border-black/5 dark:border-white/5 shadow-2xl ${img.size}`}
        >
          <img
            src={img.src}
            alt="Gallery"
            className="object-cover w-full h-full scale-110 md:group-hover:scale-100 transition-transform duration-[2s] ease-in-out"
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <motion.h2
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.05, 0.02]) }}
          className="text-[25vw] font-black text-black dark:text-white leading-none uppercase tracking-tighter"
        >
          GALLERY
        </motion.h2>
      </div>
    </section>
  )
}

function SkillSection() {
  const skills = ["React", "Next.js", "Tailwind", "Sanity", "Framer Motion", "TypeScript", "Laravel", "Tableau"]
  const duplicatedSkills = [...skills, ...skills]

  return (
    <section id="skill" className="py-20 border-y border-black/5 dark:border-white/5 overflow-hidden bg-black text-white dark:bg-white dark:text-black">
      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex gap-20 items-center whitespace-nowrap"
        >
          {duplicatedSkills.map((skill, index) => (
            <span key={index} className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              {skill} <span className="text-gray-500 mx-4">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectSection() {
  const targetRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"])

  return (
    <>
      <section ref={targetRef} className="py-20 bg-black text-white dark:bg-white dark:text-black overflow-hidden border-y border-white/5 dark:border-black/5 relative">
        <div className="flex whitespace-nowrap px-6">
          <motion.div style={{ x }} className="flex gap-16 items-center">
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProject(project)}
                className="w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] flex-shrink-0 cursor-pointer group"
              >
                <div className="relative w-full h-full overflow-hidden rounded-sm border border-white/10 dark:border-black/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 scale-105 md:group-hover:scale-100 transition-all duration-[2s]"
                  />
                  {/* Overlay Info: Selalu muncul di Mobile, Hover di Desktop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-black/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-mono text-gray-300">{project.category} / {project.year}</p>
                    <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mt-2 leading-none whitespace-normal">
                      {project.title}
                    </h3>
                    <p className="text-[10px] mt-4 text-gray-400 font-bold uppercase tracking-widest">
                      (Click to view details)
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none">
          <h2 className="text-[30vw] font-black opacity-[0.03] leading-none uppercase tracking-tighter text-white dark:text-black">
            PROJECT
          </h2>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex justify-center items-center p-4 md:p-12"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-7xl bg-white dark:bg-[#111111] text-black dark:text-white rounded-sm p-6 md:p-16 relative shadow-2xl overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition z-50"
              >
                <X size={24} />
              </button>

              <div className="grid md:grid-cols-[1fr,1.5fr] gap-8 md:gap-12 items-start">
                <div className="w-full h-64 md:h-[50vh] overflow-hidden rounded-sm border border-black/5 dark:border-white/5">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-mono font-bold">
                    {selectedProject.category} / {selectedProject.year}
                  </span>
                  <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none mt-4">
                    {selectedProject.title}
                  </h1>
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-8 italic border-l-2 border-black/10 dark:border-white/10 pl-4">
                    "{selectedProject.description}"
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ContactSection() {
  const { lang } = useLanguage()

  const t = {
    id: { title: "MULAI PROJEK?", sub: "Punya ide menarik? Mari kami bantu wujudkan." },
    en: { title: "START A PROJECT?", sub: "Have an interesting idea? Let's make it happen." }
  }

  return (
    <section id="contact" className="py-32 px-6 bg-white dark:bg-[#0a0a0a] border-t border-black/5 dark:border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]"
          >
            {t[lang].title}
          </motion.h2>
          <p className="mt-8 text-lg md:text-xl text-gray-500 italic leading-relaxed">
            {t[lang].sub}
          </p>
        </div>

        <div className="w-full md:w-80 flex flex-col gap-3">
          <motion.a
            whileTap={{ scale: 0.95 }}
            href="https://linkedin.com/in/yudafatoni" target="_blank" rel="noopener noreferrer"
            className="p-5 border border-black/10 dark:border-white/10 flex justify-between items-center md:hover:bg-black md:hover:text-white dark:md:hover:bg-white dark:md:hover:text-black transition-all uppercase text-[10px] font-bold tracking-[0.3em]">
            LinkedIn <ArrowUpRight size={14} />
          </motion.a>
          <motion.a
            whileTap={{ scale: 0.95 }}
            href="https://github.com/yudafatoni" target="_blank" rel="noopener noreferrer"
            className="p-5 border border-black/10 dark:border-white/10 flex justify-between items-center md:hover:bg-black md:hover:text-white dark:md:hover:bg-white dark:md:hover:text-black transition-all uppercase text-[10px] font-bold tracking-[0.3em]">
            Github <ArrowUpRight size={14} />
          </motion.a>
          <motion.a
            whileTap={{ scale: 0.95 }}
            href="https://instagram.com/yudaaft" target="_blank" rel="noopener noreferrer"
            className="p-5 border border-black/10 dark:border-white/10 flex justify-between items-center md:hover:bg-black md:hover:text-white dark:md:hover:bg-white dark:md:hover:text-black transition-all uppercase text-[10px] font-bold tracking-[0.3em]">
            Instagram <ArrowUpRight size={14} />
          </motion.a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
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