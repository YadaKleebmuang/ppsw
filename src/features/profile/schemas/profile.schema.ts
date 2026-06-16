import { z } from 'zod';

export const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  headline: z.string().min(1, 'Headline is required'),
  aboutMeTh: z.string().optional(),
  aboutMeEn: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  github: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  resumeUrl: z.string().optional(),
  profileImageUrl: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
