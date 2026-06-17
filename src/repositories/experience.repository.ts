import { BaseRepository } from './base.repository';
import { Experience } from '@/types';
import { orderBy, where } from 'firebase/firestore';

class ExperienceRepository extends BaseRepository<Experience> {
  constructor() {
    super('experiences');
  }

  async getAllSorted(): Promise<Experience[]> {
    return this.getAll([orderBy('order', 'asc')]);
  }

  async getVisibleExperiences(): Promise<Experience[]> {
    const experiences = await this.getAllSorted();
    return experiences.filter(exp => exp.isVisible);
  }
}

export const experienceRepository = new ExperienceRepository();
