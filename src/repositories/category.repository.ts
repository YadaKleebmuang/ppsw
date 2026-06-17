import { BaseRepository } from './base.repository';
import { Category } from '@/types';
import { orderBy } from 'firebase/firestore';

class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super('categories');
  }

  async getAllSorted(): Promise<Category[]> {
    return this.getAll([orderBy('order', 'asc')]);
  }
}

export const categoryRepository = new CategoryRepository();
