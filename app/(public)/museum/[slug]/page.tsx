import { PB_URL } from '@/lib/pocketbase';
import { notFound } from "next/navigation";
import { museumService } from "@/lib/services/museum.service";
import { MuseumDetailClient } from "@/components/public/MuseumDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const item = await museumService.getBySlug(slug);
    const imageUrl = item.image
      ? `${PB_URL}/api/files/${item.collectionId}/${item.id}/${item.image}`
      : null;

    return {
      title: item.name,
      description: item.description,
      openGraph: {
        title: item.name,
        description: item.description,
        images: imageUrl ? [{ url: imageUrl, width: 800, height: 800 }] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: item.name,
        description: item.description,
        images: imageUrl ? [imageUrl] : [],
      }
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
    ? `${PB_URL}/api/files/${item.collectionId}/${item.id}/${item.image}`
    : null;

  return <MuseumDetailClient item={item} imageUrl={imageUrl} />;
}
