"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  id: string;
  name?: string;
  defaultImage?: string;
  label?: string;
}

export function ImageUpload({ id, name, defaultImage, label = "Klik untuk unggah gambar" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  useEffect(() => {
    if (defaultImage) setPreview(defaultImage);
  }, [defaultImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <label 
      htmlFor={id} 
      className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group w-full relative overflow-hidden min-h-[200px]"
    >
      {preview && (
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src={preview} 
            alt="Preview" 
            fill 
            className="object-cover opacity-60 group-hover:opacity-40 transition-opacity" 
            unoptimized={preview.startsWith('blob:')}
          />
        </div>
      )}
      
      <div className="relative z-10 w-16 h-16 bg-white/90 shadow-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
        <Upload className="w-8 h-8 text-primary" />
      </div>
      <p className="relative z-10 text-sm font-medium text-slate-800 mb-1 bg-white/80 px-3 py-1 rounded-lg backdrop-blur-sm">
        {label}
      </p>
      <p className="relative z-10 text-xs text-slate-600 bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-sm mt-1">
        Maksimal ukuran 2MB (JPG, PNG)
      </p>
      <input 
        id={id} 
        name={name || id}
        type="file" 
        className="sr-only" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
    </label>
  );
}
