'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormValues } from '../schemas/profile.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { profileRepository } from '@/repositories/profile.repository';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ProfileFormProps {
  initialData?: ProfileFormValues | null;
  profileId?: string;
}

export function ProfileForm({ initialData, profileId }: ProfileFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData || {
      fullName: '',
      headline: '',
      bio: '',
      about: '',
      email: '',
      githubUrl: '',
      linkedinUrl: '',
      profileImageUrl: '',
      resumeUrl: '',
    },
  });

  const handleSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        fullName: data.fullName,
        headline: data.headline,
        bio: data.bio || '',
        about: data.about || '',
        email: data.email || '',
        githubUrl: data.githubUrl || '',
        linkedinUrl: data.linkedinUrl || '',
        profileImageUrl: data.profileImageUrl || '',
        resumeUrl: data.resumeUrl || '',
      };

      if (profileId) {
        await profileRepository.updateProfile(profileId, payload);
      } else {
        await profileRepository.createProfile(payload);
      }
      toast.success('บันทึกข้อมูลโปรไฟล์สำเร็จ');
      router.refresh();
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูลโปรไฟล์');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'portfolio/profile');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      form.setValue('profileImageUrl', data.secure_url, { shouldValidate: true, shouldDirty: true });
      toast.success('อัปโหลดรูปโปรไฟล์สำเร็จ');
    } catch (error) {
      console.error(error);
      toast.error('อัปโหลดรูปภาพล้มเหลว');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">ชื่อ-นามสกุล (Full Name)</label>
          <Input {...form.register('fullName')} placeholder="e.g. John Doe" />
          {form.formState.errors.fullName && <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">ตำแหน่งหรือ Headline</label>
          <Input {...form.register('headline')} placeholder="e.g. Full Stack Developer" />
          {form.formState.errors.headline && <p className="text-sm text-red-500">{form.formState.errors.headline.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">คำแนะนำตัวแบบย่อ (Bio)</label>
        <Textarea {...form.register('bio')} rows={2} placeholder="ประวัติย่อๆ สั้นๆ สำหรับแสดงหน้าแรก" />
      </div>
        
      <div className="space-y-2">
        <label className="text-sm font-medium">ประวัติแบบละเอียด (About)</label>
        <Textarea {...form.register('about')} rows={6} placeholder="ประวัติการทำงาน แนวคิด หรือเรื่องราวของคุณ" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t">
        <div className="space-y-2">
          <label className="text-sm font-medium">อีเมล (Email)</label>
          <Input type="email" {...form.register('email')} />
          {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">GitHub URL</label>
          <Input {...form.register('githubUrl')} />
          {form.formState.errors.githubUrl && <p className="text-sm text-red-500">{form.formState.errors.githubUrl.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">LinkedIn URL</label>
          <Input {...form.register('linkedinUrl')} />
          {form.formState.errors.linkedinUrl && <p className="text-sm text-red-500">{form.formState.errors.linkedinUrl.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Resume URL (PDF Link)</label>
          <Input {...form.register('resumeUrl')} placeholder="https://.../resume.pdf" />
          {form.formState.errors.resumeUrl && <p className="text-sm text-red-500">{form.formState.errors.resumeUrl.message}</p>}
        </div>
      </div>

      <div className="pt-4 border-t space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">รูปโปรไฟล์ (Profile Image)</label>
          <div className="flex items-center gap-4">
            <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm flex-shrink-0 bg-gray-50 flex items-center justify-center">
              {form.watch('profileImageUrl') ? (
                <img 
                  src={form.watch('profileImageUrl')} 
                  alt="Profile preview" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <span className="text-3xl">👤</span>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="max-w-sm"
              />
              <p className="text-xs text-gray-500">รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB</p>
              
              <div className="pt-2">
                <label className="text-xs font-medium text-gray-500 mb-1 block">หรือระบุ URL รูปภาพโดยตรง</label>
                <Input type="text" {...form.register('profileImageUrl')} placeholder="https://..." className="text-sm" />
              </div>
            </div>
          </div>
          {isUploading && <p className="text-sm text-blue-500 mt-2">กำลังอัปโหลดรูปภาพ...</p>}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8">
        {isSubmitting ? 'กำลังบันทึก...' : 'บันทึก Profile'}
      </Button>
    </form>
  );
}
