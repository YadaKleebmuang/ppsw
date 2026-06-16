import { z } from 'zod';

export const projectImageSchema = z.object({
  src: z.string().min(1, 'Path is required'),
  altTextTh: z.string().optional(),
  altTextEn: z.string().optional(),
  isCover: z.boolean().default(false),
  displayOrder: z.number().default(0),
});

export const projectSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  titleTh: z.string().min(1, 'Title (TH) is required'),
  titleEn: z.string().min(1, 'Title (EN) is required'),
  shortDescriptionTh: z.string().min(1, 'Short Description is required'),
  contentTh: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).default([]),
  images: z.array(projectImageSchema).default([]),
  githubUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export type ProjectImageFormValues = z.infer<typeof projectImageSchema>;
export type ProjectFormValues = z.infer<typeof projectSchema>;
