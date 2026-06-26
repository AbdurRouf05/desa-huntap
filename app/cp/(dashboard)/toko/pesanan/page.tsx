import { ShoppingBag, Search } from "lucide-react";
import OrderActions from "./OrderActions";
import { getServerAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string; search?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const status = searchParams.status || "all";
  const search = searchParams.search || "";

  const pb = await getServerAuth();
  const filters: string[] = [];
  if (status && status !== "all") filters.push(`status = "${status}"`);
  if (search) filters.push(`(customer_name ~ "${search}" || customer_phone ~ "${search}")`);
  
  const data = await pb.collection("orders").getList(page, 20, {
    sort: "-created",
    expand: "store",
    filter: filters.length > 0 ? filters.join(" && ") : undefined,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pesanan Toko UMKM</h1>
          <p className="text-slate-500 mt-1">Riwayat pesanan warga ke toko-toko UMKM desa.</p>
        </div>
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
              placeholder="Cari nama atau no HP..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
            {status !== "all" && <input type="hidden" name="status" value={status} />}
          </form>
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            <a href="?status=all" className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${status === "all" ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
              Semua
            </a>
            <a href="?status=pending" className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${status === "pending" ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
              Pending
            </a>
            <a href="?status=completed" className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${status === "completed" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
              Selesai
            </a>
            <a href="?status=cancelled" className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${status === "cancelled" ? "bg-red-100 text-red-700 border border-red-200" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
              Dibatalkan
            </a>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID Pesanan & Tanggal</th>
                <th className="px-6 py-4">Pembeli</th>
                <th className="px-6 py-4">Toko Tujuan</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    Belum ada pesanan yang ditemukan.
                  </td>
                </tr>
              ) : data.items.map((order) => {
                const orderDate = new Date(order.created).toLocaleDateString("id-ID", {
                  day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                });
                
                return (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs text-slate-500">{order.id}</div>
                      <div className="font-medium text-slate-900 mt-1">{orderDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{order.customer_name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{order.customer_phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">
                        {order.expand?.store?.name || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-emerald-600">Rp {order.total_price.toLocaleString("id-ID")}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{order.items.length} macam barang</div>
                    </td>
                    <td className="px-6 py-4">
                      {order.status === "pending" && (
                        <span className="inline-flex px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">
                          Pending
                        </span>
                      )}
                      {order.status === "completed" && (
                        <span className="inline-flex px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                          Selesai
                        </span>
                      )}
                      {order.status === "cancelled" && (
                        <span className="inline-flex px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                          Dibatalkan
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <OrderActions orderId={order.id} currentStatus={order.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
          <span>Menampilkan halaman {data.page} dari {data.totalPages || 1} ({data.totalItems} pesanan)</span>
          <div className="flex gap-1">
            {data.page > 1 && (
              <a href={`?page=${data.page - 1}&status=${status}&search=${search}`} className="px-3 py-1 border border-slate-300 rounded-lg bg-white hover:bg-slate-50">Seb</a>
            )}
            <span className="px-3 py-1 border border-emerald-600 bg-emerald-600 text-white rounded-lg">{data.page}</span>
            {data.page < data.totalPages && (
              <a href={`?page=${data.page + 1}&status=${status}&search=${search}`} className="px-3 py-1 border border-slate-300 rounded-lg bg-white hover:bg-slate-50">Lanjut</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
