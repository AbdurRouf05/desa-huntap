import { Product, NewsArticle, GalleryItem, Perangkat, DesaProfile, ServiceItem, UmkmStore, MuseumItem, NewsCategory } from "@/types";

// ============================================================
// PROFIL DESA
// ============================================================
export const desaProfile: any = {
  kepala_desa: "H. Ahmad Subairi",
  penduduk: 3254,
  luas_wilayah: "12,5 km²",
  jumlah_rt: 24,
  jumlah_rw: 6,
  sejarah:
    "Desa Huntap Sumbermujur merupakan hunian tetap yang dibangun pasca erupsi Gunung Semeru pada tahun 2021. Desa ini awalnya merupakan bagian dari relokasi warga terdampak bencana alam yang kemudian berkembang menjadi komunitas mandiri dengan semangat gotong royong yang tinggi. Sumber daya alam yang melimpah, terutama dari sektor pertanian dan perkebunan, menjadi penopang utama perekonomian warga.",
  visi: "Mewujudkan Desa Huntap Sumbermujur yang mandiri, sejahtera, dan berbudaya melalui pemberdayaan masyarakat dan pengelolaan sumber daya alam yang berkelanjutan.",
  misi: [
    "Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan",
    "Mengembangkan potensi ekonomi lokal berbasis UMKM dan pertanian",
    "Membangun infrastruktur desa yang memadai dan berkelanjutan",
    "Memperkuat tata kelola pemerintahan desa yang transparan dan akuntabel",
    "Melestarikan nilai-nilai budaya dan kearifan lokal masyarakat",
  ],
  potensi: [
    "Pertanian padi dan palawija",
    "Perkebunan kopi robusta",
    "Kerajinan tangan anyaman bambu",
    "Wisata alam lereng Semeru",
    "Produk olahan makanan khas",
  ],
};

// ============================================================
// PERANGKAT DESA
// ============================================================
export const perangkatDesa: any[] = [
  { id: "1", name: "H. Ahmad Subairi", position: "Kepala Desa", photo: "/images/perangkat/kepala-desa.jpg" },
  { id: "2", name: "Siti Aminah, S.Pd", position: "Sekretaris Desa", photo: "/images/perangkat/sekdes.jpg" },
  { id: "3", name: "Bambang Sutrisno", position: "Kaur Keuangan", photo: "/images/perangkat/kaur-keuangan.jpg" },
  { id: "4", name: "Dewi Lestari, A.Md", position: "Kaur Perencanaan", photo: "/images/perangkat/kaur-perencanaan.jpg" },
  { id: "5", name: "Hadi Purnomo", position: "Kasi Pemerintahan", photo: "/images/perangkat/kasi-pemerintahan.jpg" },
  { id: "6", name: "Sri Wahyuni", position: "Kasi Kesejahteraan", photo: "/images/perangkat/kasi-kesejahteraan.jpg" },
  { id: "7", name: "Agus Santoso", position: "Kasi Pelayanan", photo: "/images/perangkat/kasi-pelayanan.jpg" },
  { id: "8", name: "Rina Fitriani", position: "Kaur Tata Usaha & Umum", photo: "/images/perangkat/kaur-tu.jpg" },
];

