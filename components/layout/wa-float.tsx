"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function WhatsAppFloat() {
  const url = `https://wa.me/${siteConfig.waAdmin.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(siteConfig.waMessage)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Hubungi via WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 w-14 h-14 rounded-full bg-green-400 animate-ping opacity-20" />
        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-2xl shadow-green-500/30 group-hover:shadow-green-500/50 group-hover:scale-110 transition-all duration-300 cursor-pointer">
          <MessageCircle className="w-6 h-6 text-white fill-white" />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          Chat WhatsApp
          <div className="absolute -bottom-1 right-5 w-2 h-2 bg-slate-800 rotate-45" />
        </div>
      </div>
    </a>
  );
}
