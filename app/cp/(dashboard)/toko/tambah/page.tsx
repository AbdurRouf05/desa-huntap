"use client";

import Link from "next/link";
import { ArrowLeft, Upload, Save, Eye, Phone } from "lucide-react";
import { dummyUmkmStores } from "@/lib/dummy-data";

export default function TambahProdukPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/toko"
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tambah Produk Baru</h1>
          <p className="text-slate-500 mt-1">Unggah produk UMKM warga ke etalase desa.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 space-y-8">
          
          {/* Section: Informasi Dasar */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Informasi Dasar Produk</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Nama Produk <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Contoh: Kopi Robusta Lereng Semeru"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Kategori <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 bg-white">
                    <option value="makanan">Makanan</option>
                    <option value="minuman">Minuman</option>
                    <option value="kerajinan">Kerajinan</option>
                    <option value="pertanian">Hasil Pertanian</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Stok Tersedia <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    placeholder="Contoh: 50"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Harga Normal (Rp) <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    placeholder="Contoh: 75000"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Harga Diskon (Rp) <span className="font-normal text-slate-400 ml-1 text-xs">(Opsional)</span></label>
                  <input 
                    type="number" 
                    placeholder="Contoh: 65000"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Data UMKM (Penjual) */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Phone className="w-5 h-5 text-slate-400" />
              Data Pemilik UMKM
            </h2>
            <p className="text-sm text-slate-500 mb-4">Informasi ini penting agar pesanan langsung masuk ke WhatsApp warga pemilik produk.</p>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Pilih Pemilik Toko / UMKM <span className="text-red-500">*</span></label>
                <select 
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 bg-white"
                >
                  <option value="">-- Pilih Toko UMKM --</option>
                  {dummyUmkmStores.map(store => (
                    <option key={store.id} value={store.id}>{store.name} (Pemilik: {store.ownerName})</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  Pilih toko dari daftar UMKM yang sudah terdaftar. Jika toko belum ada, daftarkan dulu di menu <strong>Pemilik UMKM</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Foto & Deskripsi */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Foto & Deskripsi</h2>
            
            <div className="space-y-6">
              {/* Foto Produk */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Foto Produk <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Upload Box */}
                  <div className="aspect-square border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-xs font-medium text-slate-600">Unggah Foto</p>
                  </div>
                  {/* Empty slots placeholders */}
                  <div className="aspect-square bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-300">
                    <span className="text-xs font-medium">Foto 2</span>
                  </div>
                  <div className="aspect-square bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-300">
                    <span className="text-xs font-medium">Foto 3</span>
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Deskripsi Lengkap <span className="text-red-500">*</span></label>
                <textarea 
                  rows={6}
                  placeholder="Ceritakan detail produk, bahan, ukuran, dan keunggulannya..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 resize-y"
                />
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="featured" className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                <label htmlFor="featured" className="text-sm font-medium text-slate-700">
                  Jadikan <span className="text-amber-500 font-bold">Produk Unggulan</span> (Tampil di Halaman Depan)
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
            Batal
          </button>
          <button className="px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm">
            <Save className="w-4 h-4" />
            Simpan Produk
          </button>
        </div>
      </div>
    </div>
  );
}