// ============================================================
// UMKM STORES
// ============================================================
export const dummyUmkmStores: any[] = [
  {
    id: "umkm-001",
    name: "Warung Pak Suroso",
    ownerName: "Pak Suroso",
    phone: "6281234567891",
    address: "RT 02 RW 01, Desa Huntap Sumbermujur",
    description: "Menjual berbagai hasil bumi dan olahan kopi robusta asli lereng Semeru.",
    isVerified: true,
  },
  {
    id: "umkm-002",
    name: "Camilan Bu Maryam",
    ownerName: "Bu Maryam",
    phone: "6281234567892",
    address: "RT 05 RW 02, Desa Huntap Sumbermujur",
    description: "Produsen camilan khas Lumajang yang renyah dan gurih.",
    isVerified: true,
  },
  {
    id: "umkm-003",
    name: "Kerajinan Bambu Pak Darmo",
    ownerName: "Pak Darmo",
    phone: "6281234567893",
    address: "RT 08 RW 02, Desa Huntap Sumbermujur",
    description: "Pusat kerajinan anyaman bambu handmade berkualitas.",
    isVerified: true,
  },
  {
    id: "umkm-004",
    name: "Madu Hutan Pak Yanto",
    ownerName: "Pak Yanto",
    phone: "6281234567894",
    address: "RT 12 RW 03, Desa Huntap Sumbermujur",
    description: "Menyediakan madu murni langsung dari hutan lereng Semeru.",
    isVerified: true,
  },
  {
    id: "umkm-005",
    name: "Dapur Bu Sulastri",
    ownerName: "Bu Sulastri",
    phone: "6281234567895",
    address: "RT 15 RW 04, Desa Huntap Sumbermujur",
    description: "Spesialis bumbu pecel dan makanan siap saji tradisional.",
    isVerified: true,
  },
  {
    id: "umkm-006",
    name: "Gula Aren Pak Taufik",
    ownerName: "Pak Taufik",
    phone: "6281234567896",
    address: "RT 18 RW 05, Desa Huntap Sumbermujur",
    description: "Produksi gula merah aren organik tanpa pengawet.",
    isVerified: true,
  },
  {
    id: "umkm-007",
    name: "Rajut Indah Bu Endah",
    ownerName: "Bu Endah",
    phone: "6281234567897",
    address: "RT 20 RW 05, Desa Huntap Sumbermujur",
    description: "Kerajinan tas dan aksesoris rajut handmade eksklusif.",
    isVerified: false,
  },
  {
    id: "umkm-008",
    name: "Kelompok Tani Makmur",
    ownerName: "Kelompok Tani Makmur",
    phone: "6281234567898",
    address: "RT 22 RW 06, Desa Huntap Sumbermujur",
    description: "Kelompok tani penyedia beras organik dan hasil panen lokal.",
    isVerified: true,
  },
];

