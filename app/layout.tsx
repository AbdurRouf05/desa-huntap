import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
// public layout components have been moved to app/(public)/layout.tsx
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Desa Huntap Sumbermujur",
    "Desa Sumbermujur",
    "Huntap Lumajang",
    "Candipuro",
    "UMKM Lumajang",
    "Produk Desa",
    "Website Desa",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
