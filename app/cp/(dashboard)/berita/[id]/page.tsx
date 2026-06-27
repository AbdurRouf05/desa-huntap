"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Upload, Save, Eye } from "lucide-react";
import { dummyNews, dummyNewsCategories } from "@/lib/dummy-data";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function EditBeritaPage() {
  const params = useParams();
  const articleId = params.id as string;
  const article = dummyNews.find((n) => n.id === articleId);

  if (!article) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Berita Tidak Ditemukan</h2>
        <Link href="/cp/berita" className="text-primary hover:underline mt-4 inline-block">Kembali ke Daftar Berita</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/cp/berita"
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Berita</h1>
          <p className="text-slate-500 mt-1">Perbarui artikel atau informasi berita desa.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 space-y-6">
          
          {/* Judul */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Judul Artikel <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              defaultValue={article.title}
              placeholder="Contoh: Peresmian Balai Desa Baru"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kategori */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Kategori <span className="text-red-500">*</span></label>
              <select 
                defaultValue={article.category}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800 bg-white"
              >
                {dummyNewsCategories.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Tanggal */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Tanggal Publikasi <span className="text-red-500">*</span></label>
              <input 
                type="date" 
                defaultValue={article.created}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Gambar Utama (Thumbnail) <span className="text-red-500">*</span></label>
            <ImageUpload id="thumbnail-upload" />
          </div>

          {/* Konten */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Isi Artikel <span className="text-red-500">*</span></label>
            <div className="border border-slate-300 rounded-xl overflow-hidden">
              {/* Dummy Toolbar */}
              <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                <button className="px-3 py-1 font-bold text-slate-700 hover:bg-slate-200 rounded">B</button>
                <button className="px-3 py-1 italic text-slate-700 hover:bg-slate-200 rounded">I</button>
                <button className="px-3 py-1 underline text-slate-700 hover:bg-slate-200 rounded">U</button>
                <div className="w-px h-6 bg-slate-300 my-auto mx-1" />
                <button className="px-3 py-1 text-slate-700 hover:bg-slate-200 rounded text-sm">Link</button>
                <button className="px-3 py-1 text-slate-700 hover:bg-slate-200 rounded text-sm">Image</button>
              </div>
              <textarea 
                rows={12}
                defaultValue={article.content.replace(/<[^>]*>?/gm, '')} // Strip HTML tags for dummy simple textarea
                placeholder="Tulis isi artikel di sini..."
                className="w-full p-4 outline-none text-slate-800 resize-y"
              />
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="publish" className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary" defaultChecked={article.is_published} />
            <label htmlFor="publish" className="text-sm font-medium text-slate-700">Publikasikan Berita</label>
          </div>
          
          <div className="flex gap-3">
            <Link 
              href={`/berita/${article.slug}`}
              target="_blank"
              className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Link>
            <button className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm">
              <Save className="w-4 h-4" />
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