// ============================================================
// PRODUK UMKM
// ============================================================
export const dummyProducts: any[] = [
  {
    id: "prod-001",
    name: "Kopi Robusta Premium Semeru",
    slug: "kopi-robusta-premium-semeru",
    description: "Kopi robusta pilihan dari lereng Gunung Semeru. Dipetik tangan dan diolah secara tradisional. Rasa khas dengan aroma yang kuat dan cita rasa earthy yang nikmat. Tersedia dalam kemasan 250gr dan 500gr.",
    price: 45000,
    discountPrice: 38000,
    category: "Minuman",
    images: ["https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&q=80", "/images/produk/kopi-2.jpg"],
    stock: 50,
    isFeatured: true,
    sellerId: "umkm-001",
    sellerName: "Pak Suroso",
    sellerPhone: "6281234567891",
    createdAt: "2026-05-01",
  },
  {
    id: "prod-002",
    name: "Keripik Singkong Pedas Manis",
    slug: "keripik-singkong-pedas-manis",
    description: "Keripik singkong renyah dengan bumbu pedas manis khas Lumajang. Dibuat dari singkong pilihan dan digoreng hingga renyah sempurna. Cocok untuk camilan sehari-hari atau oleh-oleh.",
    price: 15000,
    category: "Makanan",
    images: ["https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=800&q=80"],
    stock: 100,
    isFeatured: true,
    sellerId: "umkm-002",
    sellerName: "Bu Maryam",
    sellerPhone: "6281234567892",
    createdAt: "2026-05-05",
  },
  {
    id: "prod-003",
    name: "Anyaman Bambu Vas Bunga",
    slug: "anyaman-bambu-vas-bunga",
    description: "Vas bunga cantik dari anyaman bambu buatan tangan pengrajin lokal desa Sumbermujur. Setiap produk dibuat secara handmade sehingga memiliki keunikan tersendiri.",
    price: 75000,
    category: "Kerajinan",
    images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"],
    stock: 20,
    isFeatured: true,
    sellerId: "umkm-003",
    sellerName: "Pak Darmo",
    sellerPhone: "6281234567893",
    createdAt: "2026-05-10",
  },
  {
    id: "prod-004",
    name: "Madu Hutan Semeru Murni",
    slug: "madu-hutan-semeru-murni",
    description: "Madu hutan asli dari lebah liar di kawasan lereng Semeru. Tanpa campuran dan tanpa pengawet. Khasiat alami untuk kesehatan tubuh. Kemasan botol kaca 350ml.",
    price: 85000,
    category: "Minuman",
    images: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80"],
    stock: 30,
    isFeatured: true,
    sellerId: "umkm-004",
    sellerName: "Pak Yanto",
    sellerPhone: "6281234567894",
    createdAt: "2026-05-12",
  },
  {
    id: "prod-005",
    name: "Sambal Pecel Khas Lumajang",
    slug: "sambal-pecel-khas-lumajang",
    description: "Sambal pecel tradisional khas Lumajang. Bumbu kacang pilihan yang diracik dengan resep turun-temurun. Praktis dan siap saji, tinggal seduh air panas.",
    price: 20000,
    category: "Makanan",
    images: ["https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=800&q=80"],
    stock: 80,
    isFeatured: false,
    sellerId: "umkm-005",
    sellerName: "Bu Sulastri",
    sellerPhone: "6281234567895",
    createdAt: "2026-05-15",
  },
  {
    id: "prod-006",
    name: "Gula Merah Aren Organik",
    slug: "gula-merah-aren-organik",
    description: "Gula merah dari nira pohon aren pilihan. Proses pembuatan tradisional tanpa bahan kimia. Cocok untuk bumbu masakan dan minuman tradisional. Kemasan 500gr.",
    price: 35000,
    category: "Makanan",
    images: ["https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&q=80"],
    stock: 60,
    isFeatured: true,
    sellerId: "umkm-006",
    sellerName: "Pak Taufik",
    sellerPhone: "6281234567896",
    createdAt: "2026-05-18",
  },
  {
    id: "prod-007",
    name: "Tas Rajut Handmade",
    slug: "tas-rajut-handmade",
    description: "Tas rajut cantik buatan ibu-ibu PKK Desa Sumbermujur. Bahan berkualitas tinggi dengan desain modern. Tersedia dalam berbagai warna dan motif.",
    price: 120000,
    discountPrice: 95000,
    category: "Kerajinan",
    images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"],
    stock: 15,
    isFeatured: false,
    sellerId: "umkm-007",
    sellerName: "Bu Endah",
    sellerPhone: "6281234567897",
    createdAt: "2026-05-20",
  },
  {
    id: "prod-008",
    name: "Beras Organik Lokal",
    slug: "beras-organik-lokal",
    description: "Beras organik dari sawah-sawah Desa Sumbermujur. Ditanam tanpa pestisida kimia, menggunakan pupuk organik alami. Pulen dan wangi. Kemasan 5kg.",
    price: 65000,
    category: "Pertanian",
    images: ["https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=800&q=80"],
    stock: 40,
    isFeatured: true,
    sellerId: "umkm-008",
    sellerName: "Kelompok Tani Makmur",
    sellerPhone: "6281234567898",
    createdAt: "2026-05-22",
  },
];

// ============================================================
// BERITA & ARTIKEL
// ============================================================

export const dummyNewsCategories: any[] = [
  { id: "cat-1", slug: "kegiatan", name: "Kegiatan Desa", isActive: true },
  { id: "cat-2", slug: "berita", name: "Berita", isActive: true },
  { id: "cat-3", slug: "pengumuman", name: "Pengumuman", isActive: true },
  { id: "cat-4", slug: "rahasia", name: "Internal", isActive: false },
];

