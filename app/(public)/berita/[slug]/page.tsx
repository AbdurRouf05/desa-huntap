import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { newsService } from "@/lib/services/news.service";
import { formatDate } from "@/lib/utils";
import { ViewCounter } from "@/components/news/view-counter";
import { ShareButton } from "@/components/news/share-button";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const article = await newsService.getBySlug(slug);
    return {
      title: article.title,
      description: article.excerpt,
    };
  } catch (error) {
    return { title: "Berita Tidak Ditemukan" };
  }
}

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let article;
  try {
    article = await newsService.getBySlug(slug);
  } catch (error) {
    notFound();
  }

  const categoryName = article.expand?.category?.name || "Uncategorized";
  const authorName = "Admin Desa"; // TODO: Map to actual author if available in PB
  
  const imageUrl = article.thumbnail
    ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${article.collectionId}/${article.id}/${article.thumbnail}`
    : null;

  const recentNewsList = await newsService.getList(1, 4);
  const recentNews = recentNewsList.items.filter(n => n.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 max-w-3xl">
          <Link 
            href="/berita"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <ShareButton title={article.title} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-primary font-extrabold text-xs tracking-widest uppercase">
                  {categoryName}
                </span>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {formatDate(article.created)}
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black text-slate-900 leading-[1.15] mb-8 tracking-tight">
                {article.title}
              </h1>

              {/* Author & Stats row */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100 bg-slate-50/50 px-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
                    {authorName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{authorName}</p>
                    <p className="text-xs font-medium text-slate-500">Penulis Desa</p>
                  </div>
                </div>
                <ViewCounter slug={article.slug} initialViews={article.views || 0} />
              </div>
            </header>

            {/* Thumbnail */}
            {imageUrl && (
              <figure className="w-full aspect-[16/9] bg-slate-100 rounded-[2rem] overflow-hidden relative mb-12 shadow-sm">
                <Image 
                  src={imageUrl} 
                  alt={article.title} 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </figure>
            )}

            {/* Content */}
            <article 
              className="prose prose-lg prose-slate max-w-none 
                prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
                prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-3xl prose-img:shadow-md
                prose-strong:font-bold prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-primary rounded-full"></div>
                Berita Terbaru
              </h3>
              <div className="space-y-6">
                {recentNews.map((news) => {
                  const thumb = news.thumbnail
                    ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${news.collectionId}/${news.id}/${news.thumbnail}?thumb=300x200f`
                    : null;
                  
                  return (
                    <Link href={`/berita/${news.slug}`} key={news.id} className="group flex gap-4 items-start">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-slate-100">
                        {thumb && (
                          <Image
                            src={thumb}
                            alt={news.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5">
                          {news.expand?.category?.name || "Desa"}
                        </p>
                        <h4 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors mb-2">
                          {news.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          {formatDate(news.created)}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}
