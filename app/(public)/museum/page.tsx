import { Metadata } from "next";
import { museumService } from "@/lib/services/museum.service";
import { MuseumClient } from "@/components/public/MuseumClient";

export const metadata: Metadata = {
  title: "Museum Desa",
  description: "Koleksi benda bersejarah dan artefak Desa Huntap Sumbermujur.",
};

export const dynamic = "force-dynamic";

export default async function MuseumPublicPage() {
  const items = await museumService.getList();

  return <MuseumClient items={items} />;
}
