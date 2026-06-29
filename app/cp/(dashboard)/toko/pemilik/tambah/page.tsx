"use client";

import Link from "next/link";
import { ArrowLeft, Save, MapPin, Phone, User, Store, Lock } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createToko } from "@/lib/actions/toko.actions";

export default function TambahPemilikPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const verifiedCheckbox = formData.get("is_verified") === "on";
    formData.set("is_verified", verifiedCheckbox ? "true" : "false");

    const result = await createToko(formData);

    if (result.success) {
      router.push("/cp/toko/pemilik");
      router.refresh();
    } else {
      setError(result.error || "Gagal menyimpan data.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/cp/toko/pemilik"
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Registrasi UMKM Baru</h1>
          <p className="text-slate-500 mt-1">Daftarkan warga yang ingin membuka toko di website desa.</p>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 space-y-8">
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-6">
            
            {/* Foto Toko / Pemilik */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                Foto Profil Toko / Pemilik
              </label>
              <ImageUpload id="banner" name="banner" />
              <p className="text-xs leading-5 text-slate-500 mt-1 text-center">PNG, JPG, WEBP maksimal 5MB</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-600" />
                Nama Toko / Usaha <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="name"
                required
                placeholder="Contoh: Warung Bu Maryam"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  Nama Lengkap Pemilik <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="owner_name"
                  required
                  placeholder="Contoh: Maryam Siti"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  Password Akses Portal Toko <span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  name="password"
                  required
                  placeholder="Masukkan kata sandi..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                Nomor WhatsApp <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="phone"
                required
                placeholder="Contoh: 6281234567890"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
              />
              <p className="text-xs text-slate-500 mt-1">Gunakan format 62 (tanpa 0 di depan). Sangat penting untuk penerimaan pesanan.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Alamat (RT/RW) <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="address"
                required
                rows={2}
                placeholder="Contoh: RT 05 RW 02, Desa Huntap Sumbermujur"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 resize-y"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                Deskripsi Singkat Usaha
              </label>
              <textarea 
                name="description"
                rows={3}
                placeholder="Jelaskan secara singkat jenis usaha yang dijalankan..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 resize-y"
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl mt-4">
              <input type="checkbox" name="is_verified" id="is_verified" defaultChecked className="w-5 h-5 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-500" />
              <label htmlFor="is_verified" className="text-sm font-bold text-emerald-900 cursor-pointer">
                Langsung Verifikasi Toko Ini
                <p className="text-xs font-normal text-emerald-700 mt-0.5">Toko yang terverifikasi bisa langsung jualan dan tampil di web.</p>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <Link href="/cp/toko/pemilik" className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
            Batal
          </Link>
          <button 
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Menyimpan..." : "Simpan Data"}
          </button>
        </div>
      </form>
    </div>
  );
}
