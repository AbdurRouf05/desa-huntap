import { notFound } from "next/navigation";
import { museumService } from "@/lib/services/museum.service";
import { MuseumDetailClient } from "@/components/public/MuseumDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const item = await museumService.getBySlug(slug);
    return {
      title: item.name,
      description: item.description,
    };
  } catch {
    return { title: "Item Tidak Ditemukan" };
  }
}

export default async function MuseumItemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let item;
  try {
    item = await museumService.getBySlug(slug);
  } catch (error) {
    notFound();
  }

  const imageUrl = item.image
    ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${item.collectionId}/${item.id}/${item.image}`
    : null;

  return <MuseumDetailClient item={item} imageUrl={imageUrl} />;
}
