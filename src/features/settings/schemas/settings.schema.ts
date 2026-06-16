import { z } from 'zod';

export const settingsSchema = z.object({
  categories: z.array(z.string()).default(['Web App', 'Mobile App', 'Chatbot', 'Other']),
  skills: z.array(z.object({
    name: z.string().min(1, 'Skill name is required'),
    level: z.number().min(1).max(100).default(50),
  })).default([]),
  techStacks: z.array(z.string()).default([]),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
