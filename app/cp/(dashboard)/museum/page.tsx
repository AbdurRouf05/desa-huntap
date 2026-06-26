import Link from "next/link";
import { Plus, Search, Edit, Trash2, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { museumService } from "@/lib/services/museum.service";

export const dynamic = "force-dynamic";

export default async function MuseumAdminPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
    const search = searchParams.search || "";
    
    // museumService.getList returns a Promise<MuseumItem[]> directly
    const rawData = await museumService.getList();
    
    // simple search filter
    const data = rawData.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Koleksi Museum</h1>
                    <p className="text-slate-500 text-sm">Kelola pameran dan artefak bersejarah Desa Huntap Sumbermujur</p>
                </div>
                <Link
                    href="/cp/museum/tambah"
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-primary/10"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Koleksi
                </Link>
            </div>

            {/* Filter / Search */}
            <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center gap-4">
                <form className="relative flex-1 max-w-md flex">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input
                        type="text"
                        name="search"
                        defaultValue={search}
                        placeholder="Cari nama koleksi/artefak..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-l-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                    />
                    <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-r-xl text-sm font-medium hover:bg-slate-800">
                        Cari
                    </button>
                </form>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-16">No</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Koleksi</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-48">Era / Tahun</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-48">Kondisi</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-32 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-slate-400 font-medium italic">
                                        Belum ada koleksi museum yang terdaftar.
                                    </td>
                                </tr>
                            ) : (
                                data.map((item, index) => {
                                    const imageUrl = item.image
                                      ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${item.collectionId}/${item.id}/${item.image}?thumb=100x100` 
                                      : null;

                                    return (
                                        <tr key={item.id} className={cn(
                                            "transition-all group hover:bg-emerald-50/30"
                                        )}>
                                            <td className="px-6 py-5 text-slate-300 font-mono text-xs font-bold">
                                                {String(index + 1).padStart(2, '0')}
                                            </td>
                                            <td className="px-6 py-5 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                                                    {imageUrl ? (
                                                      <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                      <span className="text-xs text-slate-400">No Img</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight mb-1">{item.name}</p>
                                                    <p className="text-[10px] font-mono text-slate-400 tracking-tighter">ID: {item.id}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold text-slate-600 bg-slate-100">
                                                    {item.era}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200">
                                                    {item.condition}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                    <Link
                                                        href={`/cp/museum/${item.id}`}
                                                        className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                                        title="QR Code & Edit"
                                                    >
                                                        <QrCode className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/cp/museum/${item.id}`}
                                                        className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-emerald-50 transition-all"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
