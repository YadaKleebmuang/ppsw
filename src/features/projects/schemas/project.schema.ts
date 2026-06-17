import { z } from 'zod';

export const projectImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  publicId: z.string(),
  alt: z.string(),
  caption: z.string(),
  order: z.number(),
  isCover: z.boolean(),
});

export const projectSchema = z.object({
  titleThai: z.string().min(1, 'กรุณาระบุชื่อโปรเจกต์ (ภาษาไทย)'),
  titleEnglish: z.string().min(1, 'กรุณาระบุชื่อโปรเจกต์ (English)'),
  slug: z.string().min(1, 'กรุณาระบุ Slug (URL)'),
  categoryId: z.string().min(1, 'กรุณาระบุหมวดหมู่'),
  shortDescription: z.string().min(1, 'กรุณาระบุคำอธิบายแบบย่อ'),
  fullContent: z.string().min(1, 'กรุณาระบุเนื้อหาแบบละเอียด'),
  problem: z.string().optional(),
  
  // Arrays of strings
  objectives: z.array(z.string()),
  features: z.array(z.string()),
  responsibilities: z.array(z.string()),
  results: z.array(z.string()),
  techStackIds: z.array(z.string()),
  
  githubUrl: z.string().url('รูปแบบ URL ไม่ถูกต้อง').optional().or(z.literal('')),
  liveDemoUrl: z.string().url('รูปแบบ URL ไม่ถูกต้อง').optional().or(z.literal('')),
  
  images: z.array(projectImageSchema),
  coverImageUrl: z.string().optional(),
  
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
export type ProjectImageFormData = z.infer<typeof projectImageSchema>;