// ============================================================
// BERITA & PENGUMUMAN
// ============================================================
export const dummyNews: any[] = [
  {
    id: "news-000",
    title: "Semarak Tradisi Grebeg Suro dan Ruwat Air Hutan Bambu Sumbermujur",
    slug: "tradisi-grebeg-suro-sumbermujur",
    excerpt: "Masyarakat Desa Sumbermujur kembali menggelar tradisi tahunan Grebeg Suro dan Ruwat Air di Hutan Bambu sebagai wujud syukur atas hasil panen dan kelimpahan air.",
    content: `<p>Desa Sumbermujur, Kecamatan Candipuro, Kabupaten Lumajang, kembali semarak dengan digelarnya tradisi tahunan <strong>Grebeg Suro dan Ruwat Air</strong> dalam rangka menyambut Tahun Baru Islam 1 Muharram (Suro). Upacara adat ini dipusatkan di kawasan wisata ekologi Hutan Bambu Sumbermujur yang memiliki luas sekitar 14 hektar.</p>
<p>Tradisi ini merupakan ungkapan rasa syukur masyarakat setempat atas kelimpahan hasil panen serta pelestarian sumber mata air yang selama ini menjadi penopang utama kehidupan warga, baik untuk air minum maupun pengairan sawah.</p>
<p><strong>Prosesi Arak-arakan Gunungan Hasil Bumi</strong></p>
<p>Dalam prosesi tersebut, puluhan 'Gunungan' yang berisi hasil bumi seperti padi, sayur-mayur, buah-buahan, dan umbi-umbian diarak keliling desa menuju sumber mata air. Iring-iringan ini disambut antusias oleh warga dan wisatawan, serta diiringi oleh kesenian tradisional khas Lumajang, seperti Tari Oleng Among Tirto Joyo.</p>
<p>Puncak ritual ditandai dengan pembacaan doa bersama yang dipimpin oleh para sesepuh desa, dilanjutkan dengan prosesi simbolik penanaman kepala sapi di dekat sumber air. Hal ini dimaknai sebagai doa penolak bala agar masyarakat Sumbermujur senantiasa dijauhkan dari marabahaya.</p>
<p>Seiring berjalannya waktu, Grebeg Suro Sumbermujur tidak hanya sekadar ritual spiritual, namun telah bertransformasi menjadi salah satu agenda wisata budaya unggulan di Kabupaten Lumajang yang sukses menggerakkan roda ekonomi UMKM warga sekitar.</p>`,
    thumbnail: "/1.jpeg",
    category: "kegiatan",
    author: "Admin Budaya",
    createdAt: "2026-06-15",
    isPublished: true,
    views: 125,
  },
  {
    id: "news-001",
    title: "Peresmian Jalan Desa Huntap Sumbermujur oleh Bupati Lumajang",
    slug: "peresmian-jalan-desa-huntap",
    excerpt: "Bupati Lumajang meresmikan pembangunan jalan utama desa yang menghubungkan kawasan huntap dengan jalan kabupaten.",
    content: `<p>Bupati Lumajang, H. Thoriq Faisol, meresmikan pembangunan jalan utama Desa Huntap Sumbermujur pada Senin (15/4/2026). Jalan sepanjang 2,5 kilometer ini menghubungkan kawasan hunian tetap (huntap) dengan jalan kabupaten.</p>
<p>Dalam sambutannya, Bupati menyampaikan apresiasi atas semangat gotong royong warga dalam membangun desa. "Pembangunan ini merupakan bukti komitmen pemerintah daerah dalam memulihkan kehidupan masyarakat terdampak erupsi Gunung Semeru," ujarnya.</p>
<p>Kepala Desa H. Ahmad Subairi menyampaikan terima kasih atas dukungan pemerintah kabupaten. "Dengan adanya jalan ini, akses warga menuju pusat kota akan semakin mudah, terutama untuk distribusi hasil pertanian dan produk UMKM warga," jelasnya.</p>`,
    thumbnail: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80",
    category: "berita",
    author: "Admin Desa",
    createdAt: "2026-04-15",
    isPublished: true,
    views: 89,
  },
  {
    id: "news-002",
    title: "Pelatihan Kewirausahaan UMKM untuk Warga Desa",
    slug: "pelatihan-kewirausahaan-umkm",
    excerpt: "Dinas Koperasi dan UMKM Kabupaten Lumajang mengadakan pelatihan kewirausahaan bagi 50 warga desa.",
    content: `<p>Sebanyak 50 warga Desa Huntap Sumbermujur mengikuti pelatihan kewirausahaan yang diselenggarakan oleh Dinas Koperasi dan UMKM Kabupaten Lumajang pada 20-22 Maret 2026.</p>
<p>Pelatihan ini mencakup materi tentang pengemasan produk, pemasaran digital, dan pengelolaan keuangan usaha kecil. Para peserta juga mendapatkan bantuan modal usaha berupa peralatan produksi.</p>
<p>"Kami berharap pelatihan ini bisa meningkatkan kualitas produk UMKM warga dan membuka pasar yang lebih luas," kata Kepala Dinas Koperasi Kabupaten Lumajang.</p>`,
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    category: "kegiatan",
    author: "Admin Desa",
    createdAt: "2026-03-22",
    isPublished: true,
    views: 210,
  },
  {
    id: "news-003",
    title: "Pengumuman: Jadwal Posyandu Bulan Juni 2026",
    slug: "jadwal-posyandu-juni-2026",
    excerpt: "Posyandu Desa Huntap Sumbermujur akan dilaksanakan setiap hari Kamis di Balai Desa.",
    content: `<p>Diberitahukan kepada seluruh warga Desa Huntap Sumbermujur bahwa kegiatan Posyandu untuk bulan Juni 2026 akan dilaksanakan setiap hari Kamis mulai pukul 08.00 - 12.00 WIB di Balai Desa.</p>
<p><strong>Jadwal:</strong></p>
<ul>
<li>Kamis, 5 Juni 2026 - RT 01-04</li>
<li>Kamis, 12 Juni 2026 - RT 05-08</li>
<li>Kamis, 19 Juni 2026 - RT 09-12</li>
<li>Kamis, 26 Juni 2026 - RT 13-16</li>
</ul>
<p>Harap membawa buku KIA dan kartu identitas. Bagi balita dan ibu hamil, pemeriksaan gratis.</p>`,
    thumbnail: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
    category: "pengumuman",
    author: "Bidan Desa",
    createdAt: "2026-05-28",
    isPublished: true,
    views: 340,
  },
  {
    id: "news-004",
    title: "Festival Budaya Desa Huntap Sumbermujur Sukses Digelar",
    slug: "festival-budaya-desa-huntap",
    excerpt: "Festival budaya pertama di desa huntap berhasil menarik ratusan pengunjung dari berbagai daerah.",
    content: `<p>Festival Budaya Desa Huntap Sumbermujur yang digelar pada 10-11 Mei 2026 sukses menarik perhatian ratusan pengunjung. Acara ini menampilkan berbagai kesenian tradisional, pameran produk UMKM, dan kuliner khas Lumajang.</p>
<p>Beberapa atraksi yang ditampilkan antara lain tari Jaranan, pertunjukan musik tradisional gamelan, serta lomba masak makanan tradisional. Para pengunjung juga bisa mencoba langsung membuat kerajinan anyaman bambu.</p>`,
    thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    category: "kegiatan",
    author: "Admin Desa",
    createdAt: "2026-05-12",
    isPublished: true,
    views: 450,
  },
  {
    id: "news-005",
    title: "Pembagian Bantuan Sosial Tahap II Tahun 2026",
    slug: "pembagian-bansos-tahap-2-2026",
    excerpt: "Pemerintah desa menyalurkan bantuan sosial tahap II kepada 120 keluarga penerima manfaat.",
    content: `<p>Pemerintah Desa Huntap Sumbermujur telah menyalurkan bantuan sosial tahap II tahun 2026 kepada 120 keluarga penerima manfaat (KPM) pada Rabu (25/5/2026).</p>
<p>Bantuan berupa beras 10 kg, minyak goreng 2 liter, dan gula pasir 2 kg per KPM. Penyaluran dilakukan secara transparan dengan disaksikan oleh perangkat desa, BPD, dan tokoh masyarakat.</p>`,
    thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    category: "berita",
    author: "Admin Desa",
    createdAt: "2026-05-25",
    isPublished: true,
    views: 75,
  },
  {
    id: "news-006",
    title: "Gotong Royong Pembersihan Saluran Irigasi Desa",
    slug: "gotong-royong-irigasi-desa",
    excerpt: "Warga desa bersama-sama membersihkan saluran irigasi menjelang musim tanam padi.",
    content: `<p>Ratusan warga Desa Huntap Sumbermujur turut serta dalam kegiatan gotong royong membersihkan saluran irigasi pada Minggu (2/6/2026). Kegiatan ini dilakukan sebagai persiapan menjelang musim tanam padi periode Juni-November 2026.</p>
<p>Saluran irigasi sepanjang 3 kilometer dibersihkan dari sedimentasi dan sampah yang menghambat aliran air. Kepala Desa berharap dengan saluran irigasi yang bersih, produktivitas pertanian warga dapat meningkat.</p>`,
    thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    category: "kegiatan",
    author: "Admin Desa",
    createdAt: "2026-06-02",
    isPublished: true,
    views: 52,
  },
];

