"use server";

import { revalidatePath } from "next/cache";
import { getServerAuth } from "@/lib/auth";

/**
 * Server Action: Create a new museum item.
 * Uses the authenticated PocketBase instance from cookies.
 */
export async function createMuseumItem(formData: FormData) {
  const pb = await getServerAuth();
  
  if (!pb.authStore.isValid) {
    return { success: false, error: "Anda belum login. Silakan login ulang." };
  }

  try {
    // Auto-generate slug from name
    const name = formData.get("name") as string;
    if (!name) {
      return { success: false, error: "Nama koleksi harus diisi." };
    }
    
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    formData.set("slug", slug);

    const record = await pb.collection("museum_items").create(formData);
    revalidatePath("/cp/museum");
    revalidatePath("/museum");
    return { success: true, id: record.id, slug: record.slug };
  } catch (error: any) {
    console.error("Failed to create museum item:", error);
    const message = error?.response?.message || error?.message || "Gagal menyimpan data.";
    return { success: false, error: message };
  }
}

/**
 * Server Action: Update an existing museum item.
 */
export async function updateMuseumItem(id: string, formData: FormData) {
  const pb = await getServerAuth();
  
  if (!pb.authStore.isValid) {
    return { success: false, error: "Anda belum login. Silakan login ulang." };
  }

  try {
    // Remove empty image file if user didn't select a new one
    const imageFile = formData.get("image") as File;
    if (imageFile && imageFile.size === 0) {
      formData.delete("image");
    }

    await pb.collection("museum_items").update(id, formData);
    revalidatePath("/cp/museum");
    revalidatePath("/museum");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update museum item:", error);
    const message = error?.response?.message || error?.message || "Gagal memperbarui data.";
    return { success: false, error: message };
  }
}

/**
 * Server Action: Delete a museum item.
 */
export async function deleteMuseumItem(id: string) {
  const pb = await getServerAuth();
  
  if (!pb.authStore.isValid) {
    return { success: false, error: "Anda belum login. Silakan login ulang." };
  }

  try {
    await pb.collection("museum_items").delete(id);
    revalidatePath("/cp/museum");
    revalidatePath("/museum");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete museum item:", error);
    const message = error?.response?.message || error?.message || "Gagal menghapus data.";
    return { success: false, error: message };
  }
}

/**
 * Server Action: Get a museum item by ID.
 */
export async function getMuseumItem(id: string) {
  const pb = await getServerAuth();
  
  try {
    const record = await pb.collection("museum_items").getOne(id);
    return { success: true, data: JSON.parse(JSON.stringify(record)) };
  } catch (error: any) {
    console.error("Failed to fetch museum item:", error);
    return { success: false, error: "Data tidak ditemukan.", data: null };
  }
}
