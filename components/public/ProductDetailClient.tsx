"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ShoppingCart,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Package,
  Check,
  Share2,
} from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";
import { generateSingleProductWaUrl } from "@/lib/wa-link";
import type { Product } from "@/types";

export function ProductDetailClient({ 
  product, 
  relatedProducts,
  imageUrls
}: { 
  product: Product, 
  relatedProducts: Product[],
  imageUrls: string[]
}) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const effectivePrice = product.discount_price || product.price;
  const storeName = product.expand?.store?.name || "Toko UMKM";
  const sellerPhone = product.expand?.store?.phone || "08123456789"; // Default fallback if not available

  const handleAddToCart = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const waUrl = generateSingleProductWaUrl(
    sellerPhone,
    product.name,
    effectivePrice
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/toko"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Toko
          </Link>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="float-right inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors font-medium"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            {copied ? "Tersalin!" : "Bagikan"}
          </button>
        </div>
      </div>

      {/* Product Detail */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative">
            {imageUrls && imageUrls.length > 0 ? (
              <Image 
                src={imageUrls[0]} 
                alt={product.name} 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover" 
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <ShoppingBag className="w-24 h-24 text-slate-200" />
              </div>
            )}
            {(product.discount_price ?? 0) > 0 && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg">
                  {Math.round(
                    ((product.price - (product.discount_price || 0)) / product.price) *
                      100
                  )}
                  % OFF
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 mt-2 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-black text-primary">
                {formatRupiah(effectivePrice)}
              </span>
              {(product.discount_price ?? 0) > 0 && (
                <span className="text-lg text-muted line-through">
                  {formatRupiah(product.price)}
                </span>
              )}
            </div>

            {/* Seller & Stock */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
              {product.store ? (
                <Link href={`/toko/penjual/${product.store}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="underline decoration-dashed underline-offset-4">{storeName}</span>
                </Link>
              ) : (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{storeName}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Package className="w-4 h-4 text-muted" />
                Stok: {product.stock}
              </div>
            </div>

            {/* Description */}
            <div className="text-slate-600 leading-relaxed mb-8 whitespace-pre-wrap">
              {product.description}
            </div>

            {/* Quantity Picker */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-slate-700">Jumlah:</span>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <Minus className="w-4 h-4 text-slate-500" />
                </button>
                <span className="w-12 h-10 flex items-center justify-center text-sm font-bold text-slate-800 border-x border-slate-200">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <Plus className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <span className="text-sm text-muted">
                Subtotal:{" "}
                <span className="font-bold text-slate-800">
                  {formatRupiah(effectivePrice * qty)}
                </span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-sm rounded-xl transition-all ${
                  product.stock === 0 
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : added
                    ? "bg-emerald-100 text-primary border-2 border-primary"
                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-lg"
                }`}
              >
                {product.stock === 0 ? (
                  "Stok Habis"
                ) : added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Ditambahkan!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Tambah ke Keranjang
                  </>
                )}
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (product.stock === 0) e.preventDefault();
                }}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-sm rounded-xl shadow-lg transition-all ${
                  product.stock === 0
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-green-500 text-white hover:bg-green-600 shadow-green-500/25"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                Beli via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-black text-slate-800 mb-6">
              Produk Serupa
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => {
                const relImageUrl = p.images && p.images.length > 0
                  ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${p.collectionId}/${p.id}/${p.images[0]}?thumb=400x400f`
                  : null;

                return (
                  <Link
                    key={p.id}
                    href={`/toko/${p.id}`}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group flex flex-col"
                  >
                    <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden relative shrink-0">
                      {relImageUrl ? (
                        <Image 
                          src={relImageUrl} 
                          alt={p.name} 
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ShoppingBag className="w-10 h-10 text-slate-200 group-hover:text-primary/30 transition-colors" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex-1 flex flex-col">
                      <h3 className="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm font-black text-primary mt-auto pt-1">
                        {formatRupiah(p.discount_price || p.price)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
