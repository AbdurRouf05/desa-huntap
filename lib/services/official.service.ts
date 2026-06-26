import pb, { getFileUrl } from "@/lib/pocketbase";
import type { Official } from "@/types";

const COLLECTION = "officials";

export const officialService = {
  /** Get all officials sorted by sort_order */
  async getList(): Promise<Official[]> {
    return await pb.collection(COLLECTION).getFullList<Official>({
      sort: "sort_order,created",
    });
  },

  /** Create an official */
  async create(data: FormData): Promise<Official> {
    return await pb.collection(COLLECTION).create<Official>(data);
  },

  /** Update an official */
  async update(id: string, data: FormData | Partial<Official>): Promise<Official> {
    return await pb.collection(COLLECTION).update<Official>(id, data);
  },

  /** Delete an official */
  async delete(id: string): Promise<boolean> {
    return await pb.collection(COLLECTION).delete(id);
  },

  /** Helper: get photo URL */
  getPhotoUrl(official: Official, thumb?: string): string {
    return getFileUrl(COLLECTION, official.id, official.photo, thumb);
  },
};
