"use server";

import { revalidatePath } from "next/cache";
import { getServerAuth } from "@/lib/auth";

export async function createProductCategory(formData: FormData) {
  const pb = await getServerAuth();
  
  if (!pb.authStore.isValid) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const name = formData.get("name") as string;
    if (!name) return { success: false, error: "Nama kategori harus diisi" };

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    await pb.collection("product_categories").create({
      name,
      slug,
      is_active: formData.get("is_active") === "on",
    });

    revalidatePath("/cp/kategori-produk");
    revalidatePath("/umkm");
    revalidatePath("/toko/dashboard/produk");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create product category:", error);
    return { success: false, error: error?.response?.message || "Gagal menambah kategori" };
  }
}

export async function updateProductCategory(id: string, formData: FormData) {
  const pb = await getServerAuth();
  
  if (!pb.authStore.isValid) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const name = formData.get("name") as string;
    if (!name) return { success: false, error: "Nama kategori harus diisi" };

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    await pb.collection("product_categories").update(id, {
      name,
      slug,
      is_active: formData.get("is_active") === "on",
    });

    revalidatePath("/cp/kategori-produk");
    revalidatePath("/umkm");
    revalidatePath("/toko/dashboard/produk");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update product category:", error);
    return { success: false, error: error?.response?.message || "Gagal mengubah kategori" };
  }
}

export async function deleteProductCategory(id: string) {
  const pb = await getServerAuth();
  
  if (!pb.authStore.isValid) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await pb.collection("product_categories").delete(id);
    
    revalidatePath("/cp/kategori-produk");
    revalidatePath("/umkm");
    revalidatePath("/toko/dashboard/produk");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete product category:", error);
    return { success: false, error: "Gagal menghapus kategori. Kategori ini mungkin sedang digunakan oleh produk." };
  }
}
