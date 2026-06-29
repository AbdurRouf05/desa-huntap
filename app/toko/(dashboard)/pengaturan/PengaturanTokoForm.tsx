"use client";

import { Save, Store, MapPin, Phone, Lock, Image as ImageIcon } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useState } from "react";
import { updateMyStore } from "@/lib/actions/toko.actions";
import { PB_URL } from "@/lib/pocketbase";

export default function PengaturanTokoForm({ store }: { store: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const result = await updateMyStore(formData);

    if (result.success) {
      setSuccess("Profil toko berhasil diperbarui!");
    } else {
      setError(result.error || "Gagal memperbarui profil toko.");
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-6 space-y-8">
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm font-medium border border-emerald-100">
            {success}
          </div>
        )}

        <div className="space-y-6">
          
          {/* Foto Toko */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              Foto Profil Toko
            </label>
            <ImageUpload 
              id="image"
              name="image" 
              defaultImage={store?.image ? `${PB_URL}/api/files/umkm_stores/${store.id}/${store.image}?thumb=400x400` : undefined}
            />
            <p className="text-xs text-slate-500 mt-1 text-center">Biarkan kosong jika tidak ingin mengubah foto. PNG, JPG, WEBP maksimal 5MB.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-600" />
              Nama Toko / Usaha <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="name"
              defaultValue={store?.name}
              required
              placeholder="Contoh: Warung Bu Maryam"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                Nomor WhatsApp <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="phone"
                defaultValue={store?.phone}
                required
                placeholder="Contoh: 6281234567890"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 transition-all"
              />
              <p className="text-xs text-slate-500 mt-1">Gunakan awalan 62. Sangat penting untuk menerima pesanan!</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                Ganti Kata Sandi <span className="text-slate-400 font-normal text-xs">(Opsional)</span>
              </label>
              <input 
                type="password" 
                name="password"
                placeholder="Kosongkan jika tidak ingin ganti"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Alamat Lengkap <span className="text-red-500">*</span>
            </label>
            <textarea 
              name="address"
              defaultValue={store?.address}
              required
              rows={2}
              placeholder="Contoh: RT 05 RW 02, Desa Huntap Sumbermujur"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 resize-y transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              Deskripsi Singkat Usaha
            </label>
            <textarea 
              name="description"
              defaultValue={store?.description?.replace(/<[^>]+>/g, '')}
              rows={3}
              placeholder="Jelaskan jenis usaha yang Anda jalankan..."
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 resize-y transition-all"
            />
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
        <button 
          type="submit"
          disabled={isLoading}
          className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
