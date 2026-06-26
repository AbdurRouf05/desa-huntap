"use client";

import { useState } from "react";
import { FileText, Heart, CreditCard, Briefcase, Truck, Users, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";
import type { ServiceItem } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, Heart, CreditCard, Briefcase, Truck, Users,
};

export function LayananClient({ layananList }: { layananList: ServiceItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {layananList.map((layanan) => {
        const Icon = iconMap[layanan.icon] || FileText;
        const isOpen = openId === layanan.id;

        return (
          <div
            key={layanan.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : layanan.id)}
              className="w-full flex items-center gap-4 p-5 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800">{layanan.title}</h3>
                <div 
                  className="text-sm text-muted mt-0.5 line-clamp-1 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: layanan.description }}
                />
              </div>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-muted shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted shrink-0" />
              )}
            </button>

            {isOpen && (
              <div className="px-5 pb-5 border-t border-slate-100">
                <div className="pt-4">
                  <h4 className="text-sm font-bold text-slate-700 mb-3">Persyaratan:</h4>
                  <ul className="space-y-2">
                    {layanan.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-slate-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/${siteConfig.waAdmin.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Halo Admin, saya ingin mengurus ${layanan.title}. Mohon informasinya.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-xl hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Ajukan via WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
