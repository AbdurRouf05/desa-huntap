"use client";

import { useState } from "react";
import TokoSidebar from "@/components/toko/sidebar";
import TokoHeader from "@/components/toko/header";
import { ToastProvider } from "@/components/ui/Toast";

export default function TokoDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
        {/* Sidebar */}
        <TokoSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
          <TokoHeader onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
