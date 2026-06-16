import { Metadata } from "next";
import Link from "next/link";
import { Clock, ChevronRight, Newspaper, Search } from "lucide-react";
import { dummyNews } from "@/lib/dummy-data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Berita & Pengumuman",
  description: "Berita dan pengumuman terbaru dari Desa Huntap Sumbermujur.",
};

export default function BeritaPage() {
  const categories = ["Semua", "berita", "pengumuman", "kegiatan"];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-primary-dark via-primary to-emerald-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest">Info Terkini</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Berita & Pengumuman</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Informasi terbaru seputar kegiatan dan perkembangan Desa Huntap Sumbermujur
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 px-4 sm:px-6 bg-white border-b border-slate-200 sticky top-16 md:top-18 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary first:bg-primary first:text-white"
            >
              {cat === "Semua" ? cat : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyNews.map((news) => (
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
        </div>
      </section>
    </div>
  );
}
