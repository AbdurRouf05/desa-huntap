"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteProductCategory } from "@/lib/actions/product-category.actions";

export default function DeleteCategoryButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus kategori ini? Produk yang menggunakan kategori ini mungkin terpengaruh.")) {
      setIsDeleting(true);
      const res = await deleteProductCategory(id);
      if (!res.success) {
        alert(res.error || "Gagal menghapus kategori.");
      }
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
      title="Hapus"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
