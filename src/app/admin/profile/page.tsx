import { ProfileForm } from '@/features/profile/components/ProfileForm';
import { profileRepository } from '@/repositories/profile.repository';
import { Profile } from '@/types';
import { Timestamp } from 'firebase/firestore';
import { AdminPageHeader } from '@/components/layout/AdminPageHeader';
import { User } from 'lucide-react';

export const metadata = {
  title: 'Profile | Admin',
};

export const dynamic = 'force-dynamic';

type ProfileWithMetadata = Profile & {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export default async function AdminProfile() {
  const rawProfile = await profileRepository.getProfile();

  let safeProfile = null;
  if (rawProfile) {
    const { createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = rawProfile as ProfileWithMetadata;
    void _createdAt;
    void _updatedAt;
    safeProfile = rest;
  }

  return (
    <div className="max-w-5xl space-y-6">
      <AdminPageHeader
        icon={<User className="size-4" />}
        eyebrow="Public Identity"
        title="Profile & Resume"
        description="Manage public profile, contact, footer, resume, and homepage summary content."
      />

      <div className="admin-card rounded-[1.5rem] p-6">
        <ProfileForm initialData={safeProfile} profileId={safeProfile?.id} />
      </div>
    </div>
  );
}
