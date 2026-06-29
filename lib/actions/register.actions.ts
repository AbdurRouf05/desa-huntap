"use server";

import PocketBase from "pocketbase";
import { PB_URL } from "@/lib/pocketbase";

export async function registerTokoPublic(formData: FormData) {
  try {
    const storeName = formData.get("name") as string;
    const ownerName = formData.get("owner_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    
    if (!storeName || !ownerName || !email || !password || !address || !phone) {
      return { success: false, error: "Semua kolom wajib diisi." };
    }

    if (password !== passwordConfirm) {
      return { success: false, error: "Kata sandi dan konfirmasi kata sandi tidak cocok." };
    }

    // Auto-generate slug from store name
    let slug = storeName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    // Initialize Admin PB to bypass createRule = null
    const pb = new PocketBase(PB_URL || "https://db-huntap.sagamuda.id");
    pb.autoCancellation(false);
    
    try {
      await pb.admins.authWithPassword(
        process.env.ADMIN_EMAIL || "admin@desa-sumbermujur.id", 
        process.env.ADMIN_PASSWORD || "HuntapSumbermujur2026!"
      );
    } catch (adminErr) {
      console.error("Admin auth failed:", adminErr);
      return { success: false, error: "Sistem gagal memproses pendaftaran (Kesalahan Internal)." };
    }

    // Ensure slug is unique
    let isUnique = false;
    let counter = 0;
    let currentSlug = slug;
    
    while (!isUnique) {
      try {
        await pb.collection("umkm_stores").getFirstListItem(`slug="${currentSlug}"`);
        // If found, append counter
        counter++;
        currentSlug = `${slug}-${counter}`;
      } catch (e: any) {
        // Not found, so it's unique
        isUnique = true;
        slug = currentSlug;
      }
    }

    // Create user first
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
      pb.authStore.clear(); // logout admin
      return { success: false, error: "Email sudah terdaftar atau format tidak valid." };
    }

    // Create umkm_stores record
    try {
      await pb.collection("umkm_stores").create({
        name: storeName,
        owner_name: ownerName,
        slug: slug,
        address: address,
        phone: phone,
        user: userId,
        is_verified: true,
        status: "active"
      });
    } catch (storeError: any) {
      console.error("Gagal membuat toko:", storeError);
      // Rollback user creation
      try {
        await pb.collection("users").delete(userId);
      } catch (e) {}
      
      pb.authStore.clear(); // logout admin
      return { success: false, error: "Gagal membuat profil toko." };
    }

    pb.authStore.clear(); // logout admin
    return { success: true };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { success: false, error: "Terjadi kesalahan pada server." };
  }
}
