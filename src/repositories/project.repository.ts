import { BaseRepository } from './base.repository';
import { Project } from '@/types';
import { orderBy, where } from 'firebase/firestore';

class ProjectRepository extends BaseRepository<Project> {
  constructor() {
    super('projects');
  }

  // Gets all projects sorted by creation date (newest first)
  async getAllProjects(): Promise<Project[]> {
    return this.getAll([orderBy('createdAt', 'desc')]);
  }

  // For public website: only published projects
  async getPublishedProjects(): Promise<Project[]> {
    const projects = await this.getAllProjects();
    return projects.filter(p => p.isPublished);
  }

  // Get featured projects for homepage
  async getFeaturedProjects(): Promise<Project[]> {
    const projects = await this.getAllProjects();
    return projects.filter(p => p.isPublished && p.isFeatured);
  }

  // Get project by slug
  async getBySlug(slug: string): Promise<Project | null> {
    const projects = await this.getAll([where('slug', '==', slug), where('isPublished', '==', true)]);
    return projects.length > 0 ? projects[0] : null;
  }
}

export const projectRepository = new ProjectRepository();
