"use client"
import React, { useEffect, useState, useRef } from 'react'

// Deklarasi agar TS tidak merah
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'tableau-viz': any;
        }
    }
}

interface TableauProps {
    url: string;
    height?: number;
    caption?: string;
}

export default function TableauViewer({ url, height = 600, caption }: TableauProps) {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Cek apakah script sudah ada, kalau belum kita suntik secara manual sebagai MODULE
        const existingScript = document.querySelector('script[src*="tableau.embedding"]');

        if (!existingScript) {
            const script = document.createElement('script');
            script.src = "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";
            script.type = "module"; // INI KUNCINYA agar tidak error 'export'
            script.async = true;
            script.onload = () => setScriptLoaded(true);
            document.head.appendChild(script);
        } else {
            setScriptLoaded(true);
        }
    }, []);

    // Bersihkan URL dari parameter berlebih
    const cleanUrl = url.split('?')[0];

    return (
        <div ref={containerRef} className="relative my-16 w-full flex flex-col items-center">
            <div className="w-full overflow-hidden rounded-sm border border-black/5 dark:border-white/10 bg-[#ffffff] shadow-sm">

                {/* Browser Top Bar */}
                <div className="flex items-center justify-between p-3 border-b border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-400/20" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400/20" />
                        <div className="w-2 h-2 rounded-full bg-green-400/20" />
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-30 text-black dark:text-white">
                        Tableau v3 Engine
                    </span>
                </div>

                {/* Dashboard Area */}
                <div className="w-full overflow-x-auto py-4 px-2 bg-[#ffffff]">
                    <div style={{ height: `${height}px`, minWidth: '100%', position: 'relative' }}>
                        {scriptLoaded ? (
                            <tableau-viz
                                id="tableauViz"
                                src={cleanUrl}
                                toolbar="bottom"
                                hide-tabs={true}
                                style={{ width: '100%', height: '100%' }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-50">
                                <span className="text-[10px] font-mono uppercase tracking-widest opacity-20 animate-pulse text-black">
                                    Loading Module...
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {caption && (
                <p className="mt-5 text-[10px] md:text-xs text-gray-400 italic font-mono uppercase tracking-[0.2em] text-center max-w-2xl px-4">
                    &mdash; {caption} &mdash;
                </p>
            )}
        </div>
    )
}