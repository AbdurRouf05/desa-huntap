"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Printer, QrCode, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { getMuseumItem, updateMuseumItem } from "@/lib/actions/museum.actions";
import { PB_URL } from "@/lib/pocketbase";
import { useToast } from "@/components/ui/Toast";
import type { MuseumItem } from "@/types";

export default function EditMuseumItemPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;
  const { showToast } = useToast();
  
  const [item, setItem] = useState<MuseumItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const result = await getMuseumItem(itemId);
        if (result.success && result.data) {
          setItem(result.data as MuseumItem);
          
          if (typeof window !== 'undefined') {
            const baseUrl = window.location.origin;
            setQrValue(`${baseUrl}/museum/${result.data.slug}`);
          }
        } else {
          setError("Gagal memuat data artefak.");
        }
      } catch (err: any) {
        console.error(err);
        setError("Gagal memuat data artefak.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItem();
  }, [itemId]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      const result = await updateMuseumItem(itemId, formData);
      
      if (!result.success) {
        setError(result.error || "Terjadi kesalahan saat menyimpan data");
        showToast(result.error || "Gagal menyimpan perubahan", "error");
        return;
      }

      showToast("Perubahan berhasil disimpan! ✅", "success");
      router.push("/cp/museum");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      const msg = err.message || "Terjadi kesalahan saat menyimpan data";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!item && !isLoading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-700">Data tidak ditemukan</h2>
        <Link href="/cp/museum" className="text-primary hover:underline mt-4 inline-block">Kembali ke Daftar Koleksi</Link>
      </div>
    );
  }

  const defaultImageUrl = item && item.image 
    ? `${PB_URL}/api/files/${item.collectionId}/${item.id}/${item.image}`
    : undefined;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
              <Link 
              href="/cp/museum"
              className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              >
              <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
              <h1 className="text-2xl font-bold text-slate-900">Edit & QR Code</h1>
              <p className="text-slate-500 mt-1">Perbarui data atau cetak QR code untuk {item?.name}.</p>
              </div>
          </div>
          <div className="flex items-center gap-3">
              <button 
                onClick={handlePrintQR}
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                  <Printer className="w-5 h-5" />
                  Cetak QR Code
              </button>
              <button 
                form="edit-museum-form"
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70 cursor-pointer"
              >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Form */}
          <div className="lg:col-span-2">
            <form id="edit-museum-form" onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-6 space-y-6">
                    {error && (
                      <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm">
                        {error}
                      </div>
                    )}
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Nama Koleksi <span className="text-red-500">*</span></label>
                        <input 
                        type="text" 
                        name="name"
                        required
                        defaultValue={item?.name}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800 bg-slate-50 focus:bg-white"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Era / Tahun <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                name="era"
                                required
                                defaultValue={item?.era}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800 bg-slate-50 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Kondisi Barang <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                name="condition"
                                required
                                defaultValue={item?.condition}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-800 bg-slate-50 focus:bg-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Cerita / Sejarah (Deskripsi) <span className="text-red-500">*</span></label>
                        <textarea 
                            name="description"
                            required
                            defaultValue={item?.description}
                            rows={12}
                            className="w-full p-4 border border-slate-300 rounded-xl outline-none text-slate-800 resize-y focus:ring-2 focus:ring-primary focus:border-primary bg-slate-50 focus:bg-white leading-relaxed"
                        />
                    </div>
                </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
              {/* QR Code */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-xl text-primary mb-4">
                      <QrCode className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">QR Code Artefak</h3>
                  
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
                <ImageUpload id="image" name="image" defaultImage={defaultImageUrl} />
              </div>
          </div>
      </div>
    </div>
  );
}
