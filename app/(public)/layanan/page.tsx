import { Metadata } from "next";
import { serviceService } from "@/lib/services/service.service";
import { LayananClient } from "@/components/public/LayananClient";

import Image from "next/image";

export const metadata: Metadata = {
  title: "Layanan Publik",
  description: "Informasi layanan administrasi kependudukan Desa Huntap Sumbermujur",
};

export const dynamic = "force-dynamic";

export default async function LayananPage() {
  const layananList = await serviceService.getList();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <Image 
          src="/gambar/4.jpg"
          alt="Layanan Publik"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-emerald-900/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest">Pelayanan</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Layanan Publik</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Informasi layanan administrasi kependudukan Desa Huntap Sumbermujur
          </p>
        </div>
      </section>

      {/* Layanan List */}
      <section className="py-20 px-4 sm:px-6">
        <LayananClient layananList={layananList} />
      </section>
    </div>
  );
}
