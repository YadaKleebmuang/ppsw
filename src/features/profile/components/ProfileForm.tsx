'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormValues } from '../schemas/profile.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { uploadImageAction } from '@/app/actions/upload';
import { compressImage } from '@/utils/imageCompression';
import { auth } from '@/lib/firebase/client';

import { saveProfile } from '../services/profile.service';
import { useRouter } from 'next/navigation';

interface ProfileFormProps {
  initialData?: ProfileFormValues | null;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

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
      educationSchool: '',
      educationDegree: '',
      educationYear: '',
      educationGpa: '',
      skillsFrontend: '',
      skillsBackend: '',
      skillsOther: '',
    },
  });

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>, 
    field: 'profileImageUrl', 
    setLoading: (val: boolean) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const compressedFile = await compressImage(file);

      const formData = new FormData();
      formData.append('file', compressedFile);
      
      const result = await uploadImageAction(formData);
      if (!result.success) throw new Error(result.error);
      
      form.setValue(field, result.url);
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
      await saveProfile(data);
      router.push('/admin/profile');
      router.refresh();
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
        <div className="space-y-2 md:col-span-2">
          <h3 className="text-lg font-medium">Education</h3>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">School / University</label>
          <Input {...form.register('educationSchool')} placeholder="e.g. King Mongkut's University..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Degree / Major</label>
          <Input {...form.register('educationDegree')} placeholder="e.g. Computer Science" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Year</label>
          <Input {...form.register('educationYear')} placeholder="e.g. 2020 - 2024" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">GPA</label>
          <Input {...form.register('educationGpa')} placeholder="e.g. 3.50" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
        <div className="space-y-2 md:col-span-3">
          <h3 className="text-lg font-medium">Skills (Comma separated)</h3>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Frontend</label>
          <Textarea {...form.register('skillsFrontend')} placeholder="e.g. Next.js, React, Tailwind CSS" rows={3} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Backend</label>
          <Textarea {...form.register('skillsBackend')} placeholder="e.g. Node.js, Python, Firebase" rows={3} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Other</label>
          <Textarea {...form.register('skillsOther')} placeholder="e.g. Git, Figma, Docker" rows={3} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
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
          <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'profileImageUrl', setUploadingImage)} disabled={uploadingImage} />
          {uploadingImage && <p className="text-sm text-gray-500">Uploading...</p>}
          {form.watch('profileImageUrl') && (
            <img src={form.watch('profileImageUrl')} alt="Profile preview" className="mt-2 h-32 w-32 object-cover rounded-full" />
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Resume Link (Google Drive, etc.)</label>
          <Input type="url" {...form.register('resumeUrl')} placeholder="https://..." />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8">
        {isSubmitting ? 'Saving...' : 'Save Profile'}
      </Button>
    </form>
  );
}
