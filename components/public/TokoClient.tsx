"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Star, Filter } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function TokoClient({ products, categories }: { products: Product[], categories: string[] }) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "Semua" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <Image 
          src="/gambar/1.jpg"
          alt="Toko UMKM Desa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-amber-900/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="text-xs font-bold text-amber-100 uppercase tracking-widest">Marketplace</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Toko UMKM Desa</h1>
          <p className="text-amber-100 max-w-2xl mx-auto">
            Produk unggulan buatan warga Desa Huntap Sumbermujur. Pesan langsung via WhatsApp!
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-6 px-4 sm:px-6 bg-white border-b border-slate-200 sticky top-16 md:top-18 z-30">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            <Filter className="w-4 h-4 text-muted shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-400">Produk tidak ditemukan</h3>
              <p className="text-sm text-muted mt-1">Coba kata kunci atau kategori lain.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product) => {
                const storeName = product.expand?.store?.name || "Toko UMKM";
                const storeId = product.store;
                const imageUrl = product.images && product.images.length > 0
                  ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${product.collectionId}/${product.id}/${product.images[0]}?thumb=400x400f`
                  : null;

                return (
                  <Link
                    key={product.id}
                    href={`/toko/${product.id}`}
                    className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden relative shrink-0">
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
                          <ShoppingBag className="w-12 h-12 text-slate-200 group-hover:text-primary/30 transition-colors" />
                        </div>
                      )}
                      {(product.discount_price ?? 0) > 0 && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold rounded-lg shadow-lg">
                            {Math.round(((product.price - (product.discount_price || 0)) / product.price) * 100)}% OFF
                          </span>
                        </div>
                      )}
                      {product.stock <= 10 && product.stock > 0 && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-lg">
                            Sisa {product.stock}
                          </span>
                        </div>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                          <span className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg uppercase tracking-widest shadow-xl">
                            Habis
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="p-4 flex-1 flex flex-col">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-slate-800 text-sm mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg font-black text-primary">
                          {formatRupiah(product.discount_price || product.price)}
                        </span>
                        {(product.discount_price ?? 0) > 0 && (
                          <span className="text-xs text-muted line-through">
                            {formatRupiah(product.price)}
                          </span>
                        )}
                      </div>
                      <div className="mt-auto pt-2">
                        <div 
                          className="text-[10px] text-muted mt-1.5 flex items-center gap-1 hover:text-primary transition-colors z-10 relative cursor-pointer inline-flex"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if(storeId) window.location.href = `/toko/penjual/${storeId}`;
                          }}
                        >
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {storeName}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
