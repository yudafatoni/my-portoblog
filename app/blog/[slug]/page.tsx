import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "../../components/Footer";


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

  if (!post) return <div className="pt-40 text-center">Post not found</div>;

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-white dark:bg-[#0a0a0a]">
      <article className="max-w-3xl mx-auto">
        {/* Tombol Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Writings
        </Link>

        {/* Header Artikel */}
        <header className="mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-gray-400">
            {post.category}
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mt-6 mb-8">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 border-y border-black/5 dark:border-white/5 py-6">
            {post.author?.image && (
              <img src={post.author.image} className="w-10 h-10 rounded-full grayscale border border-black/10" alt={post.author.name} />
            )}
            <div className="text-[10px] uppercase tracking-widest font-bold">
              <p>{post.author?.name}</p>
              <p className="text-gray-400 font-normal mt-1">
                {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </header>

        {/* Main Image */}
        {post.mainImage && (
          <div className="aspect-video relative mb-16 overflow-hidden rounded-sm grayscale">
            <img src={post.mainImage} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        )}

        {/* Isi Artikel */}
        <div className="prose prose-neutral dark:prose-invert max-w-none 
          prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-black
          prose-img:rounded-sm prose-img:grayscale hover:prose-img:grayscale-0 transition-all">
          <PortableText value={post.body} />
        </div>

        
      </article>
      <Footer />
    </main>
  );
}