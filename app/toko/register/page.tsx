"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Store, User, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { registerTokoPublic } from "@/lib/actions/register.actions";
import { loginToko } from "@/lib/auth";

export default function TokoRegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    const result = await registerTokoPublic(formData);
    
    if (result.success) {
      // Auto login
      const loginResult = await loginToko(email, password);
      if (loginResult.success) {
        window.location.href = "/toko/dashboard";
      } else {
        router.push("/toko/login");
      }
    } else {
      setError(result.error || "Gagal mendaftar, periksa kembali data Anda.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex items-center justify-center">
            <Image 
              src="/logo-lumajang-2.png" 
              alt="Logo Lumajang" 
              width={48} 
              height={48}
              className="object-contain"
            />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Daftar Mitra Baru
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Bergabung menjadi Mitra UMKM Desa Huntap
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-2xl sm:px-10">
          <form className="space-y-5" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Nama Toko / UMKM <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Contoh: Toko Sejahtera"
                    required
                    className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-slate-300 rounded-xl h-11 bg-slate-50 border"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="owner_name" className="block text-sm font-medium text-slate-700">
                  Nama Pemilik <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="owner_name"
                    name="owner_name"
                    type="text"
                    placeholder="Nama Lengkap Anda"
                    required
                    className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-slate-300 rounded-xl h-11 bg-slate-50 border"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Alamat Email <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email.anda@gmail.com"
                  required
                  className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-slate-300 rounded-xl h-11 bg-slate-50 border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Kata Sandi <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-slate-300 rounded-xl h-11 bg-slate-50 border"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="passwordConfirm" className="block text-sm font-medium text-slate-700">
                  Konfirmasi Sandi <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    required
                    minLength={8}
                    className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-slate-300 rounded-xl h-11 bg-slate-50 border"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Awali dengan 62..."
                    required
                    className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-slate-300 rounded-xl h-11 bg-slate-50 border"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-slate-700">
                  Alamat Lengkap <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Nama dusun, RT/RW..."
                    required
                    className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-slate-300 rounded-xl h-11 bg-slate-50 border"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Memproses..." : "Daftar Menjadi Mitra"}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-slate-600">
                Sudah punya akun?{' '}
                <Link href="/toko/login" className="font-semibold text-primary hover:text-primary-dark">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
