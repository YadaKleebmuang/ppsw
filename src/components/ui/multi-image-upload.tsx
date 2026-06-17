'use client';

import { useState } from 'react';
import { Button } from './button';
import { ImagePlus, X, Loader2, Star } from 'lucide-react';
import { toast } from 'sonner';

interface ImageItem {
  url: string;
  publicId?: string;
  isCover?: boolean;
}

interface MultiImageUploadProps {
  value: ImageItem[];
  onChange: (value: ImageItem[]) => void;
  folder?: string;
  disabled?: boolean;
}

export function MultiImageUpload({ value, onChange, folder = 'portfolio/projects', disabled }: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const newImages: ImageItem[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        
        newImages.push({
          url: data.secure_url,
          publicId: data.public_id,
          isCover: value.length === 0 && i === 0, // First image is cover by default
        });
      }

      onChange([...value, ...newImages]);
      toast.success(`อัปโหลดสำเร็จ ${newImages.length} รูป`);
    } catch (error) {
      console.error(error);
      toast.error('อัปโหลดรูปภาพไม่สำเร็จ');
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleRemove = (indexToRemove: number) => {
    const newValue = [...value];
    const removed = newValue.splice(indexToRemove, 1)[0];
    
    // If we removed the cover, make the first remaining image the cover
    if (removed.isCover && newValue.length > 0) {
      newValue[0].isCover = true;
    }
    
    onChange(newValue);
  };

  const handleSetCover = (indexToSet: number) => {
    const newValue = value.map((img, index) => ({
      ...img,
      isCover: index === indexToSet
    }));
    onChange(newValue);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap gap-4">
        {value.map((img, index) => (
          <div key={index} className="relative w-40 h-40 rounded-md overflow-hidden border bg-gray-50 shadow-sm group">
            <img src={img.url} alt={`Upload ${index}`} className="w-full h-full object-cover" />
            
            <div className="absolute top-1 right-1 flex gap-1">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className={`h-7 w-7 rounded-full shadow-sm ${img.isCover ? 'bg-yellow-400 text-white hover:bg-yellow-500' : 'bg-white/80 hover:bg-white text-gray-500'}`}
                onClick={() => handleSetCover(index)}
                disabled={disabled}
                title="ตั้งเป็นภาพปก"
              >
                <Star className="h-4 w-4" fill={img.isCover ? "currentColor" : "none"} />
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-7 w-7 rounded-full shadow-sm"
                onClick={() => handleRemove(index)}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {img.isCover && (
              <div className="absolute bottom-0 left-0 right-0 bg-yellow-400/90 text-white text-[10px] font-bold py-1 text-center">
                ภาพปก (Cover)
              </div>
            )}
          </div>
        ))}
        
        <div className="relative flex items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              <span className="text-xs text-gray-500">อัปโหลด...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <ImagePlus className="h-8 w-8" />
              <span className="text-xs">เพิ่มรูปภาพ</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleUpload}
            disabled={disabled || isUploading}
          />
        </div>
      </div>
    </div>
  );
}
