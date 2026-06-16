'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectFormValues } from '../schemas/project.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { uploadImageAction } from '@/app/actions/upload';
import { compressImage } from '@/utils/imageCompression';
import { Trash2 } from 'lucide-react';

import { auth } from '@/lib/firebase/client';

import { createProject, updateProject } from '../services/project.service';
import { useRouter } from 'next/navigation';

interface ProjectFormProps {
  initialData?: ProjectFormValues & { id?: string };
  projectId?: string;
}

export function ProjectForm({ initialData, projectId }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema) as unknown as Resolver<ProjectFormValues>,
    defaultValues: initialData || {
      slug: '',
      titleTh: '',
      titleEn: '',
      shortDescriptionTh: '',
      contentTh: '',
      category: 'Web App',
      tags: [],
      coverImageUrl: '',
      githubUrl: '',
      demoUrl: '',
      galleryUrls: [],
      isPublished: false,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const compressedFile = await compressImage(file);
      
      const formData = new FormData();
      formData.append('file', compressedFile);
      
      const result = await uploadImageAction(formData);
      if (!result.success) throw new Error(result.error);
      
      form.setValue('coverImageUrl', result.url);
    } catch (error) {
      console.error('Error uploading image', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    try {
      const currentGallery = form.getValues('galleryUrls') || [];
      const newUrls: string[] = [];
      
      // Upload compressed images with a concurrency limit of 3
      const CONCURRENCY = 3;
      for (let i = 0; i < files.length; i += CONCURRENCY) {
        const batch = Array.from(files).slice(i, i + CONCURRENCY);
        
          const batchPromises = batch.map(async (file) => {
          try {
            const compressedFile = await compressImage(file);
            
            const formData = new FormData();
            formData.append('file', compressedFile);
            
            const result = await uploadImageAction(formData);
            if (!result.success) throw new Error(result.error);
            
            return result.url;
          } catch (err) {
            console.error('Failed to upload file', file.name, err);
            alert(`ไม่สามารถอัปโหลดรูป ${file.name} ได้`);
            return null;
          }
        });

        const results = await Promise.all(batchPromises);
        newUrls.push(...(results.filter(url => url !== null) as string[]));
      }
      
      form.setValue('galleryUrls', [...currentGallery, ...newUrls]);
    } catch (error) {
      console.error('Error uploading gallery', error);
      alert('Failed to upload gallery images');
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    const currentGallery = form.getValues('galleryUrls') || [];
    form.setValue('galleryUrls', currentGallery.filter((_, i) => i !== indexToRemove));
  };

  const onSubmitForm: SubmitHandler<ProjectFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      if (projectId) {
        await updateProject(projectId, data);
      } else {
        await createProject(data);
      }
      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      console.error('Form submission error', error);
      alert('Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug (URL)</label>
          <Input {...form.register('slug')} placeholder="e.g. my-project-name" />
          {form.formState.errors.slug && <p className="text-sm text-red-500">{form.formState.errors.slug.message}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <select 
            {...form.register('category')} 
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="Web App">Web App</option>
            <option value="Chatbot">Chatbot</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Title (Thai)</label>
          <Input {...form.register('titleTh')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Title (English)</label>
          <Input {...form.register('titleEn')} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Short Description</label>
        <Textarea {...form.register('shortDescriptionTh')} rows={3} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Full Content (Markdown / Text)</label>
        <Textarea {...form.register('contentTh')} rows={10} placeholder="Write your project details here..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Cover Image Upload</label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
          {uploadingImage && <p className="text-sm text-gray-500">Uploading...</p>}
          {form.watch('coverImageUrl') && (
            <img src={form.watch('coverImageUrl')} alt="Cover preview" className="mt-2 h-32 object-cover rounded-md" />
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">GitHub URL</label>
            <Input {...form.register('githubUrl')} placeholder="https://github.com/..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Live Demo URL</label>
            <Input {...form.register('demoUrl')} placeholder="https://..." />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Project Gallery (รูปภาพเพิ่มเติม)</h3>
            <p className="text-sm text-gray-500">อัปโหลดรูปภาพผลงานเพิ่มเติม (เลือกได้หลายรูป)</p>
          </div>
          <div className="relative overflow-hidden inline-block">
            <Button type="button" variant="outline" disabled={uploadingGallery}>
              {uploadingGallery ? 'Uploading...' : 'Add Gallery Images'}
            </Button>
            <Input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleGalleryUpload} 
              disabled={uploadingGallery} 
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
            />
          </div>
        </div>

        {form.watch('galleryUrls') && form.watch('galleryUrls')!.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {form.watch('galleryUrls')!.map((url, index) => (
              <div key={index} className="relative group rounded-md overflow-hidden aspect-video border">
                <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => removeGalleryImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 pt-6 border-t">
        <input type="checkbox" id="isPublished" {...form.register('isPublished')} className="h-4 w-4" />
        <label htmlFor="isPublished" className="text-sm font-medium">Publish this project (Visible to public)</label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8">
        {isSubmitting ? 'Saving...' : 'Save Project'}
      </Button>
    </form>
  );
}
