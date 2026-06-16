// ============================================================
// TypeScript interfaces untuk seluruh data model
// ============================================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  stock: number;
  isFeatured: boolean;
  sellerName: string;
  sellerPhone: string;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  category: "berita" | "pengumuman" | "kegiatan";
  author: string;
  createdAt: string;
  isPublished: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  album: string;
  createdAt: string;
}

export interface Perangkat {
  id: string;
  name: string;
  position: string;
  photo: string;
  phone?: string;
}

export interface DesaProfile {
  namaKepala: string;
  penduduk: number;
  luasWilayah: string;
  jumlahRT: number;
  jumlahRW: number;
  sejarah: string;
  visi: string;
  misi: string[];
  potensi: string[];
}

export interface LayananItem {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  icon: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  icon: string;
}
