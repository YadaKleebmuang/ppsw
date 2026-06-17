import { BaseRepository } from './base.repository';
import { Skill } from '@/types';
import { orderBy, where } from 'firebase/firestore';

class SkillRepository extends BaseRepository<Skill> {
  constructor() {
    super('skills');
  }

  async getAllSorted(): Promise<Skill[]> {
    const skills = await this.getAll();
    return skills.sort((a, b) => {
      if (a.category < b.category) return -1;
      if (a.category > b.category) return 1;
      return a.order - b.order;
    });
  }

  async getVisibleSkills(): Promise<Skill[]> {
    const skills = await this.getAllSorted();
    return skills.filter(skill => skill.isVisible);
  }
}

export const skillRepository = new SkillRepository();
