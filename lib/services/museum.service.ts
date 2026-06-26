import pb, { getFileUrl } from "@/lib/pocketbase";
import type { MuseumItem } from "@/types";

const COLLECTION = "museum_items";

export const museumService = {
  /** Get all museum items */
  async getList(): Promise<MuseumItem[]> {
    return await pb.collection(COLLECTION).getFullList<MuseumItem>({
      sort: "-created",
    });
  },

  /** Get museum item by slug */
  async getBySlug(slug: string): Promise<MuseumItem> {
    return await pb.collection(COLLECTION).getFirstListItem<MuseumItem>(
      `slug = "${slug}"`
    );
  },

  /** Get museum item by ID */
  async getById(id: string): Promise<MuseumItem> {
    return await pb.collection(COLLECTION).getOne<MuseumItem>(id);
  },

  /** Create museum item */
  async create(data: FormData): Promise<MuseumItem> {
    return await pb.collection(COLLECTION).create<MuseumItem>(data);
  },

  /** Update museum item */
  async update(id: string, data: FormData | Partial<MuseumItem>): Promise<MuseumItem> {
    return await pb.collection(COLLECTION).update<MuseumItem>(id, data);
  },

  /** Delete museum item */
  async delete(id: string): Promise<boolean> {
    return await pb.collection(COLLECTION).delete(id);
  },

  /** Helper: get image URL */
  getImageUrl(item: MuseumItem, thumb?: string): string {
    return getFileUrl(COLLECTION, item.id, item.image, thumb);
  },
};
