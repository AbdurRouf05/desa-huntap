<div align="center">
  <img src="public/logo-lumajang-2.png" alt="Logo Lumajang" width="120"/>

  # Desa Huntap Sumbermujur
  
  **Platform Web Informasi dan Marketplace UMKM Terpadu untuk Kawasan Huntap (Hunian Tetap) Sumbermujur, Kecamatan Candipuro, Kabupaten Lumajang.**

  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.9-007ACC?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
    <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm-10.29-F69220?style=for-the-badge&logo=pnpm" alt="pnpm" /></a>
  </p>
</div>

<br />

> **Pemberitahuan:** Proyek ini merupakan inisiatif digitalisasi kawasan Hunian Tetap Sumbermujur pasca-erupsi Semeru, bertujuan untuk meningkatkan ekonomi masyarakat melalui teknologi yang inklusif.

<br />

## Fitur Unggulan

- **Portal Informasi Desa**  
  Menampilkan berita terbaru, pengumuman jadwal kegiatan (posyandu, dsb), dan profil lengkap desa.

- **E-Commerce UMKM Lokal**  
  Marketplace untuk produk asli buatan warga (kopi Semeru, rajutan, dsb) dengan sistem keranjang belanja yang praktis.

- **WhatsApp Checkout & Layanan**  
  Terintegrasi penuh dengan WhatsApp. Pembelian barang dan layanan surat-menyurat akan dikonversi menjadi pesan otomatis kepada Admin.

- **Peta & Transparansi Data**  
  Profil desa, data perangkat, visi misi, serta peta terintegrasi via Google Maps.

- **Desain Modern & Responsif**  
  Dibangun dengan Tailwind CSS untuk memastikan pengalaman pengguna yang super mulus, responsif di handphone maupun PC.

<br />

## Teknologi yang Digunakan

Proyek ini dibangun menggunakan arsitektur web modern yang berfokus pada kecepatan dan performa:

1. **[Next.js (App Router)](https://nextjs.org/)** - Framework React utama untuk rendering yang cepat.
2. **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first framework untuk styling antarmuka.
3. **[TypeScript](https://www.typescriptlang.org/)** - Menjaga keamanan tipe data (Type safety).
4. **[Lucide React](https://lucide.dev/)** - Kumpulan ikon vektor minimalis.
5. **Context API & LocalStorage** - Manajemen status khusus untuk fitur keranjang belanja.

<br />

## Instalasi & Pengembangan Lokal

Ikuti panduan berikut jika Anda ingin menjalankan proyek secara lokal:

**1. Clone Repository**
```bash
git clone https://github.com/AbdurRouf05/desa-huntap.git
cd desa-huntap
```

**2. Install Dependencies (menggunakan `pnpm`)**
```bash
pnpm install
```

**3. Jalankan Development Server**
```bash
pnpm dev
```
Akses server lokal Anda di [http://localhost:3000](http://localhost:3000).

<br />

## Struktur Direktori Utama

```text
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
│   ├── dummy-data.ts     # Data dummy frontend
│   ├── utils.ts          # Helper functions (cn, formatRupiah, dll)
│   └── wa-link.ts        # Generator link WhatsApp
├── public/               # Asset statis (logo, gambar, dll)
└── types/                # Definisi TypeScript Interfaces
```

<br />

<div align="center">
  <img src="https://img.shields.io/badge/Dibuat_Untuk-Desa_Sumbermujur-10B981?style=for-the-badge" alt="Dibuat Untuk Sumbermujur" />
</div>
