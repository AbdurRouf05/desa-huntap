import { PB_URL } from '@/lib/pocketbase';
import { Upload, Trash2, Search, Image as ImageIcon } from "lucide-react";
import { galleryService } from "@/lib/services/gallery.service";

export const dynamic = "force-dynamic";

export default async function GaleriPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const search = searchParams.search || "";
  const data = await galleryService.getList(); // No pagination for now
  
  // simple search filter
  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Galeri Desa</h1>
          <p className="text-slate-500 mt-1">Kelola foto-foto dokumentasi dan galeri website.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <label htmlFor="galeri-upload" className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group mb-8 w-full block">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <p className="text-base font-bold text-slate-800 mb-1">Unggah Foto Baru (WIP)</p>
          <p className="text-sm text-slate-500">Fitur unggah sedang dikembangkan. Klik untuk memilih gambar.</p>
          <input id="galeri-upload" type="file" className="sr-only" accept="image/*" />
        </label>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">Koleksi Foto ({filteredData.length})</h2>
          <form className="relative w-full sm:max-w-xs flex">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              name="search"
              defaultValue={search} 
              placeholder="Cari foto..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-l-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-r-xl text-sm font-medium hover:bg-slate-800">
              Cari
            </button>
          </form>
        </div>

        {filteredData.length === 0 ? (
          <div className="py-20 text-center text-slate-400 font-medium italic">
            Belum ada foto di galeri.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredData.map((img) => {
              const imageUrl = `${PB_URL}/api/files/${img.collectionId}/${img.id}/${img.image}`;
              return (
                <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img src={imageUrl} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white text-sm font-medium line-clamp-1 mb-2">{img.title}</p>
                    <button className="flex items-center justify-center gap-2 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-colors">
                      <Trash2 className="w-4 h-4" />
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