// ============================================================
// GALERI
// ============================================================
export const dummyGallery: any[] = [
  { id: "gal-001", title: "Pemandangan Sawah Desa", imageUrl: "/images/galeri/sawah.jpg", album: "Wisata", createdAt: "2026-04-01" },
  { id: "gal-002", title: "Balai Desa Sumbermujur", imageUrl: "/images/galeri/balai-desa.jpg", album: "Infrastruktur", createdAt: "2026-04-05" },
  { id: "gal-003", title: "Kegiatan Posyandu", imageUrl: "/images/galeri/posyandu.jpg", album: "Kegiatan", createdAt: "2026-04-10" },
  { id: "gal-004", title: "Lereng Gunung Semeru", imageUrl: "/images/galeri/semeru.jpg", album: "Wisata", createdAt: "2026-04-15" },
  { id: "gal-005", title: "Festival Budaya Desa", imageUrl: "/images/galeri/festival.jpg", album: "Kegiatan", createdAt: "2026-05-10" },
  { id: "gal-006", title: "Produk UMKM Warga", imageUrl: "/images/galeri/umkm.jpg", album: "UMKM", createdAt: "2026-05-12" },
  { id: "gal-007", title: "Gotong Royong Warga", imageUrl: "/images/galeri/gotong-royong.jpg", album: "Kegiatan", createdAt: "2026-05-20" },
  { id: "gal-008", title: "Peresmian Jalan Desa", imageUrl: "/images/galeri/peresmian.jpg", album: "Infrastruktur", createdAt: "2026-04-15" },
  { id: "gal-009", title: "Kebun Kopi Robusta", imageUrl: "/images/galeri/kopi.jpg", album: "Wisata", createdAt: "2026-05-25" },
];

