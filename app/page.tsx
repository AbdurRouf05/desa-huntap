"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Users,
  MapPin,
  Home,
  Layers,
  ArrowRight,
  ShoppingBag,
  Clock,
  Newspaper,
  Star,
} from "lucide-react";
import { cn, formatRupiah, formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { desaProfile, dummyProducts, dummyNews } from "@/lib/dummy-data";

// ============================================================
// HERO SLIDER
// ============================================================
const heroSlides = [
  {
    title: "Selamat Datang di Desa Huntap Sumbermujur",
    subtitle: "Portal informasi resmi dan pusat UMKM desa di lereng Gunung Semeru",
    cta: "Jelajahi Desa",
    ctaLink: "/profil",
    gradient: "from-emerald-900/90 via-emerald-900/50 to-transparent",
  },
  {
    title: "Produk UMKM Unggulan Desa",
    subtitle: "Temukan kopi robusta, kerajinan bambu, dan olahan khas Lumajang langsung dari warga",
    cta: "Kunjungi Toko",
    ctaLink: "/toko",
    gradient: "from-slate-900/90 via-slate-900/50 to-transparent",
  },
  {
    title: "Bersama Membangun Desa Mandiri",
    subtitle: "Transparansi, gotong royong, dan pemberdayaan masyarakat untuk masa depan yang lebih baik",
    cta: "Lihat Berita",
    ctaLink: "/berita",
    gradient: "from-emerald-950/90 via-emerald-900/40 to-transparent",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[480px] md:h-[560px] lg:h-[620px] overflow-hidden bg-slate-900">
      {/* Placeholder backgrounds with gradient overlays */}
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={cn(
            "absolute inset-0 transition-all duration-[1500ms] ease-in-out",
            current === idx ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
        >
          {/* Gradient pattern background */}
          <div
            className={cn(
              "absolute inset-0",
              idx === 0
                ? "bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-600"
                : idx === 1
                ? "bg-gradient-to-br from-slate-800 via-emerald-800 to-emerald-700"
                : "bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-700"
            )}
          />
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl" />
          </div>
          {/* Content Overlay */}
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
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20">
                  <span className="text-white font-black text-xl">S</span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4 drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-base md:text-lg text-emerald-50/90 mb-8 leading-relaxed max-w-xl">
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

      {/* Slider Controls */}
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
              onClick={() =>
                setCurrent((prev) =>
                  prev === 0 ? heroSlides.length - 1 : prev - 1
                )
              }
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setCurrent((prev) => (prev + 1) % heroSlides.length)
              }
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

// ============================================================
// STATS SECTION
// ============================================================
function StatsSection() {
  const stats = [
    { icon: Users, label: "Penduduk", value: desaProfile.penduduk.toLocaleString("id-ID") + " jiwa" },
    { icon: MapPin, label: "Luas Wilayah", value: desaProfile.luasWilayah },
    { icon: Home, label: "Jumlah RT", value: desaProfile.jumlahRT.toString() },
    { icon: Layers, label: "Jumlah RW", value: desaProfile.jumlahRW.toString() },
  ];

  return (
    <section className="relative -mt-16 z-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 md:p-6 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl md:text-3xl font-black text-slate-800">
                {stat.value}
              </p>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT SECTION
// ============================================================
function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 overflow-hidden border border-emerald-100 shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-lg font-bold text-slate-700">Desa Huntap Sumbermujur</p>
                  <p className="text-sm text-muted mt-1">Lereng Gunung Semeru, Lumajang</p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/10 -z-10" />
          </div>

          {/* Text */}
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Tentang Desa
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2 mb-6 leading-tight">
              Mengenal Desa Huntap Sumbermujur
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {desaProfile.sejarah}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {desaProfile.potensi.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              href="/profil"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
            >
              Selengkapnya <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURED PRODUCTS
// ============================================================
function FeaturedProducts() {
  const featured = dummyProducts.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Produk UMKM
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2">
              Produk Unggulan Desa
            </h2>
          </div>
          <Link
            href="/toko"
            className="hidden sm:flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
          >
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/toko/${product.id}`}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-slate-200 group-hover:text-primary/30 transition-colors" />
                </div>
                {product.discountPrice && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold rounded-lg shadow-lg">
                      DISKON
                    </span>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-4">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-bold text-slate-800 text-sm mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-black text-primary">
                    {formatRupiah(product.discountPrice || product.price)}
                  </span>
                  {product.discountPrice && (
                    <span className="text-xs text-muted line-through">
                      {formatRupiah(product.price)}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-muted mt-1.5 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {product.sellerName}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/toko"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/25"
          >
            Lihat Semua Produk <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// LATEST NEWS
// ============================================================
function LatestNews() {
  const latestNews = dummyNews.slice(0, 3);

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Berita & Pengumuman
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2">
              Kabar Terbaru Desa
            </h2>
          </div>
          <Link
            href="/berita"
            className="hidden sm:flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
          >
            Semua Berita <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {latestNews.map((news) => (
            <Link
              key={news.id}
              href={`/berita/${news.slug}`}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Newspaper className="w-10 h-10 text-emerald-200 group-hover:text-primary/30 transition-colors" />
                </div>
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold text-white bg-primary/90 backdrop-blur-sm px-2.5 py-1 rounded-lg uppercase tracking-wider shadow">
                    {news.category}
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold text-muted uppercase tracking-wider">
                  <Clock className="w-3 h-3" />
                  {formatDate(news.createdAt)}
                </div>
                <h3 className="font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {news.excerpt}
                </p>
                <div className="mt-4 flex items-center text-primary font-bold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0">
                  Baca Selengkapnya
                  <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/25"
          >
            Semua Berita <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MAP SECTION
// ============================================================
function MapSection() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            Lokasi
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2">
            Temukan Kami
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Map */}
          <div className="md:col-span-2 aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
            <iframe
              src={siteConfig.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Desa Huntap Sumbermujur"
              className="w-full h-full"
            />
          </div>
          {/* Contact Info */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 text-lg mb-4">Kantor Desa</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-slate-600">{siteConfig.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm text-slate-600 font-medium">Jam Operasional</p>
                  <p className="text-xs text-muted">Senin - Jumat: 08:00 - 15:00 WIB</p>
                </div>
              </div>
            </div>
            <Link
              href="/kontak"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/25 hover:bg-primary-dark transition-colors"
            >
              Hubungi Kami <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HOMEPAGE
// ============================================================
export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <StatsSection />
      <AboutSection />
      <FeaturedProducts />
      <LatestNews />
      <MapSection />
    </>
  );
}
