import { BaseRepository } from './base.repository';
import { TechStack } from '@/types';
import { orderBy } from 'firebase/firestore';

class TechStackRepository extends BaseRepository<TechStack> {
  constructor() {
    super('techStacks');
  }

  async getAllSorted(): Promise<TechStack[]> {
    return this.getAll([orderBy('name', 'asc')]);
  }
}

export const techStackRepository = new TechStackRepository();
