import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createNewsCategory } from "@/lib/actions/news-category.actions";

export default function TambahKategoriPage() {
  return (
    <main className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link
          href="/cp/kategori-berita"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Tambah Kategori Baru</h1>
          <p className="text-slate-500 text-sm">Buat kategori berita baru untuk portal desa.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <form action={createNewsCategory} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Nama Kategori</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
              placeholder="Misal: Kegiatan Desa"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Slug (URL)</label>
            <input
              type="text"
              name="slug"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800 bg-slate-50"
              placeholder="Misal: kegiatan-desa"
              required
            />
            <p className="text-xs text-slate-400">Gunakan huruf kecil dan strip (-). Contoh: pengumuman-penting</p>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              defaultChecked
              className="w-5 h-5 accent-primary rounded cursor-pointer"
            />
            <div className="flex flex-col">
              <label htmlFor="is_active" className="font-bold text-slate-800 cursor-pointer text-sm">Aktif di Publik</label>
              <span className="text-xs text-slate-500">Tampilkan kategori ini sebagai tab filter berita.</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <Link
              href="/cp/kategori-berita"
              className="px-6 py-3 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 font-bold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-lg shadow-primary/20 transition-all"
            >
              <Save className="w-5 h-5" />
              Simpan Kategori
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
