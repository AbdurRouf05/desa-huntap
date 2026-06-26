"use server";

import { getServerAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNewsCategory(formData: FormData) {
  const pb = await getServerAuth();
  if (!pb.authStore.isValid) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const isActive = formData.get("is_active") === "on";

  try {
    await pb.collection("news_categories").create({
      name,
      slug,
      is_active: isActive,
    });
  } catch (error: any) {
    console.error("Failed to create category:", error);
    throw new Error("Gagal menyimpan kategori");
  }

  revalidatePath("/cp/kategori-berita");
  redirect("/cp/kategori-berita");
}

export async function deleteNewsCategory(id: string) {
  const pb = await getServerAuth();
  if (!pb.authStore.isValid) {
    throw new Error("Unauthorized");
  }

  try {
    await pb.collection("news_categories").delete(id);
    revalidatePath("/cp/kategori-berita");
  } catch (error: any) {
    console.error("Failed to delete category:", error);
    throw new Error("Gagal menghapus kategori");
  }
}
