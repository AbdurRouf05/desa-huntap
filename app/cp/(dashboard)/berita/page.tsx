import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { newsService } from "@/lib/services/news.service";

export const dynamic = "force-dynamic";

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
    const page = Number(searchParams.page) || 1;
    const search = searchParams.search || "";
    
    const data = await newsService.getList(page, 20, search);

    return (
        <main className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Berita & Artikel</h1>
                    <p className="text-slate-500 text-sm">Kelola narasi dan informasi untuk Desa Huntap Sumbermujur</p>
                </div>
                <Link
                    href="/cp/berita/tambah"
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-primary/10"
                >
                    <Plus className="w-5 h-5" />
                    Buat Berita Baru
                </Link>
            </div>

            {/* Filter / Search */}
            <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center gap-4">
                <form className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input
                        type="text"
                        name="search"
                        defaultValue={search}
                        placeholder="Cari judul berita..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                    />
                </form>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-16">No</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Detail Berita</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-32">Kategori</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-32">Tim Redaksi</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-24 text-center">Views</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-24 text-center">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-32 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {data.items.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center text-slate-400 font-medium italic">
                                        Belum ada konten yang dipublikasikan.
                                    </td>
                                </tr>
                            ) : (
                                data.items.map((item, index) => (
                                    <tr key={item.id} className={cn(
                                        "transition-all group hover:bg-emerald-50/30",
                                        !item.is_published && "bg-slate-50/30 opacity-75"
                                    )}>
                                        <td className="px-6 py-5 text-slate-300 font-mono text-xs font-bold">
                                            {String((data.page - 1) * 20 + index + 1).padStart(2, '0')}
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight mb-1">{item.title}</p>
                                            <p className="text-[10px] font-mono text-slate-400 tracking-tighter">slug: {item.slug}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tight bg-slate-100 text-slate-600 border border-slate-200/50">
                                                {item.expand?.category?.name || "Uncategorized"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[9px] font-black text-slate-300 uppercase w-10">Penulis:</span>
                                                    <span className="text-xs font-bold text-slate-700">{item.author || "Admin"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100" title="Total Views">
                                                    <Eye className="w-3.5 h-3.5 text-indigo-500" />
                                                    <span className="text-[11px] font-black text-indigo-700">{item.views || 0}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                {item.is_published ? (
                                                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/20">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-200 text-slate-500">
                                                        Draft
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                <Link
                                                    href={`/berita/${item.slug}`}
                                                    target="_blank"
                                                    className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-emerald-50 transition-all"
                                                    title="Pratinjau"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/cp/berita/${item.id}`}
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
                    <span>Menampilkan halaman {data.page} dari {data.totalPages || 1} ({data.totalItems} berita)</span>
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
        </main>
    );
}
