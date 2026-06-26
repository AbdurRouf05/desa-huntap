import pb from "@/lib/pocketbase";
import type { ServiceItem } from "@/types";

const COLLECTION = "services";

export const serviceService = {
  /** Get all services sorted by sort_order */
  async getList(): Promise<ServiceItem[]> {
    return await pb.collection(COLLECTION).getFullList<ServiceItem>({
      sort: "sort_order,created",
    });
  },

  /** Create a service */
  async create(data: Partial<ServiceItem>): Promise<ServiceItem> {
    return await pb.collection(COLLECTION).create<ServiceItem>(data);
  },

  /** Update a service */
  async update(id: string, data: Partial<ServiceItem>): Promise<ServiceItem> {
    return await pb.collection(COLLECTION).update<ServiceItem>(id, data);
  },

  /** Delete a service */
  async delete(id: string): Promise<boolean> {
    return await pb.collection(COLLECTION).delete(id);
  },
};
