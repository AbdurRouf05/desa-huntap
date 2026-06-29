import Link from "next/link";
import { Plus, Search, Edit, Package, AlertCircle } from "lucide-react";
import { getMyStore } from "@/lib/actions/toko.actions";
import { productService } from "@/lib/services/product.service";
import DeleteProductButton from "./DeleteProductButton";
import { PB_URL } from "@/lib/pocketbase";

export const dynamic = "force-dynamic";

export default async function TokoProdukPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const search = searchParams.search || "";
  const storeRes = await getMyStore();
  const store = storeRes.data;

  if (!storeRes.success || !store) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Akses Ditolak</h2>
        <p className="text-slate-600">Toko tidak ditemukan.</p>
      </div>
    );
  }

  // Get products for THIS store only
  let products = await productService.getByStore(store.id);
  
  if (search) {
    const s = search.toLowerCase();
    products = products.filter(p => p.name.toLowerCase().includes(s) || p.description?.toLowerCase().includes(s));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Produk Saya</h1>
          <p className="text-slate-500 mt-1">Kelola barang yang Anda jual di halaman publik.</p>
        </div>
        <Link 
          href="/toko/dashboard/produk/tambah"
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
          </form>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Stok</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    Belum ada produk yang ditambahkan.
                  </td>
                </tr>
              ) : products.map((product) => {
                const imageUrl = product.images?.[0]
                  ? `${PB_URL}/api/files/products/${product.id}/${product.images[0]}?thumb=100x100`
                  : null;
                
                return (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden relative border border-slate-200 bg-slate-100">
                          {imageUrl ? (
                            <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{product.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{product.category || 'Lainnya'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900 font-medium">Rp {product.price?.toLocaleString('id-ID')}</div>
                    </td>
                    <td className="px-6 py-4">
                      {product.stock > 0 ? (
                        <span className="text-slate-600">{product.stock} unit</span>
                      ) : (
                        <span className="text-red-500 font-medium">Habis</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/toko/dashboard/produk/edit/${product.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteProductButton id={product.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
