<div align="center">
  <img src="public/logo-lumajang.png" alt="Logo Lumajang" width="120"/>

  # 🏡 Desa Huntap Sumbermujur
  
  **Platform Web Informasi dan Marketplace UMKM Terpadu untuk Kawasan Huntap (Hunian Tetap) Sumbermujur, Kecamatan Candipuro, Kabupaten Lumajang.**

  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.9-007ACC?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
    <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm-10.29-F69220?style=for-the-badge&logo=pnpm" alt="pnpm" /></a>
  </p>
</div>

---

## ✨ Fitur Unggulan

- 📰 **Portal Informasi Desa**: Menampilkan berita terbaru, pengumuman jadwal kegiatan (posyandu, dsb), dan profil lengkap desa.
- 🏪 **E-Commerce UMKM Lokal**: Marketplace untuk produk asli buatan warga (kopi Semeru, rajutan, dsb) dengan sistem *Cart* yang rapi.
- 💬 **WhatsApp Checkout & Layanan**: Terintegrasi penuh dengan API WhatsApp! Pembelian barang dan layanan surat-menyurat akan di-_generate_ menjadi pesan yang siap dikirim langsung ke Admin.
- 🗺️ **Peta & Transparansi Data**: Profil desa, data perangkat, visi misi, serta peta terintegrasi via Google Maps.
- 🎨 **Desain Modern & Responsif**: Dibangun dengan *Tailwind CSS* untuk memastikan pengalaman pengguna yang super mulus, responsif di HP maupun PC.

## 🚀 Teknologi yang Digunakan

Proyek ini dibangun menggunakan *stack* teknologi web modern yang berfokus pada kecepatan, keamanan, dan kemudahan dalam pengembangan (Developer Experience):

*   [Next.js (App Router)](https://nextjs.org/) - Framework React utama.
*   [Tailwind CSS](https://tailwindcss.com/) - Untuk styling komponen.
*   [TypeScript](https://www.typescriptlang.org/) - Type safety.
*   [Lucide React](https://lucide.dev/) - Kumpulan ikon vektor minimalis yang cantik.
*   **Context API & LocalStorage** - State management khusus untuk fitur Keranjang Belanja.

---

## 🛠️ Instalasi & Pengembangan Lokal

Ikuti langkah-langkah di bawah ini jika Anda ingin menjalankan proyek secara lokal di perangkat Anda:

**1. Clone Repository**
```bash
git clone https://github.com/AbdurRouf05/desa-huntap.git
cd desa-huntap
```

**2. Install Dependencies (menggunakan `pnpm`)**
Pastikan Anda sudah menginstal `pnpm`.
```bash
pnpm install
```

**3. Jalankan Development Server**
```bash
pnpm dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000) (atau port yang diberikan di terminal).

---

## 📂 Struktur Direktori Utama

```
desa-huntap/
├── app/                  # Rute dan halaman Next.js App Router
│   ├── berita/           # Halaman daftar & detail Berita
│   ├── galeri/           # Halaman Dokumentasi
│   ├── kontak/           # Info & form kontak
│   ├── layanan/          # Panduan surat kependudukan
│   ├── pemerintahan/     # Struktur Organisasi
│   ├── profil/           # Sejarah, visi-misi desa
│   ├── toko/             # E-Commerce / produk UMKM
│   ├── globals.css       # File style utama
│   └── layout.tsx        # Layout root aplikasi
├── components/           # Komponen UI Reusable
│   ├── layout/           # Navbar, Footer, WhatsApp Float
│   ├── providers/        # Context Provider (CartProvider)
│   └── toko/             # Komponen khusus e-commerce (CartDrawer)
├── lib/                  # Utility & konfigurasi
│   ├── config.ts         # Konfigurasi website & medsos
│   ├── dummy-data.ts     # Data dummy untuk keperluan dev frontend
│   ├── utils.ts          # Utility functions (cn, formatRupiah, dll)
│   └── wa-link.ts        # Generator link WhatsApp dinamis
├── public/               # Asset statis (logo, gambar, dll)
└── types/                # Definisi TypeScript Interfaces
```

---

<div align="center">
  <p><i>Dibuat dengan ❤️ untuk kemajuan UMKM dan Digitalisasi Desa Huntap Sumbermujur.</i></p>
</div>
