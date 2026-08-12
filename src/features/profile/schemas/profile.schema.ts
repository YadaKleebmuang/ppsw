import { z } from 'zod';

const optionalUrl = z.string().url('Invalid URL').optional().or(z.literal(''));

export const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  headline: z.string().min(1, 'Headline is required'),
  bio: z.string().optional(),
  about: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  location: z.string().optional(),
  birthday: z.string().optional(),
  clientSatisfaction: z.string().optional(),
  footerDescription: z.string().optional(),
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  profileImageUrl: z.string().optional(),
  resumeUrl: optionalUrl,
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
