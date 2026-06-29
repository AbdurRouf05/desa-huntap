"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TokoHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.includes("/produk/tambah")) return "Tambah Produk";
    if (pathname.includes("/produk/edit")) return "Edit Produk";
    if (pathname.includes("/produk")) return "Produk Saya";
    return "Beranda Toko";
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="font-bold text-slate-800 text-lg">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/toko"
          target="_blank"
          className="text-sm font-medium text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors border border-emerald-100"
        >
          Lihat Web Utama
        </Link>
      </div>
    </header>
  );
}
