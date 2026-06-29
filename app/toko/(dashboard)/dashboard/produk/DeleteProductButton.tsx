"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteStoreProduct } from "@/lib/actions/product.actions";
import { useRouter } from "next/navigation";

export default function DeleteProductButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
    
    setIsDeleting(true);
    const result = await deleteStoreProduct(id);
    
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Gagal menghapus produk.");
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
      title="Hapus"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
