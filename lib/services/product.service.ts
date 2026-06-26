import pb, { getFileUrl } from "@/lib/pocketbase";
import type { Product } from "@/types";
import type { ListResult } from "pocketbase";

const COLLECTION = "products";

export const productService = {
  /** Get paginated product list with optional filters */
  async getList(
    page = 1,
    perPage = 20,
    category?: string,
    search?: string
  ): Promise<ListResult<Product>> {
    const filters: string[] = [];
    if (category && category !== "Semua") filters.push(`category = "${category}"`);
    if (search) filters.push(`(name ~ "${search}" || description ~ "${search}")`);

    return await pb.collection(COLLECTION).getList<Product>(page, perPage, {
      sort: "-created",
      expand: "store",
      filter: filters.length > 0 ? filters.join(" && ") : undefined,
    });
  },

  /** Get featured products (for homepage) */
  async getFeatured(limit = 8): Promise<Product[]> {
    const result = await pb.collection(COLLECTION).getList<Product>(1, limit, {
      filter: "is_featured = true",
      sort: "-created",
      expand: "store",
    });
    return result.items;
  },

  /** Get product by slug */
  async getBySlug(slug: string): Promise<Product> {
    return await pb.collection(COLLECTION).getFirstListItem<Product>(
      `slug = "${slug}"`,
      { expand: "store" }
    );
  },

  /** Get product by ID */
  async getById(id: string): Promise<Product> {
    return await pb.collection(COLLECTION).getOne<Product>(id, {
      expand: "store",
    });
  },

  /** Get products by store ID */
  async getByStore(storeId: string): Promise<Product[]> {
    return await pb.collection(COLLECTION).getFullList<Product>({
      filter: `store = "${storeId}"`,
      sort: "-created",
    });
  },

  /** Create product with images */
  async create(data: FormData): Promise<Product> {
    return await pb.collection(COLLECTION).create<Product>(data);
  },

  /** Update product */
  async update(id: string, data: FormData | Partial<Product>): Promise<Product> {
    return await pb.collection(COLLECTION).update<Product>(id, data);
  },

  /** Delete product */
  async delete(id: string): Promise<boolean> {
    return await pb.collection(COLLECTION).delete(id);
  },

  /** Helper: get first image URL */
  getImageUrl(product: Product, index = 0, thumb?: string): string {
    const filename = product.images?.[index] || "";
    return getFileUrl(COLLECTION, product.id, filename, thumb);
  },

  /** Helper: get all image URLs */
  getAllImageUrls(product: Product, thumb?: string): string[] {
    return (product.images || []).map((filename) =>
      getFileUrl(COLLECTION, product.id, filename, thumb)
    );
  },
};
