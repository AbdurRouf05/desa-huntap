import { Metadata } from "next";
import { productService } from "@/lib/services/product.service";
import { productCategoryService } from "@/lib/services/product-category.service";
import { TokoClient } from "@/components/public/TokoClient";

export const metadata: Metadata = {
  title: "Toko UMKM Desa",
  description: "Produk unggulan buatan warga Desa Huntap Sumbermujur.",
};

export const dynamic = "force-dynamic";

export default async function TokoPage() {
  // Fetch up to 100 products for initial load (this works fine for small scale, can be paginated later)
  const result = await productService.getList(1, 100);
  const products = result.items || [];

  // Fetch active categories
  const activeCategories = await productCategoryService.getActiveCategories();
  const categoryNames = activeCategories.map(c => c.name);
  const categories = ["Semua", ...categoryNames];

  return <TokoClient products={products} categories={categories} />;
}
