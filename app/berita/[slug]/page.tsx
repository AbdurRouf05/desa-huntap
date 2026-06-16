import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, User, Share2 } from "lucide-react";
import { dummyNews } from "@/lib/dummy-data";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = dummyNews.find((n) => n.slug === slug);
  if (!article) return { title: "Artikel Tidak Ditemukan" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = dummyNews.find((n) => n.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedNews = dummyNews.filter((n) => n.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Berita
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Category & Date */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase">
            {article.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Clock className="w-3.5 h-3.5" />
            {formatDate(article.createdAt)}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-6">
          {article.title}
        </h1>

        {/* Author & Share */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{article.author}</p>
              <p className="text-xs text-muted">Penulis</p>
            </div>
          </div>
          <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
            <Share2 className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div
          className="prose-content text-slate-700 text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="bg-slate-50 py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-black text-slate-800 mb-6">Berita Lainnya</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/berita/${news.slug}`}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                >
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    {news.category}
                  </span>
                  <h3 className="font-bold text-slate-800 text-sm mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-xs text-muted mt-2">{formatDate(news.createdAt)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