// ============================================================
// LAYANAN PUBLIK
// ============================================================
export const layananPublik: any[] = [
  {
    id: "lay-001",
    title: "Surat Keterangan Domisili",
    description: "Surat keterangan tempat tinggal untuk keperluan administrasi.",
    requirements: ["Fotokopi KTP", "Fotokopi KK", "Surat pengantar RT/RW", "Pas foto 3x4 (2 lembar)"],
    icon: "FileText",
  },
  {
    id: "lay-002",
    title: "Surat Keterangan Tidak Mampu (SKTM)",
    description: "Surat keterangan bagi warga yang membutuhkan bantuan biaya pendidikan atau kesehatan.",
    requirements: ["Fotokopi KTP", "Fotokopi KK", "Surat pengantar RT/RW", "Surat pernyataan tidak mampu"],
    icon: "Heart",
  },
  {
    id: "lay-003",
    title: "Surat Pengantar KTP/KK",
    description: "Surat pengantar untuk pembuatan atau perpanjangan KTP dan KK di Disdukcapil.",
    requirements: ["KTP lama (jika perpanjangan)", "Fotokopi KK", "Surat pengantar RT/RW"],
    icon: "CreditCard",
  },
  {
    id: "lay-004",
    title: "Surat Keterangan Usaha",
    description: "Surat keterangan untuk keperluan perizinan usaha mikro dan kecil.",
    requirements: ["Fotokopi KTP", "Fotokopi KK", "Deskripsi usaha", "Surat pengantar RT/RW"],
    icon: "Briefcase",
  },
  {
    id: "lay-005",
    title: "Surat Keterangan Pindah",
    description: "Surat keterangan untuk warga yang akan pindah domisili ke daerah lain.",
    requirements: ["Fotokopi KTP", "Fotokopi KK", "Surat pengantar RT/RW", "Alasan kepindahan"],
    icon: "Truck",
  },
  {
    id: "lay-006",
    title: "Surat Pengantar Nikah (N1, N2, N4)",
    description: "Surat pengantar untuk keperluan pendaftaran pernikahan di KUA.",
    requirements: ["Fotokopi KTP", "Fotokopi KK", "Fotokopi Akta Kelahiran", "Surat pengantar RT/RW", "Pas foto 2x3 dan 4x6"],
    icon: "Users",
  },
];

