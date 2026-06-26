import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { newsCategoryService } from "@/lib/services/news-category.service";

export const dynamic = "force-dynamic";

export default async function KategoriBeritaAdminPage() {
    const categories = await newsCategoryService.getList();

    return (
        <main className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kategori Berita</h1>
                    <p className="text-slate-500 text-sm">Kelola kategori berita dan status kemunculannya di portal publik</p>
                </div>
                <Link 
                    href="/cp/kategori-berita/tambah"
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-primary/10"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Kategori
                </Link>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-16">No</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Kategori</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-48">Slug</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-32 text-center">Status Publik</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-32 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-slate-400 font-medium italic">
                                        Belum ada kategori yang ditambahkan.
                                    </td>
                                </tr>
                            ) : categories.map((item, index) => (
                                <tr key={item.id} className="transition-all group hover:bg-slate-50">
                                    <td className="px-6 py-5 text-slate-300 font-mono text-xs font-bold">
                                        {String(index + 1).padStart(2, '0')}
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-bold text-slate-900 mb-1">{item.name}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="px-2 py-1 rounded bg-slate-100 text-slate-500 font-mono text-xs">
                                            {item.slug}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center">
                                            {item.is_active ? (
                                                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 border border-emerald-200">
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 border border-slate-200">
                                                    Nonaktif
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                            <button 
                                                className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-all"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
