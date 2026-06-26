import pb, { getFileUrl } from "@/lib/pocketbase";
import type { SiteSettings } from "@/types";

const COLLECTION = "site_settings";

export const settingsService = {
  /** Get site settings (first/only record) */
  async get(): Promise<SiteSettings | null> {
    try {
      const records = await pb.collection(COLLECTION).getFullList<SiteSettings>({
        sort: "created",
      });
      return records[0] || null;
    } catch {
      return null;
    }
  },

  /** Update site settings */
  async update(id: string, data: FormData | Partial<SiteSettings>): Promise<SiteSettings> {
    return await pb.collection(COLLECTION).update<SiteSettings>(id, data);
  },

  /** Create initial site settings (one-time setup) */
  async create(data: FormData | Partial<SiteSettings>): Promise<SiteSettings> {
    return await pb.collection(COLLECTION).create<SiteSettings>(data);
  },

  /** Helper: get logo URL */
  getLogoUrl(settings: SiteSettings, thumb?: string): string {
    return getFileUrl(COLLECTION, settings.id, settings.logo, thumb);
  },
};
