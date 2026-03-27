"use client"
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from '../src/context/LanguageContext'
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const { lang } = useLanguage();

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "post"] | order(publishedAt desc) {
        title,
        "slug": slug.current,
        publishedAt,
        "category": categories[0]->title
      }`;
      const data = await client.fetch(query);
      setPosts(data);

      // Ambil daftar kategori unik dari data posts
      const uniqueCats: any = ["All", ...new Set(data.map((p: any) => p.category || "General"))];
      setCategories(uniqueCats);
    };
    fetchPosts();
  }, []);

  // Logika Filter
  const filteredPosts = activeCategory === "All"
    ? posts
    : posts.filter((p: any) => p.category === activeCategory);

  const t = {
    id: {
      title: "Selamat Datang.",
      subtitle: "Semoga setiap baris tulisan mampu memberi warna, menyalakan ide, atau sekadar jadi teman ngobrol diam-diam."
    },
    en: {
      title: "Archive.",
      subtitle: "A collection of thoughts, data analysis, and technical notes. No set rules, just shared explorations to grow together."
    }
  };

  return (
    <main className="min-h-screen pt-40 pb-20 px-6 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-6xl mx-auto">

        {/* HEADER: TYPOGRAPHY RAKSASA */}
        <header className="mb-24 relative">
          {/* Label Kecil ala Landing Page */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-[1px] w-12 bg-black dark:bg-white" />
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-gray-500">
              {t[lang].tag}
            </span>
          </motion.div>

          {/* Judul Utama Raksasa, Bold, dan Tidak Menumpuk */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            // Ukuran raksasa seperti landing page, italic, leading-none untuk merapatkan tapi tidak tumpuk
            className="text-7xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.85] mb-12 italic"
          >
            {t[lang].title}
          </motion.h1>

          {/* Deskripsi Menjadi Jelas dan Terbaca */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            // Gaya tipografi paragraf seperti landing page, italic gray
            className="max-w-2xl text-xl md:text-2xl text-gray-500 italic leading-relaxed"
          >
            {t[lang].subtitle}
          </motion.p>
        </header>

        {/* FILTER BAR: MINIMALIST STYLE */}
        <div className="flex flex-wrap gap-4 mb-20 border-b border-black/5 dark:border-white/5 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] font-mono uppercase tracking-[0.3em] px-6 py-2 rounded-full transition-all duration-300 border ${activeCategory === cat
                ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                : "bg-transparent text-gray-400 border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* DAFTAR ARTIKEL: EDITORIAL LIST */}
        <div className="flex flex-col min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post: any, index: number) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-black/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/[0.02] px-4 transition-all duration-500 relative"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-[0.4em]">
                        {post.category || "General"}
                      </span>
                      <div className="h-px w-8 bg-black/10 dark:bg-white/10" />
                      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-[0.4em]">
                        {new Date(post.publishedAt).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mt-2 group-hover:pl-4 transition-all duration-500 ease-out italic group-hover:not-italic">
                      {post.title}
                    </h2>
                  </div>

                  <div className="mt-6 md:mt-0 flex items-center gap-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                      Read Entry
                    </span>
                    <div className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-500 rotate-[-45deg] group-hover:rotate-0">
                      →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <div className="py-20 text-center font-mono text-xs uppercase tracking-widest opacity-30">
              No articles found in this category.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}