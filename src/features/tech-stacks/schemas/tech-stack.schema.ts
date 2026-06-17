import { z } from 'zod';

export const techStackSchema = z.object({
  name: z.string().min(1, 'กรุณาระบุชื่อเทคโนโลยี'),
  slug: z.string().min(1, 'กรุณาระบุ Slug (URL)'),
  icon: z.string().min(1, 'กรุณาระบุชื่อไอคอนหรือ URL'),
  isActive: z.boolean(),
});

export type TechStackFormData = z.infer<typeof techStackSchema>;
