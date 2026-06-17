import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'กรุณาระบุชื่อหมวดหมู่'),
  slug: z.string().min(1, 'กรุณาระบุ Slug (URL)'),
  description: z.string(),
  isActive: z.boolean(),
  order: z.number().min(0, 'ลำดับต้องมากกว่าหรือเท่ากับ 0'),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
