import { BaseRepository } from './base.repository';
import { Profile } from '@/types';

class ProfileRepository extends BaseRepository<Profile> {
  constructor() {
    super('profile');
  }

  // Profile is usually a single document
  async getProfile(): Promise<Profile | null> {
    const profiles = await this.getAll();
    return profiles.length > 0 ? profiles[0] : null;
  }

  async updateProfile(id: string, data: Partial<Profile>): Promise<void> {
    await this.update(id, data);
  }

  async createProfile(data: Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return this.create(data);
  }
}

export const profileRepository = new ProfileRepository();
