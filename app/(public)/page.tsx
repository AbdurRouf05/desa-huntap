import { PB_URL } from '@/lib/pocketbase';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  MapPin,
  Home,
  Layers,
  ArrowRight,
  ShoppingBag,
  Clock,
  Newspaper,
  Star,
  ChevronRight,
  Store,
} from "lucide-react";
import { cn, formatRupiah, formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { desaProfile } from "@/lib/dummy-data";
import HeroSlider from "@/components/public/HeroSlider";
import { newsService } from "@/lib/services/news.service";
import { storeService } from "@/lib/services/store.service";
import { productService } from "@/lib/services/product.service";

export const dynamic = "force-dynamic";

// ============================================================
// STATS SECTION
// ============================================================
function StatsSection() {
  const stats = [
    { icon: Users, label: "Penduduk", value: desaProfile.penduduk.toLocaleString("id-ID") + " jiwa" },
    { icon: MapPin, label: "Luas Wilayah", value: desaProfile.luas_wilayah },
    { icon: Home, label: "Jumlah RT", value: desaProfile.jumlah_rt.toString() },
    { icon: Layers, label: "Jumlah RW", value: desaProfile.jumlah_rw.toString() },
  ];

  return (
    <section className="relative z-20 px-4 sm:px-6 mt-8 md:-mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 break-words">
                {stat.value}
              </p>
              <p className="text-[10px] md:text-xs font-semibold text-muted uppercase tracking-wider mt-1 break-words">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT SECTION
// ============================================================
function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 overflow-hidden border border-emerald-100 shadow-lg relative">
              <Image 
                src="/gambar/1.jpg"
                alt="Desa Huntap Sumbermujur"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <p className="font-bold text-lg">Desa Huntap Sumbermujur</p>
                </div>
                <p className="text-sm text-emerald-50 ml-7">Lereng Gunung Semeru, Lumajang</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/10 -z-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Tentang Desa
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2 mb-6 leading-tight">
              Mengenal Desa Huntap Sumbermujur
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {desaProfile.sejarah}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {desaProfile.potensi.map((item: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              href="/profil"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
            >
              Selengkapnya <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURED STORES
// ============================================================
function FeaturedStores({ stores }: { stores: any[] }) {
  if (!stores || stores.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Pemberdayaan Ekonomi
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2">
              Toko UMKM Pilihan
            </h2>
          </div>
          <Link
            href="/toko"
            className="hidden sm:flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
          >
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stores.map((store) => {
            const imageUrl = store.image
              ? `${PB_URL}/api/files/${store.collectionId}/${store.id}/${store.image}?thumb=300x300f`
              : null;

            return (
              <Link
                key={store.id}
                href={`/toko/${store.id}`}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-square bg-slate-50 relative overflow-hidden">
                  {imageUrl ? (
                    <Image 
                      src={imageUrl} 
                      alt={store.name} 
                      fill 
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Store className="w-12 h-12 text-slate-200" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-primary transition-colors">
                    {store.name}
                  </h3>
                  <p className="text-[10px] text-muted mt-1.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-500" />
                    {store.address}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/toko"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/25"
          >
            Lihat Semua Toko <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURED PRODUCTS
// ============================================================
function FeaturedProducts({ products }: { products: any[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Etalase Desa
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2">
              Produk UMKM Pilihan
            </h2>
          </div>
          <Link
            href="/toko/produk"
            className="hidden sm:flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
          >
            Lihat Semua Produk <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const imageUrl = product.images && product.images.length > 0
              ? `${PB_URL}/api/files/${product.collectionId}/${product.id}/${product.images[0]}?thumb=300x300f`
              : null;

            return (
              <Link
                key={product.id}
                href={`/toko/produk/${product.id}`}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-square bg-slate-50 relative overflow-hidden">
                  {imageUrl ? (
                    <Image 
                      src={imageUrl} 
                      alt={product.name} 
                      fill 
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-slate-200" />
                    </div>
                  )}
                  {(product.discount_price ?? 0) > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      Diskon
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-auto pt-2">
                    {product.discount_price && product.discount_price > 0 ? (
                      <div>
                        <span className="text-[10px] text-muted line-through mr-2">
                          {formatRupiah(product.price)}
                        </span>
                        <span className="text-sm font-bold text-emerald-600 block">
                          {formatRupiah(product.discount_price)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-emerald-600 block">
                        {formatRupiah(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/toko/produk"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/25"
          >
            Lihat Semua Produk <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// LATEST NEWS
// ============================================================
function LatestNews({ newsList }: { newsList: any[] }) {
  if (!newsList || newsList.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Informasi Publik
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2">
              Kabar Terbaru Desa
            </h2>
          </div>
          <Link
            href="/berita"
            className="hidden sm:flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
          >
            Semua Berita <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {newsList.map((news) => {
            const imageUrl = news.thumbnail
              ? `${PB_URL}/api/files/${news.collectionId}/${news.id}/${news.thumbnail}?thumb=600x400f`
              : null;

            return (
              <Link
                key={news.id}
                href={`/berita/${news.slug}`}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-video bg-emerald-50 relative overflow-hidden shrink-0">
                  {imageUrl ? (
                    <Image 
                      src={imageUrl} 
                      alt={news.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Newspaper className="w-10 h-10 text-emerald-200" />
                    </div>
                  )}
                  {news.expand?.category?.name && (
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold text-white bg-primary/90 backdrop-blur-sm px-2.5 py-1 rounded-lg uppercase tracking-wider shadow">
                        {news.expand.category.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold text-muted uppercase tracking-wider">
                    <Clock className="w-3 h-3" />
                    {formatDate(news.created)}
                  </div>
                  <h3 className="font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed flex-1">
                    {news.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-primary font-bold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0">
                    Baca Selengkapnya
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/25"
          >
            Semua Berita <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MAP SECTION
// ============================================================
function MapSection() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            Lokasi
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2">
            Temukan Kami
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
            <iframe
              src={siteConfig.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Desa Huntap Sumbermujur"
              className="w-full h-full"
            />
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 text-lg mb-4">Kantor Desa</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-slate-600">{siteConfig.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm text-slate-600 font-medium">Jam Operasional</p>
                  <p className="text-xs text-muted">Senin - Jumat: 08:00 - 15:00 WIB</p>
                </div>
              </div>
            </div>
            <Link
              href="/kontak"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/25 hover:bg-primary-dark transition-colors"
            >
              Hubungi Kami <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HOMEPAGE
// ============================================================
export default async function HomePage() {
  // Fetch real data from PocketBase
  const newsData = await newsService.getList(1, 3);
  const storeData = await storeService.getList(1, 4);
  const productData = await productService.getList(1, 4);

  return (
    <>
      <HeroSlider />
      <StatsSection />
      <AboutSection />
      <FeaturedStores stores={storeData.items} />
      <FeaturedProducts products={productData.items} />
      <LatestNews newsList={newsData.items} />
      <MapSection />
    </>
  );
}
