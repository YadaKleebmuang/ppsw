import { SettingsForm } from '@/features/settings/components/SettingsForm';
import { getSettings, saveSettings } from '@/features/settings/services/settings.service';
import { revalidatePath } from 'next/cache';
import { SettingsFormValues } from '@/features/settings/schemas/settings.schema';

export const metadata = {
  title: 'Settings | Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminSettings() {
  const settings = await getSettings();

  const handleSubmit = async (data: SettingsFormValues) => {
    'use server';
    await saveSettings(data);
    revalidatePath('/admin/settings');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Categories & Skills</h1>
        <p className="text-gray-500">จัดการหมวดหมู่ ทักษะ และเทคโนโลยีที่ใช้ในพอร์ตโฟลิโอของคุณ</p>
      </div>

      <div className="bg-white p-6 rounded-md border shadow-sm">
        <SettingsForm initialData={settings} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
