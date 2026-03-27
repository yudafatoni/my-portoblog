"use client" // KUNCI UTAMA

import { Twitter, Linkedin, Link as LinkIcon, Facebook, Instagram, MessageCircleIcon, MessageSquareMore } from "lucide-react";
import { motion } from "framer-motion";

interface ShareProps {
    title: string;
    url: string;
}

export default function ShareButtons({ title, url }: ShareProps) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "LinkedIn",
            icon: <Linkedin size={16} />,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        },
        {
            name: "Twitter",
            icon: <Twitter size={16} />,
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        },
        {
            name: "Facebook",
            icon: <Facebook size={16} />,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        },
        {
            name: "Instagram",
            icon: <Instagram size={16} />,
            href: `https://www.instagram.com/sharer/sharer.php?u=${encodedUrl}`,
        },
        {
            name: "Whatsapp",
            icon: <MessageSquareMore size={16} />,
            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        },
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    };

    return (
        <div className="flex items-center gap-4 py-8 border-b border-black/5 dark:border-white/5 mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400">Share:</span>
            <div className="flex gap-2">
                {shareLinks.map((link) => (
                    <motion.a
                        key={link.name}
                        whileTap={{ scale: 0.9 }}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-black/5 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500"
                    >
                        {link.icon}
                    </motion.a>
                ))}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={copyToClipboard}
                    className="w-10 h-10 rounded-full border border-black/5 dark:border-white/10 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-500"
                >
                    <LinkIcon size={16} />
                </motion.button>
            </div>
        </div>
    );
}