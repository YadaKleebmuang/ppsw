import { z } from 'zod';

export const projectSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  titleTh: z.string().min(1, 'Title (TH) is required'),
  titleEn: z.string().min(1, 'Title (EN) is required'),
  shortDescriptionTh: z.string().min(1, 'Short Description is required'),
  contentTh: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).default([]),
  coverImageUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  galleryUrls: z.array(z.string()).default([]),
  isPublished: z.boolean().default(false),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
