import { Metadata } from "next";
import { dummyGallery } from "@/lib/dummy-data";
import { Camera, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Galeri Desa",
  description: "Kumpulan foto dan dokumentasi kegiatan Desa Huntap Sumbermujur.",
};

export default function GaleriPage() {
  const albums = ["Semua", ...Array.from(new Set(dummyGallery.map((g) => g.album)))];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-primary-dark via-primary to-emerald-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest">Dokumentasi</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Galeri Desa</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Kumpulan foto kegiatan, potensi, dan keindahan Desa Huntap Sumbermujur
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {dummyGallery.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm"
              >
                {/* Fallback pattern for images that are not yet loaded or missing */}
                <div className="aspect-[4/3] flex items-center justify-center">
                   <ImageIcon className="w-12 h-12 text-slate-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="px-2.5 py-1 bg-primary/90 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider mb-2 inline-block">
                      {item.album}
                    </span>
                    <h3 className="text-white font-bold text-sm leading-snug">{item.title}</h3>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
