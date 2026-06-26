"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Baca berita tentang: ${title}`,
          url: url,
        });
      } catch (error) {
        // If user cancels or it fails, fallback to copy to clipboard
        if ((error as any).name !== "AbortError") {
          copyToClipboard(url);
        }
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className={`p-2 rounded-full transition-colors ${
        copied
          ? "text-emerald-500 bg-emerald-50"
          : "text-slate-400 hover:text-primary hover:bg-primary/10"
      }`}
      title={copied ? "Tautan Disalin!" : "Bagikan"}
    >
      {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
    </button>
  );
}
