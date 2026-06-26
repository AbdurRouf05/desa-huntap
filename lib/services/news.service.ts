import pb, { getFileUrl } from "@/lib/pocketbase";
import type { NewsArticle } from "@/types";
import type { ListResult } from "pocketbase";

const COLLECTION = "news";

export const newsService = {
  /** Get paginated news list with optional category filter */
  async getList(
    page = 1,
    perPage = 10,
    category?: string,
    search?: string
  ): Promise<ListResult<NewsArticle>> {
    const filters: string[] = [];
    if (category) filters.push(`category.slug = "${category}"`);
    if (search) filters.push(`(title ~ "${search}" || excerpt ~ "${search}")`);

    return await pb.collection(COLLECTION).getList<NewsArticle>(page, perPage, {
      sort: "-created",
      expand: "category",
      filter: filters.length > 0 ? filters.join(" && ") : undefined,
    });
  },

  /** Get all news for admin (bypasses is_published rule via superuser auth) */
  async getAdminList(
    page = 1,
    perPage = 20,
    search?: string
  ): Promise<ListResult<NewsArticle>> {
    const filters: string[] = [];
    if (search) filters.push(`(title ~ "${search}" || excerpt ~ "${search}")`);

    return await pb.collection(COLLECTION).getList<NewsArticle>(page, perPage, {
      sort: "-created",
      expand: "category",
      filter: filters.length > 0 ? filters.join(" && ") : undefined,
    });
  },

  /** Get a single news article by slug */
  async getBySlug(slug: string): Promise<NewsArticle> {
    return await pb.collection(COLLECTION).getFirstListItem<NewsArticle>(
      `slug = "${slug}"`,
      { expand: "category" }
    );
  },

  /** Get a single news article by ID */
  async getById(id: string): Promise<NewsArticle> {
    return await pb.collection(COLLECTION).getOne<NewsArticle>(id, {
      expand: "category",
    });
  },

  /** Create a news article with optional thumbnail upload */
  async create(data: FormData): Promise<NewsArticle> {
    return await pb.collection(COLLECTION).create<NewsArticle>(data);
  },

  /** Update a news article */
  async update(id: string, data: FormData | Partial<NewsArticle>): Promise<NewsArticle> {
    return await pb.collection(COLLECTION).update<NewsArticle>(id, data);
  },

  /** Delete a news article */
  async delete(id: string): Promise<boolean> {
    return await pb.collection(COLLECTION).delete(id);
  },

  /** Increment view count */
  async incrementViews(id: string): Promise<void> {
    try {
      const record = await pb.collection(COLLECTION).getOne<NewsArticle>(id);
      await pb.collection(COLLECTION).update(id, {
        views: (record.views || 0) + 1,
      });
    } catch {
      // silently fail — view counting is non-critical
    }
  },

  /** Get latest N news articles (for homepage) */
  async getLatest(limit = 4): Promise<NewsArticle[]> {
    const result = await pb.collection(COLLECTION).getList<NewsArticle>(1, limit, {
      sort: "-created",
      expand: "category",
    });
    return result.items;
  },

  /** Helper: get thumbnail URL */
  getThumbnailUrl(article: NewsArticle, thumb?: string): string {
    return getFileUrl(COLLECTION, article.id, article.thumbnail, thumb);
  },
};
