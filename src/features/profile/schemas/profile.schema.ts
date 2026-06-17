import { z } from 'zod';

export const profileSchema = z.object({
  fullName: z.string().min(1, 'กรุณาระบุชื่อ-นามสกุล'),
  headline: z.string().min(1, 'กรุณาระบุตำแหน่งปัจจุบันหรือ Headline'),
  bio: z.string().optional(),
  about: z.string().optional(),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง').optional().or(z.literal('')),
  githubUrl: z.string().url('รูปแบบ URL ไม่ถูกต้อง').optional().or(z.literal('')),
  linkedinUrl: z.string().url('รูปแบบ URL ไม่ถูกต้อง').optional().or(z.literal('')),
  profileImageUrl: z.string().optional(),
  resumeUrl: z.string().url('รูปแบบ URL ไม่ถูกต้อง').optional().or(z.literal('')),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
