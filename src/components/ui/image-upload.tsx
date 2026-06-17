'use client';

import { useState } from 'react';
import { Button } from './button';
import { ImagePlus, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  value?: string;
  onUpload: (url: string, publicId?: string) => void;
  onRemove: () => void;
  folder?: string;
  disabled?: boolean;
}

export function ImageUpload({ value, onUpload, onRemove, folder = 'portfolio', disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      onUpload(data.secure_url, data.public_id);
    } catch (error) {
      console.error(error);
      toast.error('อัปโหลดรูปภาพไม่สำเร็จ กรุณาตรวจสอบการตั้งค่า Cloudinary');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    onRemove();
  };

  return (
    <div className="space-y-4 w-full">
      {value ? (
        <div className="relative w-40 h-40 rounded-md overflow-hidden border bg-gray-50 shadow-sm">
          <img src={value} alt="Upload" className="w-full h-full object-cover" />
          <div className="absolute top-1 right-1">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="h-7 w-7 rounded-full shadow-sm"
              onClick={handleRemove}
              disabled={disabled || isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative flex items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <ImagePlus className="h-8 w-8" />
              <span className="text-xs">อัปโหลดรูปภาพ</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleUpload}
            disabled={disabled || isUploading}
          />
        </div>
      )}
    </div>
  );
}
