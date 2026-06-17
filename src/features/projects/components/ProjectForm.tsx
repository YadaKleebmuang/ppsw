'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectFormData } from '../schemas/project.schema';
import { Project, Category, TechStack } from '@/types';
import { projectRepository } from '@/repositories/project.repository';
import { categoryRepository } from '@/repositories/category.repository';
import { techStackRepository } from '@/repositories/tech-stack.repository';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MultiImageUpload } from '@/components/ui/multi-image-upload';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ProjectFormProps {
  initialData?: Project;
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData ? {
      ...initialData,
      images: initialData.images || [],
      objectives: initialData.objectives || [],
      features: initialData.features || [],
      responsibilities: initialData.responsibilities || [],
      results: initialData.results || [],
      techStackIds: initialData.techStackIds || [],
    } : {
      titleThai: '',
      titleEnglish: '',
      slug: '',
      categoryId: '',
      shortDescription: '',
      fullContent: '',
      problem: '',
      objectives: [],
      features: [],
      responsibilities: [],
      results: [],
      techStackIds: [],
      githubUrl: '',
      liveDemoUrl: '',
      images: [],
      coverImageUrl: '',
      isFeatured: false,
      isPublished: true,
    },
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [cats, techs] = await Promise.all([
          categoryRepository.getAllSorted(),
          techStackRepository.getAllSorted()
        ]);
        setCategories(cats);
        setTechStacks(techs);
      } catch (error) {
        console.error(error);
        toast.error('ไม่สามารถโหลดข้อมูลหมวดหมู่และเทคโนโลยีได้');
      }
    };
    fetchMetadata();
  }, []);

  const handleArrayChange = (field: keyof ProjectFormData, value: string) => {
    const array = value.split('\n').filter(item => item.trim() !== '');
    form.setValue(field as any, array);
  };

  const arrayToText = (array: string[]) => array.join('\n');

  const toggleTechStack = (id: string) => {
    const current = form.getValues('techStackIds');
    if (current.includes(id)) {
      form.setValue('techStackIds', current.filter(x => x !== id));
    } else {
      form.setValue('techStackIds', [...current, id]);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsLoading(true);
    try {
      // Find cover image from images array
      const coverImage = data.images.find(img => img.isCover) || data.images[0];
      const finalCoverImageUrl = coverImage ? coverImage.url : (data.coverImageUrl || '');

      const payload = {
        ...data,
        problem: data.problem || '',
        githubUrl: data.githubUrl || '',
        liveDemoUrl: data.liveDemoUrl || '',
        coverImageUrl: finalCoverImageUrl,
      };

      if (initialData?.id) {
        await projectRepository.update(initialData.id, payload);
        toast.success('อัปเดตโปรเจกต์สำเร็จ');
      } else {
        await projectRepository.create(payload);
        toast.success('สร้างโปรเจกต์สำเร็จ');
      }
      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 rounded-md shadow-sm border">
      
      {/* 1. Basic Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">ข้อมูลพื้นฐาน (Basic Info)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="titleThai">ชื่อโปรเจกต์ (ภาษาไทย)</Label>
            <Input id="titleThai" {...form.register('titleThai')} placeholder="เช่น ระบบจัดการร้านอาหาร" />
            {form.formState.errors.titleThai && <p className="text-sm text-red-500">{form.formState.errors.titleThai.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="titleEnglish">ชื่อโปรเจกต์ (English)</Label>
            <Input id="titleEnglish" {...form.register('titleEnglish')} placeholder="เช่น Restaurant Management System" />
            {form.formState.errors.titleEnglish && <p className="text-sm text-red-500">{form.formState.errors.titleEnglish.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input id="slug" {...form.register('slug')} placeholder="เช่น restaurant-management-system" />
            {form.formState.errors.slug && <p className="text-sm text-red-500">{form.formState.errors.slug.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">หมวดหมู่</Label>
            <select 
              id="categoryId" 
              {...form.register('categoryId')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">-- เลือกหมวดหมู่ --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {form.formState.errors.categoryId && <p className="text-sm text-red-500">{form.formState.errors.categoryId.message}</p>}
          </div>
        </div>
      </div>

      {/* 2. Content */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">เนื้อหา (Content)</h2>
        
        <div className="space-y-2">
          <Label htmlFor="shortDescription">คำอธิบายย่อ (Short Description - โชว์ที่การ์ดหน้าแรก)</Label>
          <Textarea id="shortDescription" {...form.register('shortDescription')} rows={2} />
          {form.formState.errors.shortDescription && <p className="text-sm text-red-500">{form.formState.errors.shortDescription.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="problem">ปัญหาที่ต้องการแก้ (Problem/Challenge)</Label>
          <Textarea id="problem" {...form.register('problem')} rows={3} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullContent">เนื้อหาหลัก (Full Content - รองรับ Markdown)</Label>
          <Textarea id="fullContent" {...form.register('fullContent')} rows={8} />
          {form.formState.errors.fullContent && <p className="text-sm text-red-500">{form.formState.errors.fullContent.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="objectives">เป้าหมาย (Objectives - ขึ้นบรรทัดใหม่เพื่อแยกข้อ)</Label>
            <Textarea 
              id="objectives" 
              defaultValue={arrayToText(form.getValues('objectives'))}
              onChange={(e) => handleArrayChange('objectives', e.target.value)}
              rows={4} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="features">ฟีเจอร์หลัก (Key Features - ขึ้นบรรทัดใหม่เพื่อแยกข้อ)</Label>
            <Textarea 
              id="features" 
              defaultValue={arrayToText(form.getValues('features'))}
              onChange={(e) => handleArrayChange('features', e.target.value)}
              rows={4} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="responsibilities">หน้าที่รับผิดชอบ (My Role - ขึ้นบรรทัดใหม่เพื่อแยกข้อ)</Label>
            <Textarea 
              id="responsibilities" 
              defaultValue={arrayToText(form.getValues('responsibilities'))}
              onChange={(e) => handleArrayChange('responsibilities', e.target.value)}
              rows={4} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="results">ผลลัพธ์ (Results - ขึ้นบรรทัดใหม่เพื่อแยกข้อ)</Label>
            <Textarea 
              id="results" 
              defaultValue={arrayToText(form.getValues('results'))}
              onChange={(e) => handleArrayChange('results', e.target.value)}
              rows={4} 
            />
          </div>
        </div>
      </div>

      {/* 3. Tech Stacks & Links */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">เทคโนโลยีและลิงก์ (Tech & Links)</h2>
        
        <div className="space-y-3">
          <Label>เทคโนโลยีที่ใช้ (Tech Stacks)</Label>
          <div className="flex flex-wrap gap-2 p-4 border rounded-md bg-gray-50 max-h-48 overflow-y-auto">
            {techStacks.map(tech => {
              const isSelected = form.watch('techStackIds').includes(tech.id!);
              return (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => toggleTechStack(tech.id!)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    isSelected 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {tech.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub Repository URL</Label>
            <Input id="githubUrl" {...form.register('githubUrl')} placeholder="https://github.com/..." />
            {form.formState.errors.githubUrl && <p className="text-sm text-red-500">{form.formState.errors.githubUrl.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="liveDemoUrl">Live Demo URL</Label>
            <Input id="liveDemoUrl" {...form.register('liveDemoUrl')} placeholder="https://..." />
            {form.formState.errors.liveDemoUrl && <p className="text-sm text-red-500">{form.formState.errors.liveDemoUrl.message}</p>}
          </div>
        </div>
      </div>

      {/* 4. Media & Images */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">รูปภาพประกอบ (Gallery)</h2>
        <div className="space-y-2">
          <Label>รูปภาพของโปรเจกต์</Label>
          <p className="text-xs text-gray-500 pb-2">สามารถอัปโหลดได้หลายรูป รูปแรกสุด (หรือที่กดติดดาว) จะเป็นรูปปกเสมอ</p>
          <MultiImageUpload 
            value={form.watch('images').map(img => ({
              url: img.url,
              publicId: img.publicId,
              isCover: img.isCover
            }))}
            onChange={(images) => {
              const currentImages = form.getValues('images');
              const mapped = images.map((img, idx) => {
                const existing = currentImages.find(c => c.url === img.url);
                if (existing) {
                  return { ...existing, isCover: img.isCover || false, order: idx };
                }
                return {
                  id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7),
                  url: img.url,
                  publicId: img.publicId || '',
                  alt: '',
                  caption: '',
                  order: idx,
                  isCover: img.isCover || false,
                };
              });
              form.setValue('images', mapped);
            }}
          />
        </div>
      </div>

      {/* 5. Status & Visibility */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">สถานะการแสดงผล (Status)</h2>
        
        <div className="flex flex-col space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              {...form.register('isPublished')}
              className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
            />
            <div>
              <span className="text-sm font-medium block">เผยแพร่โปรเจกต์นี้ (Published)</span>
              <span className="text-xs text-gray-500">ถ้าปิดไว้ จะเป็นเพียง Draft มองไม่เห็นบนหน้าเว็บ</span>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              {...form.register('isFeatured')}
              className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
            />
            <div>
              <span className="text-sm font-medium block">แสดงในหน้าแรก (Featured)</span>
              <span className="text-xs text-gray-500">สำหรับผลงานที่ต้องการเน้นเป็นพิเศษในหน้า Home</span>
            </div>
          </label>
        </div>
      </div>

      <div className="pt-6 border-t flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push('/admin/projects')} disabled={isLoading}>
          ยกเลิก
        </Button>
        <Button type="submit" disabled={isLoading} className="px-8">
          {isLoading ? 'กำลังบันทึก...' : 'บันทึกโปรเจกต์'}
        </Button>
      </div>

    </form>
  );
}
