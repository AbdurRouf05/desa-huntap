"use client";

import { Save, Globe, Smartphone, Mail, MapPin } from "lucide-react";

export default function PengaturanPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan Website</h1>
        <p className="text-slate-500 mt-1">Konfigurasi informasi umum desa, kontak, dan tampilan website.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 space-y-8">
          
          {/* Informasi Umum */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Globe className="w-5 h-5 text-slate-400" />
              Informasi Umum
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Nama Website / Desa</label>
                <input 
                  type="text" 
                  defaultValue="Desa Huntap Sumbermujur"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Nama Kepala Desa</label>
                <input 
                  type="text" 
                  defaultValue="H. Ahmad Subairi"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">Slogan / Tagline Singkat</label>
                <input 
                  type="text" 
                  defaultValue="Membangun Harmoni di Bawah Kaki Semeru"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Kontak & Lokasi */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-slate-400" />
              Kontak & Lokasi Balai Desa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-slate-400" />
                  Nomor Telepon / WhatsApp
                </label>
                <input 
                  type="text" 
                  defaultValue="081234567890"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  Alamat Email
                </label>
                <input 
                  type="email" 
                  defaultValue="pemdes@sumbermujur.desa.id"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">Alamat Lengkap</label>
                <textarea 
                  rows={3}
                  defaultValue="Kawasan Hunian Tetap (Huntap) Bumi Semeru Damai, Desa Sumbermujur, Kec. Candipuro, Kabupaten Lumajang, Jawa Timur 67373"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800 resize-y"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button className="px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm">
            <Save className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