export const productCategories = [
  "Semua",
  "Makanan",
  "Minuman",
  "Kerajinan",
  "Pertanian",
];

// ============================================================
// MUSEUM DESA
// ============================================================
export const dummyMuseumItems: any[] = [
  {
    id: "museum-001",
    name: "Sepeda Onthel Saksi Erupsi",
    slug: "sepeda-onthel-saksi-erupsi",
    image: "https://images.unsplash.com/photo-1579737181057-797de3f1395f?w=800&q=80",
    era: "Erupsi Semeru 2021",
    condition: "Sebagian Berkarat & Tertutup Abu",
    location: "Zona Pameran A",
    description: "Sepeda onthel ini merupakan salah satu dari sedikit barang yang berhasil dievakuasi dari Dusun Curah Kobokan saat erupsi Gunung Semeru pada Desember 2021. Kondisinya yang tertutup abu vulkanik tebal dibiarkan seperti aslinya sebagai pengingat akan dahsyatnya peristiwa alam tersebut. Pemilik sepeda ini, Bapak Saimun, biasa menggunakannya untuk pergi ke sawah setiap pagi.",
    createdAt: "2026-06-20"
  },
  {
    id: "museum-002",
    name: "Lesung Batu Kuno Sumbermujur",
    slug: "lesung-batu-kuno-sumbermujur",
    image: "https://images.unsplash.com/photo-1605634563346-601d4aef99e0?w=800&q=80",
    era: "Era Kolonial Belanda",
    condition: "Utuh",
    location: "Zona Sejarah",
    description: "Lesung batu kuno ini ditemukan oleh warga saat melakukan penggalian pondasi untuk hunian tetap. Lesung ini diperkirakan berasal dari era kolonial dan dulunya digunakan oleh masyarakat setempat untuk menumbuk padi dan palawija. Benda ini melambangkan ketahanan dan sejarah panjang pertanian di kawasan lereng Semeru sebelum terjadinya letusan-letusan modern.",
    createdAt: "2026-06-21"
  },
  {
    id: "museum-003",
    name: "Kentongan Kayu Nangka",
    slug: "kentongan-kayu-nangka",
    image: "https://images.unsplash.com/photo-1549488344-c65d95394ef3?w=800&q=80",
    era: "Tahun 1980-an",
    condition: "Kayu Sedikit Retak",
    location: "Zona Interaktif",
    description: "Kentongan ini pernah menjadi alat komunikasi utama warga desa untuk mengabarkan datangnya bahaya, termasuk peringatan dini lahar dingin Semeru di era 80-an. Terbuat dari kayu nangka pilihan, suaranya diklaim bisa terdengar hingga radius 2 kilometer jika dipukul dengan sandi tertentu. Saat ini, kentongan ini dipajang agar generasi muda tahu bagaimana sistem peringatan dini tradisional bekerja.",
    createdAt: "2026-06-22"
  }
];
