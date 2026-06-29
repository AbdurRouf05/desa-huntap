"use server";

import { revalidatePath } from "next/cache";
import { getServerAuth } from "@/lib/auth";

export async function createToko(formData: FormData) {
  const pb = await getServerAuth();
  
  if (!pb.authStore.isValid) {
    return { success: false, error: "Anda belum login. Silakan login ulang." };
  }

  try {
    const storeName = formData.get("name") as string;
    const ownerName = formData.get("owner_name") as string;
    const password = formData.get("password") as string;
    
    if (!storeName || !ownerName || !password) {
      return { success: false, error: "Nama toko, nama pemilik, dan password harus diisi." };
    }
    
    // Auto-generate slug from store name
    const slug = storeName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    formData.set("slug", slug);

    // Create user first
    const email = `${slug}@huntap.id`;
    
    // Check if user already exists (optional, but pb will throw error if email is not unique)
    let userId = "";
    try {
      const userRecord = await pb.collection("users").create({
        email: email,
        password: password,
        passwordConfirm: password,
        name: ownerName,
        emailVisibility: true,
        verified: true,
      });
      userId = userRecord.id;
    } catch (userError: any) {
      console.error("Gagal membuat user:", userError);
      return { success: false, error: "Gagal membuat akun untuk pemilik toko. Mungkin email/slug sudah digunakan." };
    }

    // Assign user relation to form data
    formData.set("user", userId);

    // Remove password from form data so it doesn't get sent to umkm_stores
    formData.delete("password");

    // Remove empty image file if user didn't select one
    const imageFile = formData.get("image") as File;
    if (imageFile && imageFile.size === 0) {
      formData.delete("image");
    }

    let record;
    try {
      record = await pb.collection("umkm_stores").create(formData);
    } catch (storeError: any) {
      // Rollback user creation
      await pb.collection("users").delete(userId).catch(e => console.error("Rollback user failed", e));
      throw storeError;
    }
    
    revalidatePath("/cp/toko/pemilik");
    revalidatePath("/toko");
    return { success: true, id: record.id, slug: record.slug };
  } catch (error: any) {
    console.error("Failed to create toko:", error);
    let message = error?.response?.message || error?.message || "Gagal menyimpan data toko.";
    
    // Append pocketbase detailed validation errors if they exist
    if (error?.response?.data) {
      const details = Object.entries(error.response.data)
        .map(([key, val]: any) => `${key}: ${val.message}`)
        .join(", ");
      if (details) {
        message += ` (${details})`;
      }
    }
    
    return { success: false, error: message };
  }
}

export async function updateToko(id: string, formData: FormData) {
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

    const password = formData.get("password") as string;
    formData.delete("password"); // Don't save to umkm_stores

    // If there is password provided, update the related user's password
    if (password) {
      const store = await pb.collection("umkm_stores").getOne(id);
      if (store.user) {
        await pb.collection("users").update(store.user, {
          password: password,
          passwordConfirm: password
        });
      }
    }

    await pb.collection("umkm_stores").update(id, formData);
    revalidatePath("/cp/toko/pemilik");
    revalidatePath(`/cp/toko/pemilik/edit/${id}`);
    revalidatePath("/toko");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update toko:", error);
    const message = error?.response?.message || error?.message || "Gagal memperbarui data.";
    return { success: false, error: message };
  }
}

export async function deleteToko(id: string) {
  const pb = await getServerAuth();
  
  if (!pb.authStore.isValid) {
    return { success: false, error: "Anda belum login. Silakan login ulang." };
  }

  try {
    const store = await pb.collection("umkm_stores").getOne(id);
    await pb.collection("umkm_stores").delete(id);
    
    // Also delete user
    if (store.user) {
        await pb.collection("users").delete(store.user).catch(e => console.error("Failed to delete user", e));
    }

    revalidatePath("/cp/toko/pemilik");
    revalidatePath("/toko");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete toko:", error);
    const message = error?.response?.message || error?.message || "Gagal menghapus data.";
    return { success: false, error: message };
  }
}

export async function getToko(id: string) {
  const pb = await getServerAuth();
  try {
    const record = await pb.collection("umkm_stores").getOne(id);
    return { success: true, data: JSON.parse(JSON.stringify(record)) };
  } catch (error: any) {
    console.error("Failed to fetch toko:", error);
    return { success: false, error: "Data tidak ditemukan.", data: null };
  }
}

export async function getMyStore() {
  const { getServerTokoAuth } = await import("@/lib/auth");
  const pb = await getServerTokoAuth();
  if (!pb.authStore.isValid || !pb.authStore.record) {
    return { success: false, error: "Unauthorized", data: null };
  }
  try {
    const userId = pb.authStore.record.id;
    const store = await pb.collection("umkm_stores").getFirstListItem(`user="${userId}"`);
    return { success: true, data: JSON.parse(JSON.stringify(store)) };
  } catch (error) {
    return { success: false, error: "Toko belum dibuat atau tidak ditemukan.", data: null };
  }
}

export async function updateMyStore(formData: FormData) {
  const { getServerTokoAuth } = await import("@/lib/auth");
  const pb = await getServerTokoAuth();
  
  if (!pb.authStore.isValid || !pb.authStore.record) {
    return { success: false, error: "Unauthorized", data: null };
  }

  try {
    const userId = pb.authStore.record.id;
    const store = await pb.collection("umkm_stores").getFirstListItem(`user="${userId}"`);
    
    // Remove empty image file if user didn't select a new one
    const imageFile = formData.get("image") as File;
    if (imageFile && imageFile.size === 0) {
      formData.delete("image");
    }

    const password = formData.get("password") as string;
    formData.delete("password"); // Don't save to umkm_stores

    // If there is password provided, update the user's password
    if (password) {
      await pb.collection("users").update(userId, {
        password: password,
        passwordConfirm: password
      });
    }

    await pb.collection("umkm_stores").update(store.id, formData);
    
    revalidatePath("/toko/dashboard");
    revalidatePath("/toko/dashboard/pengaturan");
    revalidatePath("/toko");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update my store:", error);
    const message = error?.response?.message || error?.message || "Gagal memperbarui data toko.";
    return { success: false, error: message };
  }
}
