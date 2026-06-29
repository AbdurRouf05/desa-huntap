"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateProductCategory } from "@/lib/actions/product-category.actions";
import { productCategoryService } from "@/lib/services/product-category.service";
import type { ProductCategory } from "@/types";

export default function EditKategoriProdukPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<ProductCategory | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await productCategoryService.getById(params.id);
        if (data) {
          setCategory(data);
        } else {
          setError("Kategori tidak ditemukan");
        }
      } catch (err) {
        setError("Gagal memuat kategori");
      } finally {
        setIsFetching(false);
      }
    };
    fetchCategory();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await updateProductCategory(params.id, formData);

    if (result.success) {
      router.push("/cp/kategori-produk");
      router.refresh();
    } else {
      setError(result.error || "Terjadi kesalahan");
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="p-8 text-center text-slate-500">Memuat data...</div>;
  }

  if (!category) {
    return (
      <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-100 max-w-2xl mx-auto">
        {error || "Kategori tidak ditemukan."}
      </div>
    );
  }

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
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Kategori Produk</h1>
          <p className="text-slate-500 text-sm">Perbarui informasi kategori produk UMKM.</p>
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
              defaultValue={category.name}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <input 
              type="checkbox" 
              name="is_active" 
              id="is_active"
              defaultChecked={category.is_active}
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
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
