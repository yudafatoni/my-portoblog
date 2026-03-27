import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "../../components/Footer";
import TableauViewer from "@/app/components/TableauViewer";
import ShareButtons from "@/app/components/ShareButtons";


// --- CONFIGURATION PORTABLE TEXT ---
const portableTextComponents = {
  types: {
    tableauEmbed: ({ value }: any) => (
      <TableauViewer
        url={value.url}
        height={value.height}
        caption={value.caption}
      />
    ),
    image: ({ value }: any) => (
      <figure className="my-20">
        <div className="overflow-hidden rounded-sm border border-black/5 grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out">
          <img
            src={value.asset?._ref}
            alt={value.alt || "Visual Evidence"}
            className="w-full h-auto object-cover"
          />
        </div>
        {value.alt && (
          <figcaption className="mt-4 text-[10px] uppercase tracking-[0.3em] text-gray-400 text-center font-mono">
            Fig. — {value.alt}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-black dark:text-white underline decoration-1 underline-offset-4 hover:decoration-2 transition-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    code: ({ children }: any) => (
      <code className="bg-zinc-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-black dark:text-white">
        {children}
      </code>
    ),
  },
  block: {
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-black dark:border-white pl-8 py-2 my-12 italic text-2xl text-zinc-500 dark:text-zinc-400 font-serif leading-relaxed">
        {children}
      </blockquote>
    ),
    h2: ({ children }: any) => <h2 className="text-4xl font-black mt-20 mb-8 tracking-tighter uppercase italic">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-12 mb-4 tracking-tighter uppercase">{children}</h3>,
  }
}



async function getPostData(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    body,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "author": author-> { name, "image": image.asset->url },
    "category": categories[0]->title
  }`;
  return await client.fetch(query, { slug });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);
  // Tentukan URL di sini
  const currentUrl = `https://www.yudafatoni.my.id/blog/${post.slug}`;

  if (!post) return <div className="pt-40 text-center font-mono uppercase tracking-widest opacity-30">Post not found</div>;

  return (
    <main className="min-h-screen pt-40 pb-20 px-6 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <article className="max-w-6xl mx-auto">

        {/* Tombol Back - Menggunakan style Archive */}
        <div className="mb-16">
          <Link href="/blog" className="inline-flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.5em] text-gray-400 hover:text-black dark:hover:text-white transition-all group">
            <ArrowLeft size={12} className="group-hover:-translate-x-2 transition-transform" />
            Back to Archive
          </Link>
        </div>

        {/* Header Artikel - Sesuai style Archive */}
        <header className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-black dark:bg-white" />
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-gray-500">
              {post.category} Journal
            </span>
          </div>

          <h1 className="text-6xl md:text-[120px] font-black tracking-tighter uppercase leading-[0.85] mb-12 italic">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 border-y border-black/5 dark:border-white/5 py-12">
            {post.author?.image && (
              <img src={post.author.image} className="w-14 h-14 rounded-full grayscale border border-black/10 shadow-sm" alt={post.author.name} />
            )}
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold">
              <p className="text-black dark:text-white mb-1">{post.author?.name}</p>
              <p className="text-gray-400 font-normal italic">
                {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </header>



        {/* Main Image - Full Width di dalam kontainer 6xl */}
        {post.mainImage && (
          <div className="aspect-[21/9] relative mb-24 overflow-hidden rounded-sm grayscale border border-black/5 shadow-2xl">
            <img
              src={post.mainImage}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </div>
        )}

        {/* Isi Artikel - Menjaga keterbacaan tetap terpusat tapi fleksibel */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-neutral dark:prose-invert max-w-none 
            prose-p:text-xl prose-p:leading-relaxed prose-p:text-zinc-700 dark:prose-p:text-zinc-300
            prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-black
            prose-strong:text-black dark:prose-strong:text-white transition-all">

            <PortableText value={post.body} components={portableTextComponents} />

          </div>
        </div>

        {/* Share Buttons */}
        <ShareButtons title={post.title} url={currentUrl} />
      </article>
      <Footer />
    </main>
  );
}