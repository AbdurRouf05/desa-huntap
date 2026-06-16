import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Heart } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center transition-transform hover:scale-105">
                <Image src="/logo-lumajang.png" alt="Logo Lumajang" width={40} height={40} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Desa Sumbermujur</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                  Huntap · Lumajang
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Website resmi Desa Huntap Sumbermujur, Kecamatan Candipuro,
              Kabupaten Lumajang, Jawa Timur. Portal informasi dan marketplace
              produk UMKM desa.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Menu
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Layanan
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/layanan"
                  className="text-sm text-slate-400 hover:text-primary transition-colors"
                >
                  Surat Keterangan
                </Link>
              </li>
              <li>
                <Link
                  href="/layanan"
                  className="text-sm text-slate-400 hover:text-primary transition-colors"
                >
                  Administrasi Kependudukan
                </Link>
              </li>
              <li>
                <Link
                  href="/toko"
                  className="text-sm text-slate-400 hover:text-primary transition-colors"
                >
                  Toko UMKM
                </Link>
              </li>
              <li>
                <Link
                  href="/kontak"
                  className="text-sm text-slate-400 hover:text-primary transition-colors"
                >
                  Pengaduan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">
                  {siteConfig.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-slate-400">
                  {siteConfig.phone}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-slate-400">
                  {siteConfig.email}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} Desa Huntap Sumbermujur. Hak cipta dilindungi.
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            Dibuat dengan <Heart className="w-3 h-3 text-red-400 fill-red-400" /> untuk Desa Sumbermujur
          </p>
        </div>
      </div>
    </footer>
  );
}
