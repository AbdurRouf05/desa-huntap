"use client";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function ViewCounter({ initialViews = 0, slug }: { initialViews?: number, slug: string }) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    // Simulasi penambahan views menggunakan localStorage
    // Di versi nyata, ini akan memanggil API / PocketBase
    const hasViewed = localStorage.getItem(`viewed_news_${slug}`);
    
    // Tambahkan delay 2 detik agar views terhitung jika user benar-benar membaca (bukan sekadar lewat)
    const timer = setTimeout(() => {
      if (!hasViewed) {
        setViews(prev => prev + 1);
        localStorage.setItem(`viewed_news_${slug}`, 'true');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [slug]);

  return (
    <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
      <Eye className="w-4 h-4" />
      <span>{views} x dibaca</span>
    </div>
  );
}
