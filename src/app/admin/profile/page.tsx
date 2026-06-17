import { ProfileForm } from '@/features/profile/components/ProfileForm';
import { profileRepository } from '@/repositories/profile.repository';

export const metadata = {
  title: 'Profile | Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminProfile() {
  const rawProfile = await profileRepository.getProfile();
  
  // Remove Firebase Timestamp objects to avoid Server-to-Client serialization errors
  let safeProfile = null;
  if (rawProfile) {
    const { createdAt, updatedAt, ...rest } = rawProfile as any;
    safeProfile = rest;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-gray-500">จัดการข้อมูลส่วนตัวและช่องทางการติดต่อ</p>
      </div>

      <div className="bg-white p-6 rounded-md border shadow-sm">
        <ProfileForm initialData={safeProfile} profileId={safeProfile?.id} />
      </div>
    </div>
  );
}
