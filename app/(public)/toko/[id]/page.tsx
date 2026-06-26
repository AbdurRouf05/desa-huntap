import { notFound } from "next/navigation";
import { productService } from "@/lib/services/product.service";
import { ProductDetailClient } from "@/components/public/ProductDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const product = await productService.getById(id);
    return {
      title: product.name,
      description: product.description,
    };
  } catch {
    return { title: "Produk Tidak Ditemukan" };
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let product;
  try {
    product = await productService.getById(id);
  } catch (error) {
    notFound();
  }

  // Fetch related products
  const result = await productService.getList(1, 4, product.category);
  const relatedProducts = result.items.filter((p) => p.id !== product.id).slice(0, 4);

  const imageUrls = product.images?.map(img => 
    `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${product.collectionId}/${product.id}/${img}`
  ) || [];

  return (
    <ProductDetailClient 
      product={product} 
      relatedProducts={relatedProducts}
      imageUrls={imageUrls}
    />
  );
}
