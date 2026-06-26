"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Trash2, Clock, ChevronDown } from "lucide-react";
import { updateOrderStatus, deleteOrder } from "@/lib/actions/order.actions";

export default function OrderActions({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async (status: "pending" | "completed" | "cancelled") => {
    setIsUpdating(true);
    const res = await updateOrderStatus(orderId, status);
    if (!res.success) alert(res.error);
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    if (!confirm("Hapus pesanan ini?")) return;
    setIsDeleting(true);
    const res = await deleteOrder(orderId);
    if (!res.success) {
      alert(res.error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2 justify-end">
      {/* Dropdown status (simple implementation for now, using buttons to avoid complex headless UI) */}
      {currentStatus !== "completed" && (
        <button 
          onClick={() => handleUpdateStatus("completed")}
          disabled={isUpdating}
          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          title="Tandai Selesai"
        >
          <CheckCircle className="w-4 h-4" />
        </button>
      )}
      {currentStatus !== "cancelled" && currentStatus !== "completed" && (
        <button 
          onClick={() => handleUpdateStatus("cancelled")}
          disabled={isUpdating}
          className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
          title="Batalkan"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
      {currentStatus !== "pending" && (
        <button 
          onClick={() => handleUpdateStatus("pending")}
          disabled={isUpdating}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Tandai Pending"
        >
          <Clock className="w-4 h-4" />
        </button>
      )}

      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
        title="Hapus"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
