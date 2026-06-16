import { ProfileForm } from '@/features/profile/components/ProfileForm';
import { getProfile, saveProfile } from '@/features/profile/services/profile.service';
import { revalidatePath } from 'next/cache';
import { ProfileFormValues } from '@/features/profile/schemas/profile.schema';

export const metadata = {
  title: 'Profile | Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminProfile() {
  const profile = await getProfile();

  // Form logic moved to Client Component to retain Firebase Auth context

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile & Resume</h1>
        <p className="text-gray-500">จัดการข้อมูลส่วนตัว ช่องทางการติดต่อ และอัปโหลดเรซูเม่</p>
      </div>

      <div className="bg-white p-6 rounded-md border shadow-sm">
        <ProfileForm initialData={profile} />
      </div>
    </div>
  );
}
