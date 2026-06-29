"use client";

import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToko } from "@/lib/actions/toko.actions";
import { updateStoreProduct } from "@/lib/actions/product.actions";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { productService } from "@/lib/services/product.service";
import { productCategoryService } from "@/lib/services/product-category.service";
import type { ProductCategory } from "@/types";
import { Product } from "@/types";

export default function TokoEditProdukPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const prod = await productService.getById(params.id);
        setProduct(prod);
      } catch (err: any) {
        setError("Gagal memuat data produk.");
      } finally {
        setIsFetching(false);
      }
    };

    const fetchCats = async () => {
      const cats = await productCategoryService.getActiveCategories();
      setCategories(cats);
      setIsLoadingCategories(false);
    };

    fetchProduct();
    fetchCats();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const featuredCheckbox = formData.get("is_featured") === "on";
    formData.set("is_featured", featuredCheckbox ? "true" : "false");

    const result = await updateStoreProduct(params.id, formData);

    if (result.success) {
      router.push("/toko/dashboard/produk");
      router.refresh();
    } else {
      setError(result.error || "Gagal menyimpan produk.");
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="p-8 text-center text-slate-500">Memuat data produk...</div>;
  }

  if (!product) {
    return (
      <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-100">
        {error || "Produk tidak ditemukan."}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/toko/dashboard/produk"
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Produk</h1>
          <p className="text-slate-500 mt-1">Perbarui informasi produk jualan Anda.</p>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 space-y-8">
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          {/* Section: Informasi Dasar */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Informasi Dasar Produk</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Nama Produk <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  defaultValue={product.name}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Kategori <span className="text-red-500">*</span></label>
                  <select name="category" defaultValue={product.category} required disabled={isLoadingCategories} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 bg-white">
                    {isLoadingCategories ? (
                      <option value="">Memuat kategori...</option>
                    ) : (
                      <>
                        <option value="">Pilih Kategori</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Stok Tersedia <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    name="stock"
                    defaultValue={product.stock}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Harga Normal (Rp) <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    name="price"
                    defaultValue={product.price}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Harga Diskon (Rp) <span className="font-normal text-slate-400 ml-1 text-xs">(Opsional)</span></label>
                  <input 
                    type="number" 
                    name="discount_price"
                    defaultValue={product.discount_price || ""}
                    min="0"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Foto & Deskripsi */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Foto & Deskripsi</h2>
            
            <div className="space-y-6">
              {/* Foto Produk */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Foto Produk Pertama <span className="text-slate-400 ml-1 font-normal">(Biarkan kosong jika tidak ingin mengubah)</span></label>
                <ImageUpload id="images" name="images" defaultImage={product.images && product.images.length > 0 ? productService.getImageUrl(product) : undefined} />
                <p className="text-xs text-slate-500 mt-2 text-center">Format yang diizinkan: PNG, JPG, WEBP. Maks 5MB.</p>
              </div>

              {/* Deskripsi */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Deskripsi Lengkap <span className="text-red-500">*</span></label>
                <textarea 
                  name="description"
                  defaultValue={product.description}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 resize-y"
                />
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" defaultChecked={product.is_featured} name="is_featured" id="featured" className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                <label htmlFor="featured" className="text-sm font-medium text-slate-700">
                  Ajukan sebagai <span className="text-amber-500 font-bold">Produk Unggulan</span> (Tampil di Halaman Depan)
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <Link href="/toko/dashboard/produk" className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
            Batal
          </Link>
          <button 
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
