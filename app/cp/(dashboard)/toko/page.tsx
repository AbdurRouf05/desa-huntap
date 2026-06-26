import { PB_URL } from '@/lib/pocketbase';
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Store, Star } from "lucide-react";
import { productService } from "@/lib/services/product.service";

export const dynamic = "force-dynamic";

export default async function TokoPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; category?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  const category = searchParams.category || "";

  const data = await productService.getList(page, 15, search, category);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Toko UMKM</h1>
          <p className="text-slate-500 mt-1">Kelola etalase produk UMKM warga desa.</p>
        </div>
        <Link 
          href="/cp/toko/tambah"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Tambah Produk
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <form className="relative w-full sm:max-w-xs flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              name="search"
              defaultValue={search}
              placeholder="Cari produk..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
            {category && <input type="hidden" name="category" value={category} />}
          </form>
          <form className="flex items-center gap-2 w-full sm:w-auto">
            {search && <input type="hidden" name="search" value={search} />}
            <select 
              name="category"
              defaultValue={category}
              className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-l-xl text-sm outline-none focus:border-emerald-500"
            >
              <option value="">Semua Kategori</option>
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
              <option value="kerajinan">Kerajinan</option>
              <option value="pertanian">Pertanian</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-r-xl text-sm font-medium hover:bg-emerald-700">
              Filter
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Pemilik Toko</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Store className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    Belum ada produk yang ditemukan.
                  </td>
                </tr>
              ) : data.items.map((product) => {
                const imageUrl = product.images && product.images.length > 0 
                  ? `${PB_URL}/api/files/${product.collectionId}/${product.id}/${product.images[0]}?thumb=100x100` 
                  : null;

                return (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                          {imageUrl ? (
                            <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <Store className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 flex items-center gap-2">
                            {product.name}
                            {product.is_featured && (
                              <span title="Produk Unggulan">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">{product.category} • Stok: {product.stock}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900 font-medium">{product.expand?.store?.name || "-"}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{product.expand?.store?.phone || "-"}</div>
                    </td>
                    <td className="px-6 py-4">
                      {product.discount_price ? (
                        <div>
                          <div className="text-emerald-600 font-medium">Rp {product.discount_price.toLocaleString("id-ID")}</div>
                          <div className="text-xs text-slate-400 line-through">Rp {product.price.toLocaleString("id-ID")}</div>
                        </div>
                      ) : (
                        <div className="text-emerald-600 font-medium">Rp {product.price.toLocaleString("id-ID")}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.stock > 0 ? (
                        <span className="inline-flex px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                          Tersedia
                        </span>
                      ) : (
                        <span className="inline-flex px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                          Habis
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/cp/toko/edit/${product.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
          <span>Menampilkan halaman {data.page} dari {data.totalPages || 1} ({data.totalItems} produk)</span>
          <div className="flex gap-1">
            {data.page > 1 && (
              <a href={`?page=${data.page - 1}&search=${search}&category=${category}`} className="px-3 py-1 border border-slate-300 rounded-lg bg-white hover:bg-slate-50">Seb</a>
            )}
            <span className="px-3 py-1 border border-emerald-600 bg-emerald-600 text-white rounded-lg">{data.page}</span>
            {data.page < data.totalPages && (
              <a href={`?page=${data.page + 1}&search=${search}&category=${category}`} className="px-3 py-1 border border-slate-300 rounded-lg bg-white hover:bg-slate-50">Lanjut</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
