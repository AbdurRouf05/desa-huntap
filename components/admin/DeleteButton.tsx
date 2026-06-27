"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteButton({
  id,
  onDelete,
}: {
  id: string;
  onDelete: (id: string) => Promise<{success: boolean; error?: string}>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini? Aksi ini tidak dapat dibatalkan.")) {
      setIsDeleting(true);
      try {
        const res = await onDelete(id);
        if (!res.success) {
          throw new Error(res.error || "Gagal menghapus");
        }
        router.refresh();
      } catch (error: any) {
        console.error("Gagal menghapus", error);
        alert(error.message || "Terjadi kesalahan saat menghapus data.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
      title="Hapus"
    >
      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin text-red-500" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
