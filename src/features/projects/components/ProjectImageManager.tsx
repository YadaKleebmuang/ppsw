'use client';

import { useState } from 'react';
import { ProjectImageFormValues } from '../schemas/project.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface ProjectImageManagerProps {
  images: ProjectImageFormValues[];
  onChange: (images: ProjectImageFormValues[]) => void;
}

export function ProjectImageManager({ images = [], onChange }: ProjectImageManagerProps) {
  const [newPath, setNewPath] = useState('');

  const handleAddImage = () => {
    if (!newPath) return;
    const newImage: ProjectImageFormValues = {
      src: newPath,
      altTextTh: '',
      altTextEn: '',
      isCover: images.length === 0, // make first image cover by default
      displayOrder: images.length,
    };
    onChange([...images, newImage]);
    setNewPath('');
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleSetCover = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      isCover: i === index,
    }));
    onChange(updated);
  };

  const handleUpdateAltText = (index: number, lang: 'th' | 'en', val: string) => {
    const updated = [...images];
    if (lang === 'th') updated[index].altTextTh = val;
    if (lang === 'en') updated[index].altTextEn = val;
    onChange(updated);
  };

  const handleUpdateSrc = (index: number, val: string) => {
    const updated = [...images];
    updated[index].src = val;
    onChange(updated);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...images];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    // Update displayOrder
    updated.forEach((img, i) => img.displayOrder = i);
    onChange(updated);
  };

  const moveDown = (index: number) => {
    if (index === images.length - 1) return;
    const updated = [...images];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    // Update displayOrder
    updated.forEach((img, i) => img.displayOrder = i);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end gap-4">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium">Add New Image Path</label>
          <Input 
            value={newPath} 
            onChange={(e) => setNewPath(e.target.value)} 
            placeholder="/images/projects/project-name/img1.jpg" 
          />
        </div>
        <Button type="button" onClick={handleAddImage} variant="secondary">Add</Button>
      </div>

      <div className="space-y-4">
        {images.map((image, index) => (
          <div key={index} className={`flex flex-col md:flex-row gap-4 p-4 border rounded-xl ${image.isCover ? 'border-blue-500 bg-blue-50/50' : 'bg-gray-50'}`}>
            <div className="w-full md:w-48 aspect-video bg-gray-200 rounded-lg overflow-hidden shrink-0">
              <img src={image.src} alt={image.altTextEn || 'Preview'} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Image Path</label>
                <Input value={image.src} onChange={(e) => handleUpdateSrc(index, e.target.value)} className="h-8" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500">Alt Text (TH)</label>
                  <Input value={image.altTextTh || ''} onChange={(e) => handleUpdateAltText(index, 'th', e.target.value)} className="h-8" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500">Alt Text (EN)</label>
                  <Input value={image.altTextEn || ''} onChange={(e) => handleUpdateAltText(index, 'en', e.target.value)} className="h-8" />
                </div>
              </div>
            </div>

            <div className="flex md:flex-col justify-between items-end gap-2 shrink-0">
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => moveUp(index)} disabled={index === 0}><ArrowUp className="w-4 h-4" /></Button>
                <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => moveDown(index)} disabled={index === images.length - 1}><ArrowDown className="w-4 h-4" /></Button>
                <Button type="button" variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleRemove(index)}><Trash2 className="w-4 h-4" /></Button>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="coverImage" 
                  id={`cover-${index}`} 
                  checked={image.isCover} 
                  onChange={() => handleSetCover(index)}
                  className="w-4 h-4"
                />
                <label htmlFor={`cover-${index}`} className="text-sm font-medium">Set as Cover</label>
              </div>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <div className="text-center py-8 text-gray-500 border rounded-xl border-dashed">
            No images added yet. Add a local path above.
          </div>
        )}
      </div>
    </div>
  );
}
