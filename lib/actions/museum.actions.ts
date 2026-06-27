"use server";

import { museumService } from "@/lib/services/museum.service";
import { revalidatePath } from "next/cache";

export async function deleteMuseumItemAction(id: string) {
  try {
    await museumService.delete(id);
    revalidatePath("/cp/museum");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete museum item:", error);
    return { success: false, error: error.message };
  }
}
