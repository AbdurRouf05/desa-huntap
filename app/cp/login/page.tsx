"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";
import { loginAdmin } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await loginAdmin(email, password);
    
    if (result.success) {
      // Force hard navigation to reload cookies state
      window.location.href = "/";
    } else {
      setError(result.error || "Gagal login, periksa kembali email dan password Anda.");
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
          Control Panel
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Login Admin Desa Huntap Sumbermujur
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Alamat Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue="admin@desa-sumbermujur.id"
                  required
                  className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-slate-300 rounded-xl h-12 bg-slate-50 border"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Kata Sandi
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
                  className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-slate-300 rounded-xl h-12 bg-slate-50 border"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Masuk..." : "Masuk ke Panel"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
