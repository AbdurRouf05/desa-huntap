"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Star, MapPin, Phone, BadgeCheck, User } from "lucide-react";
import { dummyProducts, dummyUmkmStores } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default function SellerProfilePage({ params }: Props) {
  const { id } = use(params);
  const store = dummyUmkmStores.find((s) => s.id === id);
  const products = dummyProducts.filter((p) => p.store === id);

  if (!store) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header / Store Cover */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="px-4 sm:px-6 py-4">
            <Link
              href="/toko"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Toko
            </Link>
          </div>

          <div className="px-4 sm:px-6 py-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 border-4 border-emerald-100 shadow-sm flex items-center justify-center flex-shrink-0">
                <StoreIcon className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-800">{store.name}</h1>
                  {store.is_verified && (
                    <span title="Toko Terverifikasi">
                      <BadgeCheck className="w-6 h-6 text-emerald-500" />
                    </span>
                  )}
                </div>
                <p className="text-slate-600 mt-2 max-w-2xl">{store.description}</p>
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <User className="w-5 h-5 text-primary" />
                    {store.owner_name}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Phone className="w-3 h-3 text-blue-500" />
                    </div>
                    +{store.phone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
                      <MapPin className="w-3 h-3 text-rose-500" />
                    </div>
                    {store.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Produk dari {store.name} ({products.length})</h2>
          
          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-400">Belum ada produk</h3>
              <p className="text-sm text-muted mt-1">Toko ini belum menambahkan produk apapun.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/toko/${product.id}`}
                  className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden relative">
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-slate-200 group-hover:text-primary/30 transition-colors" />
                      </div>
                    )}
                    {product.discount_price && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold rounded-lg shadow-lg">
                          {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                        </span>
                      </div>
                    )}
                    {product.stock <= 10 && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-lg">
                          Sisa {product.stock}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
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
                      {product.discount_price && (
                        <span className="text-xs text-muted line-through">
                          {formatRupiah(product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function StoreIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
