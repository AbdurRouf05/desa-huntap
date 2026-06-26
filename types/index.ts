// ============================================================
// TypeScript interfaces — Matching PocketBase schema (snake_case)
// PocketBase auto-fields: id, created, updated, collectionId, collectionName
// ============================================================

/** Base record fields that PocketBase adds to every record */
export interface PBRecord {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

export interface NewsCategory extends PBRecord {
  name: string;
  slug: string;
  is_active: boolean;
}

export interface NewsArticle extends PBRecord {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string; // relation ID → news_categories
  author: string;
  thumbnail: string; // filename from PocketBase
  is_published: boolean;
  views: number;
  // expand
  expand?: {
    category?: NewsCategory;
  };
}

export interface UmkmStore extends PBRecord {
  name: string;
  slug: string;
  owner_name: string;
  phone: string;
  address: string;
  description: string;
  image: string; // filename
  is_verified: boolean;
}

export interface Product extends PBRecord {
  name: string;
  slug: string;
  description: string;
  price: number;
  discount_price?: number;
  category: string; // select: Makanan/Minuman/Kerajinan/Pertanian
  images: string[]; // array of filenames
  stock: number;
  is_featured: boolean;
  store: string; // relation ID → umkm_stores
  // expand
  expand?: {
    store?: UmkmStore;
  };
}

export interface GalleryItem extends PBRecord {
  title: string;
  image: string; // filename
  album: string; // select: Wisata/Kegiatan/Infrastruktur/UMKM/Budaya/Lainnya
}

export interface MuseumItem extends PBRecord {
  name: string;
  slug: string;
  image: string; // filename
  era: string;
  condition: string;
  description: string;
  location?: string;
}

export interface Official extends PBRecord {
  name: string;
  position: string;
  photo: string; // filename
  phone?: string;
  sort_order: number;
}

export interface ServiceItem extends PBRecord {
  title: string;
  description: string;
  requirements: string[]; // JSON array
  icon: string; // Lucide icon name
  sort_order: number;
}

export interface SiteSettings extends PBRecord {
  site_name: string;
  description: string;
  kepala_desa: string;
  penduduk: number;
  luas_wilayah: string;
  jumlah_rt: number;
  jumlah_rw: number;
  sejarah: string;
  visi: string;
  misi: string[]; // JSON array
  potensi: string[]; // JSON array
  wa_admin: string;
  email: string;
  phone: string;
  address: string;
  map_embed_url: string;
  logo: string; // filename
  social_facebook: string;
  social_instagram: string;
  social_youtube: string;
}

export interface Order extends PBRecord {
  customer_name: string;
  customer_phone: string;
  items: OrderLineItem[];
  total_price: number;
  store: string; // relation ID → umkm_stores
  status: "pending" | "confirmed" | "processing" | "completed" | "cancelled";
  notes: string;
  wa_sent: boolean;
  // expand
  expand?: {
    store?: UmkmStore;
  };
}

export interface OrderLineItem {
  product_id: string;
  product_name: string;
  qty: number;
  price: number;
}

export interface CartItem {
  product: Product;
  qty: number;
}

// Legacy aliases (if needed for compatibility during migration)
export type Perangkat = Official;
export type DesaProfile = SiteSettings;
export type LayananItem = ServiceItem;
