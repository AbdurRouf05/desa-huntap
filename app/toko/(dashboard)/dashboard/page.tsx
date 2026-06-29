import { getMyStore } from "@/lib/actions/toko.actions";
import { Store, Package, Settings, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PB_URL } from "@/lib/pocketbase";

export const dynamic = "force-dynamic";

export default async function TokoDashboardPage() {
  const storeRes = await getMyStore();
  const store = storeRes.data;

  if (!storeRes.success || !store) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Toko Tidak Ditemukan</h2>
        <p className="text-slate-600 mb-6 text-center max-w-md">
          {storeRes.error || "Gagal memuat informasi toko Anda. Silakan hubungi admin."}
        </p>
      </div>
    );
  }

  const imageUrl = store.image 
    ? `${PB_URL}/api/files/umkm_stores/${store.id}/${store.image}`
    : "https://ui-avatars.com/api/?name=" + encodeURIComponent(store.name) + "&background=059669&color=fff";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Selamat datang, {store.owner_name}</h1>
        <p className="text-slate-500 mt-1">Kelola toko dan produk Anda melalui dashboard ini.</p>
      </div>

      {/* Profil Singkat */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-200 bg-slate-50 shadow-sm relative">
          <Image 
            src={imageUrl} 
            alt={store.name} 
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-xl font-bold text-slate-900">{store.name}</h2>
            {store.is_verified ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">
                Terverifikasi
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">
                Menunggu Verifikasi
              </span>
            )}
          </div>
          <p className="text-slate-600 text-sm mb-3 max-w-2xl">{store.description || "Belum ada deskripsi."}</p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Store className="w-4 h-4 text-slate-400" /> Pemilik: {store.owner_name}</span>
            <span>•</span>
            <span>Telp/WA: {store.phone}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats / Menus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link 
          href="/toko/dashboard/produk"
          className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group flex items-start gap-4"
        >
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Kelola Produk Saya</h3>
            <p className="text-sm text-slate-500">Tambah, edit, atau hapus produk jualan toko Anda yang akan tampil di halaman publik.</p>
          </div>
        </Link>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-start gap-4 opacity-70">
          <div className="p-3 bg-slate-200 text-slate-500 rounded-xl">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Pengaturan (Segera)</h3>
            <p className="text-sm text-slate-500">Ubah detail profil, foto, atau password akun Anda melalui halaman admin.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
