import Link from "next/link";
import { Plus, Search, Edit, Trash2, ShieldCheck, ShieldAlert, Store } from "lucide-react";
import { storeService } from "@/lib/services/store.service";

export const dynamic = "force-dynamic";

export default async function PemilikUmkmPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";

  const data = await storeService.getList(page, 20, search);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pemilik UMKM</h1>
          <p className="text-slate-500 mt-1">Kelola data warga yang membuka toko di website desa.</p>
        </div>
        <Link 
          href="/cp/toko/pemilik/tambah"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Registrasi Pemilik Baru
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
              placeholder="Cari nama toko atau pemilik..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </form>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Nama Toko & Pemilik</th>
                <th className="px-6 py-4">Kontak WhatsApp</th>
                <th className="px-6 py-4">Alamat</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Store className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    Belum ada data UMKM yang ditemukan.
                  </td>
                </tr>
              ) : data.items.map((store) => (
                <tr key={store.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden relative shadow-sm border border-slate-200">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(store.name)}&background=059669&color=fff&bold=true&font-size=0.4`}
                          alt={store.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{store.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{store.owner_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900 font-medium">{store.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-600 truncate max-w-[200px]" title={store.address}>
                      {store.address}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {store.is_verified ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Terverifikasi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/cp/toko/pemilik/edit/${store.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
          <span>Menampilkan halaman {data.page} dari {data.totalPages || 1} ({data.totalItems} UMKM)</span>
          <div className="flex gap-1">
            {data.page > 1 && (
              <a href={`?page=${data.page - 1}&search=${search}`} className="px-3 py-1 border border-slate-300 rounded-lg bg-white hover:bg-slate-50">Seb</a>
            )}
            <span className="px-3 py-1 border border-emerald-600 bg-emerald-600 text-white rounded-lg">{data.page}</span>
            {data.page < data.totalPages && (
              <a href={`?page=${data.page + 1}&search=${search}`} className="px-3 py-1 border border-slate-300 rounded-lg bg-white hover:bg-slate-50">Lanjut</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
