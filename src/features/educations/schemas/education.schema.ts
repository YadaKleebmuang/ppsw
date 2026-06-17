import { z } from 'zod';

export const educationSchema = z.object({
  institution: z.string().min(1, 'กรุณาระบุชื่อสถาบันศึกษา'),
  degree: z.string().min(1, 'กรุณาระบุวุฒิการศึกษา'),
  faculty: z.string().min(1, 'กรุณาระบุคณะ'),
  major: z.string().min(1, 'กรุณาระบุสาขาวิชา'),
  startYear: z.string().min(1, 'กรุณาระบุปีที่เริ่มต้น'),
  endYear: z.string().min(1, 'กรุณาระบุปีที่จบ (หรือ "ปัจจุบัน")'),
  description: z.string(),
  order: z.number().min(0, 'ลำดับต้องมากกว่าหรือเท่ากับ 0'),
  isVisible: z.boolean(),
});

export type EducationFormData = z.infer<typeof educationSchema>;
