import { Newspaper, Store, Image as ImageIcon, Users } from "lucide-react";
import Link from "next/link";
import { getServerAuth } from "@/lib/auth";

export default async function DashboardPage() {
  const pb = await getServerAuth();

  // Fetch counts safely (requires auth if rules are locked down, but admin auth is active here)
  const [newsList, productsList, galleryList, usersList] = await Promise.all([
    pb.collection("news").getList(1, 1),
    pb.collection("products").getList(1, 1),
    pb.collection("gallery").getList(1, 1),
    pb.collection("users").getList(1, 1).catch(() => ({ totalItems: 0 })), // Fallback if no users collection
  ]);

  const stats = [
    { name: "Total Berita", value: newsList.totalItems.toString(), icon: Newspaper, color: "bg-blue-500", href: "/cp/berita" },
    { name: "Produk UMKM", value: productsList.totalItems.toString(), icon: Store, color: "bg-emerald-500", href: "/cp/toko" },
    { name: "Foto Galeri", value: galleryList.totalItems.toString(), icon: ImageIcon, color: "bg-purple-500", href: "/cp/galeri" },
    { name: "Total Admin", value: usersList.totalItems.toString(), icon: Users, color: "bg-amber-500", href: "#" },
  ];

  // Fetch recent news for activity
  const recentNews = await pb.collection("news").getList(1, 3, { sort: "-created" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Selamat datang di Panel Admin Desa Huntap Sumbermujur.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link 
            key={stat.name} 
            href={stat.href}
            className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link 
              href="/cp/berita/tambah"
              className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-medium rounded-xl border border-slate-200 transition-colors"
            >
              <Newspaper className="w-4 h-4" />
              Tulis Berita
            </Link>
            <Link 
              href="/cp/toko/tambah"
              className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-medium rounded-xl border border-slate-200 transition-colors"
            >
              <Store className="w-4 h-4" />
              Tambah Produk
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Aktivitas Terakhir</h2>
          <div className="space-y-4">
            {recentNews.items.length > 0 ? recentNews.items.map((news) => (
              <div key={news.id} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-800">Menambahkan berita baru "{news.title}"</p>
                  <p className="text-xs text-slate-500">{new Date(news.created).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-500">Belum ada aktivitas terbaru.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
