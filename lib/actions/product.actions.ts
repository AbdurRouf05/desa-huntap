"use server";

import { revalidatePath } from "next/cache";
import { getMyStore } from "./toko.actions";
import { getServerTokoAuth } from "@/lib/auth";

export async function createStoreProduct(formData: FormData) {
  const storeRes = await getMyStore();
  
  if (!storeRes.success || !storeRes.data) {
    return { success: false, error: "Toko tidak ditemukan. Anda tidak bisa menambahkan produk." };
  }

  const pb = await getServerTokoAuth();
  
  try {
    const name = formData.get("name") as string;
    if (!name) {
      return { success: false, error: "Nama produk harus diisi." };
    }
    
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") + "-" + Date.now();
    formData.set("slug", slug);
    formData.set("store", storeRes.data.id);

    // ensure prices are numbers
    const price = formData.get("price");
    if (!price) formData.set("price", "0");
    const stock = formData.get("stock");
    if (!stock) formData.set("stock", "0");

    const imageFile = formData.get("images") as File;
    if (imageFile && imageFile.size === 0) {
      formData.delete("images");
    }

    const record = await pb.collection("products").create(formData);
    
    revalidatePath("/toko/dashboard/produk");
    revalidatePath("/toko");
    return { success: true, id: record.id };
  } catch (error: any) {
    console.error("Failed to create product:", error);
    const message = error?.response?.message || error?.message || "Gagal menyimpan data produk.";
    return { success: false, error: message };
  }
}

export async function updateStoreProduct(id: string, formData: FormData) {
  const storeRes = await getMyStore();
  
  if (!storeRes.success || !storeRes.data) {
    return { success: false, error: "Toko tidak ditemukan." };
  }

  const pb = await getServerTokoAuth();

  try {
    // Verify product ownership
    const product = await pb.collection("products").getOne(id);
    if (product.store !== storeRes.data.id) {
       return { success: false, error: "Anda tidak berhak mengedit produk ini." };
    }

    // Remove empty images if needed. Usually Next.js FormData handles multiple files differently.
    // If we only have 1 image field for now:
    const imageFile = formData.get("images") as File;
    if (imageFile && imageFile.size === 0) {
      formData.delete("images");
    }

    await pb.collection("products").update(id, formData);
    
    revalidatePath("/toko/dashboard/produk");
    revalidatePath(`/toko/dashboard/produk/edit/${id}`);
    revalidatePath("/toko");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update product:", error);
    const message = error?.response?.message || error?.message || "Gagal memperbarui data produk.";
    return { success: false, error: message };
  }
}

export async function deleteStoreProduct(id: string) {
  const storeRes = await getMyStore();
  
  if (!storeRes.success || !storeRes.data) {
    return { success: false, error: "Toko tidak ditemukan." };
  }

  const pb = await getServerTokoAuth();

  try {
    const product = await pb.collection("products").getOne(id);
    if (product.store !== storeRes.data.id) {
       return { success: false, error: "Anda tidak berhak menghapus produk ini." };
    }

    await pb.collection("products").delete(id);
    
    revalidatePath("/toko/dashboard/produk");
    revalidatePath("/toko");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete product:", error);
    const message = error?.response?.message || error?.message || "Gagal menghapus data produk.";
    return { success: false, error: message };
  }
}
