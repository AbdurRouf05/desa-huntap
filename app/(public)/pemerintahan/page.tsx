import { Metadata } from "next";
import { Users, UserCheck } from "lucide-react";
import { officialService } from "@/lib/services/official.service";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Pemerintahan Desa",
  description: "Struktur organisasi dan perangkat Desa Huntap Sumbermujur.",
};

export const dynamic = "force-dynamic";

export default async function PemerintahanPage() {
  const officials = await officialService.getList();
  
  // Sort or get first as head of village
  const head = officials.length > 0 ? officials[0] : null;
  const staffs = officials.length > 1 ? officials.slice(1) : [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <Image 
          src="/gambar/3.jpg"
          alt="Pemerintahan Desa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-emerald-900/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest">Struktur Organisasi</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Pemerintahan Desa</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Perangkat dan struktur pemerintahan Desa Huntap Sumbermujur
          </p>
        </div>
      </section>

      {/* Perangkat Desa */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Perangkat</span>
            <h2 className="text-3xl font-black text-slate-800 mt-2">Perangkat Desa</h2>
          </div>

          {head && (
            <div className="max-w-md mx-auto mb-12">
              <div className="bg-white rounded-2xl border-2 border-primary/20 p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-emerald-100 mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg relative overflow-hidden">
                  {head.photo ? (
                    <Image 
                      src={officialService.getPhotoUrl(head, "200x200")} 
                      alt={head.name} 
                      fill 
                      className="object-cover"
                    />
                  ) : (
                    <UserCheck className="w-12 h-12 text-primary" />
                  )}
                </div>
                <h3 className="text-xl font-black text-slate-800">{head.name}</h3>
                <span className="inline-block mt-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full">
                  {head.position}
                </span>
              </div>
            </div>
          )}

          {/* Staff Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {staffs.map((person) => (
              <div
                key={person.id}
                className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 mx-auto mb-4 flex items-center justify-center border-2 border-slate-200 group-hover:border-primary/30 transition-colors relative overflow-hidden">
                  {person.photo ? (
                    <Image 
                      src={officialService.getPhotoUrl(person, "100x100")} 
                      alt={person.name} 
                      fill 
                      className="object-cover"
                    />
                  ) : (
                    <Users className="w-8 h-8 text-slate-300 group-hover:text-primary/60 transition-colors" />
                  )}
                </div>
                <h3 className="font-bold text-slate-800 text-sm">{person.name}</h3>
                <p className="text-xs text-muted mt-1 font-medium">{person.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kelembagaan */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Kelembagaan</span>
            <h2 className="text-3xl font-black text-slate-800 mt-2">Lembaga Desa</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "BPD (Badan Permusyawaratan Desa)", desc: "Lembaga yang melaksanakan fungsi pemerintahan desa." },
              { name: "LPMD (Lembaga Pemberdayaan Masyarakat Desa)", desc: "Wadah partisipasi masyarakat dalam perencanaan pembangunan." },
              { name: "PKK (Pemberdayaan Kesejahteraan Keluarga)", desc: "Gerakan pembangunan masyarakat yang tumbuh dari bawah." },
              { name: "Karang Taruna", desc: "Organisasi kepemudaan untuk pengembangan potensi generasi muda." },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:bg-primary/5 hover:border-primary/20 transition-colors">
                <h3 className="font-bold text-slate-800 mb-2">{item.name}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
