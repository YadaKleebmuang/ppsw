import { SettingsForm } from '@/features/settings/components/SettingsForm';
import { getSettings } from '@/features/settings/services/settings.service';
import { AdminPageHeader } from '@/components/layout/AdminPageHeader';
import { Settings } from 'lucide-react';

export const metadata = {
  title: 'Settings | Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminSettings() {
  const settings = await getSettings();

  return (
    <div className="max-w-5xl space-y-6">
      <AdminPageHeader
        icon={<Settings className="size-4" />}
        eyebrow="Site Configuration"
        title="Settings"
        description="Manage shared site settings for the portfolio."
      />

      <div className="admin-card rounded-[1.5rem] p-6">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
}
