"use client";

import { useCart } from "@/components/providers/cart-provider";
import { formatRupiah } from "@/lib/utils";
import { generateWhatsAppUrl } from "@/lib/wa-link";
import { siteConfig } from "@/lib/config";
import { ShoppingCart, X, Minus, Plus, MessageCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function CartDrawer() {
  const { items, removeItem, updateQty, totalItems, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const handleCheckout = () => {
    if (items.length === 0) return;
    const checkoutItems = items.map((i) => ({
      name: i.product.name,
      qty: i.qty,
      price: i.product.discount_price || i.product.price,
    }));
    const waUrl = generateWhatsAppUrl(
      siteConfig.waAdmin,
      checkoutItems,
      customerName,
      customerAddress
    );
    window.open(waUrl, "_blank");
  };

  return (
    <>
      {/* Floating Toggle Button (visible only when items exist and drawer is closed) */}
      {!isOpen && items.length > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
            {totalItems}
          </span>
        </button>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-black text-slate-800">Keranjang</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Keranjang belanja kosong</p>
            </div>
          ) : (
            items.map((item) => {
              const effectivePrice = item.product.discount_price || item.product.price;
              return (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="text-primary font-black mt-1 text-sm">
                      {formatRupiah(effectivePrice)}
                    </p>
                    
                    {/* Qty Controls */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQty(item.product.id, item.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-xs font-bold border-x border-slate-200">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.product.id, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-xs text-red-500 font-semibold hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] relative z-10">
            {/* Form Data Diri */}
            <div className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="Nama Lengkap (Opsional)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                placeholder="Alamat Pengiriman (Opsional)"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-600">Total Belanja</span>
              <span className="text-xl font-black text-slate-800">
                {formatRupiah(totalPrice)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/25"
            >
              <MessageCircle className="w-5 h-5" />
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
