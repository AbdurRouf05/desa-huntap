import pb, { getFileUrl } from "@/lib/pocketbase";
import type { GalleryItem } from "@/types";

const COLLECTION = "gallery";

export const galleryService = {
  /** Get all gallery items, optionally filtered by album */
  async getList(album?: string): Promise<GalleryItem[]> {
    const filter = album && album !== "Semua" ? `album = "${album}"` : undefined;
    return await pb.collection(COLLECTION).getFullList<GalleryItem>({
      sort: "-created",
      filter,
    });
  },

  /** Upload a new gallery photo */
  async create(data: FormData): Promise<GalleryItem> {
    return await pb.collection(COLLECTION).create<GalleryItem>(data);
  },

  /** Update gallery item */
  async update(id: string, data: FormData | Partial<GalleryItem>): Promise<GalleryItem> {
    return await pb.collection(COLLECTION).update<GalleryItem>(id, data);
  },

  /** Delete gallery item */
  async delete(id: string): Promise<boolean> {
    return await pb.collection(COLLECTION).delete(id);
  },

  /** Helper: get image URL */
  getImageUrl(item: GalleryItem, thumb?: string): string {
    return getFileUrl(COLLECTION, item.id, item.image, thumb);
  },
};
