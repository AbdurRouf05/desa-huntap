import pb, { getFileUrl } from "@/lib/pocketbase";
import type { NewsCategory } from "@/types";

const COLLECTION = "news_categories";

export const newsCategoryService = {
  /** Get all categories (admin sees all, public sees only active via API rules) */
  async getList(): Promise<NewsCategory[]> {
    const records = await pb.collection(COLLECTION).getFullList<NewsCategory>({
      sort: "name",
    });
    return records;
  },

  /** Get only active categories (for public pages) */
  async getActiveList(): Promise<NewsCategory[]> {
    const records = await pb.collection(COLLECTION).getFullList<NewsCategory>({
      filter: "is_active = true",
      sort: "name",
    });
    return records;
  },

  /** Create a new category */
  async create(data: Partial<NewsCategory>): Promise<NewsCategory> {
    return await pb.collection(COLLECTION).create<NewsCategory>(data);
  },

  /** Update a category */
  async update(id: string, data: Partial<NewsCategory>): Promise<NewsCategory> {
    return await pb.collection(COLLECTION).update<NewsCategory>(id, data);
  },

  /** Delete a category */
  async delete(id: string): Promise<boolean> {
    return await pb.collection(COLLECTION).delete(id);
  },
};
