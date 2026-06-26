"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { MuseumItem } from "@/types";

export function MuseumDetailClient({ item, imageUrl }: { item: MuseumItem, imageUrl: string | null }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <main className={cn(
        "min-h-screen transition-colors duration-500 pb-20",
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    )}>
      {/* Sticky Theme Toggle & Back Button */}
      <div className={cn(
          "sticky top-16 md:top-18 z-40 py-4 px-4 sm:px-6 transition-colors duration-500 border-b",
          isDark ? "bg-slate-950/80 border-slate-800 backdrop-blur-md" : "bg-white/80 border-slate-200 backdrop-blur-md"
      )}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
              <Link 
                href="/museum" 
                className={cn(
                    "flex items-center gap-2 font-bold transition-colors",
                    isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                )}
              >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Koleksi
              </Link>
              
              <button 
                onClick={() => setIsDark(!isDark)}
                className={cn(
                    "px-4 py-2 text-xs font-bold rounded-full transition-colors border",
                    isDark ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700" : "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200"
                )}
              >
                  {isDark ? "☀️ Tema Terang" : "🌙 Tema Gelap"}
              </button>
          </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        
        <header className="mb-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-primary/10 text-primary mb-6">
                Artefak Museum
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                {item.name}
            </h1>
            
            <div className={cn(
                "flex flex-wrap items-center justify-center gap-6 text-sm font-medium",
                isDark ? "text-slate-400" : "text-slate-500"
            )}>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{item.era}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-amber-500" />
                    <span>Kondisi: {item.condition}</span>
                </div>
                {item.location && (
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-indigo-500" />
                        <span>{item.location}</span>
                    </div>
                )}
            </div>
        </header>

        {/* Featured Image */}
        {imageUrl && (
            <div className="relative rounded-[2rem] overflow-hidden mb-12 shadow-2xl bg-slate-200 w-full aspect-video">
                <Image 
                    src={imageUrl} 
                    alt={item.name} 
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
        )}

        {/* Content Story */}
        <div className={cn(
            "prose prose-lg md:prose-xl mx-auto",
            isDark ? "prose-invert prose-p:text-slate-300" : "prose-slate prose-p:text-slate-600"
        )}>
            <div className={cn(
                "p-8 rounded-[2rem] border mb-10 text-xl md:text-2xl font-medium leading-relaxed italic text-center",
                isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
            )}>
                "Barang ini bukan sekadar benda mati, melainkan saksi bisu yang menyimpan memori dan jejak langkah kehidupan kita."
            </div>
            
            <p className="whitespace-pre-wrap font-medium">
                {item.description}
            </p>
        </div>
      </article>
    </main>
  );
}
