import { z } from 'zod';

export const skillSchema = z.object({
  name: z.string().min(1, 'กรุณาระบุชื่อทักษะ'),
  category: z.string().min(1, 'กรุณาระบุหมวดหมู่ (เช่น Frontend, Backend)'),
  level: z.string(),
  order: z.number().min(0, 'ลำดับต้องมากกว่าหรือเท่ากับ 0'),
  isVisible: z.boolean(),
});

export type SkillFormData = z.infer<typeof skillSchema>;
