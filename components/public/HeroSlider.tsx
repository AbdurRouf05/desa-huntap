"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const heroSlides = [
  {
    title: "Selamat Datang di Desa Huntap Sumbermujur",
    subtitle: "Portal informasi resmi dan pusat UMKM desa di lereng Gunung Semeru",
    cta: "Jelajahi Desa",
    ctaLink: "/profil",
    image: "/gambar/1.jpg",
    gradient: "from-emerald-900/90 via-emerald-900/60 to-transparent",
  },
  {
    title: "Produk UMKM Unggulan Desa",
    subtitle: "Temukan kopi robusta, kerajinan bambu, dan olahan khas Lumajang langsung dari warga",
    cta: "Kunjungi Toko",
    ctaLink: "/toko",
    image: "/gambar/3.jpg",
    gradient: "from-slate-900/90 via-slate-900/60 to-transparent",
  },
  {
    title: "Bersama Membangun Desa Mandiri",
    subtitle: "Transparansi, gotong royong, dan pemberdayaan masyarakat untuk masa depan yang lebih baik",
    cta: "Lihat Berita",
    ctaLink: "/berita",
    image: "/gambar/4.jpg",
    gradient: "from-emerald-950/90 via-emerald-900/60 to-transparent",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[480px] md:h-[560px] lg:h-[620px] overflow-hidden bg-slate-900">
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={cn(
            "absolute inset-0 transition-all duration-[1500ms] ease-in-out",
            current === idx ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
        >
          {slide.image && (
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          )}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl" />
          </div>
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} flex items-center`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <div
                className={cn(
                  "max-w-2xl transition-all duration-1000 delay-300 transform",
                  current === idx
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-12 opacity-0"
                )}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4 drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-emerald-50/90 mb-8 leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 active:scale-95"
                >
                  {slide.cta}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-0 right-0 z-30 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex gap-2.5">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  current === idx
                    ? "w-10 bg-primary"
                    : "w-4 bg-white/25 hover:bg-white/50"
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrent((prev) => prev === 0 ? heroSlides.length - 1 : prev - 1)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % heroSlides.length)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
