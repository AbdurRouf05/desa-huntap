"use server";

import { getServerAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(id: string, status: "pending" | "completed" | "cancelled") {
  try {
    const pb = await getServerAuth();
    await pb.collection("orders").update(id, { status });
    revalidatePath("/cp/toko/pesanan");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update order:", error);
    return { success: false, error: error.message || "Gagal memperbarui status" };
  }
}

export async function deleteOrder(id: string) {
  try {
    const pb = await getServerAuth();
    await pb.collection("orders").delete(id);
    revalidatePath("/cp/toko/pesanan");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete order:", error);
    return { success: false, error: error.message || "Gagal menghapus pesanan" };
  }
}
