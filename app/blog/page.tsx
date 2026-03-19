"use client"
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from '../src/context/LanguageContext'
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

// Kita buat fungsi fetch di dalam useEffect karena kita butuh filter bahasa nanti
export default function BlogPage() {
  const [posts, setPosts] = useState([]);
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
    };
    fetchPosts();
  }, []);

  const t = {
    id: { title: "Selamat Datang !", subtitle: "Tidak ada aturan baku, hanya tulisan ringan yang semoga bisa menemani kamu di sela-sela waktu. Kadang berupa refleksi, kadang nasihat untuk diri sendiri, karena setiap kata adalah pengingat agar tetap belajar dan bertumbuh." },
    en: { title: "Welcome", subtitle: "There are no set rules—just some light-hearted writing that I hope will keep you company in your spare moments." }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        {/* Header Blog */}
        <header className="mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none"
          >
            {t[lang].title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-gray-500 font-mono uppercase tracking-widest text-xs"
          >
            {t[lang].subtitle}
          </motion.p>
        </header>

        {/* Daftar Artikel */}
        <div className="flex flex-col">
          {posts.map((post: any, index: number) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${post.slug}`} className="group block py-10 border-b border-black/5 dark:border-white/5 relative overflow-hidden">
                {/* Efek Garis Bergerak saat Hover */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-black dark:bg-white group-hover:w-full transition-all duration-500" />

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em]">
                      {post.category || "General"} — {new Date(post.publishedAt).getFullYear()}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mt-2 group-hover:italic transition-all duration-300">
                      {post.title}
                    </h2>
                  </div>
                  <span className="text-2xl font-light opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}