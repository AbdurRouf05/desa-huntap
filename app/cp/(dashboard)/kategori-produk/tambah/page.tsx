"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProductCategory } from "@/lib/actions/product-category.actions";

export default function TambahKategoriProdukPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createProductCategory(formData);

    if (result.success) {
      router.push("/cp/kategori-produk");
      router.refresh();
    } else {
      setError(result.error || "Terjadi kesalahan");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/cp/kategori-produk"
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Tambah Kategori Produk</h1>
          <p className="text-slate-500 text-sm">Buat kategori baru untuk produk UMKM.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Nama Kategori</label>
            <input 
              type="text" 
              name="name"
              required
              placeholder="Contoh: Kuliner"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <input 
              type="checkbox" 
              name="is_active" 
              id="is_active"
              defaultChecked
              className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <label htmlFor="is_active" className="text-sm font-bold text-slate-700 cursor-pointer">
              Aktifkan Kategori
              <span className="block text-xs text-slate-500 font-normal mt-0.5">
                Kategori ini akan langsung muncul sebagai pilihan toko dan filter publik.
              </span>
            </label>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-70"
          >
            <Save className="w-5 h-5" />
            {isLoading ? "Menyimpan..." : "Simpan Kategori"}
          </button>
        </div>
      </form>
    </div>
  );
}
