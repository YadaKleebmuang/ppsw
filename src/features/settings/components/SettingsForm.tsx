'use client';

import { useState } from 'react';
import { useForm, useFieldArray, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema, SettingsFormValues } from '../schemas/settings.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

import { saveSettings } from '../services/settings.service';
import { useRouter } from 'next/navigation';

interface SettingsFormProps {
  initialData?: SettingsFormValues | null;
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState<string[]>(
    initialData?.categories || ['Web App', 'Mobile App', 'Chatbot', 'Other']
  );
  
  const [techStacks, setTechStacks] = useState<string[]>(
    initialData?.techStacks || []
  );

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema) as unknown as Resolver<SettingsFormValues>,
    defaultValues: initialData || {
      categories: ['Web App', 'Mobile App', 'Chatbot', 'Other'],
      skills: [],
      techStacks: [],
    },
  });

  const { 
    fields: skillFields, 
    append: appendSkill, 
    remove: removeSkill 
  } = useFieldArray({ control: form.control, name: 'skills' });

  const handleSubmit = async (data: SettingsFormValues) => {
    setIsSubmitting(true);
    try {
      const mappedData = {
        ...data,
        categories,
        techStacks,
      };
      await saveSettings(mappedData);
      router.push('/admin/settings');
      router.refresh();
    } catch (error) {
      console.error('Save error', error);
      alert('Failed to save settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Convert string arrays to object arrays for useFieldArray compatibility if needed
  // However, zod validation and useFieldArray with primitive arrays can be tricky.
  // We'll manage simple strings directly in the UI if possible, or map them before render.

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-12">
      
      {/* Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Button type="button" variant="outline" size="sm" onClick={() => setCategories([...categories, ''])}>
            <Plus className="h-4 w-4 mr-2" /> Add Category
          </Button>
        </div>
        <div className="space-y-2">
          {categories.map((cat, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input 
                value={cat} 
                onChange={(e) => {
                  const newCats = [...categories];
                  newCats[index] = e.target.value;
                  setCategories(newCats);
                }} 
                placeholder="e.g. Web App" 
              />
              <Button type="button" variant="ghost" size="icon" className="text-red-500" onClick={() => {
                setCategories(categories.filter((_, i) => i !== index));
              }}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {categories.length === 0 && <p className="text-sm text-gray-500">No categories added yet.</p>}
        </div>
      </div>

      {/* Tech Stacks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tech Stacks</h2>
          <Button type="button" variant="outline" size="sm" onClick={() => setTechStacks([...techStacks, ''])}>
            <Plus className="h-4 w-4 mr-2" /> Add Tech Stack
          </Button>
        </div>
        <div className="space-y-2">
          {techStacks.map((tech, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input 
                value={tech} 
                onChange={(e) => {
                  const newTechs = [...techStacks];
                  newTechs[index] = e.target.value;
                  setTechStacks(newTechs);
                }} 
                placeholder="e.g. React" 
              />
              <Button type="button" variant="ghost" size="icon" className="text-red-500" onClick={() => {
                setTechStacks(techStacks.filter((_, i) => i !== index));
              }}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Skills & Proficiency</h2>
          <Button type="button" variant="outline" size="sm" onClick={() => appendSkill({ name: '', level: 50 })}>
            <Plus className="h-4 w-4 mr-2" /> Add Skill
          </Button>
        </div>
        <div className="space-y-4">
          {skillFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-md">
              <div className="flex-1 space-y-2">
                <label className="text-xs font-medium text-gray-500">Skill Name</label>
                <Input {...form.register(`skills.${index}.name` as const)} placeholder="e.g. JavaScript" />
              </div>
              <div className="w-1/3 space-y-2">
                <label className="text-xs font-medium text-gray-500">Proficiency (1-100)</label>
                <Input type="number" {...form.register(`skills.${index}.level` as const, { valueAsNumber: true })} />
              </div>
              <Button type="button" variant="ghost" size="icon" className="text-red-500 mt-6" onClick={() => removeSkill(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t">
        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8">
          {isSubmitting ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>
    </form>
  );
}
