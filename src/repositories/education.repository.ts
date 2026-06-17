import { BaseRepository } from './base.repository';
import { Education } from '@/types';
import { orderBy, where } from 'firebase/firestore';

class EducationRepository extends BaseRepository<Education> {
  constructor() {
    super('educations');
  }

  async getAllSorted(): Promise<Education[]> {
    return this.getAll([orderBy('order', 'asc')]);
  }

  async getVisibleEducations(): Promise<Education[]> {
    const educations = await this.getAllSorted();
    return educations.filter(edu => edu.isVisible);
  }
}

export const educationRepository = new EducationRepository();
