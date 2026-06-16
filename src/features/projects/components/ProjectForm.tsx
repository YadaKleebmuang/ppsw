'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectFormValues } from '../schemas/project.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { uploadFile } from '@/lib/firebase/storage';

interface ProjectFormProps {
  initialData?: ProjectFormValues & { id?: string };
  onSubmit: (data: ProjectFormValues) => Promise<void>;
}

export function ProjectForm({ initialData, onSubmit }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

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
      isPublished: false,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const path = `projects/${Date.now()}_${file.name}`;
      const { url } = await uploadFile(file, path);
      form.setValue('coverImageUrl', url);
    } catch (error) {
      console.error('Error uploading image', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmitForm: SubmitHandler<ProjectFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
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

      <div className="flex items-center gap-2">
        <input type="checkbox" id="isPublished" {...form.register('isPublished')} className="h-4 w-4" />
        <label htmlFor="isPublished" className="text-sm font-medium">Publish this project (Visible to public)</label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8">
        {isSubmitting ? 'Saving...' : 'Save Project'}
      </Button>
    </form>
  );
}
