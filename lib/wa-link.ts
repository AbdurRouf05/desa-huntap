export function generateWhatsAppUrl(
  phone: string,
  items: { name: string; qty: number; price: number }[],
  customerName?: string,
  customerAddress?: string
): string {
  const itemLines = items
    .map(
      (item, i) =>
        `${i + 1}. ${item.name} x${item.qty} — Rp ${item.price.toLocaleString("id-ID")}`
    )
    .join("\n");

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  let message = `*🛒 Pesanan Baru dari Toko Desa Huntap Sumbermujur*\n`;
  message += `────────────────────\n`;
  message += `${itemLines}\n`;
  message += `────────────────────\n`;
  message += `💰 *Total: Rp ${total.toLocaleString("id-ID")}*\n\n`;

  if (customerName) {
    message += `📛 Nama: ${customerName}\n`;
  }
  if (customerAddress) {
    message += `📍 Alamat: ${customerAddress}\n`;
  }

  message += `\nTerima kasih! 🙏`;

  const encodedMessage = encodeURIComponent(message);
  const cleanPhone = phone.replace(/[^0-9]/g, "");

  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export function generateSingleProductWaUrl(
  phone: string,
  productName: string,
  price: number
): string {
  const message = `Halo, saya tertarik dengan produk *${productName}* (Rp ${price.toLocaleString("id-ID")}). Apakah masih tersedia?`;
  const encodedMessage = encodeURIComponent(message);
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
