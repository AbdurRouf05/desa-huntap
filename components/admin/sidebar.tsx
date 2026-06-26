"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Newspaper, 
  Store, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  Menu,
  Users
} from "lucide-react";
import { useState } from "react";
import { logoutAdmin } from "@/lib/auth";

const menuGroups = [
  {
    title: "Utama",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, href: "/cp" },
    ]
  },
  {
    title: "Publikasi",
    items: [
      { name: "Manajemen Berita", icon: Newspaper, href: "/cp/berita" },
      { name: "Kategori Berita", icon: Newspaper, href: "/cp/kategori-berita" },
      { name: "Galeri Desa", icon: ImageIcon, href: "/cp/galeri" },
    ]
  },
  {
    title: "Pariwisata & UMKM",
    items: [
      { name: "Toko UMKM", icon: Store, href: "/cp/toko" },
      { name: "Pesanan Toko", icon: Store, href: "/cp/toko/pesanan" },
      { name: "Pemilik UMKM", icon: Users, href: "/cp/toko/pemilik" },
      { name: "Museum Desa", icon: ImageIcon, href: "/cp/museum" },
    ]
  },
  {
    title: "Sistem",
    items: [
      { name: "Pengaturan", icon: Settings, href: "/cp/pengaturan" },
    ]
  }
];

export default function AdminSidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutAdmin();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-20 flex items-center px-6 border-b border-slate-100">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 overflow-hidden shrink-0">
                <Image 
                  src="/logo-lumajang-2.png" 
                  alt="Logo" 
                  width={32} 
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 leading-tight">Panel Admin</span>
                <span className="text-xs text-slate-500 font-medium">Desa Sumbermujur</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuGroups.map((group, index) => (
              <div key={group.title} className={index > 0 ? "mt-6" : ""}>
                <div className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {group.title}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const flatItems = menuGroups.flatMap(g => g.items);
                    const activeItem = flatItems
                      .filter(i => pathname === i.href || (i.href !== "/cp" && pathname.startsWith(i.href + "/")))
                      .sort((a, b) => b.href.length - a.href.length)[0];
                    
                    const isActive = activeItem?.href === item.href;
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                          isActive 
                            ? "bg-primary/10 text-primary font-bold" 
                            : "text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-slate-400"}`} />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-100">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Keluar</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
