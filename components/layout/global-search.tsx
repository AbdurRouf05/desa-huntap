"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Newspaper, ImageIcon, Store, Package, FileText, ChevronRight } from "lucide-react";
import { dummyNews, dummyMuseumItems, dummyUmkmStores, dummyProducts } from "@/lib/dummy-data";
import { navLinks } from "@/lib/config";
import { cn } from "@/lib/utils";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          // Open search (will be handled by navbar too, but let's just trigger it via custom event or let Navbar handle it)
          document.dispatchEvent(new CustomEvent("open-global-search"));
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const q = query.toLowerCase();

  // Perform search
  const results = {
    pages: navLinks.filter(l => l.label.toLowerCase().includes(q)),
    news: dummyNews.filter(n => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q)).slice(0, 3),
    museum: dummyMuseumItems.filter(m => m.name.toLowerCase().includes(q) || m.era.toLowerCase().includes(q)).slice(0, 3),
    stores: dummyUmkmStores.filter(s => s.name.toLowerCase().includes(q)).slice(0, 2),
    products: dummyProducts.filter(p => p.name.toLowerCase().includes(q)).slice(0, 3),
  };

  const hasResults = query.length > 1 && (
    results.pages.length > 0 || 
    results.news.length > 0 || 
    results.museum.length > 0 || 
    results.stores.length > 0 || 
    results.products.length > 0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-start pt-16 sm:pt-24 items-center bg-slate-900/60 backdrop-blur-sm p-4">
      {/* Overlay to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Search Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in slide-in-from-top-10 zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-100">
          <Search className="w-6 h-6 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari berita, produk, museum, atau halaman..."
            className="flex-1 w-full bg-transparent border-none py-5 px-4 outline-none text-lg text-slate-900 placeholder:text-slate-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg text-xs font-bold transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 bg-slate-50 flex-1">
          {query.length <= 1 ? (
            <div className="py-12 text-center text-slate-500">
              <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p>Ketik sesuatu untuk mulai mencari.</p>
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center text-slate-500">
              <p>Tidak ada hasil yang ditemukan untuk <span className="font-bold">"{query}"</span>.</p>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              
              {/* Pages */}
              {results.pages.length > 0 && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 px-2">Halaman Navigasi</h3>
                  <div className="space-y-1">
                    {results.pages.map(page => (
                      <Link
                        key={page.href}
                        href={page.href}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-200/50 flex items-center justify-center text-slate-500 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                            <FileText className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-slate-700 group-hover:text-primary transition-colors">{page.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* News */}
              {results.news.length > 0 && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 px-2">Berita & Pengumuman</h3>
                  <div className="space-y-1">
                    {results.news.map(news => (
                      <Link
                        key={news.id}
                        href={`/berita/${news.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <Newspaper className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 group-hover:text-primary transition-colors line-clamp-1">{news.title}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">{news.excerpt}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Museum */}
              {results.museum.length > 0 && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 px-2">Museum Desa</h3>
                  <div className="space-y-1">
                    {results.museum.map(m => (
                      <Link
                        key={m.id}
                        href={`/museum/${m.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 group-hover:text-primary transition-colors line-clamp-1">{m.name}</p>
                            <p className="text-xs text-slate-500">{m.era}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Stores & Products */}
              {(results.stores.length > 0 || results.products.length > 0) && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 px-2">UMKM (Toko & Produk)</h3>
                  <div className="space-y-1">
                    {results.stores.map(s => (
                      <Link
                        key={s.id}
                        href={`/toko/${s.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <Store className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 group-hover:text-primary transition-colors line-clamp-1">Toko: {s.name}</p>
                            <p className="text-xs text-slate-500">Milik {s.ownerName}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary shrink-0" />
                      </Link>
                    ))}
                    {results.products.map(p => {
                      const store = dummyUmkmStores.find(s => s.id === p.storeId);
                      return (
                        <Link
                          key={p.id}
                          href={`/toko/${store?.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                              <Package className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-700 group-hover:text-primary transition-colors line-clamp-1">{p.name}</p>
                              <p className="text-xs text-slate-500">Rp {p.price.toLocaleString("id-ID")}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-4 py-3 bg-white border-t border-slate-100 text-xs text-slate-400 text-center flex items-center justify-between">
          <span>Gunakan <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500 font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500 font-mono">↓</kbd> untuk navigasi</span>
          <span>Buka Pencarian <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500 font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500 font-mono">K</kbd></span>
        </div>
      </div>
    </div>
  );
}
