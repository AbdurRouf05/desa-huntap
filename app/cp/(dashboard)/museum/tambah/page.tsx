"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { museumService } from "@/lib/services/museum.service";

export default function TambahMuseumItemPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Auto-generate slug from name if not provided
      const name = formData.get("name") as string;
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      formData.append("slug", slug);

      await museumService.create(formData);
      router.push("/cp/museum");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <Link 
          href="/cp/museum"
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tambah Koleksi Baru</h1>
          <p className="text-slate-500 mt-1">Masukkan artefak baru ke dalam koleksi museum desa.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 space-y-6">
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Nama Koleksi <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Contoh: Sepeda Onthel Abu Vulkanik"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Era / Tahun <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        name="era"
                        required
                        placeholder="Contoh: Erupsi Semeru 2021"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Kondisi Barang <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        name="condition"
                        required
                        placeholder="Contoh: Sebagian Berkarat"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Foto Artefak <span className="text-red-500">*</span></label>
                <ImageUpload id="image" name="image" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Cerita / Sejarah (Deskripsi) <span className="text-red-500">*</span></label>
                <textarea 
                    name="description"
                    required
                    rows={8}
                    placeholder="Ceritakan sejarah menarik di balik barang ini..."
                    className="w-full p-4 border border-slate-300 rounded-xl outline-none text-slate-800 resize-y focus:ring-2 focus:ring-primary focus:border-primary"
                />
            </div>
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isLoading ? "Menyimpan..." : "Simpan & Generate QR"}
            </button>
        </div>
      </form>
    </div>
  );
}
