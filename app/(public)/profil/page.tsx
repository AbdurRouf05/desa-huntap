import { Metadata } from "next";
import Image from "next/image";
import { MapPin, Eye, Target, Sprout, Mountain, Coffee, Scissors, Wheat } from "lucide-react";
import { desaProfile } from "@/lib/dummy-data";

export const metadata: Metadata = {
  title: "Profil Desa",
  description: "Profil lengkap Desa Huntap Sumbermujur - sejarah, visi misi, geografi, dan potensi desa.",
};

const potensiIcons = [Wheat, Coffee, Scissors, Mountain, Sprout];

export default function ProfilPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-32 overflow-hidden">
        <Image 
          src="/gambar/2.jpg"
          alt="Desa Huntap Sumbermujur Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-emerald-900/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-emerald-200/20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest">Profil Desa</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Desa Huntap Sumbermujur</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Kecamatan Candipuro, Kabupaten Lumajang, Jawa Timur
          </p>
        </div>
      </section>

      {/* Sejarah */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800">Sejarah Desa</h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <p className="text-slate-600 leading-relaxed text-lg">{desaProfile.sejarah}</p>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="bg-gradient-to-br from-primary/5 to-emerald-50 rounded-2xl border border-emerald-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-black text-slate-800">Visi</h2>
              </div>
              <p className="text-slate-600 leading-relaxed italic text-lg">&ldquo;{desaProfile.visi}&rdquo;</p>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-black text-slate-800">Misi</h2>
              </div>
              <ol className="space-y-3">
                {desaProfile.misi.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-slate-600">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Potensi Desa */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Potensi</span>
            <h2 className="text-3xl font-black text-slate-800 mt-2">Potensi Unggulan Desa</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {desaProfile.potensi.map((item: string, idx: number) => {
              const Icon = potensiIcons[idx % potensiIcons.length];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Geografi */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Data Wilayah</span>
            <h2 className="text-3xl font-black text-slate-800 mt-2">Geografi & Demografi</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Luas Wilayah", value: desaProfile.luas_wilayah },
              { label: "Jumlah Penduduk", value: `${desaProfile.penduduk.toLocaleString("id-ID")} jiwa` },
              { label: "Jumlah RT", value: desaProfile.jumlah_rt.toString() },
              { label: "Jumlah RW", value: desaProfile.jumlah_rw.toString() },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
                <p className="text-3xl font-black text-primary">{item.value}</p>
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
