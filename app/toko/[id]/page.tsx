"use client";

import { useState, use } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { dummyProducts } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";
import { generateSingleProductWaUrl } from "@/lib/wa-link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  const product = dummyProducts.find((p) => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const effectivePrice = product.discountPrice || product.price;
  const relatedProducts = dummyProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const waUrl = generateSingleProductWaUrl(
    product.sellerPhone,
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
        </div>
      </div>

      {/* Product Detail */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center relative">
            <ShoppingBag className="w-24 h-24 text-slate-200" />
            {product.discountPrice && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg">
                  {Math.round(
                    ((product.price - product.discountPrice) / product.price) *
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
              {product.discountPrice && (
                <span className="text-lg text-muted line-through">
                  {formatRupiah(product.price)}
                </span>
              )}
            </div>

            {/* Seller & Stock */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {product.sellerName}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Package className="w-4 h-4 text-muted" />
                Stok: {product.stock}
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed mb-8">
              {product.description}
            </p>

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
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-sm rounded-xl transition-all ${
                  added
                    ? "bg-emerald-100 text-primary border-2 border-primary"
                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-lg"
                }`}
              >
                {added ? (
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
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 text-white font-bold text-sm rounded-xl hover:bg-green-600 shadow-lg shadow-green-500/25 transition-all"
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
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/toko/${p.id}`}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                >
                  <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-slate-200 group-hover:text-primary/30 transition-colors" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm font-black text-primary mt-1">
                      {formatRupiah(p.discountPrice || p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
