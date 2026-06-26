import pb, { getFileUrl } from "@/lib/pocketbase";
import type { UmkmStore } from "@/types";
import type { ListResult } from "pocketbase";

const COLLECTION = "umkm_stores";

export const storeService = {
  /** Get paginated store list */
  async getList(
    page = 1,
    perPage = 20,
    search?: string
  ): Promise<ListResult<UmkmStore>> {
    const filters: string[] = [];
    if (search) filters.push(`(name ~ "${search}" || owner_name ~ "${search}")`);

    return await pb.collection(COLLECTION).getList<UmkmStore>(page, perPage, {
      sort: "-created",
      filter: filters.length > 0 ? filters.join(" && ") : undefined,
    });
  },

  /** Get all verified stores (for public pages) */
  async getVerifiedList(): Promise<UmkmStore[]> {
    return await pb.collection(COLLECTION).getFullList<UmkmStore>({
      sort: "name",
    });
  },

  /** Get store by slug */
  async getBySlug(slug: string): Promise<UmkmStore> {
    return await pb.collection(COLLECTION).getFirstListItem<UmkmStore>(
      `slug = "${slug}"`
    );
  },

  /** Get store by ID */
  async getById(id: string): Promise<UmkmStore> {
    return await pb.collection(COLLECTION).getOne<UmkmStore>(id);
  },

  /** Create store with optional image */
  async create(data: FormData): Promise<UmkmStore> {
    return await pb.collection(COLLECTION).create<UmkmStore>(data);
  },

  /** Update store */
  async update(id: string, data: FormData | Partial<UmkmStore>): Promise<UmkmStore> {
    return await pb.collection(COLLECTION).update<UmkmStore>(id, data);
  },

  /** Delete store */
  async delete(id: string): Promise<boolean> {
    return await pb.collection(COLLECTION).delete(id);
  },

  /** Helper: get store image URL */
  getImageUrl(store: UmkmStore, thumb?: string): string {
    return getFileUrl(COLLECTION, store.id, store.image, thumb);
  },
};
