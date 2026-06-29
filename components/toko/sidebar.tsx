"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, Package, LogOut, X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { logoutToko } from "@/lib/auth";
import { useRouter } from "next/navigation";

const menuItems = [
  { name: "Beranda Toko", href: "/toko/dashboard", icon: Store },
  { name: "Produk Saya", href: "/toko/dashboard/produk", icon: Package },
  { name: "Pengaturan Toko", href: "/toko/pengaturan", icon: Settings },
];

export default function TokoSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutToko();
    router.push("/toko/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col shadow-xl lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
          <Link href="/toko/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <Image src="/logo-lumajang-2.png" alt="Logo" width={24} height={24} className="w-6 h-6" />
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">Portal Mitra</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Menu Utama
          </div>
          {menuItems.map((item) => {
            const isActive = item.href === "/toko/dashboard" 
              ? pathname === item.href 
              : (pathname === item.href || pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400")} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            Keluar Akun
          </button>
        </div>
      </aside>
    </>
  );
}
