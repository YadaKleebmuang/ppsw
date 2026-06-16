'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormValues } from '../schemas/profile.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { uploadFile } from '@/lib/firebase/storage';

interface ProfileFormProps {
  initialData?: ProfileFormValues | null;
  onSubmit: (data: ProfileFormValues) => Promise<void>;
}

export function ProfileForm({ initialData, onSubmit }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData || {
      fullName: '',
      headline: '',
      aboutMeTh: '',
      aboutMeEn: '',
      email: '',
      github: '',
      linkedin: '',
      resumeUrl: '',
      profileImageUrl: '',
    },
  });

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>, 
    field: 'profileImageUrl' | 'resumeUrl', 
    setLoading: (val: boolean) => void,
    folder: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const path = `${folder}/${Date.now()}_${file.name}`;
      const { url } = await uploadFile(file, path);
      form.setValue(field, url);
    } catch (error) {
      console.error(`Error uploading ${field}`, error);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error', error);
      alert('Failed to save profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input {...form.register('fullName')} placeholder="e.g. John Doe" />
          {form.formState.errors.fullName && <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Professional Headline</label>
          <Input {...form.register('headline')} placeholder="e.g. Full Stack Developer" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">About Me (Thai)</label>
          <Textarea {...form.register('aboutMeTh')} rows={4} />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">About Me (English)</label>
          <Textarea {...form.register('aboutMeEn')} rows={4} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email Address</label>
          <Input type="email" {...form.register('email')} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">GitHub URL</label>
          <Input {...form.register('github')} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">LinkedIn URL</label>
          <Input {...form.register('linkedin')} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
        <div className="space-y-2">
          <label className="text-sm font-medium">Profile Image</label>
          <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'profileImageUrl', setUploadingImage, 'profile')} disabled={uploadingImage} />
          {uploadingImage && <p className="text-sm text-gray-500">Uploading...</p>}
          {form.watch('profileImageUrl') && (
            <img src={form.watch('profileImageUrl')} alt="Profile preview" className="mt-2 h-32 w-32 object-cover rounded-full" />
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Resume (PDF)</label>
          <Input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, 'resumeUrl', setUploadingResume, 'resumes')} disabled={uploadingResume} />
          {uploadingResume && <p className="text-sm text-gray-500">Uploading...</p>}
          {form.watch('resumeUrl') && (
            <p className="mt-2 text-sm text-green-600">✓ Resume uploaded successfully</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8">
        {isSubmitting ? 'Saving...' : 'Save Profile'}
      </Button>
    </form>
  );
}
