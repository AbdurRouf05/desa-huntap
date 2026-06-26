"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Upload, Save, Eye, Printer, QrCode } from "lucide-react";
import { dummyMuseumItems } from "@/lib/dummy-data";
import { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";

export default function EditMuseumItemPage() {
  const params = useParams();
  const itemId = params.id as string;
  const item = dummyMuseumItems.find((n) => n.id === itemId);
  
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item && typeof window !== 'undefined') {
        // Construct the absolute URL for the QR code
        const baseUrl = window.location.origin;
        setQrValue(`${baseUrl}/museum/${item.slug}`);
    }
  }, [item]);

  const handlePrintQR = () => {
    if (qrRef.current) {
        const printWindow = window.open('', '', 'width=600,height=600');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print QR Code - ${item?.name}</title>
                        <style>
                            body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                            .card { border: 2px solid #000; padding: 2rem; border-radius: 1rem; text-align: center; }
                            h2 { margin-bottom: 0.5rem; }
                            p { margin-top: 0; color: #555; margin-bottom: 2rem; }
                        </style>
                    </head>
                    <body>
                        <div class="card">
                            <h2>${item?.name}</h2>
                            <p>Desa Huntap Sumbermujur</p>
                            ${qrRef.current.innerHTML}
                            <p style="margin-top: 2rem; font-size: 0.8rem; font-weight: bold;">Scan untuk membaca sejarahnya</p>
                        </div>
                        <script>
                            window.onload = () => { window.print(); window.close(); }
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        }
    }
  };

  if (!item) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Koleksi Tidak Ditemukan</h2>
        <Link href="/cp/museum" className="text-primary hover:underline mt-4 inline-block">Kembali ke Daftar Koleksi</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <Link 
            href="/cp/museum"
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            >
            <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Koleksi Museum</h1>
            <p className="text-slate-500 mt-1">Perbarui data artefak dan cetak QR Code</p>
            </div>
        </div>
        <button 
            onClick={handlePrintQR}
            className="px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm"
        >
            <Printer className="w-4 h-4" />
            Cetak Label QR
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri: Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 space-y-6">
                
                {/* Nama Barang */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nama Koleksi <span className="text-red-500">*</span></label>
                    <input 
                    type="text" 
                    defaultValue={item.name}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Era */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Era / Tahun <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            defaultValue={item.era}
                            placeholder="Contoh: Erupsi Semeru 2021"
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                        />
                    </div>

                    {/* Kondisi */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Kondisi Barang <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            defaultValue={item.condition}
                            placeholder="Contoh: Sebagian Berkarat"
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800"
                        />
                    </div>
                </div>

                {/* Deskripsi */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Cerita / Sejarah (Deskripsi) <span className="text-red-500">*</span></label>
                    <textarea 
                        rows={8}
                        defaultValue={item.description}
                        placeholder="Ceritakan sejarah menarik di balik barang ini..."
                        className="w-full p-4 border border-slate-300 rounded-xl outline-none text-slate-800 resize-y focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                </div>

            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <Link 
                    href={`/museum/${item.slug}`}
                    target="_blank"
                    className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                    <Eye className="w-4 h-4" />
                    Preview Publik
                </Link>
                <button className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm">
                    <Save className="w-4 h-4" />
                    Simpan Perubahan
                </button>
            </div>
          </div>

          {/* Kolom Kanan: Foto & QR Code */}
          <div className="space-y-6">
              {/* QR Code Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4 text-indigo-600 font-bold">
                      <QrCode className="w-5 h-5" />
                      <h3>Label QR Code</h3>
                  </div>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center mb-4">
                      {qrValue ? (
                          <div ref={qrRef} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                              <QRCode value={qrValue} size={150} />
                          </div>
                      ) : (
                          <div className="w-[150px] h-[150px] bg-slate-200 animate-pulse rounded-xl" />
                      )}
                  </div>
                  
                  <p className="text-xs text-slate-500">
                      Cetak QR Code ini dan tempelkan di dekat artefak fisik di museum agar pengunjung dapat memindainya.
                  </p>
              </div>

              {/* Thumbnail */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <label className="text-sm font-bold text-slate-700 block mb-4">Foto Artefak</label>
                <label htmlFor="artefak-upload" className="border-2 border-dashed border-slate-300 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group relative overflow-hidden h-48 w-full block">
                    {item.image ? (
                        <div className="absolute inset-0">
                        <img src={item.image} alt="Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm mx-auto">
                            <Upload className="w-5 h-5 text-slate-700" />
                            </div>
                            <p className="text-xs font-bold text-slate-800">Ubah Foto</p>
                        </div>
                        </div>
                    ) : (
                        <>
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform mx-auto">
                            <Upload className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="text-xs font-medium text-slate-700">Unggah Foto Baru</p>
                        </>
                    )}
                    <input id="artefak-upload" type="file" className="sr-only" accept="image/*" />
                </label>
              </div>
          </div>
      </div>
    </div>
  );
}
