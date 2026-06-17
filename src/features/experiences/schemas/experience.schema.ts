import { z } from 'zod';

export const experienceSchema = z.object({
  title: z.string().min(1, 'กรุณาระบุตำแหน่งงาน'),
  organization: z.string().min(1, 'กรุณาระบุชื่อองค์กร/บริษัท'),
  type: z.string().min(1, 'กรุณาระบุประเภทงาน (เช่น Full-time, Internship)'),
  startDate: z.string().min(1, 'กรุณาระบุวันที่เริ่มงาน'),
  endDate: z.string().nullable().optional(), // null = ทำงานอยู่ปัจจุบัน
  description: z.string(),
  order: z.number().min(0, 'ลำดับต้องมากกว่าหรือเท่ากับ 0'),
  isVisible: z.boolean(),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;
