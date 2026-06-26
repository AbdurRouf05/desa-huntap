"use client";

import Link from "next/link";
import { ArrowLeft, Save, MapPin, Phone, User, Store } from "lucide-react";

export default function TambahPemilikPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/toko/pemilik"
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Registrasi UMKM Baru</h1>
          <p className="text-slate-500 mt-1">Daftarkan warga yang ingin membuka toko di website desa.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 space-y-8">
          
          <div className="space-y-6">
            
            {/* Foto Toko / Pemilik */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                Foto Profil Toko / Pemilik
              </label>
              <div className="mt-2 flex justify-center rounded-xl border border-dashed border-slate-300 px-6 py-8 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 text-slate-300">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:text-emerald-500"
                    >
                      <span>Upload file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" />
                    </label>
                    <p className="pl-1">atau drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-slate-500 mt-1">PNG, JPG, WEBP maksimal 5MB</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-600" />
                Nama Toko / Usaha <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Contoh: Warung Bu Maryam"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" />
                Nama Lengkap Pemilik <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Contoh: Maryam Siti"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                Nomor WhatsApp <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
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
                rows={3}
                placeholder="Jelaskan secara singkat jenis usaha yang dijalankan..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 resize-y"
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl mt-4">
              <input type="checkbox" id="verified" defaultChecked className="w-5 h-5 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-500" />
              <label htmlFor="verified" className="text-sm font-bold text-emerald-900">
                Langsung Verifikasi Toko Ini
                <p className="text-xs font-normal text-emerald-700 mt-0.5">Toko yang terverifikasi bisa langsung jualan dan tampil di web.</p>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <Link href="/toko/pemilik" className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
            Batal
          </Link>
          <button className="px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm">
            <Save className="w-4 h-4" />
            Simpan Data
          </button>
        </div>
      </div>
    </div>
  );
}
