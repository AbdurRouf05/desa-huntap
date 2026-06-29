import { getMyStore } from "@/lib/actions/toko.actions";
import PengaturanTokoForm from "./PengaturanTokoForm";

export default async function TokoPengaturanPage() {
  const storeRes = await getMyStore();

  if (!storeRes.success || !storeRes.data) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">Toko Tidak Ditemukan</h2>
        <p className="text-slate-500 mt-2">Silakan hubungi administrator desa.</p>
      </div>
    );
  }

  const store = storeRes.data;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan Toko</h1>
        <p className="text-slate-500 mt-1">Perbarui profil toko dan informasi kontak Anda.</p>
      </div>

      <PengaturanTokoForm store={store} />
    </div>
  );
}
