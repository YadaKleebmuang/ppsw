'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectFormValues } from '../schemas/project.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProjectImageManager } from './ProjectImageManager';

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
      images: [],
      githubUrl: '',
      demoUrl: '',
      isPublished: false,
    },
  });


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
          <label className="text-sm font-medium">GitHub URL</label>
          <Input {...form.register('githubUrl')} placeholder="https://github.com/..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Live Demo URL</label>
          <Input {...form.register('demoUrl')} placeholder="https://..." />
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">Project Images</h3>
          <p className="text-sm text-gray-500">Manage local image paths, alt texts, and cover images.</p>
        </div>
        
        <ProjectImageManager 
          images={form.watch('images') || []} 
          onChange={(newImages) => form.setValue('images', newImages)} 
        />
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
