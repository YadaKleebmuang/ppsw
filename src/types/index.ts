import { Timestamp } from 'firebase/firestore';

export interface Category {
  id?: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface TechStack {
  id?: string;
  name: string;
  slug: string;
  icon: string;
  isActive: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Skill {
  id?: string;
  name: string;
  category: string;
  level: number | string;
  order: number;
  isVisible: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  faculty: string;
  major: string;
  startYear: string;
  endYear: string;
  description: string;
  isVisible: boolean;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Experience {
  id?: string;
  title: string;
  organization: string;
  type: string;
  startDate: string | Timestamp;
  endDate: string | Timestamp | null;
  description: string;
  isVisible: boolean;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface ProjectImage {
  id: string;
  url: string;
  publicId: string;
  alt: string;
  caption: string;
  order: number;
  isCover: boolean;
  createdAt?: Timestamp;
}

export interface Project {
  id?: string;
  titleThai: string;
  titleEnglish: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  fullContent: string;
  problem: string;
  objectives: string[];
  features: string[];
  responsibilities: string[];
  results: string[];
  techStackIds: string[];
  githubUrl: string;
  liveDemoUrl: string;
  images: ProjectImage[];
  coverImageUrl: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Profile {
  id?: string;
  fullName: string;
  headline: string;
  bio: string;
  about: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  profileImageUrl: string;
  resumeUrl?: string;
  updatedAt?: Timestamp;
}
