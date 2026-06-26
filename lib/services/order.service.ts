import pb from "@/lib/pocketbase";
import type { Order } from "@/types";
import type { ListResult } from "pocketbase";

const COLLECTION = "orders";

export const orderService = {
  /** Get paginated orders list (admin only) */
  async getList(
    page = 1,
    perPage = 20,
    status?: string,
    search?: string
  ): Promise<ListResult<Order>> {
    const filters: string[] = [];
    if (status && status !== "all") filters.push(`status = "${status}"`);
    if (search) filters.push(`(customer_name ~ "${search}" || customer_phone ~ "${search}")`);

    return await pb.collection(COLLECTION).getList<Order>(page, perPage, {
      sort: "-created",
      expand: "store",
      filter: filters.length > 0 ? filters.join(" && ") : undefined,
    });
  },

  /** Get a single order */
  async getById(id: string): Promise<Order> {
    return await pb.collection(COLLECTION).getOne<Order>(id, {
      expand: "store",
    });
  },

  /** Create a new order (from public checkout) */
  async create(data: Partial<Order>): Promise<Order> {
    return await pb.collection(COLLECTION).create<Order>({
      ...data,
      status: "pending",
      wa_sent: false,
    });
  },

  /** Update order status (admin) */
  async updateStatus(id: string, status: Order["status"]): Promise<Order> {
    return await pb.collection(COLLECTION).update<Order>(id, { status });
  },

  /** Mark WA as sent */
  async markWaSent(id: string): Promise<Order> {
    return await pb.collection(COLLECTION).update<Order>(id, { wa_sent: true });
  },

  /** Delete order */
  async delete(id: string): Promise<boolean> {
    return await pb.collection(COLLECTION).delete(id);
  },

  /** Get order statistics */
  async getStats(): Promise<{ total: number; pending: number; completed: number }> {
    const all = await pb.collection(COLLECTION).getList<Order>(1, 1);
    const pending = await pb.collection(COLLECTION).getList<Order>(1, 1, {
      filter: 'status = "pending"',
    });
    const completed = await pb.collection(COLLECTION).getList<Order>(1, 1, {
      filter: 'status = "completed"',
    });
    return {
      total: all.totalItems,
      pending: pending.totalItems,
      completed: completed.totalItems,
    };
  },
};
