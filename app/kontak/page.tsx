"use client";

import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function KontakPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-primary-dark via-primary to-emerald-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest">Hubungi Kami</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Kontak & Lokasi</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Punya pertanyaan, saran, atau pengaduan? Silakan hubungi kami melalui kanal di bawah ini.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Info Cards */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">Kantor Desa</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{siteConfig.address}</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">Telepon & WhatsApp</h3>
                <p className="text-sm text-slate-600">{siteConfig.phone}</p>
                <a 
                  href={`https://wa.me/${siteConfig.waAdmin.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-bold text-green-500 hover:text-green-600"
                >
                  <MessageCircle className="w-4 h-4" /> Hubungi via WA
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">Jam Operasional</h3>
                <div className="text-sm text-slate-600 space-y-1">
                  <p className="flex justify-between"><span>Senin - Kamis:</span> <span className="font-medium text-slate-800">08:00 - 15:00</span></p>
                  <p className="flex justify-between"><span>Jumat:</span> <span className="font-medium text-slate-800">08:00 - 11:30</span></p>
                  <p className="flex justify-between"><span>Sabtu - Minggu:</span> <span className="font-medium text-slate-400">Tutup</span></p>
                </div>
              </div>
            </div>

            {/* Map & Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Maps */}
              <div className="aspect-[21/9] md:aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                <iframe
                  src={siteConfig.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Desa"
                  className="w-full h-full"
                />
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h2 className="text-2xl font-black text-slate-800 mb-6">Kirim Pesan / Pengaduan</h2>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm" placeholder="Masukkan nama Anda" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Nomor Telepon / WA</label>
                      <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm" placeholder="Contoh: 0812..." />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Subjek</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm">
                      <option>Pertanyaan Umum</option>
                      <option>Pengaduan Masyarakat</option>
                      <option>Informasi Layanan</option>
                      <option>Lainnya</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Pesan</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm resize-none" placeholder="Tulis pesan atau pengaduan Anda di sini..."></textarea>
                  </div>
                  <button type="button" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 w-full md:w-auto bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/25 transition-all">
                    <Send className="w-4 h-4" />
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
