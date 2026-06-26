"use client";

import { Menu, Globe } from "lucide-react";
import Link from "next/link";

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-slate-800 lg:hidden">Control Panel</h1>
      </div>

      <div className="flex items-center gap-4">
        <a 
          href="http://localhost:3001" 
          target="_blank"
          className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors bg-slate-50 hover:bg-emerald-50 px-3 py-2 rounded-lg"
        >
          <Globe className="w-4 h-4" />
          Lihat Website
        </a>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-slate-600">AD</span>
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-semibold text-slate-800">Admin Desa</p>
            <p className="text-slate-500 text-xs">BUMDes</p>
          </div>
        </div>
      </div>
    </header>
  );
}
