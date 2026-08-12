import { profileRepository } from '@/repositories/profile.repository';
import { PublicNavbarClient } from './PublicNavbarClient';

export async function PublicNavbar() {
  const profile = await profileRepository.getProfile();

  return <PublicNavbarClient resumeUrl={profile?.resumeUrl || ''} />;
}
