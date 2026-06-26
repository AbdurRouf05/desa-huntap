"use client";

import Link from "next/link";
import { ArrowLeft, Upload, Save } from "lucide-react";

export default function TambahMuseumItemPage() {
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

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 space-y-6">
            
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Nama Koleksi <span className="text-red-500">*</span></label>
                <input 
                type="text" 
                placeholder="Contoh: Sepeda Onthel Abu Vulkanik"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Era / Tahun <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        placeholder="Contoh: Erupsi Semeru 2021"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Kondisi Barang <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        placeholder="Contoh: Sebagian Berkarat"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Foto Artefak <span className="text-red-500">*</span></label>
                <label htmlFor="artefak-upload" className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group w-full block">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
                        <Upload className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-700 mb-1">Klik untuk unggah gambar</p>
                    <p className="text-xs text-slate-500">Maksimal ukuran 2MB (JPG, PNG)</p>
                    <input id="artefak-upload" type="file" className="sr-only" accept="image/*" />
                </label>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Cerita / Sejarah (Deskripsi) <span className="text-red-500">*</span></label>
                <textarea 
                    rows={8}
                    placeholder="Ceritakan sejarah menarik di balik barang ini..."
                    className="w-full p-4 border border-slate-300 rounded-xl outline-none text-slate-800 resize-y focus:ring-2 focus:ring-primary focus:border-primary"
                />
            </div>
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
            <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm">
                <Save className="w-5 h-5" />
                Simpan & Generate QR
            </button>
        </div>
      </div>
    </div>
  );
}
