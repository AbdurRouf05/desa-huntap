"use client";

import { PB_URL } from '@/lib/pocketbase';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MuseumItem } from "@/types";

export function MuseumClient({ items }: { items: MuseumItem[] }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <main className={cn(
        "min-h-screen transition-colors duration-500",
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    )}>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden border-b border-slate-800">
        <Image 
          src="/gambar/3.jpg"
          alt="Museum Desa"
          fill
          className="object-cover"
          priority
        />
        <div className={cn("absolute inset-0", isDark ? "bg-slate-900/90" : "bg-emerald-900/80")} />
        {/* Toggle Theme Button in Corner */}
        <button 
            onClick={() => setIsDark(!isDark)}
            className={cn(
                "absolute top-6 right-6 flex items-center justify-center p-2 rounded-full transition-all shadow-sm hover:scale-105",
                isDark ? "bg-slate-800 text-yellow-400 border border-slate-700" : "bg-white text-slate-700 border border-slate-200"
            )}
            title="Toggle Dark/Light Mode"
        >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center relative z-10">

          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
            Museum <span className="text-emerald-400">Desa Huntap</span>
          </h1>
          <p className="max-w-2xl text-lg mb-10 text-emerald-100/90">
            Jelajahi berbagai artefak dan barang peninggalan bersejarah yang menjadi saksi bisu perjalanan, ketangguhan, dan kearifan lokal warga Desa Sumbermujur.
          </p>
          
        </div>
      </section>

      {/* Grid Collection */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {items.length === 0 ? (
                <div className="py-20 text-center text-slate-500 font-medium">
                    Belum ada koleksi museum.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item) => {
                        const imageUrl = item.image
                            ? `${PB_URL}/api/files/${item.collectionId}/${item.id}/${item.image}?thumb=600x400f`
                            : null;

                        return (
                            <Link 
                                key={item.id} 
                                href={`/museum/${item.slug}`}
                                className={cn(
                                    "group rounded-[2rem] overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col",
                                    isDark 
                                        ? "bg-slate-900 border-slate-800 hover:shadow-primary/5 hover:border-slate-700" 
                                        : "bg-white border-slate-100 hover:shadow-primary/10 hover:border-slate-200"
                                )}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] overflow-hidden shrink-0 bg-slate-200">
                                    {imageUrl && (
                                        <Image 
                                            src={imageUrl} 
                                            alt={item.name} 
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                    
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                                        {item.era}
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className={cn(
                                        "text-2xl font-black mb-3 transition-colors duration-300",
                                        isDark ? "text-white group-hover:text-primary" : "text-slate-900 group-hover:text-primary"
                                    )}>
                                        {item.name}
                                    </h3>
                                    <p className={cn(
                                        "line-clamp-3 text-sm leading-relaxed mb-6 flex-1",
                                        isDark ? "text-slate-400" : "text-slate-500"
                                    )}>
                                        {item.description}
                                    </p>
                                    
                                    <div className={cn(
                                        "flex items-center justify-between pt-6 border-t",
                                        isDark ? "border-slate-800" : "border-slate-100"
                                    )}>
                                        <span className={cn(
                                            "text-xs font-bold uppercase tracking-widest",
                                            isDark ? "text-slate-500" : "text-slate-400"
                                        )}>
                                            Pelajari Lebih Lanjut
                                        </span>
                                        <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center transform group-hover:translate-x-2 transition-transform shadow-lg shadow-primary/20">
                                            →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
      </section>
    </main>
  );
}
