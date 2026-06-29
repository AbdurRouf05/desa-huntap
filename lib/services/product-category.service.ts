import pb from "../pocketbase";
import type { ProductCategory } from "@/types";

export const productCategoryService = {
  async getList(): Promise<ProductCategory[]> {
    try {
      const records = await pb.collection("product_categories").getFullList({
        sort: "name",
      });
      return records as unknown as ProductCategory[];
    } catch (error) {
      console.error("Error fetching product categories:", error);
      return [];
    }
  },

  async getActiveCategories(): Promise<ProductCategory[]> {
    try {
      const records = await pb.collection("product_categories").getFullList({
        filter: "is_active = true",
        sort: "name",
      });
      return records as unknown as ProductCategory[];
    } catch (error) {
      console.error("Error fetching active product categories:", error);
      return [];
    }
  },

  async getById(id: string): Promise<ProductCategory | null> {
    try {
      const record = await pb.collection("product_categories").getOne(id);
      return record as unknown as ProductCategory;
    } catch (error) {
      console.error("Error fetching product category by id:", error);
      return null;
    }
  },

  async create(data: Partial<ProductCategory>): Promise<ProductCategory> {
    const record = await pb.collection("product_categories").create(data);
    return record as unknown as ProductCategory;
  },

  async update(id: string, data: Partial<ProductCategory>): Promise<ProductCategory> {
    const record = await pb.collection("product_categories").update(id, data);
    return record as unknown as ProductCategory;
  },

  async delete(id: string): Promise<boolean> {
    try {
      await pb.collection("product_categories").delete(id);
      return true;
    } catch (error) {
      console.error("Error deleting product category:", error);
      return false;
    }
  },
};
