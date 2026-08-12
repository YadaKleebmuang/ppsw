"use client";

import { useState } from "react";
import { Maximize2, X } from "lucide-react";
import { ProjectImage } from "@/types";

type ProjectImageGalleryProps = {
  images: ProjectImage[];
  title: string;
};

export function ProjectImageGallery({ images, title }: ProjectImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={image.id || image.url}
            type="button"
            onClick={() => setSelectedImage(image)}
            className="group relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-white/75 bg-white/45 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_45px_rgba(45,103,210,0.16)]"
            aria-label={`Open ${image.alt || image.caption || `${title} screenshot ${index + 1}`} full size`}
          >
            <img
              src={image.url}
              alt={image.alt || image.caption || `${title} screenshot ${index + 1}`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#05235c]/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="glass-button absolute bottom-4 right-4 grid size-12 place-items-center rounded-full text-[#0063ff] shadow-lg">
              <Maximize2 className="size-5" />
            </span>
            {image.caption && (
              <span className="absolute bottom-4 left-4 max-w-[70%] rounded-full bg-white/85 px-4 py-2 text-xs font-bold text-[#08245c] opacity-0 shadow-sm transition group-hover:opacity-100">
                {image.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#031638]/80 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Project image preview"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative flex max-h-[92vh] w-full max-w-6xl flex-col gap-3" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="glass-button ml-auto grid size-11 place-items-center rounded-full text-[#08245c]"
              aria-label="Close image preview"
            >
              <X className="size-5" />
            </button>
            <div className="overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/15 p-2 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt || selectedImage.caption || title}
                className="max-h-[78vh] w-full rounded-[1rem] object-contain"
              />
            </div>
            {(selectedImage.caption || selectedImage.alt) && (
              <p className="text-center text-sm font-medium text-white/90">
                {selectedImage.caption || selectedImage.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
