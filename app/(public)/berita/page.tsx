import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ChevronRight, Newspaper, Eye } from "lucide-react";
import { newsService } from "@/lib/services/news.service";
import { newsCategoryService } from "@/lib/services/news-category.service";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Berita & Pengumuman",
  description: "Berita dan pengumuman terbaru dari Desa Huntap Sumbermujur.",
};

export const dynamic = "force-dynamic";

export default async function BeritaPage({ searchParams }: { searchParams: Promise<{ kategori?: string }> }) {
  const params = await searchParams;
  const currentCategory = params.kategori || "semua";
  
  // Get all active categories
  const allCategories = await newsCategoryService.getList();
  const activeCategories = allCategories.filter(cat => cat.is_active);
  
  // Find category ID if a slug is selected
  let filter = "status = 'published'";
  if (currentCategory !== "semua") {
    const selectedCat = activeCategories.find(c => c.slug === currentCategory);
    if (selectedCat) {
      filter += ` && category = '${selectedCat.id}'`;
    }
  }

  // Fetch all news
  const newsData = await newsService.getList(1, 20);
  
  // Apply manual filter
  const filteredNews = currentCategory === "semua" 
    ? newsData.items 
    : newsData.items.filter(n => n.expand?.category?.slug === currentCategory);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <Image 
          src="/gambar/1.jpg"
          alt="Berita & Pengumuman"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-emerald-900/80" />
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
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <Link
            href="/berita"
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              currentCategory === "semua"
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary"
            }`}
          >
            Semua
          </Link>
          {activeCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/berita?kategori=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                currentCategory === cat.slug
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.length === 0 ? (
                <div className="col-span-full py-20 text-center text-slate-500 font-medium">
                    Belum ada berita di kategori ini.
                </div>
            ) : (
                filteredNews.map((news) => {
                  const categoryName = news.expand?.category?.name || "Uncategorized";
                  const imageUrl = news.thumbnail
                    ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${news.collectionId}/${news.id}/${news.thumbnail}?thumb=600x400f`
                    : null;

                  return (
                    <Link
                        key={news.id}
                        href={`/berita/${news.slug}`}
                        className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                        {/* Thumbnail */}
                        <div className="aspect-video bg-emerald-50 relative overflow-hidden shrink-0">
                        {imageUrl ? (
                            <Image 
                              src={imageUrl} 
                              alt={news.title} 
                              fill 
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Newspaper className="w-10 h-10 text-emerald-200 group-hover:text-primary/30 transition-colors" />
                            </div>
                        )}
                        <div className="absolute top-3 left-3">
                            <span className="text-[10px] font-bold text-white bg-primary/90 backdrop-blur-sm px-2.5 py-1 rounded-lg uppercase tracking-wider shadow">
                            {categoryName}
                            </span>
                        </div>
                        </div>
                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 mb-2 text-[10px] font-semibold text-muted uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {formatDate(news.created)}
                            </span>
                            <span className="flex items-center gap-1.5">
                            <Eye className="w-3 h-3" />
                            {news.views || 0}
                            </span>
                        </div>
                        <h3 className="font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {news.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed flex-1">
                            {news.excerpt}
                        </p>
                        <div className="mt-4 flex items-center text-primary font-bold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0">
                            Baca Selengkapnya
                            <ChevronRight className="w-3 h-3 ml-1" />
                        </div>
                        </div>
                    </Link>
                  )
                })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
