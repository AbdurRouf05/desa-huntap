"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, ChevronDown, Search } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";
import { GlobalSearch } from "@/components/layout/global-search";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    document.addEventListener("open-global-search", handleOpenSearch);
    return () => document.removeEventListener("open-global-search", handleOpenSearch);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100"
            : "bg-white/80 backdrop-blur-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
                <Image src="/logo-lumajang-2.png" alt="Logo Lumajang" width={40} height={40} className="w-full h-full object-contain" />
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-slate-800 text-sm leading-tight">
                  Desa Sumbermujur
                </p>
                <p className="text-[10px] text-muted font-medium uppercase tracking-widest">
                  Huntap · Lumajang
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(link.href))
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-slate-600 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side: Cart + Mobile Toggle */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors hidden sm:block"
                title="Cari (Ctrl+K)"
              >
                <Search className="w-5 h-5 text-slate-600" />
              </button>

              {/* Cart Button */}
              <Link
                href="/toko"
                className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-slate-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-slate-600" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-slate-100",
            mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-white px-4 py-3 space-y-1 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-18" />

      {/* Mobile Menu Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Global Search Component */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
