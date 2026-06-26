import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/wa-float";
import { CartProvider } from "@/components/providers/cart-provider";
import { CartDrawer } from "@/components/toko/cart-drawer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <CartDrawer />
    </CartProvider>
  );
}
